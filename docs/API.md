# DevMarket REST API Reference

This document provides the complete technical reference for all REST API endpoints, static binary download streams, authentication schemes, and error contracts implemented in the **DevMarket** backend (`server/`).

---

## 1. Base URL & Network Configuration

| Environment | Base API URL | Static APK Download Base URL | Notes |
| :--- | :--- | :--- | :--- |
| **Local Development (Default `.env`)** | `http://localhost:3000/api` | `http://localhost:3000/downloads` | Default `PORT=3000` in `.env.example` and `setup.js` |
| **Vite Dev Proxy (`client/vite.config.js`)** | `http://localhost:5173/api` | `http://localhost:3000/downloads` | Vite proxies `/api/*` -> `http://localhost:3000/api/*` |
| **Alternate / Contract Port (`5000` / `3001`)** | `http://localhost:5000/api` | `http://localhost:5000/downloads` | Configurable via `PORT=5000` or `PORT=3001` in `.env` |
| **Mobile LAN / Physical Android Device** | `http://<LAN_IP>:<PORT>/api` | `http://<LAN_IP>:<PORT>/downloads` | e.g., `http://192.168.1.100:3000/api` |
| **Android Studio Emulator Loopback** | `http://10.0.2.2:<PORT>/api` | `http://10.0.2.2:<PORT>/downloads` | `10.0.2.2` routes from the Android Emulator to the host loopback |

> **Note on Examples**: All `curl` examples below use `http://localhost:3000/api` (or `http://localhost:5000/api` where `PORT=5000` is configured). Set `API_URL="http://localhost:3000/api"` in your shell to run them directly.

---

## 2. Authentication & Authorization Scheme

DevMarket uses a **two-step Token-Exchange / Credential Authentication** flow that issues a 7-day **HMAC-SHA256 Backend JWT**:

1. **Obtain a Backend JWT**:
   - **Firebase OAuth / Mock Token Exchange**: Call `POST /api/auth/firebase` with `{ "idToken": "<firebase_id_token_or_mock_token>" }`.
   - **Direct Role Credentials**: Call `POST /api/auth/credentials` with `{ "username": "...", "password": "...", "role": "admin" | "developer" }`.
2. **Authenticate Protected Requests**:
   Pass the returned `token` in the `Authorization` HTTP header on all protected endpoints:
   ```http
   Authorization: Bearer <backend_jwt_token>
   ```

### JWT Payload Structure (`verifyToken` Middleware)
When verified against `process.env.JWT_SECRET` in [`server/middleware/authMiddleware.js`](../server/middleware/authMiddleware.js), the decoded JWT populates `req.user`:
```json
{
  "uid": "demo-admin",
  "email": "admin@devmarket.lan",
  "role": "administrator",
  "iat": 1730000000,
  "exp": 1730604800
}
```

### Role Guard Matrix (`authMiddleware.js`)

| Middleware Guard | Allowed `req.user.role` Values | Failure HTTP Status | Failure Response Body |
| :--- | :--- | :---: | :--- |
| `verifyToken` | `'user'`, `'developer'`, `'administrator'` | `401 Unauthorized` | `{ "success": false, "message": "Unauthorized" }` |
| `requireDeveloper` | `'developer'`, `'administrator'` | `403 Forbidden` | `{ "success": false, "message": "Forbidden" }` |
| `requireAdmin` | `'administrator'` | `403 Forbidden` | `{ "success": false, "message": "Forbidden" }` |

---

## 3. Standard Response & Error Envelopes

All JSON API responses include a boolean `success` discriminator field:

- **Success Envelope (`200 OK` / `201 Created`)**:
  ```json
  {
    "success": true,
    "app": { ... },
    "apps": [ ... ],
    "user": { ... },
    "users": [ ... ],
    "data": { ... }
  }
  ```
- **Error Envelope (`400`, `401`, `403`, `404`, `413`, `500`)**:
  ```json
  {
    "success": false,
    "message": "Descriptive error message"
  }
  ```

---

## 4. Endpoint Summary Table

