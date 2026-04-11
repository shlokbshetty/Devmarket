# Implementation Plan: LAN Backend Setup

## Overview

Migrate the existing Express server from MongoDB/JWT to a LAN-bound MySQL/SQLite + Firebase Auth architecture. All server files are refactored in-place; the React client is updated for Firebase Sign-In and a configurable API base URL. The full fast-check PBT suite (Properties 1–17) is included as optional sub-tasks.

## Tasks

- [x] 1. Update environment configuration
  - Replace `.env.example` with the new variable set: `PORT`, `LAN_IP`, `FIREBASE_SERVICE_ACCOUNT_PATH`, `DB_TYPE`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PATH`, `CORS_ORIGIN`, `VITE_API_BASE_URL`
  - Remove `MONGO_URI` and `JWT_SECRET` entries
  - _Requirements: 1.1, 1.3, 2.5, 3.2, 3.5_

- [x] 2. Implement the database adapter (`server/config/db.js`)
  - [x] 2.1 Rewrite `server/config/db.js` to export a unified `query(sql, params)` function
    - Install `mysql2` and `better-sqlite3` as dependencies (`npm install mysql2 better-sqlite3`)
    - When `DB_TYPE=mysql` (default): create a `mysql2` connection pool using `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`; export `query` as `pool.execute(sql, params)`
    - When `DB_TYPE=sqlite`: open the file at `DB_PATH` (default `./devmarket.sqlite`) using `better-sqlite3`; wrap the synchronous API in a Promise so callers use the same `await query(...)` interface
    - On MySQL connection failure at startup, log the error and call `process.exit(1)`
    - _Requirements: 3.2, 3.5_

  - [x] 2.2 Create DB schema initialisation helper (`server/config/initDb.js`)
    - Write `CREATE TABLE IF NOT EXISTS users (...)` and `CREATE TABLE IF NOT EXISTS apps (...)` statements matching the design's SQL schemas
    - For SQLite, replace `ENUM` with `TEXT CHECK(...)` and `AUTO_INCREMENT` with `INTEGER PRIMARY KEY AUTOINCREMENT`
    - Export an `initDb()` async function that runs both statements via `query()`; call it from `server/index.js` at startup
    - _Requirements: 3.1, 3.5_

  - [x] 2.3 Write property test for user upsert idempotency
    - **Property 4: User upsert is correct and idempotent**
    - **Validates: Requirements 3.3, 3.4**
    - File: `server/__tests__/user.upsert.test.js`
    - Use an in-memory SQLite (`:memory:`) instance; apply the schema before each test
    - Generate arbitrary `uid` (alphanumeric string) and `email` (string) pairs with fast-check
    - Assert: first upsert creates a row with `role = "user"` and correct `email`; second upsert with the same `uid` leaves `role` unchanged

- [x] 3. Implement Firebase Admin initialiser (`server/config/firebase.js`)
  - Create `server/config/firebase.js`: import `firebase-admin`, call `admin.initializeApp({ credential: admin.credential.cert(require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)) })`
  - Install `firebase-admin` as a dependency (`npm install firebase-admin`)
  - If `FIREBASE_SERVICE_ACCOUNT_PATH` is missing or the file is unreadable, log the error and call `process.exit(1)`
  - Export the `admin` instance as the default export
  - _Requirements: 2.5_

- [x] 4. Implement auth middleware (`server/middleware/authMiddleware.js`)
  - [x] 4.1 Rewrite `server/middleware/authMiddleware.js` with three named exports: `verifyToken`, `requireAdmin`, `requireDeveloper`
    - `verifyToken`: extract the Bearer token from `Authorization` header; call `admin.auth().verifyIdToken(token)`; on success, upsert the user in Local_DB (insert with `role="user"` if new, read existing role if present); attach `req.user = { uid, email, role }` and call `next()`
    - Missing/invalid token → `401 { success: false, message: "Unauthorized" }`
    - Expired token (Firebase error code `auth/id-token-expired`) → `401 { success: false, message: "Token expired" }`
    - `requireAdmin`: if `req.user.role !== "admin"` → `403 { success: false, message: "Forbidden" }`; else `next()`
    - `requireDeveloper`: if `req.user.role !== "developer"` and `req.user.role !== "admin"` → `403 { success: false, message: "Forbidden" }`; else `next()`
    - _Requirements: 2.2, 2.3, 2.4, 3.3, 3.4, 4.1, 4.2, 4.3_

  - [x] 4.2 Write property tests for token verification and role attachment
    - **Property 2: Token verification extracts correct identity**
    - **Property 3: Invalid or missing tokens always produce 401**
    - **Property 5: Role is correctly attached to every verified request**
    - **Validates: Requirements 2.2, 2.3, 2.4, 4.1**
    - File: `server/__tests__/auth.middleware.test.js`
    - Mock `firebase-admin` via `jest.mock()` so `verifyIdToken` returns a controlled `{ uid, email }` payload
    - Use in-memory SQLite for the DB; generate arbitrary uid/email/role combinations with fast-check

  - [x] 4.3 Write property tests for role guard middleware
    - **Property 6: Role guards enforce access correctly**
    - **Validates: Requirements 4.2, 4.3**
    - File: `server/__tests__/auth.middleware.test.js` (same file, additional `describe` block)
    - Generate arbitrary role strings with fast-check; assert `requireAdmin` calls `next()` only for `"admin"` and returns 403 for all others; assert `requireDeveloper` calls `next()` for `"developer"` and `"admin"` and returns 403 for all others

- [x] 5. Implement auth controller (`server/controllers/authController.js`)
  - Rewrite `server/controllers/authController.js` to export a single `getMe` handler for `GET /api/auth/me`
  - Query Local_DB for the user row by `req.user.uid`; return `{ success: true, user: { uid, email, role } }`
  - Remove all login/register/password endpoints — Firebase handles identity
  - _Requirements: 2.1, 2.2_

- [x] 6. Implement admin controller (`server/controllers/adminController.js`)
  - [x] 6.1 Rewrite `server/controllers/adminController.js` with four handlers
    - `getPendingApps`: query `apps` where `status = "pending"`; return array
    - `approveApp`: update `apps` set `status = "approved"` where `id = :id`; return 404 if no row affected
    - `rejectApp`: update `apps` set `status = "rejected"` where `id = :id`; return 404 if no row affected
    - `promoteUser`: update `users` set `role = "developer"` where `uid = :uid`; return 404 if no row affected
    - All handlers return `{ success: true }` on success and `{ success: false, message: "..." }` on error
    - _Requirements: 4.4, 4.5, 7.1, 7.2, 7.3, 7.5_

  - [x] 6.2 Write property tests for promote endpoint
    - **Property 7: Promote sets role to developer for any existing user**
    - **Property 8: Promote returns 404 for any non-existent user**
    - **Validates: Requirements 4.4, 4.5**
    - File: `server/__tests__/role.promote.test.js`
    - Use in-memory SQLite; generate arbitrary uid/role pairs; assert post-promote role is always `"developer"`; assert 404 for unknown uids

  - [x] 6.3 Write property tests for app approval/rejection
    - **Property 14: App status update is applied correctly**
    - **Property 16: Approval/rejection of non-existent app returns 404**
    - **Validates: Requirements 7.2, 7.3, 7.5**
    - File: `server/__tests__/app.approval.test.js`
    - Use in-memory SQLite; generate apps with arbitrary starting statuses; assert approve sets `"approved"`, reject sets `"rejected"`, and unknown ids return 404

- [x] 7. Implement app controller (`server/controllers/appController.js`)
  - [x] 7.1 Rewrite `server/controllers/appController.js` with Multer configuration and three handlers
    - Configure `multer.diskStorage` with `destination: "uploads/apk/"` and filename `${Date.now()}-${file.originalname}`
    - Set `limits: { fileSize: 200 * 1024 * 1024 }` and `fileFilter` that accepts only `application/vnd.android.package-archive` MIME type or `.apk` extension
    - `uploadApp` (`POST /api/apps/upload`): run multer; on success insert DB record with `status="pending"`, `developer_uid`, `name`, `filename`; return `{ success: true, app: { id, name, filename, status } }`
    - Handle multer errors: `LIMIT_FILE_SIZE` → 413 `{ success: false, message: "File too large" }`; fileFilter rejection → 400 `{ success: false, message: "Only APK files are allowed" }`; missing file → 400 `{ success: false, message: "No file uploaded" }`
    - `getApps` (`GET /api/apps`): query approved apps; append `downloadUrl = "http://${process.env.LAN_IP}:3000/downloads/${filename}"` to each record
    - `getApp` (`GET /api/apps/:id`): same as above for a single record; 404 if not found
    - Install `multer` as a dependency (`npm install multer`)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 6.3, 6.4, 7.4_

  - [x] 7.2 Write property tests for upload validation
    - **Property 9: Files exceeding 200 MB are rejected with 413**
    - **Property 10: Non-APK files are rejected with 400**
    - **Property 11: Valid APK upload produces a unique filename and DB record**
    - **Validates: Requirements 5.3, 5.4, 5.5, 5.6**
    - File: `server/__tests__/upload.validation.test.js`
    - Use `memfs` or a temp directory for filesystem isolation; use in-memory SQLite for DB
    - Generate arbitrary file sizes, MIME types, and original filenames with fast-check

  - [x] 7.3 Write property test for app listing filter
    - **Property 15: App listing returns only approved apps**
    - **Validates: Requirements 7.4**
    - File: `server/__tests__/app.approval.test.js` (additional `describe` block)
    - Generate collections of apps with arbitrary status distributions; assert `GET /api/apps` response contains only `"approved"` records

- [x] 8. Update route files to use new middleware and controllers
  - Rewrite `server/routes/auth.js`: mount `GET /me` → `verifyToken`, `getMe`
  - Rewrite `server/routes/app.js`: mount `POST /upload` → `verifyToken`, `requireDeveloper`, `uploadApp`; mount `GET /` → `verifyToken`, `getApps`; mount `GET /:id` → `verifyToken`, `getApp`
  - Rewrite `server/routes/admin.js`: mount all four admin routes behind `verifyToken`, `requireAdmin`
  - Remove `server/routes/review.js` import from index (review routes are out of scope for this migration)
  - _Requirements: 4.2, 4.3, 5.1, 7.1_

- [x] 9. Rewrite server entry point (`server/index.js`)
  - [x] 9.1 Rewrite `server/index.js` to bind to `0.0.0.0:3000`
    - Remove `mongoose` / `connectDB` import; call `initDb()` at startup instead
    - Import `firebase.js` to trigger Firebase Admin initialisation at startup
    - Configure CORS: use `CORS_ORIGIN` env var if set, otherwise `origin: "*"`; allow headers `Authorization`, `Content-Type`, `X-Requested-With`; respond to `OPTIONS` with 204
    - Mount `/downloads` as `express.static("uploads/apk/", { setHeaders: (res) => res.setHeader("Content-Disposition", "attachment") })`
    - Mount all route files; keep SPA fallback serving `client/dist/index.html`
    - On startup, log `Server running at http://${process.env.LAN_IP || "0.0.0.0"}:${PORT}`
    - _Requirements: 1.1, 1.2, 6.1, 6.2, 8.1, 8.2, 8.3, 8.4_

  - [x] 9.2 Write smoke and integration tests
    - File: `server/__tests__/smoke.test.js`
    - Verify CORS headers are present on API responses (example test)
    - Verify `OPTIONS` preflight returns 204 (example test)
    - Verify Firebase Admin SDK initialises without throwing when given a valid mock service account (example test)
    - Verify DB schema tables exist after `initDb()` (example test)
    - Verify SPA fallback serves `client/dist/index.html` for unknown routes (example test)

