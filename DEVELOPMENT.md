# DevMarket Developer Guide (`DEVELOPMENT.md`)

This guide walks contributors and maintainers through setting up a local development environment, configuring Firebase Admin and mock authentication fallbacks, managing the SQLite/MySQL persistence layer, running the backend Jest and frontend Vitest test suites, and building/debugging the native Capacitor Android application.

---

## 1. Local Developer Environment Setup

### 1.1 System Requirements

| Tool | Supported Versions | Purpose |
| :--- | :--- | :--- |
| **Node.js** | `v18.x`, `v20.x`, `v22.x`, `v24.x` | JavaScript runtime for Express server, Vite bundler, and build scripts |
| **npm** | `v9.x` or newer | Dependency management for root and `client/` workspaces |
| **C++ Build Tools** *(if needed)* | Prebuilt binaries included | Required only if `better-sqlite3` needs to compile from source on non-standard architectures |
| **JDK 17 + Android Studio** | Ladybug / Koala+ (`AGP 8.9.1`) | Compiling and debugging the native Android project (`client/android/`) |
| **Android SDK** | `compileSdk 36`, `targetSdk 35`, `minSdk 23` | Android platform tools and `adb` bridge |

### 1.2 Automated Bootstrap (`setup.js`)

Run the automated setup script from the repository root:

```bash
npm run setup
```

Executing [`setup.js`](setup.js) performs three idempotent steps:
1. **Generates `.env`**: If `.env` does not exist, writes a zero-configuration `.env` file pre-configured with `DB_TYPE=sqlite`, `PORT=3000`, `DEMO_ADMIN_EMAIL=admin@devmarket.lan`, `VITE_FIREBASE_API_KEY=mock-key`, and `CORS_ORIGIN=*`.
2. **Creates Binary Upload Storage**: Ensures `uploads/apk/` exists recursively on disk.
3. **Installs Workspace Dependencies**: Runs `npm install` in the root workspace and `cd client && npm install` in the frontend workspace.

### 1.3 Running the Development Servers

To launch both the backend Express server (`nodemon`) and the frontend Vite dev server (`vite`) in a single terminal:

```bash
npm run dev
```

Or run them in separate terminals for isolated log inspection:

```bash
# Terminal 1 — Express API Server (http://0.0.0.0:3000)
npm run dev:server

# Terminal 2 — Vite React Frontend (http://localhost:5173)
npm run dev:client
```

In local web development, [`client/vite.config.js`](client/vite.config.js) proxies `/api` requests from `http://localhost:5173/api` directly to `http://localhost:3000/api`.

---

## 2. Firebase Admin Service Account & Mock Auth Fallbacks

DevMarket supports two authentication modes so developers can work completely offline or test full production Google OAuth 2.0 flows.

### 2.1 Mode A: Offline Mock Authentication (`mock-key` Fallback)

For rapid local development and automated testing without external Google Cloud dependencies:

1. In `client/.env` (or root `.env`), set:
   ```env
   VITE_FIREBASE_API_KEY=mock-key
   ```
2. On the frontend login page ([`client/src/pages/Login.jsx`](client/src/pages/Login.jsx)), `AuthContext.jsx` detects `VITE_FIREBASE_API_KEY === 'mock-key'` and presents a **1-Tap Test Account Selector** instead of launching a Google OAuth popup.
3. Selecting an account sends `idToken: "mock-token-<email>"` to `POST /api/auth/firebase`.
4. In [`server/controllers/authController.js`](server/controllers/authController.js), `firebaseAuth` intercepts tokens prefixed with `mock-token-`, extracts the email and synthetic UID (`mock-uid-<prefix>`), upserts the user in SQLite/MySQL, applies role rules, and returns a real signed Backend JWT.

### 2.2 Mode B: Production Firebase Google OAuth & Service Account Setup

To enable real Google Sign-In across Web and Android:

