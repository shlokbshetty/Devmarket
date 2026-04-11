const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');
const { getPendingApps, approveApp, rejectApp, promoteUser, getUsers } = require('../controllers/adminController');

// GET /api/admin/apps/pending — list apps awaiting review
router.get('/apps/pending', verifyToken, requireAdmin, getPendingApps);

// PUT /api/admin/apps/:id/approve — approve an app
router.put('/apps/:id/approve', verifyToken, requireAdmin, approveApp);

// PUT /api/admin/apps/:id/reject — reject an app
router.put('/apps/:id/reject', verifyToken, requireAdmin, rejectApp);

// GET /api/admin/users — list all users
router.get('/users', verifyToken, requireAdmin, getUsers);

// PUT /api/admin/users/:uid/promote — promote a user to developer
router.put('/users/:uid/promote', verifyToken, requireAdmin, promoteUser);

module.exports = router;
