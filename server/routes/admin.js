/*
 * Assigned Member: Backend Member 1
 * Required Functions: Admin Routes
 */
const express = require('express');
const router = express.Router();
const { getPendingApps, approveApp, removeMalicious } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/pending', verifyToken, isAdmin, getPendingApps);
router.put('/approve/:id', verifyToken, isAdmin, approveApp);
router.delete('/remove/:id', verifyToken, isAdmin, removeMalicious);

module.exports = router;
