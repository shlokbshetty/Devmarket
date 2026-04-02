/*
 * Assigned Member: Backend Member 2
 * Required Functions: App Routes
 */
const express = require('express');
const router = express.Router();
const { uploadApp, searchApps, getAppDetails } = require('../controllers/appController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/upload', verifyToken, uploadApp);
router.get('/search', searchApps);
router.get('/:id', getAppDetails);

module.exports = router;
