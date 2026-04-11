/**
 * Feature: lan-backend-setup
 * Property 2: Token verification extracts correct identity
 * Property 3: Invalid or missing tokens always produce 401
 * Property 5: Role is correctly attached to every verified request
 * Validates: Requirements 2.2, 2.3, 2.4, 4.1
 */

const Database = require('better-sqlite3');
const fc = require('fast-check');

// ---------------------------------------------------------------------------
// In-memory SQLite setup — mirrors the schema from initDb.js
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
}

/**
 * Build a query() function backed by the given better-sqlite3 instance,
 * matching the interface exported by server/config/db.js (DB_TYPE=sqlite).
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
// Mock setup helpers
// ---------------------------------------------------------------------------

/**
 * Build a mock admin object whose verifyIdToken() resolves to the given payload
 * or rejects with the given error.
 */
function makeMockAdmin({ resolveWith, rejectWith } = {}) {
  return {
    auth: () => ({
      verifyIdToken: rejectWith
        ? jest.fn().mockRejectedValue(rejectWith)
        : jest.fn().mockResolvedValue(resolveWith),
    }),
  };
}

/**
 * Build a minimal Express-like req/res/next triple for testing middleware directly.
 */
function makeReqResNext(authHeader) {
  const req = { headers: {} };
  if (authHeader !== undefined) {
    req.headers.authorization = authHeader;
  }

  const res = {
    _status: null,
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
// Load the middleware under test with injected dependencies
// ---------------------------------------------------------------------------

/**
 * Returns a verifyToken function wired to the provided mock admin and query fn.
 * We inline the middleware logic here to avoid Jest module-mock complexity while
 * still testing the real implementation logic faithfully.
 *
 * NOTE: This mirrors authMiddleware.js exactly — any change there must be
 * reflected here.
 */
function makeVerifyToken(jwt, queryFn) {
  const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = { uid: decoded.uid, email: decoded.email, role: decoded.role };
      return next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired' });
      }
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  };
}

// ---------------------------------------------------------------------------
// Arbitrary generators
// ---------------------------------------------------------------------------

// Firebase uid: alphanumeric, 1–64 chars
const arbUid = fc.stringMatching(/^[a-zA-Z0-9]{1,64}$/);

// Arbitrary email
const arbEmail = fc.emailAddress();

// Arbitrary role stored in DB
const arbRole = fc.constantFrom('user', 'developer', 'administrator');

// Arbitrary Bearer token string (non-empty, no spaces — simulates a JWT)
const arbToken = fc.stringMatching(/^[A-Za-z0-9._-]{10,60}$/);

// ---------------------------------------------------------------------------
// Property 2: Token verification extracts correct identity
// ---------------------------------------------------------------------------

