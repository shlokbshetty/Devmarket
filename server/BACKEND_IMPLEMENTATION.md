# Backend Implementation Contract (Demo Variant)

This document provides all updated API endpoints and integration steps required by frontend members.

## General Requirements
- Base URL: Replit deployment URL (e.g., `https://your-repl-name.your-username.repl.co`) or `http://localhost:5000`
- The server allows CORS broadly to support Vercel deployments.
- All protected routes require a JWT token in the header:
  `Authorization: Bearer <token>`
- Success Response format: `{ "success": true, "data": ... }`
- Error Response format: `{ "success": false, "message": "..." }`

## 1. Authentication Endpoints

### Register
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "contact": "jane@example.com",
    "password": "securepassword"
  }
  ```

### Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "contact": "jane@example.com",
    "password": "securepassword"
  }
  ```

## 2. App Endpoints

### Upload App (UPDATED FOR DEMO)
- **Endpoint**: `POST /api/apps/upload`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body** (JSON):
  ```json
  {
    "name": "Demo Game",
    "description": "Fun game",
    "category": "Games",
    "apkUrl": "https://google.drive.link/apk",
    "screenshots": [
      "https://imgur.com/link1.png",
      "https://imgur.com/link2.png"
    ]
  }
  ```
- **Description**: Stores app data using provided URLs instead of processing direct file uploads.

### Search Apps
- **Endpoint**: `GET /api/apps/search?q=keyword`
- **Description**: Returns all "Live" apps. If `q` is provided, filters by keyword in name/category.

### Get App Details
- **Endpoint**: `GET /api/apps/:id`
- **Description**: Returns full details for a single app including `apkUrl` and ratings.

## 3. Review Endpoints

### Submit Review
- **Endpoint**: `POST /api/reviews`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "appId": "64abcd1234efg...",
    "rating": 5,
    "comment": "Excellent application!"
  }
  ```

## 4. Admin Endpoints

### Approve App
- **Endpoint**: `PUT /api/admin/approve/:id`
- **Headers**: `Authorization: Bearer <admin_token>`
- **Description**: Updates a pending app's status to "Live".

### Remove Malicious App
- **Endpoint**: `DELETE /api/admin/remove/:id`
- **Headers**: `Authorization: Bearer <admin_token>`
- **Description**: Deletes an application entirely from the database.
