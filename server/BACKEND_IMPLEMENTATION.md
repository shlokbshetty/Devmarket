# Backend Implementation Contract

This document provides all API endpoints and integration steps required by frontend members.

## General Requirements
- Base URL: `http://localhost:5000` (or whatever `PORT` is configured)
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
- **Description**: Creates a new user account. Returns user info and JWT token.

### Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "contact": "jane@example.com",
    "password": "securepassword"
  }
  ```
- **Description**: Authenticates existing user. Returns user info and JWT token.

## 2. App Endpoints

### Upload App
- **Endpoint**: `POST /api/apps/upload`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: `multipart/form-data`
  - `name`: string
  - `description`: string
  - `category`: string
  - `apk`: file
- **Description**: Uploads app metadata and APK. Status is set to "Pending" automatically.

### Search Apps
- **Endpoint**: `GET /api/apps/search?q=keyword`
- **Description**: Returns all "Live" apps. If `q` is provided, filters by keyword in name/category.

### Get App Details
- **Endpoint**: `GET /api/apps/:id`
- **Description**: Returns full details for a single app including screenshots, URL, and ratings.

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
- **Description**: Posts a review for an app and updates the app's average rating.

## 4. Admin Endpoints

### Approve App
- **Endpoint**: `PUT /api/admin/approve/:id`
- **Headers**: `Authorization: Bearer <admin_token>`
- **Description**: Updates a pending app's status to "Live", making it visible in search.

### Remove Malicious App
- **Endpoint**: `DELETE /api/admin/remove/:id`
- **Headers**: `Authorization: Bearer <admin_token>`
- **Description**: Deletes an application entirely from the database.