- [x] 10. Checkpoint — server-side tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Update client API base URL (`client/src/api/client.js`)
  - Change `const API_BASE = '/api'` to `const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'`
  - No other changes to the request helpers are needed
  - _Requirements: 1.3, 1.4_

  - [x] 11.1 Write property test for Authorization header
    - **Property 1: Authorization header is always sent**
    - **Validates: Requirements 2.1**
    - File: `server/__tests__/client.api.test.js`
    - Mock `fetch`; generate arbitrary valid token strings with fast-check; assert every request made by `apiGet`/`apiPost`/`apiPut`/`apiDelete`/`apiUpload` includes `Authorization: Bearer {token}` with the exact token value

- [x] 12. Migrate `client/src/context/AuthContext.jsx` to Firebase Sign-In
  - Install Firebase client SDK (`npm install firebase` inside `client/`)
  - Create `client/src/config/firebase.js` with `initializeApp` using `VITE_FIREBASE_*` env vars; export `auth` and `googleProvider`
  - Rewrite `AuthContext.jsx`:
    - Replace `login(userData)` / `logout()` with `signInWithPopup(auth, googleProvider)` and `signOut(auth)`
    - Use `onAuthStateChanged` to track the current Firebase user
    - On auth state change, call `auth.currentUser.getIdToken()` to obtain the ID Token; store it in state (not localStorage — Firebase SDK manages persistence)
    - Expose `{ user, token, login, logout, isAuthenticated, isAdmin, loading }` with the same shape so existing consumers require no changes
  - _Requirements: 2.1_

