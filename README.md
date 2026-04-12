# DevMarket - Android App Marketplace

A comprehensive platform for developers to upload, manage, and distribute Android applications with admin approval workflows.

[Quick Start](#quick-start) · [Test Accounts](#test-accounts) · [API Documentation](#api-documentation) · [Mobile Build](#mobile-build)

## 🚀 Features

### For Developers
- **APK Upload**: Upload Android APK files directly to the platform
- **App Management**: Manage your uploaded applications and track approval status
- **File Storage**: APK files are stored locally on the server for distribution
- **Developer Dashboard**: Dedicated interface for app submission and management

### For Administrators  
- **App Approval**: Review and approve/reject submitted applications
- **User Management**: Promote users to developer status
- **Admin Dashboard**: Comprehensive admin panel for platform management
- **Content Moderation**: Maintain platform quality through approval workflows

### For Users
- **App Discovery**: Browse and search approved applications
- **Direct Downloads**: Download APK files directly from the platform
- **Category Filtering**: Find apps by category (Games, Productivity, etc.)
- **Responsive Design**: Works seamlessly on web and mobile devices

## 🏗️ Architecture

### Frontend (React + Vite)
- **Location**: `client/`
- **Framework**: React 18 with Vite for fast development
- **Styling**: TailwindCSS with dark/light mode support
- **Mobile**: Capacitor for Android APK generation
- **Authentication**: Firebase Auth with backend JWT integration

### Backend (Node.js + Express)
- **Location**: `server/`
- **Database**: SQLite for local development (MySQL compatible)
- **File Storage**: Local filesystem storage for APK files
- **Authentication**: Firebase Admin SDK + JWT tokens
- **API**: RESTful API with role-based access control

### Project Structure
```
DevMarket/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (auth, etc.)
│   │   └── api/           # API client functions
│   ├── android/           # Capacitor Android project
│   └── dist/              # Built web assets
├── server/                # Node.js backend
│   ├── controllers/       # Route handlers
│   ├── routes/           # API route definitions
│   ├── middleware/       # Auth & validation middleware
│   ├── config/           # Database & Firebase config
│   └── models/           # Database models
├── uploads/              # APK file storage
└── docs/                 # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Android Studio (for mobile builds)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shlokbshetty/Devmarket.git
   cd Devmarket
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   npm install

   # Install client dependencies
   cd client && npm install && cd ..
   ```

3. **Environment setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   ```

4. **Configure environment variables**
   Edit `.env` file:
   ```env
   # Server Configuration
   PORT=3000
   LAN_IP=192.168.1.100  # Your local IP for mobile testing
   
   # Database
   DB_TYPE=sqlite
   
   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-here
   DEMO_ADMIN_EMAIL=admin@devmarket.lan
   
   # Firebase (for production)
   VITE_FIREBASE_API_KEY=mock-key  # Use 'mock-key' for development
   ```

5. **Start the application**
   ```bash
   # Start both server and client
   npm run dev
   ```

   **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Mobile (if configured): http://YOUR_LAN_IP:3000

## 👥 Test Accounts

The application includes pre-configured test accounts for development:

### Admin Account
- **Email**: `admin@devmarket.lan`
- **Role**: Administrator
- **Permissions**: 
  - Approve/reject app submissions
  - Manage users and promote to developer
  - Access admin dashboard
  - Full platform control

### Developer Account  
- **Email**: `developer@devmarket.lan`
- **Role**: Developer
- **Permissions**:
  - Upload APK files
  - Manage own applications
  - Access developer dashboard
  - Submit apps for approval

### Regular User
- **Email**: `user@devmarket.lan` (or any other email)
- **Role**: User
- **Permissions**:
  - Browse approved applications
  - Download APK files
  - Search and filter apps

### Using Test Accounts
1. Click "Sign in with Google" on the login page
2. In development mode, you'll see test account options
3. Enter one of the test emails above
4. You'll be automatically logged in with the appropriate role

## 📱 Mobile Build (Android APK)

### Setup Android Development
1. **Install Android Studio**
2. **Configure Capacitor**
   ```bash
   cd client
   npx cap add android
   npx cap sync android
   ```

3. **Build for production**
   ```bash
   # Build web assets
   npm run build
   
   # Copy to Android
   npx cap copy android
   
   # Open in Android Studio
   npx cap open android
   ```

4. **Build APK in Android Studio**
   - Build → Generate Signed Bundle/APK
   - Choose APK and follow the signing process

### Mobile Features
- **Responsive Design**: Optimized for mobile screens
- **Touch Events**: Enhanced button interactions for mobile
- **Offline Capability**: Basic offline functionality
- **Native Integration**: Uses Capacitor for native features

## 🔧 API Documentation

### Authentication Endpoints
```
POST /api/auth/firebase     # Exchange Firebase token for JWT
GET  /api/auth/me          # Get current user profile
```

### App Management Endpoints
```
GET  /api/apps             # List approved apps
GET  /api/apps/search      # Search apps with filters
GET  /api/apps/:id         # Get single app details
POST /api/apps/upload      # Upload APK (developers only)
```

### Admin Endpoints
```
GET  /api/admin/apps/pending        # List pending apps
PUT  /api/admin/apps/:id/approve    # Approve app
PUT  /api/admin/apps/:id/reject     # Reject app
GET  /api/admin/users               # List all users
PUT  /api/admin/users/:uid/promote  # Promote user to developer
```

### File Downloads
```
GET /downloads/:filename   # Download APK files
```

## 🛠️ Development

### Running Tests
```bash
# Frontend tests
cd client && npm test

# Backend tests  
cd server && npm test
```

### Development Scripts
```bash
# Start development servers
npm run dev              # Both client and server
npm run dev:server       # Server only
npm run dev:client       # Client only

# Build for production
npm run build           # Build client
npm run build:server    # Build server (if applicable)

# Mobile development
cd client
npm run android         # Build and sync Android
```

### Database Management
The application uses SQLite for local development with automatic schema initialization:

- **Database file**: `devmarket.sqlite` (auto-created)
- **Schema**: Automatically initialized on first run
- **Demo data**: Seeded automatically with test accounts and sample apps

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Admin, Developer, and User roles
- **File Validation**: APK file type validation and size limits
- **CORS Protection**: Configurable CORS settings
- **Input Sanitization**: SQL injection protection

## 📦 Deployment

### Production Deployment
1. **Environment Configuration**
   ```env
   NODE_ENV=production
   PORT=3000
   DB_TYPE=mysql  # or sqlite
   MONGO_URI=your-production-database-url
   JWT_SECRET=your-production-jwt-secret
   ```

2. **Build Assets**
   ```bash
   cd client && npm run build
   ```

3. **Start Production Server**
   ```bash
   npm start
   ```

### Docker Deployment (Optional)
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shlok Shetty**
- GitHub: [@shlokbshetty](https://github.com/shlokbshetty)
- Email: shettyshlok87@gmail.com

## 🙏 Acknowledgments

- React and Vite teams for excellent development tools
- TailwindCSS for the utility-first CSS framework
- Capacitor team for seamless mobile integration
- Firebase for authentication services
