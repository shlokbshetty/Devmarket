# Requirements Document

## Introduction

DevMarket is a mobile-first APK hosting platform that enables developers to upload Android APKs, administrators to review and approve submissions, and users to browse and download approved apps over a local network. The platform consists of a React/Vite frontend and an Express/Node backend. This document captures the requirements needed to finalize the platform into a fully working, demo-ready system by resolving the mismatch between frontend expectations and backend API contracts, fixing the Firebase authentication flow, adding missing admin user-management UI, and enabling real APK downloads on mobile devices.

## Glossary

- **System**: The DevMarket APK hosting platform (frontend + backend combined)
- **Frontend**: The React/Vite client application served from `/client`
- **Backend**: The Express/Node server running from `/server`
- **AuthContext**: The React context that manages authentication state on the frontend
- **Firebase**: Google Firebase Authentication service used for Google Sign-In
- **Firebase_Admin_SDK**: The server-side Firebase Admin SDK used to verify Firebase ID tokens
- **JWT**: JSON Web Token issued by the backend after successful Firebase token verification
- **SQLite**: The SQLite database (`devmarket.sqlite`) used to persist users and apps
- **Multer**: The Node.js middleware used to handle multipart APK file uploads
- **APK**: Android Package file (`.apk`) uploaded by developers
- **LAN_IP**: The laptop's local network IP address configured in `.env`, used to construct download URLs accessible from phones on the same network
- **Admin**: A user with `role = 'administrator'` in the database
- **Developer**: A user with `role = 'developer'` in the database
- **User**: A user with `role = 'user'` (default) in the database
- **Demo_Admin_Email**: The email address configured in `DEMO_ADMIN_EMAIL` env var that is automatically granted administrator role on login

---

## Requirements

### Requirement 1: Firebase Authentication — Frontend Login Flow

**User Story:** As a user, I want to sign in with my Google account using Firebase, so that I can access the platform with a secure, persistent session.

#### Acceptance Criteria

1. WHEN a user clicks the sign-in button, THE Frontend SHALL trigger a Firebase `signInWithPopup` call using the Google provider
2. WHEN Firebase sign-in succeeds, THE AuthContext SHALL extract a Firebase ID token via `firebaseUser.getIdToken()`
3. WHEN the Firebase ID token is obtained, THE Frontend SHALL POST it to `/api/auth/firebase` with the body `{ idToken }`
4. WHEN the backend responds with success, THE AuthContext SHALL store the returned backend JWT in `localStorage` under the key `devmarket_auth`
5. WHEN the backend responds with success, THE AuthContext SHALL set `user` to the returned `{ uid, email, role, name }` object
6. WHEN `user.role` equals `'administrator'`, THE AuthContext SHALL expose `isAdmin` as `true`
7. WHEN `user.role` equals `'developer'`, THE AuthContext SHALL expose `isDeveloper` as `true`
8. IF the backend returns a non-success response, THEN THE Frontend SHALL display an error message to the user
9. WHEN the user logs out, THE AuthContext SHALL clear `localStorage` and set `user` to `null`

---

### Requirement 2: Firebase Authentication — Backend Token Exchange Endpoint

**User Story:** As the system, I want to verify Firebase ID tokens and issue backend JWTs, so that subsequent API requests do not require a live Firebase connection on every call.

#### Acceptance Criteria

1. WHEN `POST /api/auth/firebase` is called with a valid `idToken`, THE Backend SHALL verify the token using `Firebase_Admin_SDK.auth().verifyIdToken()`
2. WHEN the token is verified, THE Backend SHALL upsert the user into the `users` table using `INSERT OR IGNORE` with `role = 'user'`
3. WHEN the verified user's email equals `DEMO_ADMIN_EMAIL`, THE Backend SHALL update that user's role to `'administrator'` in the `users` table
4. WHEN the upsert is complete, THE Backend SHALL sign a JWT containing `{ uid, email, role }` with `JWT_SECRET` and an expiry of 7 days
5. WHEN the JWT is signed, THE Backend SHALL respond with `{ success: true, token, user: { uid, email, role, name } }`
6. IF `idToken` is missing from the request body, THEN THE Backend SHALL respond with `400 { success: false, message: 'idToken required' }`
7. IF `Firebase_Admin_SDK.auth().verifyIdToken()` throws, THEN THE Backend SHALL respond with `401 { success: false, message: 'Unauthorized' }`