- [x] 13. Write download property tests
  - [x] 13.1 Write property test for download URL construction
    - **Property 12: Download URL is correctly constructed for any app record**
    - **Validates: Requirements 6.3, 6.4**
    - File: `server/__tests__/download.test.js`
    - Generate arbitrary `filename` strings and `LAN_IP` values with fast-check; assert `downloadUrl === "http://${LAN_IP}:3000/downloads/${filename}"`

  - [x] 13.2 Write property test for missing file 404
    - **Property 13: Missing files return 404**
    - **Validates: Requirements 6.5**
    - File: `server/__tests__/download.test.js`
    - Generate arbitrary filenames not present in the temp uploads directory; assert `GET /downloads/{filename}` returns 404

  - [x] 13.3 Write property test for Content-Disposition header
    - **Property 17: Content-Disposition header is present for any valid download**
    - **Validates: Requirements 6.2**
    - File: `server/__tests__/download.test.js`
    - Generate arbitrary filenames that exist in the temp uploads directory; assert response includes `Content-Disposition: attachment`

- [x] 14. Set up test infrastructure
  - Install test dependencies: `npm install --save-dev jest fast-check supertest memfs` (inside `server/`)
  - Add `"test": "jest --runInBand"` script to `server/package.json` (or root `package.json` if tests run from root)
  - Create `server/jest.config.js` with `testEnvironment: "node"` and `testMatch: ["**/__tests__/**/*.test.js"]`
  - Create `server/__tests__/` directory
  - _Requirements: (test infrastructure for all PBT tasks)_

- [x] 15. Final checkpoint — all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- All property tests use fast-check with a minimum of 100 iterations per property
- The in-memory SQLite (`:memory:`) instance is used for all DB-touching tests — no MySQL required in CI
- Firebase Admin SDK is mocked in all unit/property tests via `jest.mock()`
- The `client/src/context/AuthContext.jsx` migration (task 12) preserves the existing context shape so no page-level consumers need updating
