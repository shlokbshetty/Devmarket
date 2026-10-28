# Changelog

All notable changes to the **DevMarket** project are documented in this file.

The format is based on [Keep a Changelog v1.1.0](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning v2.0.0](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-28

### Added
- **Capacitor 8 Native Android Platform (`client/android/`, `client/src/utils/nativeBridge.js`)**:
  - Full native Android hybrid wrapper (`com.devmarket.app`) targeting Android SDK 36 (`minSdk 23`, `AGP 8.9.1`).
  - Hardware haptic feedback (`hapticLight`, `hapticMedium`, `hapticSuccess`) via `@capacitor/haptics` with Web Vibration API fallback.
  - Dynamic status bar synchronization (`updateStatusBar`) via `@capacitor/status-bar` adapting to dark (`#0e0e0e`) and light (`#ffffff`) themes.
  - Hardware back-button lifecycle listener (`setupBackButtonListener`) via `@capacitor/app` supporting drawer dismissal, history pop, and root exit.
  - Native Google Sign-In integration (`@capawesome/capacitor-google-sign-in`) with app-resume redirect recovery (`appStateChange`) and exponential backoff retry (`AuthContext.jsx`).
- **Dual-Mode Authentication & Role-Based Access Control (`server/controllers/authController.js`, `server/middleware/authMiddleware.js`)**:
  - Added `POST /api/auth/credentials` for direct username/password authentication of `administrator` and `developer` accounts alongside `POST /api/auth/firebase` Google OAuth token exchange.
  - Added 1-tap mobile-friendly test account selector in `Login.jsx` for `VITE_FIREBASE_API_KEY=mock-key` development environments.
  - Added `GET /api/auth/me` profile resolution endpoint.
  - Implemented `verifyToken`, `requireDeveloper`, and `requireAdmin` middleware guards.
- **Complete Marketplace & Moderation Suite (`client/src/pages/`, `server/controllers/`)**:
  - Added `DevDashboard.jsx` and `POST /api/apps/upload` supporting multipart `.apk` uploads up to 200 MB with metadata (`name`, `description`, `category`, `version`).
  - Added `AdminPanel.jsx` and `/api/admin/*` routes (`GET /api/admin/apps/pending`, `PUT /api/admin/apps/:id/approve`, `PUT /api/admin/apps/:id/reject`, `GET /api/admin/users`, `PUT /api/admin/users/:uid/promote`).
  - Added real-time catalog search and category filtering via `GET /api/apps/search?q=&category=` and `SearchPage.jsx`.
  - Added `DownloadsPage.jsx`, `LibraryPage.jsx`, `SharePage.jsx`, `Profile.jsx`, `Settings.jsx`, `Security.jsx`, `Notifications.jsx`, and `Privacy.jsx`.
  - Added `POST /api/reviews` (`reviewController.js`, `server/models/Review.js`) for 1-5 star user ratings and automatic `averageRating` recalculation.
- **Zero-Setup SQLite & MySQL Persistence (`server/config/db.js`, `server/config/initDb.js`)**:
  - Unified `query(sql, params)` promise adapter supporting both embedded `better-sqlite3` (`devmarket.sqlite`) and `mysql2/promise` connection pooling.
  - Automatic non-destructive schema migration (`migrateAppsTable`) and initial demo fixture seeding (`seedDemoData` with 4 showcase apps and placeholder `demo-app.apk`).
- **Automated Property-Based & Integration Test Suites**:
  - Added 8 backend Jest + Supertest + `fast-check` test suites (`smoke.test.js`, `auth.middleware.test.js`, `user.upsert.test.js`, `role.promote.test.js`, `upload.validation.test.js`, `app.approval.test.js`, `download.test.js`, `client.api.test.js`).
  - Added frontend Vitest + React Testing Library + `fast-check` property test suites (`client/src/test/`).
- **Production Documentation Suite**:
  - Added standalone vector architecture diagram (`docs/assets/system-overview.svg`), `ARCHITECTURE.md`, `API.md`, `DEVELOPMENT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `ROADMAP.md`, `VISION.md`, and `.github/` templates.

### Changed
- Upgraded frontend styling to **Tailwind CSS v4** (`@tailwindcss/vite`) with a Spotify-inspired dark/light editorial design system and desktop smartphone simulator frame (`Layout.jsx`).
- Updated `appController.js` `formatApp()` to dynamically construct LAN-accessible `downloadUrl` links (`http://${LAN_IP}:${PORT}/downloads/${filename}`) and parse JSON `screenshots` arrays.

### Fixed
- Replaced blocking `window.prompt()` calls in mobile mock authentication with a touch-optimized visual account picker in `Login.jsx`.
- Configured `fallthrough: false` on `express.static('uploads/apk/')` so requests for missing `.apk` files return `404 Not Found` instead of falling through to the SPA `index.html` bundle.

### Security
- Enforced strict Multer binary verification (`application/vnd.android.package-archive` MIME type or `.apk` extension) and a 200 MB payload ceiling (`413 Payload Too Large`).
- Enforced `Content-Disposition: attachment` on all `/downloads/*` responses to prevent browser inline execution of uploaded binaries.

---

## [0.2.0] - 2026-09-15

### Added
- Initial LAN backend setup with Express 4, CORS preflight (`204`), and static `/downloads` route.
- Firebase Admin SDK token verification (`POST /api/auth/firebase`) and `DEMO_ADMIN_EMAIL` automatic administrator role assignment.
- Basic `users` and `apps` SQLite/MySQL table creation (`initDb.js`).

### Changed
- Migrated frontend API calls to a centralized fetch client (`client/src/api/client.js`) with automatic `Authorization: Bearer <token>` injection from `localStorage`.

---

## [0.1.0] - 2026-08-20

### Added
- Initial repository structure with React 18 + Vite frontend prototype and Mongoose schema definitions (`User.js`, `App.js`, `Review.js`).
- Basic marketplace home view and app details prototype.