---

### Requirement 3: JWT Auth Middleware

**User Story:** As the system, I want all protected API routes to verify the backend-issued JWT, so that API calls remain fast and reliable without requiring a live Firebase connection on every request.

#### Acceptance Criteria

1. WHEN a request arrives with a valid `Authorization: Bearer <jwt>` header, THE `verifyToken` middleware SHALL decode the JWT using `JWT_SECRET` and populate `req.user = { uid, email, role }`
2. IF the `Authorization` header is missing or malformed, THEN THE `verifyToken` middleware SHALL respond with `401 { success: false, message: 'Unauthorized' }`
3. IF the JWT is expired or invalid, THEN THE `verifyToken` middleware SHALL respond with `401 { success: false, message: 'Unauthorized' }`
4. WHEN `req.user.role` equals `'administrator'`, THE `requireAdmin` middleware SHALL call `next()`
5. IF `req.user.role` is not `'administrator'`, THEN THE `requireAdmin` middleware SHALL respond with `403 { success: false, message: 'Forbidden' }`
6. WHEN `req.user.role` equals `'developer'` or `'administrator'`, THE `requireDeveloper` middleware SHALL call `next()`
7. IF `req.user.role` is neither `'developer'` nor `'administrator'`, THEN THE `requireDeveloper` middleware SHALL respond with `403 { success: false, message: 'Forbidden' }`

---

### Requirement 4: Admin Panel — App Review

**User Story:** As an administrator, I want to review pending app submissions and approve or reject them, so that only vetted APKs are published to users.

#### Acceptance Criteria

1. WHEN an admin visits the Admin Panel, THE Frontend SHALL fetch pending apps from `GET /api/admin/apps/pending` and display them in a list
2. WHEN an admin clicks "Approve" on a pending app, THE Frontend SHALL call `PUT /api/admin/apps/:id/approve` and remove the app from the pending list
3. WHEN an admin clicks "Reject" on a pending app, THE Frontend SHALL call `PUT /api/admin/apps/:id/reject` and remove the app from the pending list
4. WHEN `PUT /api/admin/apps/:id/approve` is called, THE Backend SHALL set the app's `status` to `'approved'` in the `apps` table
5. WHEN `PUT /api/admin/apps/:id/reject` is called, THE Backend SHALL set the app's `status` to `'rejected'` in the `apps` table
6. IF the app ID does not exist in the database, THEN THE Backend SHALL respond with `404 { success: false, message: 'App not found' }`
7. IF a non-admin user calls any `/api/admin/*` endpoint, THEN THE Backend SHALL respond with `403 { success: false, message: 'Forbidden' }`

---

### Requirement 5: Admin Panel — User Management

**User Story:** As an administrator, I want to view all registered users and promote them to developer role, so that I can grant upload access without requiring users to re-register.

#### Acceptance Criteria

1. WHEN an admin opens the "Users" tab in the Admin Panel, THE Frontend SHALL fetch all users from `GET /api/admin/users` and display them in a list showing `email` and `role`
2. WHEN a user in the list has `role = 'user'`, THE Frontend SHALL display a "Promote to Developer" button next to that user
3. WHEN an admin clicks "Promote to Developer", THE Frontend SHALL call `PUT /api/admin/users/:uid/promote` and update the displayed role to `'developer'`
4. WHEN `GET /api/admin/users` is called by an admin, THE Backend SHALL return `{ success: true, users: Array<{ uid, email, role, created_at }> }`
5. WHEN `PUT /api/admin/users/:uid/promote` is called, THE Backend SHALL set the user's `role` to `'developer'` in the `users` table
6. IF the user UID does not exist in the database, THEN THE Backend SHALL respond with `404 { success: false, message: 'User not found' }`

---

### Requirement 6: APK Upload — Developer Dashboard

**User Story:** As a developer, I want to upload an APK file directly from my browser, so that I can submit my app for admin review.

#### Acceptance Criteria