1. **Create a Firebase Project** in the [Firebase Console](https://console.firebase.google.com/) and enable **Authentication > Sign-in method > Google**.
2. **Generate a Service Account Private Key**:
   - Navigate to **Project Settings > Service accounts > Generate new private key**.
   - Save the downloaded JSON file as `firebase-service-account.json` in the repository root (or specify its path in `.env` via `FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json`).
   - [`server/config/firebase.js`](server/config/firebase.js) loads this file at server startup via `admin.credential.cert(serviceAccount)`. If `FIREBASE_SERVICE_ACCOUNT_PATH` is missing or unreadable, the server logs an error and exits with code `1`.
3. **Configure Frontend Web Credentials** in `client/.env`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   VITE_API_BASE_URL=/api
   ```
4. **Configure Direct Role Credentials** in root `.env` for the Admin and Developer login tabs (`POST /api/auth/credentials`):
   ```env
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   DEVELOPER_USERNAME=developer
   DEVELOPER_PASSWORD=dev123
   ```

---

## 3. Database Initialization, Migrations & Seeding

### 3.1 SQLite vs. MySQL Selection (`server/config/db.js`)

The database adapter inspects `process.env.DB_TYPE`:
- **`DB_TYPE=sqlite` (Recommended for Local Dev)**: Uses `better-sqlite3` to open `./devmarket.sqlite` (configurable via `DB_PATH`). Zero external daemon required.
- **`DB_TYPE=mysql`**: Uses `mysql2/promise` to create a 10-connection pool against `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`. At startup, `pool.getConnection()` verifies connectivity and exits with code `1` if unreachable.

### 3.2 Automatic Schema Initialization & Non-Destructive Migrations (`server/config/initDb.js`)

Every time `server/index.js` starts, `initDb()` executes:
1. `CREATE TABLE IF NOT EXISTS users (...)`
2. `CREATE TABLE IF NOT EXISTS apps (...)`
3. `migrateAppsTable()`: Inspects existing columns (`PRAGMA table_info(apps)` in SQLite or `ALTER TABLE apps ADD COLUMN IF NOT EXISTS` in MySQL) and automatically adds `description`, `category`, `version`, `screenshots`, and `average_rating` if upgrading from an older schema.

### 3.3 Demo Data Seeding (`seedDemoData()`)

Immediately after `initDb()`, `seedDemoData()` populates initial fixtures if `DEMO_ADMIN_EMAIL` is set in `.env`:
- **Placeholder APK**: Creates `uploads/apk/demo-app.apk` if missing.
- **Demo Users**:
  - `uid: 'demo-admin'`, `email: process.env.DEMO_ADMIN_EMAIL`, `role: 'administrator'`
  - `uid: 'demo-developer'`, `email: 'developer@devmarket.lan'`, `role: 'developer'`
- **Seeded Approved Apps**:
  1. **SynthCode Pro** (`Productivity`, Rating `4.9`)
  2. **Void Runner** (`Games`, Rating `4.6`)
  3. **GuardRail AI** (`Security`, Rating `4.8`)
  4. **Prism Design** (`Creative Tools`, Rating `4.7`)

To wipe the local SQLite database and uploaded APKs and re-seed from scratch:

```bash
npm run reset
```

---

## 4. Automated Testing Suites

DevMarket uses **Jest + Supertest + Fast-Check** for backend verification and **Vitest + React Testing Library + JSDOM** for frontend verification.

### 4.1 Backend Test Suite (`npm test`)

Run all backend tests from the root directory:

```bash
npm test
```

Run a single backend test file:

```bash
npx jest server/__tests__/upload.validation.test.js --setupFiles dotenv/config
```

#### Breakdown of Backend Test Suites (`server/__tests__/`)

| Test File | Test Strategy | Verified Invariants & Endpoints |
| :--- | :--- | :--- |
| [`smoke.test.js`](server/__tests__/smoke.test.js) | Supertest + In-Memory SQLite | End-to-end smoke checks: CORS headers, `OPTIONS` 204 preflight, `/downloads/:filename` attachment headers, SPA fallback |
| [`auth.middleware.test.js`](server/__tests__/auth.middleware.test.js) | `fast-check` Property Tests | `verifyToken` extracts exact `{ uid, email, role }`; missing/tampered/expired tokens always yield `401 Unauthorized` |
| [`user.upsert.test.js`](server/__tests__/user.upsert.test.js) | `fast-check` Property Tests | `POST /api/auth/firebase` idempotent user upsert, `DEMO_ADMIN_EMAIL` elevation to `administrator`, role preservation across logins |
| [`role.promote.test.js`](server/__tests__/role.promote.test.js) | Supertest + Property Tests | `GET /api/admin/users` and `PUT /api/admin/users/:uid/promote` RBAC enforcement (`403` for non-admin, `404` for unknown UID) |
| [`upload.validation.test.js`](server/__tests__/upload.validation.test.js) | Supertest + Multer + `memfs` | `POST /api/apps/upload` rejects non-APK extensions/MIMEs (`400`), enforces 200 MB limit (`413`), and inserts `status = 'pending'` (`201`) |
| [`app.approval.test.js`](server/__tests__/app.approval.test.js) | Supertest + In-Memory SQLite | Moderation state transitions (`pending` -> `approved` / `rejected`) and visibility filtering on `GET /api/apps` & `GET /api/apps/:id` |
| [`download.test.js`](server/__tests__/download.test.js) | Supertest Static Streaming | `GET /downloads/:filename` returns `200` with `Content-Disposition: attachment` for existing APKs and `404` for missing files |
| [`client.api.test.js`](server/__tests__/client.api.test.js) | Unit / Integration | Verifies API client contract, Bearer header injection, and error propagation |

### 4.2 Frontend Test Suite (`npm run test:client`)

Run all frontend tests from the root directory:

```bash
npm run test:client
```

Or run interactive watch/UI modes from `client/`:

```bash
cd client
npm run test:watch
npm run test:ui
```

#### Breakdown of Frontend Test Suites (`client/src/test/`)

- [`bug-condition-exploration.test.jsx`](client/src/test/bug-condition-exploration.test.jsx): Explores edge-case UI and authentication state transitions under mobile and web viewports.
- [`preservation-property.test.jsx`](client/src/test/preservation-property.test.jsx): Property-based assertions (`fast-check`) ensuring authentication state and UI layout invariants hold across re-renders.
- [`simple.test.js`](client/src/test/simple.test.js): Baseline Vitest + JSDOM runner sanity check.

---

## 5. Capacitor Android Live-Reload & Native Development

### 5.1 Development Mode vs. Production Mode

DevMarket maintains two Capacitor configuration files inside `client/`:

1. **`client/capacitor.config.json` (Production Standalone)**:
   - Packages the compiled `client/dist` directory directly inside the APK (`android/app/src/main/assets/public`).
   - `webContentsDebuggingEnabled: false`.
2. **`client/capacitor.config.dev.json` (Live LAN Development)**:
   - Configures `"server": { "url": "http://192.168.0.103:3000", "cleartext": true }`.
   - Enables Chrome DevTools remote WebView inspection (`webContentsDebuggingEnabled: true`).

### 5.2 Building & Syncing the Development APK

1. Determine your computer's LAN IPv4 address (`ipconfig` on Windows, `ifconfig` / `ip addr` on macOS/Linux).
2. Update `LAN_IP` in `.env`, `VITE_API_BASE_URL` in `client/.env`, and `server.url` in `client/capacitor.config.dev.json` to match your LAN IP and port.
3. Run the development Android sync script from the root directory:
   ```bash
   npm run android:dev
   npm run android:open
   ```
4. In Android Studio, select your connected physical Android device or emulator and click **Run ('app')**.

### 5.3 Restoring Production Standalone APK Config

Before committing changes or building a standalone distributable APK, restore the production Capacitor config:

```bash
npm run android:prod
```

This runs `git checkout capacitor.config.json`, compiles `npm run build`, and copies the static bundle into the Android project via `npx cap copy android`.

---

## 6. Debugging Guide

### 6.1 Inspecting the Android WebView via Chrome DevTools
When running an APK built with `npm run android:dev` (`webContentsDebuggingEnabled: true`):
1. Connect your Android device via USB with **USB Debugging** enabled (or launch an Android Emulator).
2. Open desktop Google Chrome and navigate to `chrome://inspect/#devices`.
3. Locate **DevMarket (`com.devmarket.app`)** and click **inspect** to access full Console logs (`🔄 API Request`, `📡 Response status`), Network requests, and `localStorage` (`devmarket_auth`).

### 6.2 Debugging Android Emulator Loopback Networking
If you are testing inside the **Android Studio Emulator** rather than a physical phone on Wi-Fi:
- `localhost` or `127.0.0.1` inside the emulator refers to the emulated phone itself, **not** your host machine.
- Use Android's special host loopback alias `10.0.2.2` (e.g., `VITE_API_BASE_URL=http://10.0.2.2:3000/api` and `LAN_IP=10.0.2.2`), or use your host's LAN IP (`192.168.x.x`).

### 6.3 Inspecting SQLite State Directly
When `DB_TYPE=sqlite`, you can inspect or query `./devmarket.sqlite` using the Node REPL and `better-sqlite3`:

```bash
node -e "const db = require('better-sqlite3')('./devmarket.sqlite'); console.table(db.prepare('SELECT uid, email, role FROM users').all()); console.table(db.prepare('SELECT id, name, status, filename FROM apps').all());"
```
