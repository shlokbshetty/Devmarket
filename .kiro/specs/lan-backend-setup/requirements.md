# Requirements Document

## Introduction

DevMarket is a LAN-based mobile app store where a laptop acts as the backend server and mobile phones connect via a shared hotspot. The system replaces the existing cloud-based MongoDB/JWT architecture with a local MySQL (or SQLite fallback) database and Firebase Authentication. Developers upload APK files from their phones, admins approve apps, and users download APKs directly from the laptop server over the local network.

## Glossary

- **Server**: The Node.js Express application running on the laptop, bound to `0.0.0.0:3000`
- **LAN_IP**: The laptop's local IP address on the hotspot network (e.g., `192.168.X.X`)
- **Client**: The React frontend application served by the Server
- **Firebase_Auth**: Google Firebase Authentication service used for identity verification
- **Firebase_Admin_SDK**: Server-side Firebase library used to verify ID tokens
- **ID_Token**: A Firebase-issued JWT sent by the Client to the Server to prove identity
- **Local_DB**: The MySQL or SQLite database running on the laptop at `localhost`
- **APK**: An Android application package file uploaded by a Developer
- **Multer**: The Node.js middleware used to handle multipart file uploads
- **Role**: A string value (`"user"`, `"developer"`, or `"admin"`) stored in Local_DB per user
- **Admin**: A user with `role = "admin"` who can approve apps and promote users
- **Developer**: A user with `role = "developer"` who can upload APKs
- **User**: A user with `role = "user"` who can browse and download approved apps
- **Download_URL**: A fully-qualified URL of the form `http://{LAN_IP}:3000/downloads/{filename}`

---

## Requirements

### Requirement 1: LAN Network Binding

**User Story:** As a mobile user on the hotspot, I want to reach the backend via the laptop's LAN IP, so that I can use the app store from my phone without needing internet access.

#### Acceptance Criteria

1. THE Server SHALL bind to `0.0.0.0` on port `3000` so that it is reachable from any network interface, including the hotspot interface.
2. WHEN the Server starts, THE Server SHALL log the LAN_IP and port to the console so that the operator can confirm the accessible address.
3. THE Client SHALL read the backend base URL from an environment variable (`VITE_API_BASE_URL`) so that API calls target `http://{LAN_IP}:3000/api` instead of `localhost`.
4. IF the `VITE_API_BASE_URL` environment variable is not set, THEN THE Client SHALL fall back to `/api` for same-origin requests.

---

### Requirement 2: Firebase Authentication Integration

**User Story:** As a user, I want to log in with my Google account via Firebase, so that I don't need a separate username and password for DevMarket.

#### Acceptance Criteria

1. WHEN a user completes Google Sign-In on the Client, THE Client SHALL obtain a Firebase ID_Token and send it in the `Authorization: Bearer {ID_Token}` header on every subsequent API request.
2. WHEN the Server receives a request with an `Authorization` header, THE Firebase_Admin_SDK SHALL verify the ID_Token and extract the user's `uid` and `email`.
3. IF the ID_Token is missing or invalid, THEN THE Server SHALL respond with HTTP `401` and a JSON body `{ "success": false, "message": "Unauthorized" }`.
4. IF the ID_Token is expired, THEN THE Server SHALL respond with HTTP `401` and a JSON body `{ "success": false, "message": "Token expired" }`.
5. THE Firebase_Admin_SDK SHALL be initialized using a service account key file path stored in the `FIREBASE_SERVICE_ACCOUNT_PATH` environment variable.

---

### Requirement 3: Local Database Setup and User Role Storage

**User Story:** As a system operator, I want user roles stored in a local database, so that role assignments persist across sessions without depending on cloud services.

#### Acceptance Criteria

1. THE Local_DB SHALL store a `users` table with columns: `uid` (VARCHAR, primary key), `email` (VARCHAR, unique), `role` (ENUM `'user'`, `'developer'`, `'admin'`), and `created_at` (TIMESTAMP).
2. THE Server SHALL connect to Local_DB using `host: "localhost"` and credentials from environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
3. WHEN a verified user's `uid` does not exist in the `users` table, THE Server SHALL insert a new row with `role = "user"` and the user's `email` from the ID_Token.
4. WHEN a verified user's `uid` exists in the `users` table, THE Server SHALL read the stored `role` without modifying it.
5. WHERE SQLite is configured as the fallback (`DB_TYPE=sqlite`), THE Server SHALL use a local `.sqlite` file and maintain the same `users` table schema.

---

