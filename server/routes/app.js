const express = require('express');
const router = express.Router();
const { verifyToken, requireDeveloper } = require('../middleware/authMiddleware');
const { uploadApp, getApps, getApp, getAppsSearch } = require('../controllers/appController');

// POST /api/apps/upload — developer-only APK upload
router.post('/upload', verifyToken, requireDeveloper, uploadApp);

// GET /api/apps/search — search approved apps
router.get('/search', getAppsSearch);

// GET /api/apps — list all approved apps (public)
router.get('/', getApps);

// GET /api/apps/:id — single approved app detail (public)
router.get('/:id', getApp);

module.exports = router;
