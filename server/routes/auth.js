const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { firebaseAuth, getMe } = require('../controllers/authController');

// POST /api/auth/firebase — exchange Firebase ID token for a backend JWT
router.post('/firebase', firebaseAuth);

// GET /api/auth/me — returns the current authenticated user's profile
router.get('/me', verifyToken, getMe);

module.exports = router;