| Method | Endpoint Path | Auth Guard | Controller Handler | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/firebase` | Public | `authController.firebaseAuth` | Exchange Firebase ID token (or `mock-token-*`) for a 7-day Backend JWT |
| `POST` | `/api/auth/credentials` | Public | `authController.credentialAuth` | Authenticate `admin` or `developer` via username & password |
| `GET` | `/api/auth/me` | `verifyToken` | `authController.getMe` | Retrieve the current authenticated user's profile from the database |
| `POST` | `/api/apps/upload` | `verifyToken`, `requireDeveloper` | `appController.uploadApp` | Upload a `.apk` binary (`<= 200 MB`) and create a `pending` app record |
| `GET` | `/api/apps` | Public | `appController.getApps` | List all `approved` marketplace applications |
| `GET` | `/api/apps/search` | Public | `appController.getAppsSearch` | Search `approved` apps by keyword (`q`) and/or `category` |
| `GET` | `/api/apps/:id` | Public | `appController.getApp` | Retrieve full details for a single `approved` app by numeric ID |
| `GET` | `/api/admin/apps/pending` | `verifyToken`, `requireAdmin` | `adminController.getPendingApps` | List all apps with `status = 'pending'` awaiting moderation |
| `PUT` | `/api/admin/apps/:id/approve` | `verifyToken`, `requireAdmin` | `adminController.approveApp` | Approve a pending app (`status = 'approved'`) |
| `PUT` | `/api/admin/apps/:id/reject` | `verifyToken`, `requireAdmin` | `adminController.rejectApp` | Reject an app submission (`status = 'rejected'`) |
| `GET` | `/api/admin/users` | `verifyToken`, `requireAdmin` | `adminController.getUsers` | List all registered users (`uid`, `email`, `role`, `created_at`) |
| `PUT` | `/api/admin/users/:uid/promote` | `verifyToken`, `requireAdmin` | `adminController.promoteUser` | Promote a user account to `role = 'developer'` |
| `POST` | `/api/reviews` | `verifyToken` | `reviewController.submitReview` | Submit a 1-5 star review and recalculate `averageRating` |
| `GET` | `/downloads/:filename` | Public | `express.static('uploads/apk/')` | Stream an uploaded `.apk` binary with `Content-Disposition: attachment` |
| `OPTIONS` | `/*` (e.g., `/api/health`) | Public | `cors(corsOptions)` | CORS preflight & server liveness probe (`204 No Content`) |

---

## 5. Authentication Endpoints (`server/routes/auth.js`)

### 5.1 Exchange Firebase ID Token for Backend JWT
- **Endpoint**: `POST /api/auth/firebase`
- **Authentication**: Public
- **Description**: Verifies a Firebase Google OAuth `idToken` using `admin.auth().verifyIdToken(idToken)` (or parses `mock-token-<email>` in development mode), upserts the user into the `users` table with default role `'user'`, applies `DEMO_ADMIN_EMAIL` (`'administrator'`) and `developer@devmarket.lan` (`'developer'`) elevation rules, and returns a signed 7-day JWT.

#### Request Headers
| Header | Value | Required |
| :--- | :--- | :---: |
| `Content-Type` | `application/json` | Yes |

#### Request Body
```json
{
  "idToken": "mock-token-admin@devmarket.lan"
}
```

#### `curl` Example
```bash
curl -X POST http://localhost:3000/api/auth/firebase \
  -H "Content-Type: application/json" \
  -d '{"idToken": "mock-token-admin@devmarket.lan"}'
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "uid": "mock-uid-admin",
    "email": "admin@devmarket.lan",
    "role": "administrator",
    "name": "admin"
  }
}
```

#### Error Responses
| Status Code | Response Body | Condition |
| :---: | :--- | :--- |
| `400 Bad Request` | `{ "success": false, "message": "idToken required" }` | `idToken` is missing or empty in request body |
| `401 Unauthorized` | `{ "success": false, "message": "Unauthorized" }` | `admin.auth().verifyIdToken()` rejected the token |
| `500 Internal Server Error` | `{ "success": false, "message": "Internal server error" }` | Database query failure |

---

### 5.2 Authenticate with Role Credentials (`Admin` / `Developer`)
- **Endpoint**: `POST /api/auth/credentials`
- **Authentication**: Public
- **Description**: Validates `username` and `password` against `ADMIN_USERNAME`/`ADMIN_PASSWORD` (when `role === "admin"`) or `DEVELOPER_USERNAME`/`DEVELOPER_PASSWORD` (when `role === "developer"`), upserts the corresponding user in the `users` table, and issues a 7-day Backend JWT.

#### Request Body
```json
{
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}
```

#### `curl` Example
```bash
curl -X POST http://localhost:3000/api/auth/credentials \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "role": "admin"
  }'
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "uid": "admin-admin",
    "email": "admin@devmarket.lan",
    "role": "administrator",
    "name": "admin"
  }
}
```

#### Error Responses
| Status Code | Response Body | Condition |
| :---: | :--- | :--- |
| `400 Bad Request` | `{ "success": false, "message": "Username, password, and role required" }` | Missing `username`, `password`, or `role` |
| `400 Bad Request` | `{ "success": false, "message": "Invalid role" }` | `role` is not `"admin"` or `"developer"` |
| `401 Unauthorized` | `{ "success": false, "message": "Invalid credentials" }` | Username/password mismatch against `.env` |
| `500 Internal Server Error` | `{ "success": false, "message": "Internal server error" }` | Database failure |

---

### 5.3 Get Current Authenticated User Profile
- **Endpoint**: `GET /api/auth/me`
- **Authentication**: Required (`verifyToken` — Any authenticated role)
- **Description**: Queries the `users` table by `req.user.uid` and returns the canonical user record (`uid`, `email`, `role`).

#### Request Headers
| Header | Value | Required |
| :--- | :--- | :---: |
| `Authorization` | `Bearer <token>` | Yes |

#### `curl` Example
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "user": {
    "uid": "demo-admin",
    "email": "admin@devmarket.lan",
    "role": "administrator"
  }
}
```

#### Error Responses
| Status Code | Response Body | Condition |
| :---: | :--- | :--- |
| `401 Unauthorized` | `{ "success": false, "message": "Unauthorized" }` | Missing or invalid Bearer token |
| `404 Not Found` | `{ "success": false, "message": "User not found" }` | Token UID no longer exists in `users` table |
| `500 Internal Server Error` | `{ "success": false, "message": "Internal server error" }` | Database query error |

---

## 6. Application Marketplace Endpoints (`server/routes/app.js`)

### 6.1 Upload APK Package (Developer / Admin Only)
- **Endpoint**: `POST /api/apps/upload`
- **Authentication**: Required (`verifyToken` + `requireDeveloper`)
- **Content-Type**: `multipart/form-data`
- **Description**: Accepts a `.apk` binary upload via `multer` (`upload.single('apk')`), validates file size (`<= 200 MB`) and type (`application/vnd.android.package-archive` or `.apk` extension), stores the binary in `uploads/apk/<timestamp>-<originalname>`, and inserts a new row into `apps` with `status = 'pending'`.

#### Multipart Form Fields
| Field Name | Type | Required | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `apk` | `File` (Binary) | **Yes** | — | Android package file (`.apk`, max `200 MB`) |
| `name` | `Text` | **Yes** | — | Application display name |
| `description` | `Text` | No | `""` | Detailed description of the application |
| `category` | `Text` | No | `"Other"` | Marketplace category (e.g., `Productivity`, `Games`, `Security`, `Creative Tools`) |
| `version` | `Text` | No | `"1.0"` | Application version string |

#### `curl` Example
```bash
curl -X POST http://localhost:3000/api/apps/upload \
  -H "Authorization: Bearer <developer_or_admin_token>" \
  -F "apk=@./uploads/apk/demo-app.apk;type=application/vnd.android.package-archive" \
  -F "name=Nebula Terminal" \
  -F "description=GPU-accelerated SSH and terminal emulator for Android." \
  -F "category=Productivity" \
  -F "version=2.1.0"
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "app": {
    "id": 5,
    "_id": 5,
    "name": "Nebula Terminal",
    "filename": "1730156000000-demo-app.apk",
    "status": "pending"
  }
}
```

#### Error Responses
| Status Code | Response Body | Condition |
| :---: | :--- | :--- |
| `400 Bad Request` | `{ "success": false, "message": "No file uploaded" }` | Multipart `apk` field is missing |
| `400 Bad Request` | `{ "success": false, "message": "Only APK files are allowed" }` | Uploaded file is neither `.apk` nor `application/vnd.android.package-archive` |
| `401 Unauthorized` | `{ "success": false, "message": "Unauthorized" }` | Missing or invalid JWT |
| `403 Forbidden` | `{ "success": false, "message": "Forbidden" }` | Caller has role `'user'` (requires `'developer'` or `'administrator'`) |
| `413 Payload Too Large` | `{ "success": false, "message": "File too large" }` | File exceeds `200 MB` (`209,715,200` bytes) |
| `500 Internal Server Error` | `{ "success": false, "message": "Upload error" }` or `"Internal server error"` | Disk write or database insertion error |

---

### 6.2 List All Approved Applications
- **Endpoint**: `GET /api/apps`
- **Authentication**: Public
- **Description**: Returns all applications in the `apps` table where `status = 'approved'`, enriched with parsed `screenshots` arrays, `_id`, `averageRating`, and a LAN-resolvable `downloadUrl`.

#### `curl` Example
```bash
curl -X GET http://localhost:3000/api/apps
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "apps": [
    {
      "id": 1,
      "_id": 1,
      "developer_uid": "demo-admin",
      "name": "SynthCode Pro",
      "description": "Powerful visual IDE for android developers. Featuring real-time code preview and AI assistenza.",
      "category": "Productivity",
      "version": "1.0",
      "filename": "demo-app.apk",
      "screenshots": [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600"
      ],
      "average_rating": 4.9,
      "averageRating": 4.9,
      "status": "approved",
      "uploaded_at": "2026-10-28 16:00:00",
      "downloadUrl": "http://192.168.1.100:3000/downloads/demo-app.apk"
    }
  ]
}
```

---

### 6.3 Search & Filter Approved Applications
- **Endpoint**: `GET /api/apps/search`
- **Authentication**: Public
- **Description**: Filters `approved` applications by partial name match (`name LIKE %q%`) and/or exact `category` match.

#### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `q` | `string` | No | Substring search against application `name` |
| `category` | `string` | No | Exact match against application `category` (e.g., `Games`, `Security`, `Productivity`) |

#### `curl` Example
```bash
curl -X GET "http://localhost:3000/api/apps/search?q=Synth&category=Productivity"
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "apps": [
    {
      "id": 1,
      "_id": 1,
      "developer_uid": "demo-admin",
      "name": "SynthCode Pro",
      "description": "Powerful visual IDE for android developers. Featuring real-time code preview and AI assistenza.",
      "category": "Productivity",
      "version": "1.0",
      "filename": "demo-app.apk",
      "screenshots": [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
      ],
      "average_rating": 4.9,
      "averageRating": 4.9,
      "status": "approved",
      "uploaded_at": "2026-10-28 16:00:00",
      "downloadUrl": "http://192.168.1.100:3000/downloads/demo-app.apk"
    }
  ]
}
```

---

### 6.4 Get Single Approved Application Details
- **Endpoint**: `GET /api/apps/:id`
- **Authentication**: Public
- **Description**: Fetches a single application by numeric `id` if and only if its `status` is `'approved'`. Pending or rejected apps return `404 Not Found`.

#### Path Parameters
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `integer` | Unique application ID |

#### `curl` Example
```bash
curl -X GET http://localhost:3000/api/apps/1
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "app": {
    "id": 1,
    "_id": 1,
    "developer_uid": "demo-admin",
    "name": "SynthCode Pro",
    "description": "Powerful visual IDE for android developers. Featuring real-time code preview and AI assistenza.",
    "category": "Productivity",
    "version": "1.0",
    "filename": "demo-app.apk",
    "screenshots": [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
    ],
    "average_rating": 4.9,
    "averageRating": 4.9,
    "status": "approved",
    "uploaded_at": "2026-10-28 16:00:00",
    "downloadUrl": "http://192.168.1.100:3000/downloads/demo-app.apk"
  }
}
```

#### Error Responses
| Status Code | Response Body | Condition |
| :---: | :--- | :--- |
| `404 Not Found` | `{ "success": false, "message": "App not found" }` | App ID does not exist or is not in `'approved'` status |
| `500 Internal Server Error` | `{ "success": false, "message": "Internal server error" }` | Database failure |

---

## 7. Administration & Moderation Endpoints (`server/routes/admin.js`)

All `/api/admin/*` endpoints require both `verifyToken` and `requireAdmin` (`req.user.role === 'administrator'`).

### 7.1 List Pending App Submissions
- **Endpoint**: `GET /api/admin/apps/pending`
- **Authentication**: Required (`verifyToken` + `requireAdmin`)
- **Description**: Joins `apps` and `users` (`ON a.developer_uid = u.uid`) to return all submissions with `status = 'pending'`, formatted with `developerId.name`, `apkUrl`, and `createdAt`.

#### `curl` Example
```bash
curl -X GET http://localhost:3000/api/admin/apps/pending \
  -H "Authorization: Bearer <admin_token>"
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "apps": [
    {
      "id": 5,
      "developer_uid": "demo-developer",
      "name": "Nebula Terminal",
      "description": "GPU-accelerated SSH and terminal emulator for Android.",
      "category": "Productivity",
      "version": "2.1.0",
      "filename": "1730156000000-demo-app.apk",
      "screenshots": null,
      "average_rating": 4.8,
      "status": "pending",
      "uploaded_at": "2026-10-28 16:30:00",
      "developer_email": "developer@devmarket.lan",
      "developerId": {
        "name": "developer@devmarket.lan"
      },
      "apkUrl": "http://192.168.1.100:3000/downloads/1730156000000-demo-app.apk",
      "createdAt": "2026-10-28 16:30:00"
    }
  ]
}
```

---

### 7.2 Approve a Pending Application
- **Endpoint**: `PUT /api/admin/apps/:id/approve`
- **Authentication**: Required (`verifyToken` + `requireAdmin`)
- **Description**: Updates the target application's `status` to `'approved'`, making it immediately discoverable via `/api/apps`.

#### `curl` Example
```bash
curl -X PUT http://localhost:3000/api/admin/apps/5/approve \
  -H "Authorization: Bearer <admin_token>"
```

#### Success Response (`200 OK`)
```json
{
  "success": true
}
```

#### Error Responses
| Status Code | Response Body | Condition |
| :---: | :--- | :--- |
| `401 Unauthorized` | `{ "success": false, "message": "Unauthorized" }` | Missing or invalid JWT |
| `403 Forbidden` | `{ "success": false, "message": "Forbidden" }` | Caller is not an `'administrator'` |
| `404 Not Found` | `{ "success": false, "message": "App not found" }` | No row matched `:id` |

---

### 7.3 Reject a Pending Application
- **Endpoint**: `PUT /api/admin/apps/:id/reject`
- **Authentication**: Required (`verifyToken` + `requireAdmin`)
- **Description**: Updates the target application's `status` to `'rejected'`.

#### `curl` Example
```bash
curl -X PUT http://localhost:3000/api/admin/apps/5/reject \
  -H "Authorization: Bearer <admin_token>"
```

#### Success Response (`200 OK`)
```json
{
  "success": true
}
```

#### Error Responses
| Status Code | Response Body | Condition |
| :---: | :--- | :--- |
| `401 Unauthorized` | `{ "success": false, "message": "Unauthorized" }` | Missing or invalid JWT |
| `403 Forbidden` | `{ "success": false, "message": "Forbidden" }` | Caller is not an `'administrator'` |
| `404 Not Found` | `{ "success": false, "message": "App not found" }` | No row matched `:id` |

---

### 7.4 List All Users
- **Endpoint**: `GET /api/admin/users`
- **Authentication**: Required (`verifyToken` + `requireAdmin`)
- **Description**: Returns all user accounts (`uid`, `email`, `role`, `created_at`) from the `users` table.

#### `curl` Example
```bash
curl -X GET http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer <admin_token>"
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "users": [
    {
      "uid": "demo-admin",
      "email": "admin@devmarket.lan",
      "role": "administrator",
      "created_at": "2026-10-28 16:00:00"
    },
    {
      "uid": "demo-developer",
      "email": "developer@devmarket.lan",
      "role": "developer",
      "created_at": "2026-10-28 16:00:00"
    },
    {
      "uid": "mock-uid-user",
      "email": "user@devmarket.lan",
      "role": "user",
      "created_at": "2026-10-28 16:15:00"
    }
  ]
}
```

---

### 7.5 Promote User to Developer
- **Endpoint**: `PUT /api/admin/users/:uid/promote`
- **Authentication**: Required (`verifyToken` + `requireAdmin`)
- **Description**: Updates `role = 'developer'` for the specified `:uid` in the `users` table.

#### Path Parameters
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `uid` | `string` | Target user's unique `uid` |

#### `curl` Example
```bash
curl -X PUT http://localhost:3000/api/admin/users/mock-uid-user/promote \
  -H "Authorization: Bearer <admin_token>"
```

#### Success Response (`200 OK`)
```json
{
  "success": true
}
```

#### Error Responses
| Status Code | Response Body | Condition |
| :---: | :--- | :--- |
| `401 Unauthorized` | `{ "success": false, "message": "Unauthorized" }` | Missing or invalid JWT |
| `403 Forbidden` | `{ "success": false, "message": "Forbidden" }` | Caller is not an `'administrator'` |
| `404 Not Found` | `{ "success": false, "message": "User not found" }` | No user row matched `:uid` |

---

## 8. Review Endpoints (`server/routes/review.js`)

### 8.1 Submit Application Review
- **Endpoint**: `POST /api/reviews`
- **Authentication**: Required (`verifyToken`)
- **Handler**: [`server/controllers/reviewController.js`](../server/controllers/reviewController.js) (`submitReview`)
- **Description**: Validates `appId`, `rating` (`1..5`), and `comment`, creates a `Review` document via Mongoose (`server/models/Review.js`), recalculates the mean `averageRating` across all reviews for that `appId`, and persists the updated `averageRating` on the `App` model (`server/models/App.js`).

#### Request Body
```json
{
  "appId": "64abcd1234efg56789012345",
  "rating": 5,
  "comment": "Fast terminal rendering and seamless hardware keyboard support!"
}
```

#### `curl` Example
```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "appId": "64abcd1234efg56789012345",
    "rating": 5,
    "comment": "Fast terminal rendering and seamless hardware keyboard support!"
  }'
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "data": {
    "_id": "64ef0123456789abcdef0123",
    "appId": "64abcd1234efg56789012345",
    "userId": "649999888877776666555544",
    "rating": 5,
    "comment": "Fast terminal rendering and seamless hardware keyboard support!",
    "createdAt": "2026-10-28T16:45:00.000Z"
  }
}
```

#### Error Responses
| Status Code | Response Body | Condition |
| :---: | :--- | :--- |
| `400 Bad Request` | `{ "success": false, "message": "Please provide all fields" }` | Missing `appId`, `rating`, or `comment` |
| `401 Unauthorized` | `{ "success": false, "message": "Unauthorized" }` | Missing or invalid JWT |
| `404 Not Found` | `{ "success": false, "message": "App not found" }` | Target `appId` does not exist |
| `500 Internal Server Error` | `{ "success": false, "message": "<error.message>" }` | Validation or persistence error |

---

## 9. Static Binary Streaming & Server Liveness Probes

### 9.1 Download APK Package Binary
- **Endpoint**: `GET /downloads/:filename`
- **Authentication**: Public
- **Description**: Streams `.apk` binaries directly from `uploads/apk/:filename` with `Content-Disposition: attachment` and `fallthrough: false`.

#### `curl` Example
```bash
curl -fLO http://localhost:3000/downloads/demo-app.apk
```

#### Response Headers (`200 OK`)
```http
HTTP/1.1 200 OK
Content-Disposition: attachment
Content-Type: application/vnd.android.package-archive
Accept-Ranges: bytes
```

If `:filename` does not exist in `uploads/apk/`, `fallthrough: false` returns `404 Not Found` immediately instead of falling through to the React SPA route handler.

---

### 9.2 Server Liveness & CORS Preflight Check (`OPTIONS /api/health` or `GET /api/apps`)
- **CORS Preflight Probe**: `app.options('*', cors(corsOptions))` in `server/index.js` responds to any `OPTIONS` preflight (such as `OPTIONS /api/health` or `OPTIONS /api/apps`) with `204 No Content` and the configured `Access-Control-Allow-Origin` and `Access-Control-Allow-Headers` (`Authorization, Content-Type, X-Requested-With`).
- **Database & API Readiness Probe**: Querying `GET /api/apps` verifies both HTTP responsiveness and SQLite/MySQL read connectivity (`200 OK` with `{ "success": true, "apps": [...] }`).

```bash
# Verify CORS Preflight & Liveness (returns HTTP 204)
curl -i -X OPTIONS http://localhost:3000/api/health

# Verify API & Database Readiness (returns HTTP 200 JSON)
curl -i -X GET http://localhost:3000/api/apps
```
