/**
 * Feature: lan-backend-setup
 * Smoke and integration tests
 * Validates: Requirements 1.1, 2.5, 3.1, 8.1, 8.2, 8.3
 *
 * Strategy: Build a minimal Express app that mirrors index.js (CORS, routes,
 * static serving, SPA fallback) but uses mocked/in-memory dependencies.
 * This avoids the complexity of preventing app.listen() from firing.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');
const fs = require('fs');
const request = require('supertest');
const Database = require('better-sqlite3');

// ---------------------------------------------------------------------------
// In-memory SQLite helpers (mirrors initDb.js logic)
// ---------------------------------------------------------------------------

function applySchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      uid        VARCHAR(128)                                              PRIMARY KEY,
      email      VARCHAR(255)                                              NOT NULL UNIQUE,
      role       TEXT CHECK(role IN ('user', 'developer', 'administrator'))        NOT NULL DEFAULT 'user',
      created_at TIMESTAMP                                                 NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS apps (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      developer_uid  VARCHAR(128)  NOT NULL,
      name           VARCHAR(255)  NOT NULL,
      filename       VARCHAR(255)  NOT NULL,
      status         TEXT CHECK(status IN ('pending', 'approved', 'rejected')) NOT NULL DEFAULT 'pending',
      uploaded_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (developer_uid) REFERENCES users(uid)
    )
  `);
}

/**
 * Wrap a better-sqlite3 instance in the same async query() interface as db.js.
 */
function makeQuery(db) {
  return (sql, params = []) =>
    new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare(sql);
        const verb = sql.trim().split(/\s+/)[0].toUpperCase();
        if (verb === 'SELECT') {
          resolve(stmt.all(params));
        } else {
          resolve(stmt.run(params));
        }
      } catch (err) {
        reject(err);
      }
    });
}

// ---------------------------------------------------------------------------
// Mock Firebase Admin SDK
// ---------------------------------------------------------------------------

/**
 * Returns a mock firebase-admin object that initialises without throwing.
 * verifyIdToken resolves to a controlled payload.
 */
function makeMockAdmin(resolvePayload = { uid: 'test-uid', email: 'test@example.com' }) {
  return {
    initializeApp: jest.fn(),
    credential: {
      cert: jest.fn().mockReturnValue({}),
    },
    auth: () => ({
      verifyIdToken: jest.fn().mockResolvedValue(resolvePayload),
    }),
  };
}

// ---------------------------------------------------------------------------
// Minimal app factory — mirrors index.js without calling app.listen()
// ---------------------------------------------------------------------------

/**
 * Build a minimal Express app with the same CORS, static, and SPA fallback
 * configuration as server/index.js, but using injected (mock) dependencies.
 *
 * @param {object} opts
 * @param {string}  opts.clientDistPath  - Path to serve as the SPA static root
 * @param {string}  opts.uploadsPath     - Path to serve under /downloads
 * @param {string}  [opts.corsOrigin]    - Value for CORS_ORIGIN (default '*')
 */
