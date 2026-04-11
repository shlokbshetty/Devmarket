/**
 * Feature: lan-backend-setup
 * Property 9:  Files exceeding 200 MB are rejected with 413
 * Property 10: Non-APK files are rejected with 400
 * Property 11: Valid APK upload produces a unique filename and mockDb record
 * Validates: Requirements 5.3, 5.4, 5.5, 5.6
 */

const Database = require('better-sqlite3');
const fc = require('fast-check');

// ---------------------------------------------------------------------------
// Schema helpers
// ---------------------------------------------------------------------------

function applySchema(mockDb) {
  mockDb.exec(`
    CREATE TABLE IF NOT EXISTS users (
      uid        VARCHAR(128) PRIMARY KEY,
      email      VARCHAR(255) NOT NULL UNIQUE,
      role       TEXT CHECK(role IN ('user', 'developer', 'administrator')) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS apps (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      developer_uid  VARCHAR(128) NOT NULL,
      name           VARCHAR(255) NOT NULL,
      description    TEXT NOT NULL DEFAULT '',
      category       VARCHAR(100) NOT NULL DEFAULT 'Other',
      version        VARCHAR(50) NOT NULL DEFAULT '1.0',
      filename       VARCHAR(255) NOT NULL,
      screenshots    TEXT,
      average_rating REAL DEFAULT 4.8,
      status         TEXT CHECK(status IN ('pending', 'approved', 'rejected')) NOT NULL DEFAULT 'pending',
      uploaded_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

function mockMakeDbQuery(mockDb) {
  return (sql, params = []) =>
    new Promise((resolve, reject) => {
      try {
        const stmt = mockDb.prepare(sql);
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
// Minimal Express req / res helpers
// ---------------------------------------------------------------------------

function makeReq(overrides = {}) {
  return {
    user: { uid: 'dev-uid-123' },
    body: { name: 'Test App' },
    file: undefined,
    ...overrides,
  };
}

function makeRes() {
  return {
    _status: 200,
    _body: null,
    status(code) { this._status = code; return this; },
    json(body) { this._body = body; return this; },
  };
}

// ---------------------------------------------------------------------------
// Arbitrary generators
// ---------------------------------------------------------------------------

const arbFilename = fc
  .tuple(
    fc.stringMatching(/^[a-zA-Z0-9_\-]{1,40}$/),
    fc.constantFrom('.zip', '.exe', '.tar', '.png', '.pdf', '.txt'),
  )
  .map(([base, ext]) => `${base}${ext}`);

const arbNonApkMime = fc.oneof(
  fc.constant('application/zip'),
  fc.constant('image/png'),
  fc.constant('text/plain'),
  fc.constant('application/pdf'),
);

const arbApkFilename = fc
  .stringMatching(/^[a-zA-Z0-9_\-]{1,40}$/)
  .map((base) => `${base}.apk`);

const arbUid = fc.stringMatching(/^[a-zA-Z0-9]{1,64}$/);
const arbAppName = fc.stringMatching(/^[a-zA-Z0-9 _\-]{1,80}$/);

// ---------------------------------------------------------------------------
// Property 9: Files exceeding 200 MB are rejected with 413
// ---------------------------------------------------------------------------

describe('Property 9: Files exceeding 200 MB are rejected with 413', () => {
  let mockDb;
  let uploadApp;

  beforeEach(() => {
    mockDb = new Database(':memory:');
    applySchema(mockDb);
    jest.resetModules();

    jest.mock('multer', () => {
      const m = () => ({
        single: () => (req, res, cb) => {
          const err = new Error('File too large');
          err.code = 'LIMIT_FILE_SIZE';
          cb(err);
        },
      });
      m.diskStorage = () => ({});
      return m;
    });

    jest.mock('../config/db', () => ({ query: mockMakeDbQuery(mockDb) }));
    uploadApp = require('../controllers/appController').uploadApp;
  });

  afterEach(() => { mockDb.close(); jest.resetModules(); });

  test('any oversized upload is rejected with 413 and correct body', async () => {
    await fc.assert(
      fc.asyncProperty(arbFilename, async (originalname) => {
        const req = makeReq({ body: { name: 'Big App' } });
        const res = makeRes();
        await new Promise((resolve) => {
          const orig = res.json.bind(res);
          res.json = (body) => { orig(body); resolve(); };
          uploadApp(req, res);
        });
        expect(res._status).toBe(413);
        expect(res._body).toEqual({ success: false, message: 'File too large' });
      }),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 10: Non-APK files are rejected with 400
// ---------------------------------------------------------------------------

describe('Property 10: Non-APK files are rejected with 400', () => {
  let mockDb;
  let uploadApp;

  beforeEach(() => {
    mockDb = new Database(':memory:');
    applySchema(mockDb);
    jest.resetModules();

    jest.mock('multer', () => {
      const m = () => ({
        single: () => (req, res, cb) => {
          const err = new Error('Only APK files are allowed');
          err.code = 'INVALID_FILE_TYPE';
          cb(err);
        },
      });
      m.diskStorage = () => ({});
      return m;
    });

    jest.mock('../config/db', () => ({ query: mockMakeDbQuery(mockDb) }));
    uploadApp = require('../controllers/appController').uploadApp;
  });

  afterEach(() => { mockDb.close(); jest.resetModules(); });

  test('any non-APK upload is rejected with 400 and correct body', async () => {
    await fc.assert(
      fc.asyncProperty(arbFilename, arbNonApkMime, async (originalname, mimetype) => {
        const req = makeReq({ body: { name: 'Bad App' } });
        const res = makeRes();
        await new Promise((resolve) => {
          const orig = res.json.bind(res);
          res.json = (body) => { orig(body); resolve(); };
          uploadApp(req, res);
        });
        expect(res._status).toBe(400);
        expect(res._body).toEqual({ success: false, message: 'Only APK files are allowed' });
      }),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 11: Valid APK upload produces a unique filename and mockDb record
// ---------------------------------------------------------------------------

describe('Property 11: Valid APK upload produces a unique filename and mockDb record', () => {
  let mockDb;
  let uploadApp;

  beforeEach(() => {
    mockDb = new Database(':memory:');
    applySchema(mockDb);
    jest.resetModules();

    jest.mock('multer', () => {
      const m = () => ({
        single: () => (req, res, cb) => {
          const originalname = req._mockOriginalname || 'app.apk';
          const filename = `${Date.now()}-${originalname}`;
          req.file = {
            fieldname: 'apk',
            originalname,
            mimetype: 'application/vnd.android.package-archive',
            filename,
            path: `uploads/apk/${filename}`,
            size: 1024,
          };
          cb(null);
        },
      });
      m.diskStorage = () => ({});
      return m;
    });

    jest.mock('../config/db', () => ({ query: mockMakeDbQuery(mockDb) }));
    uploadApp = require('../controllers/appController').uploadApp;
  });

  afterEach(() => { mockDb.close(); jest.resetModules(); });

  test('valid APK upload returns 201 with correct app record', async () => {
    await fc.assert(
      fc.asyncProperty(arbUid, arbAppName, arbApkFilename, async (uid, appName, originalname) => {
        const req = makeReq({ user: { uid }, body: { name: appName }, _mockOriginalname: originalname });
        const res = makeRes();
        await new Promise((resolve) => {
          const orig = res.json.bind(res);
          res.json = (body) => { orig(body); resolve(); };
          uploadApp(req, res);
        });

        expect(res._status).toBe(201);
        expect(res._body.success).toBe(true);
        expect(res._body.app.status).toBe('pending');
        expect(res._body.app.name).toBe(appName);
        expect(res._body.app.filename).toMatch(new RegExp(`${originalname}$`));

        const row = mockDb.prepare('SELECT * FROM apps WHERE id = ?').get(res._body.app.id);
        expect(row).not.toBeNull();
        expect(row.developer_uid).toBe(uid);
        expect(row.status).toBe('pending');

        mockDb.prepare('DELETE FROM apps WHERE id = ?').run(res._body.app.id);
      }),
      { numRuns: 100 },
    );
  });
});
