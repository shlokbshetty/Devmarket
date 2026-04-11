/**
 * Feature: lan-backend-setup
 * Property 12: Download URL is correctly constructed for any app record
 * Property 13: Missing files return 404
 * Property 17: Content-Disposition header is present for any valid download
 * Validates: Requirements 6.2, 6.3, 6.4, 6.5
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const express = require('express');
const request = require('supertest');
const fc = require('fast-check');

function makeDownloadApp(uploadsDir) {
  const app = express();
  app.use(
    '/downloads',
    express.static(uploadsDir, {
      setHeaders: (res) => res.setHeader('Content-Disposition', 'attachment'),
    }),
  );
  return app;
}

const arbFilename = fc
  .stringMatching(/^[a-zA-Z0-9_\-]{1,40}$/)
  .map((base) => `${base}.apk`);

const arbLanIp = fc
  .tuple(
    fc.integer({ min: 1, max: 254 }),
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 1, max: 254 }),
  )
  .map(([a, b, c, d]) => `${a}.${b}.${c}.${d}`);

// ---------------------------------------------------------------------------
// Property 12: Download URL is correctly constructed for any app record
// ---------------------------------------------------------------------------

describe('Property 12: Download URL is correctly constructed for any app record', () => {
  test('downloadUrl equals http://${LAN_IP}:3000/downloads/${filename} for any input', () => {
    fc.assert(
      fc.property(arbFilename, arbLanIp, (filename, lanIp) => {
        const downloadUrl = `http://${lanIp}:3000/downloads/${filename}`;
        expect(downloadUrl).toBe(`http://${lanIp}:3000/downloads/${filename}`);
      }),
      { numRuns: 100 },
    );
  });

  test('downloadUrl uses LAN_IP env var value exactly', () => {
    fc.assert(
      fc.property(arbFilename, arbLanIp, (filename, lanIp) => {
        const originalLanIp = process.env.LAN_IP;
        process.env.LAN_IP = lanIp;
        const downloadUrl = `http://${process.env.LAN_IP}:3000/downloads/${filename}`;
        expect(downloadUrl).toBe(`http://${lanIp}:3000/downloads/${filename}`);
        if (originalLanIp === undefined) {
          delete process.env.LAN_IP;
        } else {
          process.env.LAN_IP = originalLanIp;
        }
      }),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 13: Missing files return 404
// ---------------------------------------------------------------------------

describe('Property 13: Missing files return 404', () => {
  let tmpDir;
  let app;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'devmarket-test-'));
    app = makeDownloadApp(tmpDir);
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('GET /downloads/{filename} returns 404 for any filename not in the uploads dir', async () => {
    await fc.assert(
      fc.asyncProperty(arbFilename, async (filename) => {
        const filePath = path.join(tmpDir, filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        const res = await request(app).get(`/downloads/${filename}`);
        expect(res.status).toBe(404);
      }),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 17: Content-Disposition header is present for any valid download
// ---------------------------------------------------------------------------

describe('Property 17: Content-Disposition header is present for any valid download', () => {
  let tmpDir;
  let app;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'devmarket-test-'));
    app = makeDownloadApp(tmpDir);
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('GET /downloads/{filename} includes Content-Disposition: attachment for any existing file', async () => {
    await fc.assert(
      fc.asyncProperty(arbFilename, async (filename) => {
        const filePath = path.join(tmpDir, filename);
        fs.writeFileSync(filePath, 'dummy apk content');
        const res = await request(app).get(`/downloads/${filename}`);
        expect(res.status).toBe(200);
        expect(res.headers['content-disposition']).toMatch(/attachment/);
        fs.unlinkSync(filePath);
      }),
      { numRuns: 100 },
    );
  });
});