### Requirement 4: Role-Based Access Control

**User Story:** As an admin, I want to control who can upload apps and who can approve them, so that the store maintains content quality and security.

#### Acceptance Criteria

1. THE Server SHALL attach the authenticated user's `role` from Local_DB to every verified request context before routing.
2. WHEN a request targets an admin-only endpoint, THE Server SHALL verify `role === "admin"` and respond with HTTP `403` if the condition is not met.
3. WHEN a request targets a developer-only endpoint, THE Server SHALL verify `role === "developer"` or `role === "admin"` and respond with HTTP `403` if neither condition is met.
4. WHEN an Admin sends a promote request for a target user, THE Server SHALL update the target user's `role` in Local_DB to `"developer"`.
5. WHEN an Admin sends a promote request for a target user, THE Server SHALL verify the target user exists in Local_DB and respond with HTTP `404` if the user is not found.

---

### Requirement 5: APK File Upload

**User Story:** As a developer, I want to upload APK files from my phone browser, so that I can publish apps to the DevMarket store over the local network.

#### Acceptance Criteria

1. THE Server SHALL expose a `POST /api/apps/upload` endpoint protected by Developer role verification.
2. THE Server SHALL use Multer to handle `multipart/form-data` requests on the upload endpoint.
3. THE Server SHALL accept APK files up to `200MB` in size and reject files exceeding this limit with HTTP `413` and a JSON body `{ "success": false, "message": "File too large" }`.
4. THE Server SHALL only accept files with the `.apk` MIME type (`application/vnd.android.package-archive`) or `.apk` file extension, and reject other file types with HTTP `400` and a JSON body `{ "success": false, "message": "Only APK files are allowed" }`.
5. WHEN an APK is accepted, THE Server SHALL store the file in the `uploads/apk/` directory on the laptop's filesystem with a unique filename (timestamp + original name).
6. WHEN an APK is stored, THE Server SHALL insert an app record into Local_DB with fields: `id`, `developer_uid`, `name`, `filename`, `status` (`"pending"`), and `uploaded_at`.

---

### Requirement 6: APK Static File Serving and Download

**User Story:** As a user, I want to download APK files directly from the laptop server, so that I can install apps on my Android device over the local network.

#### Acceptance Criteria

1. THE Server SHALL serve files in the `uploads/apk/` directory under the `/downloads` URL path using Express static file serving.
2. WHEN a download request is made for a valid filename, THE Server SHALL respond with the file using `Content-Disposition: attachment` headers so the browser triggers a download.
3. WHEN an app record is retrieved via the API, THE Server SHALL include a `downloadUrl` field with the value `http://{LAN_IP}:3000/downloads/{filename}`.
4. THE Server SHALL read the LAN_IP from the `LAN_IP` environment variable to construct Download_URLs.
5. IF a requested file does not exist in `uploads/apk/`, THEN THE Server SHALL respond with HTTP `404`.

---

### Requirement 7: App Approval Workflow

**User Story:** As an admin, I want to review and approve uploaded apps before they appear in the store, so that users only see vetted content.

#### Acceptance Criteria

1. THE Server SHALL expose a `GET /api/admin/apps/pending` endpoint accessible only to Admins, returning all app records with `status = "pending"`.
2. WHEN an Admin sends an approval request for an app, THE Server SHALL update the app's `status` to `"approved"` in Local_DB.
3. WHEN an Admin sends a rejection request for an app, THE Server SHALL update the app's `status` to `"rejected"` in Local_DB.
4. THE Server SHALL expose a `GET /api/apps` endpoint accessible to all authenticated users, returning only app records with `status = "approved"`.
5. IF an approval or rejection request references an app `id` that does not exist, THEN THE Server SHALL respond with HTTP `404`.

---

### Requirement 8: CORS and Hotspot Network Access

**User Story:** As a mobile user, I want the server to accept requests from my phone's browser, so that the app works correctly over the hotspot without CORS errors.

#### Acceptance Criteria

1. THE Server SHALL configure CORS to allow requests from any origin (`*`) while operating in LAN mode, so that the phone browser can reach the laptop server.
2. THE Server SHALL accept `Authorization`, `Content-Type`, and `X-Requested-With` headers in CORS preflight responses.
3. THE Server SHALL respond to HTTP `OPTIONS` preflight requests with HTTP `204` on all API routes.
4. WHERE a production deployment restricts CORS (`CORS_ORIGIN` environment variable is set), THE Server SHALL restrict allowed origins to the specified value instead of `*`.
