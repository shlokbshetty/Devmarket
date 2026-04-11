# Tasks

## Task List

- [x] 1. Fix JWT Auth Middleware (Backend)
  - [x] 1.1 Replace Firebase ID token verification in `verifyToken` with backend JWT verification using `jsonwebtoken` and `JWT_SECRET`
  - [x] 1.2 Update `requireAdmin` to check for `role === 'administrator'` (currently checks `'admin'`)
  - [x] 1.3 Update `requireDeveloper` to check for `role === 'developer' || 'administrator'` (currently checks `'admin'`)

- [x] 2. Add Firebase Auth Backend Endpoint
  - [x] 2.1 Create `POST /api/auth/firebase` handler in `authController.js` that verifies the Firebase ID token, upserts the user, enforces the demo admin email rule, and returns a signed backend JWT
  - [x] 2.2 Register the new route in `server/routes/auth.js`

- [x] 3. Update Database Schema
  - [x] 3.1 Add `description`, `category`, and `version` columns to the `apps` table definition in `initDb.js`
  - [x] 3.2 Add `ALTER TABLE` migration logic in `initDb.js` to add missing columns to an existing `apps` table without data loss

- [x] 4. Add Demo Data Seed
  - [x] 4.1 Add `seedDemoData()` function in `initDb.js` that inserts the demo admin user and Demo App if they do not already exist
  - [x] 4.2 Ensure `uploads/apk/demo-app.apk` placeholder file is created if absent
  - [x] 4.3 Call `seedDemoData()` from `start()` in `server/index.js` after `initDb()`

- [x] 5. Fix APK Upload Controller
  - [x] 5.1 Update `appController.js` `uploadApp` to include `description`, `category`, and `version` in the `INSERT INTO apps` query
  - [x] 5.2 Update the upload route in `app.js` to use `/upload` (already correct — verify no mismatch)

- [x] 6. Add Admin Users Endpoint
  - [x] 6.1 Add `getUsers` handler in `adminController.js` that returns all users from the `users` table
  - [x] 6.2 Register `GET /api/admin/users` route in `server/routes/admin.js`

- [x] 7. Fix Frontend Authentication (Login.jsx + AuthContext.jsx)
  - [x] 7.1 Rewrite `Login.jsx` to use Firebase `signInWithPopup` directly (remove `@react-oauth/google` dependency) and POST the Firebase ID token to `/api/auth/firebase`
  - [x] 7.2 Update `AuthContext.jsx` so `login()` calls the backend `/api/auth/firebase` endpoint, stores the returned backend JWT, and sets `user` from the response
  - [x] 7.3 Add `isDeveloper` flag to `AuthContext` derived from `user.role === 'developer'`
  - [x] 7.4 Fix `isAdmin` in `AuthContext` to be derived from `user.role === 'administrator'` (currently hardcoded `false`)

- [x] 8. Fix Developer Dashboard (DevDashboard.jsx)
  - [x] 8.1 Replace the broken `apkUrl` / `Link2` URL-input approach with a `<input type="file" accept=".apk">` file picker
  - [x] 8.2 Update the form submission to use `apiUpload("/apps/upload", formData)` (correct route) and include `description`, `category`, and `version` fields

- [x] 9. Fix APK Download in App Details Page (AppDetailsPage.jsx)
  - [x] 9.1 Replace the fake download progress sheet with a real download link that sets `window.location.href = app.downloadUrl` (or uses an `<a download>` tag) when the user taps "Install"

- [x] 10. Add Users Tab to Admin Panel (AdminPanel.jsx)
  - [x] 10.1 Add a "Users" tab alongside the existing "Apps" tab in `AdminPanel.jsx`
  - [x] 10.2 Fetch users from `GET /api/admin/users` when the Users tab is active and display `email` and `role` for each user
  - [x] 10.3 Show a "Promote to Developer" button for users with `role === 'user'` and call `PUT /api/admin/users/:uid/promote` on click

- [x] 11. Fix Admin Panel API Path (AdminPanel.jsx)
  - [x] 11.1 Update `AdminPanel.jsx` to call `GET /api/admin/apps/pending` (currently calls `/admin/pending`) and `PUT /api/admin/apps/:id/approve` / `DELETE /api/admin/remove/:id` to match the actual backend routes

- [x] 12. Update Environment Configuration
  - [x] 12.1 Add `JWT_SECRET`, `DEMO_ADMIN_EMAIL`, and `LAN_IP` to `.env.example` with placeholder values
  - [x] 12.2 Add `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID` to `client/.env.example` (or document in `.env.example`)
  - [x] 12.3 Add fallback to `'localhost'` in `appController.js` when `LAN_IP` is not set
