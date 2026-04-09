/*
 * Assigned Member: Backend Member 1
 * Required Functions: Auth Routes
 */
const express = require('express');
const router = express.Router();
const { register, login, mockFirebaseLogin, googleLogin } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/mock-firebase', mockFirebaseLogin);
router.post('/google', googleLogin);

module.exports = router;
