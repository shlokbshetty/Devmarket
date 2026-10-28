# Security Policy (`SECURITY.md`)

The **DevMarket** team takes the security of our application marketplace, developer package uploads, user authentication flows, and native Android runtime seriously. This document outlines supported versions, how to report vulnerabilities responsibly, and the defense-in-depth security controls built into the platform.

---

## 1. Supported Versions

Only the latest minor release series receives active security patches and dependency updates:

| Version | Release Series | Supported | Notes |
| :--- | :--- | :---: | :--- |
| **`1.0.x`** | Current Production (`main`) | ✅ **Yes** | Full-stack React 18 + Capacitor 8 + Express + Dual SQLite/MySQL + RBAC |
| **`0.2.x`** | Hybrid LAN Preview | ⚠️ Security Fixes Only | Upgrade to `1.0.x` strongly recommended |
| **`< 0.2.0`** | Early Prototype | ❌ **No** | Unsupported legacy builds |

---

## 2. Reporting a Vulnerability

> **IMPORTANT**: Please **do not** report security vulnerabilities through public GitHub issues, discussions, or pull requests.

### Disclosure Process
If you discover a potential security vulnerability in DevMarket (such as authentication bypass, privilege escalation between `user`/`developer`/`administrator`, arbitrary file upload bypass, path traversal on `/downloads`, or SQL injection):

1. **Private Report**: Submit a private security advisory via the repository's **GitHub Security Advisories** tab (`Security > Advisories > Report a vulnerability`) or email the maintainers directly at `security@devmarket.local` with the subject line `[SECURITY] DevMarket Vulnerability Report`.
2. **Required Details**:
   - Affected component (`server/controllers/authController.js`, `server/middleware/authMiddleware.js`, `appController.js`, Capacitor Android manifest, etc.).
   - Step-by-step proof-of-concept (`curl` command, payload, or test script) demonstrating the issue.
   - Impact assessment (what an attacker can read, modify, or execute).
   - Suggested remediation or patch, if available.

### Response Timeline & SLA

| Stage | Target SLA | Action Taken |
| :--- | :--- | :--- |
| **Initial Acknowledgment** | **Within 24 hours** | Confirmation of receipt and assignment to a security maintainer |
| **Triage & Reproduction** | **Within 72 hours** | Validation of severity, scope, and affected versions |
| **Patch Development & Verification** | **Within 7 days** (Critical/High) | Fix implemented with regression tests in `server/__tests__/` |
| **Coordinated Disclosure** | **Upon patch release** | Release notes published in `CHANGELOG.md` with reporter credit |

---

## 3. DevMarket Security Architecture & Controls

### 3.1 Dual-Tier Authentication & Firebase ID Token Verification
- **Cryptographic Firebase Verification (`server/config/firebase.js`, `authController.js`)**: In production, Google OAuth ID tokens sent to `POST /api/auth/firebase` are verified using the official Firebase Admin SDK (`admin.auth().verifyIdToken(idToken)`) initialized with a restricted service account certificate (`FIREBASE_SERVICE_ACCOUNT_PATH`).
- **Signed Stateless Backend JWTs (`server/middleware/authMiddleware.js`)**: Upon authentication, the server issues a 7-day HMAC-SHA256 JWT signed with `process.env.JWT_SECRET` containing `{ uid, email, role }`. Every protected route invokes `verifyToken`, which validates signature integrity and expiration via `jwt.verify(token, process.env.JWT_SECRET)` before attaching `req.user`.
- **Mock Token Isolation**: Development mock tokens (`mock-token-*`) are intended strictly for local development and automated test suites (`VITE_FIREBASE_API_KEY=mock-key`). In production deployments, configure a real Firebase Web API key and restrict `DEMO_ADMIN_EMAIL` to a verified administrator account.

### 3.2 Role-Based Access Control (RBAC) Guards
Authorization is enforced server-side in [`server/middleware/authMiddleware.js`](server/middleware/authMiddleware.js) and verified via property-based testing ([`server/__tests__/auth.middleware.test.js`](server/__tests__/auth.middleware.test.js) and [`server/__tests__/role.promote.test.js`](server/__tests__/role.promote.test.js)):
- **`verifyToken`**: Rejects missing, malformed, or expired `Authorization: Bearer <token>` headers with `401 Unauthorized`.
- **`requireDeveloper`**: Guards `POST /api/apps/upload`. Only permits `req.user.role === 'developer'` or `'administrator'`; standard `'user'` tokens receive `403 Forbidden`.
- **`requireAdmin`**: Guards all `/api/admin/*` endpoints (`GET /api/admin/apps/pending`, `PUT /api/admin/apps/:id/approve`, `PUT /api/admin/apps/:id/reject`, `GET /api/admin/users`, `PUT /api/admin/users/:uid/promote`). Any non-administrator caller receives `403 Forbidden`.

### 3.3 Binary APK Upload Validation & Moderation Isolation
In [`server/controllers/appController.js`](server/controllers/appController.js):
- **MIME & Extension Filtering**: Multer's `fileFilter` strictly validates that uploaded files have either `file.mimetype === 'application/vnd.android.package-archive'` or a `.apk` filename extension (`file.originalname.endsWith('.apk')`). Non-APK files are rejected with `400 Bad Request` (`INVALID_FILE_TYPE`) before hitting the database.
- **File Size Ceiling**: Multer enforces `limits: { fileSize: 200 * 1024 * 1024 }` (200 MB). Oversized payloads are terminated immediately with `413 Payload Too Large` (`LIMIT_FILE_SIZE`).
- **Timestamped Storage & Attachment Headers**: Uploaded files are renamed to `${Date.now()}-${file.originalname}` inside `uploads/apk/` and served via `express.static('uploads/apk/')` with `Content-Disposition: attachment` and `fallthrough: false`, preventing browser inline script execution (stored XSS) and directory traversal.
- **Pre-Publication Quarantine (`status = 'pending'`)**: Newly uploaded packages are stored with `status = 'pending'` and excluded from all public discovery endpoints (`GET /api/apps`, `GET /api/apps/search`, `GET /api/apps/:id`) until an administrator explicitly approves them.

### 3.4 SQL Injection Prevention via Parameterized Queries
All SQL operations in [`server/config/db.js`](server/config/db.js), [`server/config/initDb.js`](server/config/initDb.js), [`authController.js`](server/controllers/authController.js), [`appController.js`](server/controllers/appController.js), and [`adminController.js`](server/controllers/adminController.js) use parameterized `?` placeholders bound via `better-sqlite3` prepared statements (`db.prepare(sql).all(params)` / `.run(params)`) or `mysql2/promise` prepared execution (`pool.execute(sql, params)`). User-supplied search queries (`GET /api/apps/search?q=...`), path parameters (`:id`, `:uid`), and request bodies are never concatenated into raw SQL strings.

### 3.5 Production Hardening Checklist
Before deploying DevMarket to a public or enterprise network:
1. Generate a high-entropy `JWT_SECRET` (at least 256 bits / 64 hex characters):
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Set strong, unique values for `ADMIN_PASSWORD` and `DEVELOPER_PASSWORD` in `.env`.
3. Never commit `.env` or `firebase-service-account.json` to version control (verified by `.gitignore`).
4. Set `CORS_ORIGIN` to your explicit production domain(s) rather than `*`.
5. Ensure `client/capacitor.config.json` has `"webContentsDebuggingEnabled": false` for production APK builds (`npm run android:prod`).