1. WHEN a developer submits the upload form, THE Frontend SHALL send a `multipart/form-data` POST request to `/api/apps/upload` with fields `name`, `description`, `category`, `version`, and the APK file in the `apk` field
2. WHEN the upload request is received, THE Backend SHALL process the file using Multer and save it to `uploads/apk/` with a timestamped filename
3. WHEN the file is saved, THE Backend SHALL insert a record into the `apps` table with `status = 'pending'` and the fields `developer_uid`, `name`, `description`, `category`, `version`, `filename`
4. WHEN the insert succeeds, THE Backend SHALL respond with `201 { success: true, app: { id, name, filename, status: 'pending' } }`
5. IF the uploaded file is not an `.apk` file, THEN THE Backend SHALL respond with `400 { success: false, message: 'Only APK files are allowed' }`
6. IF the uploaded file exceeds 200 MB, THEN THE Backend SHALL respond with `413 { success: false, message: 'File too large' }`
7. IF no file is included in the request, THEN THE Backend SHALL respond with `400 { success: false, message: 'No file uploaded' }`
8. IF a non-developer user calls `POST /api/apps/upload`, THEN THE Backend SHALL respond with `403 { success: false, message: 'Forbidden' }`

---

### Requirement 7: APK Download — User View

**User Story:** As a user on my phone, I want to tap "Install" on an app and have the APK download directly to my device, so that I can install apps from the platform.

#### Acceptance Criteria

1. WHEN `GET /api/apps` is called, THE Backend SHALL return only apps with `status = 'approved'`, each including a `downloadUrl` field constructed as `http://{LAN_IP}:3000/downloads/{filename}`
2. WHEN `GET /api/apps/:id` is called for an approved app, THE Backend SHALL return the app object including the `downloadUrl` field
3. WHEN a user taps "Install" on an app detail page, THE Frontend SHALL initiate a file download by navigating to `app.downloadUrl`
4. WHEN `GET /downloads/:filename` is requested, THE Backend SHALL serve the APK file with `Content-Disposition: attachment` so the browser prompts a download
5. IF `GET /api/apps/:id` is called for an app that does not exist or is not approved, THEN THE Backend SHALL respond with `404 { success: false, message: 'App not found' }`

---

### Requirement 8: Database Schema — Missing Columns

**User Story:** As the system, I want the `apps` table to include `description`, `category`, and `version` columns, so that app metadata submitted by developers is persisted and returned to users.

#### Acceptance Criteria

1. THE `apps` table SHALL include a `description` column of type `TEXT` with a default value of `''`
2. THE `apps` table SHALL include a `category` column of type `VARCHAR(100)` with a default value of `'Other'`
3. THE `apps` table SHALL include a `version` column of type `VARCHAR(50)` with a default value of `'1.0'`
4. WHEN the `initDb` function runs, THE System SHALL create the `apps` table with all required columns if it does not already exist
5. WHEN the `apps` table already exists without the new columns, THE System SHALL add the missing columns via `ALTER TABLE` migrations

---

### Requirement 9: Demo Data Seed

**User Story:** As a demo presenter, I want a pre-seeded demo app and admin user to exist in the database on first run, so that the demo works without requiring a developer to upload an APK first.

#### Acceptance Criteria

1. WHEN `initDb` completes and no user with `email = DEMO_ADMIN_EMAIL` exists, THE System SHALL insert a user row with `role = 'administrator'`
2. WHEN `initDb` completes and no app with `name = 'Demo App'` exists, THE System SHALL insert an app row with `status = 'approved'` and `filename = 'demo-app.apk'`
3. WHEN the seed runs, THE System SHALL ensure `uploads/apk/demo-app.apk` exists on disk (creating a placeholder file if absent)
4. IF the demo admin user or demo app already exists, THEN THE System SHALL skip the seed insert without error

---

### Requirement 10: Environment Configuration

**User Story:** As a developer setting up the project, I want all required environment variables documented and validated, so that the server starts correctly and the demo works on a local network.

#### Acceptance Criteria

1. THE Backend SHALL require `JWT_SECRET`, `DEMO_ADMIN_EMAIL`, and `LAN_IP` to be set in `.env`
2. THE Frontend SHALL require `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID` to be set in `client/.env`
3. THE `.env.example` file SHALL document all required environment variables with placeholder values
4. IF `LAN_IP` is not set, THEN THE Backend SHALL fall back to `'localhost'` when constructing `downloadUrl` values
