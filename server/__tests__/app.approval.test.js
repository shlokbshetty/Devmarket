/**
 * Feature: lan-backend-setup
 * Property 14: App status update is applied correctly
 * Property 16: Approval/rejection of non-existent app returns 404
 * Validates: Requirements 7.2, 7.3, 7.5
 */

const Database = require('better-sqlite3');
const fc = require('fast-check');

// ---------------------------------------------------------------------------
// Schema helpers
// ---------------------------------------------------------------------------

function applySchema(mockDb) {
  mockDb.exec('PRAGMA foreign_keys = OFF;');
  mockDb.exec(`
    CREATE TABLE IF NOT EXISTS users (
      uid        VARCHAR(128)                                              PRIMARY KEY,
      email      VARCHAR(255)                                              NOT NULL UNIQUE,
      role       TEXT CHECK(role IN ('user', 'developer', 'administrator'))        NOT NULL DEFAULT 'user',
      created_at TIMESTAMP                                                 NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  mockDb.exec(`
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
      uploaded_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (developer_uid) REFERENCES users(uid)
    );
  `);
}

// Seed a developer user and return their uid
function seedDeveloper(mockDb, uid) {
  mockDb.prepare(
    `INSERT OR IGNORE INTO users (uid, email, role) VALUES (?, ?, 'developer')`
  ).run(uid, `${uid}@test.com`);
}

// Insert an app and return its auto-generated id
function insertApp(mockDb, developerUid, status) {
  const info = mockDb.prepare(
    `INSERT INTO apps (developer_uid, name, filename, status) VALUES (?, ?, ?, ?)`
  ).run(developerUid, 'Test App', 'test.apk', status);
  return info.lastInsertRowid;
}

// ---------------------------------------------------------------------------
// Minimal Express req/res/next triple
// ---------------------------------------------------------------------------

function makeReqResNext(id) {
  const req = { params: { id: String(id) } };
  const res = {
    _status: 200,
    _body: null,
    status(code) {
      this._status = code;
      return this;
    },
    json(body) {
      this._body = body;
      return this;
    },
  };
  const next = jest.fn();
  return { req, res, next };
}

// ---------------------------------------------------------------------------
// Arbitrary generators
// ---------------------------------------------------------------------------

// Alphanumeric uid (1–64 chars)
const arbUid = fc.stringMatching(/^[a-zA-Z0-9]{1,64}$/);

// Any valid starting status
const arbStatus = fc.constantFrom('pending', 'approved', 'rejected');

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Property 14: App status update is applied correctly', () => {
  // **Validates: Requirements 7.2, 7.3**

  let mockDb;
  let approveApp;
  let rejectApp;

  beforeEach(() => {
    mockDb = new Database(':memory:');
    applySchema(mockDb);

    jest.resetModules();
    jest.mock('../config/db', () => ({
      query: (sql, params = []) => {
        return new Promise((resolve, reject) => {
          try {
            const stmt = mockDb.prepare(sql);
            const verb = sql.trim().split(/\s+/)[0].toUpperCase();
            if (verb === 'SELECT') {
              resolve(stmt.all(params));
            } else {
              const info = stmt.run(params);
              resolve(info);
            }
          } catch (err) {
            reject(err);
          }
        });
      },
    }));

    const adminController = require('../controllers/adminController');
    approveApp = adminController.approveApp;
    rejectApp = adminController.rejectApp;
  });

  afterEach(() => {
    mockDb.close();
    jest.resetModules();
  });

  test('approve sets status to "approved" regardless of starting status', async () => {
    await fc.assert(
      fc.asyncProperty(arbUid, arbStatus, async (uid, startingStatus) => {
        seedDeveloper(mockDb, uid);
        const appId = insertApp(mockDb, uid, startingStatus);

        const { req, res } = makeReqResNext(appId);
        await approveApp(req, res);

        expect(res._status).toBe(200);
        expect(res._body).toEqual({ success: true });

        const row = mockDb.prepare('SELECT status FROM apps WHERE id = ?').get(appId);
        expect(row.status).toBe('approved');

        // Clean up for next iteration
        mockDb.prepare('DELETE FROM apps WHERE id = ?').run(appId);
        mockDb.prepare('DELETE FROM users WHERE uid = ?').run(uid);
      }),
      { numRuns: 100 }
    );
  });

  test('reject sets status to "rejected" regardless of starting status', async () => {
    await fc.assert(
      fc.asyncProperty(arbUid, arbStatus, async (uid, startingStatus) => {
        seedDeveloper(mockDb, uid);
        const appId = insertApp(mockDb, uid, startingStatus);

        const { req, res } = makeReqResNext(appId);
        await rejectApp(req, res);

        expect(res._status).toBe(200);
        expect(res._body).toEqual({ success: true });

        const row = mockDb.prepare('SELECT status FROM apps WHERE id = ?').get(appId);
        expect(row.status).toBe('rejected');

        // Clean up for next iteration
        mockDb.prepare('DELETE FROM apps WHERE id = ?').run(appId);
        mockDb.prepare('DELETE FROM users WHERE uid = ?').run(uid);
      }),
      { numRuns: 100 }
    );
  });
});

describe('Property 16: Approval/rejection of non-existent app returns 404', () => {
  // **Validates: Requirements 7.5**

  let mockDb;
  let approveApp;
  let rejectApp;

  beforeEach(() => {
    mockDb = new Database(':memory:');
    applySchema(mockDb);

    jest.resetModules();
    jest.mock('../config/db', () => ({
      query: (sql, params = []) => {
        return new Promise((resolve, reject) => {
          try {
            const stmt = mockDb.prepare(sql);
            const verb = sql.trim().split(/\s+/)[0].toUpperCase();
            if (verb === 'SELECT') {
              resolve(stmt.all(params));
            } else {
              const info = stmt.run(params);
              resolve(info);
            }
          } catch (err) {
            reject(err);
          }
        });
      },
    }));

    const adminController = require('../controllers/adminController');
    approveApp = adminController.approveApp;
    rejectApp = adminController.rejectApp;
  });

  afterEach(() => {
    mockDb.close();
    jest.resetModules();
  });

  test('approveApp returns 404 for any id not present in the mockDb', async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer({ min: 1, max: 999999 }), async (id) => {
        // mockDb has no apps — id does not exist
        const { req, res } = makeReqResNext(id);
        await approveApp(req, res);

        expect(res._status).toBe(404);
        expect(res._body).toMatchObject({ success: false });
      }),
      { numRuns: 100 }
    );
  });

  test('rejectApp returns 404 for any id not present in the mockDb', async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer({ min: 1, max: 999999 }), async (id) => {
        // mockDb has no apps — id does not exist
        const { req, res } = makeReqResNext(id);
        await rejectApp(req, res);

        expect(res._status).toBe(404);
        expect(res._body).toMatchObject({ success: false });
      }),
      { numRuns: 100 }
    );
  });

  test('approveApp returns 404 for unknown id even when other apps exist', async () => {
    await fc.assert(
      fc.asyncProperty(arbUid, fc.integer({ min: 1, max: 999999 }), async (uid, unknownId) => {
        seedDeveloper(mockDb, uid);
        const existingId = insertApp(mockDb, uid, 'pending');

        // Ensure the unknown id is actually different from the inserted one
        fc.pre(unknownId !== existingId);

        const { req, res } = makeReqResNext(unknownId);
        await approveApp(req, res);

        expect(res._status).toBe(404);
        expect(res._body).toMatchObject({ success: false });

        // Clean up
        mockDb.prepare('DELETE FROM apps WHERE id = ?').run(existingId);
        mockDb.prepare('DELETE FROM users WHERE uid = ?').run(uid);
      }),
      { numRuns: 100 }
    );
  });

  test('rejectApp returns 404 for unknown id even when other apps exist', async () => {
    await fc.assert(
      fc.asyncProperty(arbUid, fc.integer({ min: 1, max: 999999 }), async (uid, unknownId) => {
        seedDeveloper(mockDb, uid);
        const existingId = insertApp(mockDb, uid, 'pending');

        fc.pre(unknownId !== existingId);

        const { req, res } = makeReqResNext(unknownId);
        await rejectApp(req, res);

        expect(res._status).toBe(404);
        expect(res._body).toMatchObject({ success: false });

        // Clean up
        mockDb.prepare('DELETE FROM apps WHERE id = ?').run(existingId);
        mockDb.prepare('DELETE FROM users WHERE uid = ?').run(uid);
      }),
      { numRuns: 100 }
    );
  });
});

describe('Property 15: App listing returns only approved apps', () => {
  // **Validates: Requirements 7.4**

  let mockDb;
  let getApps;

  beforeEach(() => {
    mockDb = new Database(':memory:');
    applySchema(mockDb);

    process.env.LAN_IP = '192.168.1.1';

    jest.resetModules();
    jest.mock('../config/db', () => ({
      query: (sql, params = []) => {
        return new Promise((resolve, reject) => {
          try {
            const stmt = mockDb.prepare(sql);
            const verb = sql.trim().split(/\s+/)[0].toUpperCase();
            if (verb === 'SELECT') {
              resolve(stmt.all(params));
            } else {
              const info = stmt.run(params);
              resolve(info);
            }
          } catch (err) {
            reject(err);
          }
        });
      },
    }));

    const appController = require('../controllers/appController');
    getApps = appController.getApps;
  });

  afterEach(() => {
    mockDb.close();
    jest.resetModules();
    delete process.env.LAN_IP;
  });

  // Arbitrary: an array of 0–20 apps each with a random status
  const arbAppCollection = fc.array(
    fc.record({
      uid: fc.stringMatching(/^[a-zA-Z0-9]{1,32}$/),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      filename: fc.stringMatching(/^[a-zA-Z0-9_-]{1,30}\.apk$/),
      status: fc.constantFrom('pending', 'approved', 'rejected'),
    }),
    { minLength: 0, maxLength: 20 }
  );

  test('GET /api/apps returns only approved apps for any status distribution', async () => {
    await fc.assert(
      fc.asyncProperty(arbAppCollection, async (appCollection) => {
        // Seed all apps into the mockDb
        const insertedIds = [];
        const insertedUids = new Set();

        for (const app of appCollection) {
          // Ensure the developer user exists (INSERT OR IGNORE handles duplicates)
          if (!insertedUids.has(app.uid)) {
            mockDb.prepare(
              `INSERT OR IGNORE INTO users (uid, email, role) VALUES (?, ?, 'developer')`
            ).run(app.uid, `${app.uid}@test.com`);
            insertedUids.add(app.uid);
          }

          const info = mockDb.prepare(
            `INSERT INTO apps (developer_uid, name, filename, status) VALUES (?, ?, ?, ?)`
          ).run(app.uid, app.name, app.filename, app.status);
          insertedIds.push(info.lastInsertRowid);
        }

        // Build a minimal req/res pair (getApps doesn't use req params)
        const req = {};
        const res = {
          _status: 200,
          _body: null,
          status(code) { this._status = code; return this; },
          json(body) { this._body = body; return this; },
        };

        await getApps(req, res);

        // Response must be successful
        expect(res._body.success).toBe(true);
        expect(Array.isArray(res._body.apps)).toBe(true);

        // Every returned app must have status "approved"
        for (const returnedApp of res._body.apps) {
          expect(returnedApp.status).toBe('approved');
        }

        // The count of returned apps must equal the number of approved apps seeded
        const approvedCount = appCollection.filter((a) => a.status === 'approved').length;
        expect(res._body.apps.length).toBe(approvedCount);

        // Each returned app must have a correctly constructed downloadUrl
        for (const returnedApp of res._body.apps) {
          expect(returnedApp.downloadUrl).toBe(
            `http://192.168.1.1:3000/downloads/${returnedApp.filename}`
          );
        }

        // Clean up for next iteration
        for (const id of insertedIds) {
          mockDb.prepare('DELETE FROM apps WHERE id = ?').run(id);
        }
        for (const uid of insertedUids) {
          mockDb.prepare('DELETE FROM users WHERE uid = ?').run(uid);
        }
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 15: App listing returns only approved apps
// ---------------------------------------------------------------------------