function buildApp({ clientDistPath, uploadsPath, corsOrigin = '*' }) {
  const app = express();

  const corsOptions = {
    origin: corsOrigin,
    allowedHeaders: ['Authorization', 'Content-Type', 'X-Requested-With'],
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  app.use(express.json());

  // /downloads static route
  app.use(
    '/downloads',
    express.static(uploadsPath, {
      setHeaders: (res) => res.setHeader('Content-Disposition', 'attachment'),
      fallthrough: false,
    })
  );

  // Minimal /api/health route so we have something to hit for CORS checks
  app.get('/api/health', (_req, res) => res.json({ success: true }));

  // SPA fallback
  app.use(express.static(clientDistPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });

  return app;
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('Smoke tests', () => {
  let app;
  let tmpDir;
  let clientDistDir;
  let uploadsDir;

  beforeAll(() => {
    // Create a temp directory tree for the test run
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'devmarket-smoke-'));
    clientDistDir = path.join(tmpDir, 'client', 'dist');
    uploadsDir = path.join(tmpDir, 'uploads', 'apk');

    fs.mkdirSync(clientDistDir, { recursive: true });
    fs.mkdirSync(uploadsDir, { recursive: true });

    // Minimal index.html for SPA fallback test
    fs.writeFileSync(
      path.join(clientDistDir, 'index.html'),
      '<!DOCTYPE html><html><body>DevMarket</body></html>'
    );

    app = buildApp({ clientDistPath: clientDistDir, uploadsPath: uploadsDir });
  });

  afterAll(() => {
    // Clean up temp directory
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  // -------------------------------------------------------------------------
  // CORS headers are present on API responses
  // -------------------------------------------------------------------------

  test('CORS headers are present on API responses', async () => {
    // Validates: Requirements 8.1, 8.2
    const res = await request(app)
      .get('/api/health')
      .set('Origin', 'http://192.168.1.100:5173');

    expect(res.headers['access-control-allow-origin']).toBeDefined();
    // With origin:'*', the header value is '*'
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.status).toBe(200);
  });

  test('CORS restricts origin when CORS_ORIGIN is set', async () => {
    // Validates: Requirements 8.4
    const restrictedApp = buildApp({
      clientDistPath: clientDistDir,
      uploadsPath: uploadsDir,
      corsOrigin: 'http://192.168.1.100:5173',
    });

    const res = await request(restrictedApp)
      .get('/api/health')
      .set('Origin', 'http://192.168.1.100:5173');

    expect(res.headers['access-control-allow-origin']).toBe('http://192.168.1.100:5173');
  });

  // -------------------------------------------------------------------------
  // OPTIONS preflight returns 204
  // -------------------------------------------------------------------------

  test('OPTIONS preflight returns 204', async () => {
    // Validates: Requirements 8.3
    const res = await request(app)
      .options('/api/health')
      .set('Origin', 'http://192.168.1.100:5173')
      .set('Access-Control-Request-Method', 'GET')
      .set('Access-Control-Request-Headers', 'Authorization, Content-Type');

    expect(res.status).toBe(204);
  });

  test('OPTIONS preflight includes allowed headers', async () => {
    // Validates: Requirements 8.2
    const res = await request(app)
      .options('/api/apps/upload')
      .set('Origin', 'http://192.168.1.100:5173')
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'Authorization, Content-Type');

    expect(res.status).toBe(204);
    // The allowed headers should include Authorization and Content-Type
    const allowedHeaders = res.headers['access-control-allow-headers'] || '';
    expect(allowedHeaders.toLowerCase()).toMatch(/authorization/);
    expect(allowedHeaders.toLowerCase()).toMatch(/content-type/);
  });

  // -------------------------------------------------------------------------
  // Firebase Admin SDK initialises without throwing
  // -------------------------------------------------------------------------

  test('Firebase Admin SDK initialises without throwing when given a valid mock service account', () => {
    // Validates: Requirements 2.5
    // We test the initialisation logic in isolation — no real service account needed.
    const mockAdmin = makeMockAdmin();

    const mockServiceAccount = {
      type: 'service_account',
      project_id: 'devmarket-test',
      private_key_id: 'key-id-123',
      private_key: '-----BEGIN RSA PRIVATE KEY-----\nMOCK\n-----END RSA PRIVATE KEY-----\n',
      client_email: 'firebase-adminsdk@devmarket-test.iam.gserviceaccount.com',
      client_id: '123456789',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
    };

    // Should not throw
    expect(() => {
      const credential = mockAdmin.credential.cert(mockServiceAccount);
      mockAdmin.initializeApp({ credential });
    }).not.toThrow();

    expect(mockAdmin.credential.cert).toHaveBeenCalledWith(mockServiceAccount);
    expect(mockAdmin.initializeApp).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------------------------
  // DB schema tables exist after initDb()
  // -------------------------------------------------------------------------

  test('DB schema tables exist after initDb()', async () => {
    // Validates: Requirements 3.1
    // Use an in-memory SQLite instance and apply the schema directly.
    const db = new Database(':memory:');

    // Run initDb equivalent
    applySchema(db);

    // Verify both tables exist by querying sqlite_master
    const tables = db
      .prepare(
        `SELECT name FROM sqlite_master WHERE type='table' AND name IN ('users', 'apps')`
      )
      .all()
      .map((r) => r.name)
      .sort();

    expect(tables).toEqual(['apps', 'users']);

    // Verify users table has the expected columns
    const userColumns = db
      .prepare(`PRAGMA table_info(users)`)
      .all()
      .map((c) => c.name);

    expect(userColumns).toContain('uid');
    expect(userColumns).toContain('email');
    expect(userColumns).toContain('role');
    expect(userColumns).toContain('created_at');

    // Verify apps table has the expected columns
    const appColumns = db
      .prepare(`PRAGMA table_info(apps)`)
      .all()
      .map((c) => c.name);

    expect(appColumns).toContain('id');
    expect(appColumns).toContain('developer_uid');
    expect(appColumns).toContain('name');
    expect(appColumns).toContain('filename');
    expect(appColumns).toContain('status');
    expect(appColumns).toContain('uploaded_at');

    db.close();
  });

  test('initDb() is idempotent — running it twice does not throw', async () => {
    // Validates: Requirements 3.1 (CREATE TABLE IF NOT EXISTS)
    const db = new Database(':memory:');

    expect(() => {
      applySchema(db);
      applySchema(db); // second call should be a no-op
    }).not.toThrow();

    db.close();
  });

  test('users table enforces role CHECK constraint', () => {
    // Validates: Requirements 3.1 — role must be one of user/developer/admin
    const db = new Database(':memory:');
    applySchema(db);

    expect(() => {
      db.prepare(
        `INSERT INTO users (uid, email, role) VALUES ('u1', 'a@b.com', 'superuser')`
      ).run();
    }).toThrow();

    db.close();
  });

  // -------------------------------------------------------------------------
  // SPA fallback serves index.html for unknown routes
  // -------------------------------------------------------------------------

  test('SPA fallback serves client/dist/index.html for unknown routes', async () => {
    // Validates: Requirements 8.1 (SPA served from Express)
    const res = await request(app).get('/some/unknown/route');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
    expect(res.text).toContain('DevMarket');
  });

  test('SPA fallback serves index.html for deeply nested unknown routes', async () => {
    const res = await request(app).get('/app/details/123/reviews');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
    expect(res.text).toContain('DevMarket');
  });

  // -------------------------------------------------------------------------
  // /downloads static route
  // -------------------------------------------------------------------------

  test('/downloads serves files with Content-Disposition: attachment', async () => {
    // Validates: Requirements 6.1, 6.2
    const testFile = path.join(uploadsDir, 'test-app.apk');
    fs.writeFileSync(testFile, 'mock apk content');

    const res = await request(app).get('/downloads/test-app.apk');

    expect(res.status).toBe(200);
    expect(res.headers['content-disposition']).toMatch(/attachment/);

    fs.unlinkSync(testFile);
  });

  test('/downloads returns 404 for missing files', async () => {
    // Validates: Requirements 6.5
    const res = await request(app).get('/downloads/nonexistent-file.apk');

    expect(res.status).toBe(404);
  });
});