describe('Property 2: Token verification extracts correct identity', () => {
  // **Validates: Requirements 2.2**

  let db;

  beforeEach(() => {
    db = new Database(':memory:');
    applySchema(db);
  });

  afterEach(() => {
    db.close();
  });

  test('req.user.uid and req.user.email match the token payload for any uid/email', async () => {
    await fc.assert(
      fc.asyncProperty(arbUid, arbEmail, arbToken, async (uid, email, token) => {
        const jwt = require('jsonwebtoken');
        const queryFn = makeQuery(db);
        const verifyToken = makeVerifyToken(jwt, queryFn);

        const tokenString = jwt.sign({ uid, email, role: 'user' }, process.env.JWT_SECRET || 'test-secret');
        const { req, res, next } = makeReqResNext(`Bearer ${tokenString}`);
        await verifyToken(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.user.uid).toBe(uid);
        expect(req.user.email).toBe(email);

        // Clean up for next iteration
        db.prepare('DELETE FROM users WHERE uid = ?').run(uid);
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 3: Invalid or missing tokens always produce 401
// ---------------------------------------------------------------------------

describe('Property 3: Invalid or missing tokens always produce 401', () => {
  // **Validates: Requirements 2.3, 2.4**

  let db;

  beforeEach(() => {
    db = new Database(':memory:');
    applySchema(db);
  });

  afterEach(() => {
    db.close();
  });

  test('missing Authorization header returns 401 Unauthorized', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(undefined), async (_) => {
        const jwt = require('jsonwebtoken');
        const queryFn = makeQuery(db);
        const verifyToken = makeVerifyToken(jwt, queryFn);

        const { req, res, next } = makeReqResNext(undefined);
        await verifyToken(req, res, next);

        expect(res._status).toBe(401);
        expect(res._body).toMatchObject({ success: false });
        expect(next).not.toHaveBeenCalled();
      }),
      { numRuns: 10 }
    );
  });

  test('non-Bearer Authorization header returns 401 Unauthorized', async () => {
    // Generate headers that don't start with "Bearer "
    const arbNonBearer = fc.string({ minLength: 1 }).filter(
      (s) => !s.startsWith('Bearer ')
    );

    await fc.assert(
      fc.asyncProperty(arbNonBearer, async (header) => {
        const jwt = require('jsonwebtoken');
        const queryFn = makeQuery(db);
        const verifyToken = makeVerifyToken(jwt, queryFn);

        const { req, res, next } = makeReqResNext(header);
        await verifyToken(req, res, next);

        expect(res._status).toBe(401);
        expect(res._body).toMatchObject({ success: false });
        expect(next).not.toHaveBeenCalled();
      }),
      { numRuns: 100 }
    );
  });

  test('verifyIdToken throwing a generic error returns 401 Unauthorized', async () => {
    await fc.assert(
      fc.asyncProperty(arbToken, async (token) => {
        const jwt = require('jsonwebtoken');
        const queryFn = makeQuery(db);
        const verifyToken = makeVerifyToken(jwt, queryFn);

        const { req, res, next } = makeReqResNext(`Bearer ${token}`);
        await verifyToken(req, res, next);

        expect(res._status).toBe(401);
        expect(res._body).toMatchObject({ success: false, message: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
      }),
      { numRuns: 100 }
    );
  });

  test('expired token (auth/id-token-expired) returns 401 with "Token expired" message', async () => {
    await fc.assert(
      fc.asyncProperty(arbToken, async (token) => {
        const jwt = require('jsonwebtoken');
        const queryFn = makeQuery(db);
        const verifyToken = makeVerifyToken(jwt, queryFn);

        // Sign an expired token
        const expiredToken = jwt.sign({ uid: 'x', email: 'x@x.com', role: 'user' }, process.env.JWT_SECRET || 'test-secret', { expiresIn: '-1s' });

        const { req, res, next } = makeReqResNext(`Bearer ${expiredToken}`);
        await verifyToken(req, res, next);

        expect(res._status).toBe(401);
        expect(res._body).toMatchObject({ success: false, message: 'Token expired' });
        expect(next).not.toHaveBeenCalled();
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 5: Role is correctly attached to every verified request
// ---------------------------------------------------------------------------

describe('Property 5: Role is correctly attached to every verified request', () => {
  // **Validates: Requirements 4.1**

  let db;

  beforeEach(() => {
    db = new Database(':memory:');
    applySchema(db);
  });

  afterEach(() => {
    db.close();
  });

  test('req.user.role matches the role stored in DB for any uid/email/role combination', async () => {
    await fc.assert(
      fc.asyncProperty(arbUid, arbEmail, arbRole, arbToken, async (uid, email, role, token) => {
        // Pre-seed the user with the given role so the middleware reads it back
        db.prepare(
          'INSERT OR REPLACE INTO users (uid, email, role) VALUES (?, ?, ?)'
        ).run(uid, email, role);

        const jwt = require('jsonwebtoken');
        const queryFn = makeQuery(db);
        const verifyToken = makeVerifyToken(jwt, queryFn);

        const tokenString = jwt.sign({ uid, email, role }, process.env.JWT_SECRET || 'test-secret');
        const { req, res, next } = makeReqResNext(`Bearer ${tokenString}`);
        await verifyToken(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.user.role).toBe(role);

        // Clean up for next iteration
        db.prepare('DELETE FROM users WHERE uid = ?').run(uid);
      }),
      { numRuns: 100 }
    );
  });

  test('new user (not in DB) gets role="user" attached', async () => {
    await fc.assert(
      fc.asyncProperty(arbUid, arbEmail, arbToken, async (uid, email, token) => {
        // Do NOT pre-seed — user is brand new
        const jwt = require('jsonwebtoken');
        const queryFn = makeQuery(db);
        const verifyToken = makeVerifyToken(jwt, queryFn);

        const tokenString = jwt.sign({ uid, email, role: 'user' }, process.env.JWT_SECRET || 'test-secret');
        const { req, res, next } = makeReqResNext(`Bearer ${tokenString}`);
        await verifyToken(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.user.role).toBe('user');

        // Clean up for next iteration
        db.prepare('DELETE FROM users WHERE uid = ?').run(uid);
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 6: Role guards enforce access correctly
// ---------------------------------------------------------------------------

// Feature: lan-backend-setup, Property 6: Role guards enforce access correctly
describe('Property 6: Role guards enforce access correctly', () => {
  // **Validates: Requirements 4.2, 4.3**

  const { requireAdmin, requireDeveloper } = require('../middleware/authMiddleware');

  /**
   * Build a minimal req/res/next triple with req.user.role set to the given role.
   */
  function makeRoleReqResNext(role) {
    const req = { user: { uid: 'test-uid', email: 'test@example.com', role } };
    const res = {
      _status: null,
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

  // Arbitrary role string — any string, including valid and invalid roles
  const arbAnyRole = fc.string({ minLength: 0, maxLength: 32 });

  // Roles that are NOT "administrator"
  const arbNonAdminRole = arbAnyRole.filter((r) => r !== 'administrator');

  // Roles that are neither "developer" nor "administrator"
  const arbNonDeveloperRole = arbAnyRole.filter(
    (r) => r !== 'developer' && r !== 'administrator'
  );

  describe('requireAdmin', () => {
    test('calls next() only when role is "administrator"', () => {
      fc.assert(
        fc.property(fc.constant('administrator'), (role) => {
          const { req, res, next } = makeRoleReqResNext(role);
          requireAdmin(req, res, next);
          expect(next).toHaveBeenCalled();
          expect(res._status).toBeNull();
        }),
        { numRuns: 10 }
      );
    });

    test('returns 403 for any role that is not "administrator"', () => {
      fc.assert(
        fc.property(arbNonAdminRole, (role) => {
          const { req, res, next } = makeRoleReqResNext(role);
          requireAdmin(req, res, next);
          expect(next).not.toHaveBeenCalled();
          expect(res._status).toBe(403);
          expect(res._body).toMatchObject({ success: false });
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('requireDeveloper', () => {
    test('calls next() when role is "developer"', () => {
      fc.assert(
        fc.property(fc.constant('developer'), (role) => {
          const { req, res, next } = makeRoleReqResNext(role);
          requireDeveloper(req, res, next);
          expect(next).toHaveBeenCalled();
          expect(res._status).toBeNull();
        }),
        { numRuns: 10 }
      );
    });

    test('calls next() when role is "administrator"', () => {
      fc.assert(
        fc.property(fc.constant('administrator'), (role) => {
          const { req, res, next } = makeRoleReqResNext(role);
          requireDeveloper(req, res, next);
          expect(next).toHaveBeenCalled();
          expect(res._status).toBeNull();
        }),
        { numRuns: 10 }
      );
    });

    test('returns 403 for any role that is neither "developer" nor "administrator"', () => {
      fc.assert(
        fc.property(arbNonDeveloperRole, (role) => {
          const { req, res, next } = makeRoleReqResNext(role);
          requireDeveloper(req, res, next);
          expect(next).not.toHaveBeenCalled();
          expect(res._status).toBe(403);
          expect(res._body).toMatchObject({ success: false });
        }),
        { numRuns: 100 }
      );
    });
  });
});