describe('Property 15: App listing returns only approved apps', () => {
  // **Validates: Requirements 7.4**

  let mockDb;
  let getApps;

  beforeEach(() => {
    mockDb = new Database(':memory:');
    applySchema(mockDb);
    process.env.LAN_IP = '192.168.1.1';

    jest.resetModules();
    jest.mock('../config/db', () => ({
      query: (sql, params = []) => {
        return new Promise((resolve, reject) => {
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
      },
    }));

    getApps = require('../controllers/appController').getApps;
  });

  afterEach(() => {
    mockDb.close();
    jest.resetModules();
    delete process.env.LAN_IP;
  });

  const arbAppCollection = fc.array(
    fc.record({
      uid: fc.stringMatching(/^[a-zA-Z0-9]{1,32}$/),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      filename: fc.stringMatching(/^[a-zA-Z0-9_-]{1,30}\.apk$/),
      status: fc.constantFrom('pending', 'approved', 'rejected'),
    }),
    { minLength: 0, maxLength: 20 }
  );

  test('GET /api/apps returns only approved apps for any status distribution', async () => {
    await fc.assert(
      fc.asyncProperty(arbAppCollection, async (appCollection) => {
        const insertedIds = [];
        const insertedUids = new Set();

        for (const app of appCollection) {
          if (!insertedUids.has(app.uid)) {
            mockDb.prepare(
              `INSERT OR IGNORE INTO users (uid, email, role) VALUES (?, ?, 'developer')`
            ).run(app.uid, `${app.uid}@test.com`);
            insertedUids.add(app.uid);
          }
          const info = mockDb.prepare(
            `INSERT INTO apps (developer_uid, name, filename, status) VALUES (?, ?, ?, ?)`
          ).run(app.uid, app.name, app.filename, app.status);
          insertedIds.push(info.lastInsertRowid);
        }

        const req = {};
        const res = {
          _status: 200,
          _body: null,
          status(code) { this._status = code; return this; },
          json(body) { this._body = body; return this; },
        };

        await getApps(req, res);

        expect(res._body.success).toBe(true);
        expect(Array.isArray(res._body.apps)).toBe(true);

        for (const returnedApp of res._body.apps) {
          expect(returnedApp.status).toBe('approved');
        }

        const approvedCount = appCollection.filter((a) => a.status === 'approved').length;
        expect(res._body.apps.length).toBe(approvedCount);

        for (const returnedApp of res._body.apps) {
          expect(returnedApp.downloadUrl).toBe(
            `http://192.168.1.1:3000/downloads/${returnedApp.filename}`
          );
        }

        for (const id of insertedIds) {
          mockDb.prepare('DELETE FROM apps WHERE id = ?').run(id);
        }
        for (const uid of insertedUids) {
          mockDb.prepare('DELETE FROM users WHERE uid = ?').run(uid);
        }
      }),
      { numRuns: 100 }
    );
  });
});
