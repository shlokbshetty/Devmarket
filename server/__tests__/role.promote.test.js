/**
 * Feature: lan-backend-setup
 * Property 7: Promote sets role to developer for any existing user
 * Property 8: Promote returns 404 for any non-existent user
 * Validates: Requirements 4.4, 4.5
 */

const Database = require('better-sqlite3');
const fc = require('fast-check');

// ---------------------------------------------------------------------------
// Schema helper
// ---------------------------------------------------------------------------

function applySchema(mockDb) {
  mockDb.exec(`
    CREATE TABLE IF NOT EXISTS users (
      uid        VARCHAR(128)                                              PRIMARY KEY,
      email      VARCHAR(255)                                              NOT NULL UNIQUE,
      role       TEXT CHECK(role IN ('user', 'developer', 'administrator'))        NOT NULL DEFAULT 'user',
      created_at TIMESTAMP                                                 NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// ---------------------------------------------------------------------------
// Minimal Express req/res/next triple
// ---------------------------------------------------------------------------

function makeReqResNext(uid) {
  const req = { params: { uid } };
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

// Starting role for an existing user
const arbRole = fc.constantFrom('user', 'developer', 'administrator');

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Property 7: Promote sets role to developer for any existing user', () => {
  // **Validates: Requirements 4.4**

  let mockDb;
  let promoteUser;

  beforeEach(() => {
    mockDb = new Database(':memory:');
    applySchema(mockDb);

    // Build a query function backed by the in-memory mockDb and inject it via jest.mock
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

    promoteUser = require('../controllers/adminController').promoteUser;
  });

  afterEach(() => {
    mockDb.close();
    jest.resetModules();
  });

  test('post-promote role is always "developer" regardless of starting role', async () => {
    await fc.assert(
      fc.asyncProperty(arbUid, arbRole, async (uid, startingRole) => {
        // Seed the user with an arbitrary starting role
        mockDb.prepare(
          `INSERT INTO users (uid, email, role) VALUES (?, ?, ?)`
        ).run(uid, `${uid}@test.com`, startingRole);

        const { req, res } = makeReqResNext(uid);
        await promoteUser(req, res);

        // Handler should respond with success
        expect(res._status).toBe(200);
        expect(res._body).toEqual({ success: true });

        // Role in mockDb must now be "developer"
        const row = mockDb.prepare('SELECT role FROM users WHERE uid = ?').get(uid);
        expect(row.role).toBe('developer');

        // Clean up for next iteration
        mockDb.prepare('DELETE FROM users WHERE uid = ?').run(uid);
      }),
      { numRuns: 100 }
    );
  });
});

describe('Property 8: Promote returns 404 for any non-existent user', () => {
  // **Validates: Requirements 4.5**

  let mockDb;
  let promoteUser;

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

    promoteUser = require('../controllers/adminController').promoteUser;
  });

  afterEach(() => {
    mockDb.close();
    jest.resetModules();
  });

  test('returns 404 for any uid not present in the mockDb', async () => {
    await fc.assert(
      fc.asyncProperty(arbUid, async (uid) => {
        // mockDb is empty — uid does not exist
        const { req, res } = makeReqResNext(uid);
        await promoteUser(req, res);

        expect(res._status).toBe(404);
        expect(res._body).toMatchObject({ success: false });
      }),
      { numRuns: 100 }
    );
  });

  test('returns 404 for unknown uid even when other users exist', async () => {
    await fc.assert(
      fc.asyncProperty(
        arbUid,
        arbUid,
        arbRole,
        async (existingUid, unknownUid) => {
          // Skip when fast-check generates the same uid for both
          fc.pre(existingUid !== unknownUid);

          // Seed one user
          mockDb.prepare(
            `INSERT OR IGNORE INTO users (uid, email, role) VALUES (?, ?, 'user')`
          ).run(existingUid, `${existingUid}@test.com`);

          // Promote the unknown uid
          const { req, res } = makeReqResNext(unknownUid);
          await promoteUser(req, res);

          expect(res._status).toBe(404);
          expect(res._body).toMatchObject({ success: false });

          // Clean up
          mockDb.prepare('DELETE FROM users WHERE uid = ?').run(existingUid);
        }
      ),
      { numRuns: 100 }
    );
  });
});
