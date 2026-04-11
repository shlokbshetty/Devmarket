/**
 * Feature: lan-backend-setup
 * Property 4: User upsert is correct and idempotent
 * Validates: Requirements 3.3, 3.4
 *
 * Tests that:
 *   (a) First upsert creates a row with role="user" and the correct email
 *   (b) Second upsert with the same uid leaves the role unchanged
 *       (even if the role was manually changed to "developer" or "admin")
 */

const Database = require('better-sqlite3');
const fc = require('fast-check');

// ---------------------------------------------------------------------------
// Helpers — mirror the upsert logic from authMiddleware
// ---------------------------------------------------------------------------

/**
 * Apply the schema from initDb.js to an in-memory SQLite instance.
 */
function applySchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      uid        VARCHAR(128)                                              PRIMARY KEY,
      email      VARCHAR(255)                                              NOT NULL UNIQUE,
      role       TEXT CHECK(role IN ('user', 'developer', 'administrator'))        NOT NULL DEFAULT 'user',
      created_at TIMESTAMP                                                 NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

/**
 * Upsert logic: INSERT OR IGNORE INTO users (uid, email, role) VALUES (?, ?, 'user')
 * Then SELECT role FROM users WHERE uid = ?
 * Returns the row's current role.
 */
function upsertUser(db, uid, email) {
  db.prepare(
    `INSERT OR IGNORE INTO users (uid, email, role) VALUES (?, ?, 'user')`
  ).run(uid, email);

  const row = db.prepare(`SELECT role, email FROM users WHERE uid = ?`).get(uid);
  return row;
}

// ---------------------------------------------------------------------------
// Arbitrary generators
// ---------------------------------------------------------------------------

// Alphanumeric uid (1–64 chars) — mirrors Firebase uid format
const arbUid = fc.stringMatching(/^[a-zA-Z0-9]{1,64}$/);

// Arbitrary non-empty email string (we don't need RFC-valid emails for this property)
const arbEmail = fc.emailAddress();

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Property 4: User upsert is correct and idempotent', () => {
  let db;

  beforeEach(() => {
    // Fresh in-memory DB for every test run
    db = new Database(':memory:');
    applySchema(db);
  });

  afterEach(() => {
    db.close();
  });

  test('first upsert creates a row with role="user" and correct email', () => {
    // **Validates: Requirements 3.3**
    fc.assert(
      fc.property(arbUid, arbEmail, (uid, email) => {
        const row = upsertUser(db, uid, email);

        expect(row).not.toBeNull();
        expect(row.role).toBe('user');
        expect(row.email).toBe(email);

        // Clean up so the next iteration starts fresh within the same DB
        db.prepare('DELETE FROM users WHERE uid = ?').run(uid);
      }),
      { numRuns: 100 }
    );
  });

  test('second upsert with same uid leaves role unchanged', () => {
    // **Validates: Requirements 3.4**
    const roles = ['user', 'developer', 'administrator'];

    fc.assert(
      fc.property(
        arbUid,
        arbEmail,
        fc.constantFrom(...roles),
        (uid, email, existingRole) => {
          // Seed the user with an arbitrary role (simulates an already-existing user)
          db.prepare(
            `INSERT INTO users (uid, email, role) VALUES (?, ?, ?)`
          ).run(uid, email, existingRole);

          // Perform the upsert — should NOT overwrite the existing role
          const row = upsertUser(db, uid, email);

          expect(row).not.toBeNull();
          expect(row.role).toBe(existingRole);

          // Clean up for the next iteration
          db.prepare('DELETE FROM users WHERE uid = ?').run(uid);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('upsert with same uid but different email does not change existing row', () => {
    // Edge case: uid collision with a different email — INSERT OR IGNORE should be a no-op
    fc.assert(
      fc.property(
        arbUid,
        arbEmail,
        arbEmail,
        (uid, email1, email2) => {
          // Insert the original row
          db.prepare(
            `INSERT INTO users (uid, email, role) VALUES (?, ?, 'developer')`
          ).run(uid, email1);

          // Upsert with a different email — should be ignored
          const row = upsertUser(db, uid, email2);

          expect(row.role).toBe('developer');
          expect(row.email).toBe(email1); // original email preserved

          db.prepare('DELETE FROM users WHERE uid = ?').run(uid);
        }
      ),
      { numRuns: 100 }
    );
  });
});
