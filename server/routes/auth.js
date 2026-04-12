const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { firebaseAuth, credentialAuth, getMe } = require('../controllers/authController');

// POST /api/auth/firebase — exchange Firebase ID token for a backend JWT
router.post('/firebase', firebaseAuth);

// POST /api/auth/credentials — authenticate with username/password for admin/developer
router.post('/credentials', credentialAuth);

// GET /api/auth/me — returns the current authenticated user's profile
router.get('/me', verifyToken, getMe);

module.exports = router;
