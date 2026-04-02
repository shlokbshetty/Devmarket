# DevMarket

Mobile app marketplace platform for developers and users.

## Project Overview
DevMarket is a complete mobile app marketplace backend. It provides secure user authentication, role-based access control, file uploading for APKs via Cloudinary, and text-based search capabilities.

## Backend Setup Steps
1. Navigate to the `server` directory.
2. Install dependencies by running `npm install` in the root folder.
3. Create a `.env` file in the root directory and add the required environment variables.
4. Start the server: `npm start` or `npm run dev:server`

## Environment Variables Required
```env
PORT=5000
DB_URL=mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## API Endpoint Documentation

### Authentication Routes

**Register User**
- `POST /api/auth/register`
- **Body**: `{ "name": "John", "contact": "john@example.com", "password": "password123" }`
- **Response**: `{ "success": true, "data": { "_id": "...", "name": "John", "contact": "john@example.com", "role": "user", "token": "..." } }`

**Login User**
- `POST /api/auth/login`
- **Body**: `{ "contact": "john@example.com", "password": "password123" }`
- **Response**: `{ "success": true, "data": { "_id": "...", "name": "John", "contact": "john@example.com", "role": "user", "token": "..." } }`

### App Routes

**Upload App**
- `POST /api/apps/upload`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `name` (text), `description` (text), `category` (text), `apk` (file)
- **Response**: `{ "success": true, "data": { "_id": "...", "name": "MyApp", "status": "Pending", "apkUrl": "..." } }`

**Search Apps**
- `GET /api/apps/search?q=keyword`
- **Response**: `{ "success": true, "data": [ { "_id": "...", "name": "MyApp", "category": "Games", "apkUrl": "..." } ] }`

**Get App Details**
- `GET /api/apps/:id`
- **Response**: `{ "success": true, "data": { "_id": "...", "name": "MyApp", "description": "...", "averageRating": 4 } }`

### Review Routes

**Submit Review**
- `POST /api/reviews`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "appId": "...", "rating": 5, "comment": "Great app!" }`
- **Response**: `{ "success": true, "data": { "_id": "...", "appId": "...", "rating": 5, "comment": "Great app!" } }`

### Admin Routes
*(Requires Admin role)*

**Approve App**
- `PUT /api/admin/approve/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "success": true, "data": { "_id": "...", "status": "Live" } }`

**Remove Malicious App**
- `DELETE /api/admin/remove/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "success": true, "data": { "message": "App removed successfully" } }`
