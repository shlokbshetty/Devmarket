# Support & Troubleshooting Guide (`SUPPORT.md`)

Need help setting up, building, or troubleshooting **DevMarket**? This document lists our support channels, issue tracker conventions, and solutions to the most common development and mobile deployment questions.

---

## 1. Support Channels & Resources

| Resource | Location | Best Used For |
| :--- | :--- | :--- |
| **System Architecture Docs** | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Understanding system tiers, database schemas, and auth/upload flows |
| **REST API Reference** | [`docs/API.md`](docs/API.md) | Endpoint paths, `curl` examples, request/response schemas, status codes |
| **Developer Guide** | [`DEVELOPMENT.md`](DEVELOPMENT.md) | Local setup, SQLite/MySQL configuration, Jest/Vitest testing, Android builds |
| **Android Build Guide** | [`client/ANDROID_BUILD_GUIDE.md`](client/ANDROID_BUILD_GUIDE.md) | Gradle SDK versions, Capacitor sync commands, Android Studio APK generation |
| **Bug Reports** | [`.github/ISSUE_TEMPLATE/bug_report.md`](.github/ISSUE_TEMPLATE/bug_report.md) | Reporting reproducible defects in the Web UI, Express API, or Android APK |
| **Feature Requests** | [`.github/ISSUE_TEMPLATE/feature_request.md`](.github/ISSUE_TEMPLATE/feature_request.md) | Proposing new marketplace capabilities or native mobile integrations |

---

## 2. Issue Tracker Labels

When opening an issue on GitHub, apply the relevant labels to help maintainers route your request quickly:

| Label | Scope / Meaning |
| :--- | :--- |
| `bug` | Confirmed defect or regression in existing functionality |
| `enhancement` | New feature request or UX improvement |
| `area:client` | React 18 frontend, Vite bundler, Tailwind CSS v4, or `AuthContext` |
| `area:server` | Express API routes, controllers, Multer uploads, or JWT middleware |
| `area:database` | SQLite (`better-sqlite3`), MySQL (`mysql2`), Mongoose schemas, or `initDb.js` |
| `area:android` | Capacitor 8 Android runtime, Gradle build, `nativeBridge.js`, or OAuth intents |
| `documentation` | Improvements to Markdown guides, API contracts, or architecture diagrams |

---

## 3. Frequently Asked Questions (FAQ) & Troubleshooting

### Q1: Server exits immediately at startup with `Error: FIREBASE_SERVICE_ACCOUNT_PATH environment variable is not set` or `Could not load Firebase service account file`
**Cause**: [`server/config/firebase.js`](server/config/firebase.js) requires `FIREBASE_SERVICE_ACCOUNT_PATH` to point to a valid Firebase Admin service account JSON file at startup.
**Solution**:
1. Verify `FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json` is set in your root `.env` file.
2. Ensure `firebase-service-account.json` exists in the repository root and contains valid JSON with `project_id`, `private_key`, and `client_email` fields.
3. For local offline development where you only use `VITE_FIREBASE_API_KEY=mock-key` or credential login (`POST /api/auth/credentials`), `admin.auth().verifyIdToken()` is bypassed at runtime, so a placeholder service account JSON file in the root is sufficient to satisfy startup initialization.

---

### Q2: How do I log in on a mobile device or browser without setting up Google Cloud OAuth?
**Cause**: Google OAuth popups require authorized domains and valid Firebase API keys, and `window.prompt()` does not work reliably inside mobile WebViews.
**Solution**:
1. Set `VITE_FIREBASE_API_KEY=mock-key` in `client/.env` (and rebuild if testing on Android).
2. On the `/login` screen, DevMarket automatically displays a **1-Tap Test Account Selector** (`Admin Account`, `Developer Account`, `Regular User`).
3. Alternatively, switch to the **Developer** or **Admin** tab on `/login` and sign in with username/password credentials (`developer` / `dev123` or `admin` / `admin123`), which authenticates directly against `POST /api/auth/credentials` without touching Firebase.

---

### Q3: APK Upload fails with `413 Payload Too Large` or `400 Only APK files are allowed`
**Cause**: [`server/controllers/appController.js`](server/controllers/appController.js) enforces strict Multer constraints:
- Maximum file size: **200 MB** (`200 * 1024 * 1024` bytes).
- Allowed file types: `file.mimetype === 'application/vnd.android.package-archive'` OR filename ending in `.apk`.
**Solution**:
- Ensure the file being uploaded has a `.apk` extension and does not exceed 200 MB.
- Ensure you are sending the file under the multipart field name `apk` (`upload.single('apk')`) with a valid Developer or Administrator Bearer token (`Authorization: Bearer <token>`).
- Verify that the `uploads/apk/` directory exists (`npm run setup` creates it automatically).

---

### Q4: SQLite database errors (`SQLITE_BUSY: database is locked` or missing columns)
**Cause**: Another process has an exclusive write lock on `./devmarket.sqlite`, or your `.sqlite` file was created by an older schema version.
**Solution**:
- **Schema Migration**: Restart the server (`npm run dev:server`). `initDb()` in [`server/config/initDb.js`](server/config/initDb.js) automatically runs `migrateAppsTable()` to add any missing columns (`description`, `category`, `version`, `screenshots`, `average_rating`).
- **Database Lock / Clean Reset**: Stop any lingering `node` or `jest` processes, or reset the local database and re-seed demo data:
  ```bash
  npm run reset
  ```

---

### Q5: The Android app in Android Studio Emulator cannot reach the backend (`Network error` / `ERR_CONNECTION_REFUSED`)
**Cause**: Inside an Android Emulator, `localhost` (`127.0.0.1`) refers to the emulated Android device itself, **not** your host computer running `node server/index.js`.
**Solution**:
- **Option A (Android Emulator Special Alias)**: Set `VITE_API_BASE_URL=http://10.0.2.2:3000/api` in `client/.env` and `LAN_IP=10.0.2.2` in root `.env`. The IP `10.0.2.2` is routed by the Android Emulator directly to your host machine's `127.0.0.1`.
- **Option B (Physical Android Phone or Emulator on LAN)**: Find your computer's Wi-Fi IPv4 address (e.g., `192.168.1.50` via `ipconfig` / `ifconfig`) and set:
  ```env
  # Root .env
  PORT=3000
  LAN_IP=192.168.1.50

  # client/.env
  VITE_API_BASE_URL=http://192.168.1.50:3000/api
  ```
  Then rebuild and sync the Android project:
  ```bash
  npm run build
  cd client && npx cap sync android
  ```

---

### Q6: Uploaded apps return `201 Created` but do not appear on the Home Page or `/api/apps`
**Cause**: By design, all newly uploaded apps start with `status = 'pending'` and are hidden from public catalog queries (`WHERE status = 'approved'`).
**Solution**:
1. Log in as an Administrator (`admin@devmarket.lan` or `admin` / `admin123`).
2. Open the **Admin Panel** (`/admin`).
3. Under the **Pending Apps** tab, click **Approve** on the newly submitted application (which triggers `PUT /api/admin/apps/:id/approve`). The app will immediately appear in the public marketplace.
