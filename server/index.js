require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

// Trigger Firebase Admin initialisation at startup
require('./config/firebase');

const { initDb, seedDemoData } = require('./config/initDb');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const appRoutes = require('./routes/app');

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  allowedHeaders: ['Authorization', 'Content-Type', 'X-Requested-With'],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Handle OPTIONS preflight with 204
app.options('*', cors(corsOptions));

app.use(express.json());

// Serve APK files as attachments under /downloads
app.use(
  '/downloads',
  express.static('uploads/apk/', {
    setHeaders: (res) => res.setHeader('Content-Disposition', 'attachment'),
    fallthrough: false,
  })
);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/apps', appRoutes);
app.use('/api/admin', adminRoutes);

// SPA fallback
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3000;

async function start() {
  await initDb();
  await seedDemoData();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://${process.env.LAN_IP || '0.0.0.0'}:${PORT}`);
  });
}

start();
