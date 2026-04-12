#!/usr/bin/env node

/**
 * DevMarket Setup Script
 * Automates initial project setup and configuration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 DevMarket Setup Script');
console.log('========================\n');

// Check if .env exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file...');
  
  const envContent = `# DevMarket Configuration
# Server
PORT=3000
LAN_IP=192.168.1.100

# Database  
DB_TYPE=sqlite

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DEMO_ADMIN_EMAIL=admin@devmarket.lan

# Firebase (use 'mock-key' for development)
VITE_FIREBASE_API_KEY=mock-key

# CORS (optional)
CORS_ORIGIN=*
`;

  fs.writeFileSync('.env', envContent);
  console.log('✅ .env file created with default values');
  console.log('   Please update LAN_IP with your actual IP address\n');
} else {
  console.log('✅ .env file already exists\n');
}

// Check if uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads', 'apk');
if (!fs.existsSync(uploadsDir)) {
  console.log('📁 Creating uploads directory...');
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ uploads/apk directory created\n');
} else {
  console.log('✅ uploads directory already exists\n');
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  console.log('   Installing server dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('   Installing client dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });
  
  console.log('✅ All dependencies installed\n');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Setup complete
console.log('🎉 Setup Complete!');
console.log('==================\n');
console.log('Next steps:');
console.log('1. Update your LAN_IP in .env file');
console.log('2. Run: npm run dev');
console.log('3. Open: http://localhost:5173');
console.log('\nTest accounts:');
console.log('- Admin: admin@devmarket.lan');
console.log('- Developer: developer@devmarket.lan');
console.log('- User: user@devmarket.lan');
console.log('\nFor mobile builds, see: client/ANDROID_BUILD_GUIDE.md');