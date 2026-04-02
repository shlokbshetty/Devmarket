# DevMarket Demo Backend

Backend for DevMarket App Marketplace Demo.

## Setup Steps (Replit + MongoDB Atlas)
1. Import this repository into a new Replit project.
2. The Replit `Run` button should be configured to run `npm run dev:server` or `npm start`.
3. In Replit's Secrets (Env Variables) tool, add the necessary environment variables.
4. Run the repl to start the backend.

## Environment Variables Required
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devmarket?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

## API Endpoint List
- `POST /api/auth/register` - Create user
- `POST /api/auth/login` - Authenticate user
- `POST /api/apps/upload` - Submit application (with URL links to APK and screenshots)
- `GET /api/apps/search?q=` - Search Live applications
- `GET /api/apps/:id` - Fetch app details
- `POST /api/reviews` - Submit review
- `PUT /api/admin/approve/:id` - (Admin) Approve application
- `DELETE /api/admin/remove/:id` - (Admin) Remove application

## Example Requests

### Upload App Example
```json
POST /api/apps/upload
Headers: Authorization: Bearer <token>
Body: {
  "name": "SuperApp",
  "description": "A very useful app.",
  "category": "Productivity",
  "apkUrl": "https://drive.google.com/...",
  "screenshots": [
    "https://example.com/screenshot1.png",
    "https://example.com/screenshot2.png"
  ]
}
```

### Search App Example
```json
GET /api/apps/search?q=Productivity
Response: {
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "SuperApp",
      "category": "Productivity",
      "apkUrl": "https://drive.google.com/...",
      "screenshots": ["https://example.com/screenshot1.png"],
      "averageRating": 0
    }
  ]
}
```
