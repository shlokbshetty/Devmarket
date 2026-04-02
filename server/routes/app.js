/*
 * Assigned Member: Backend Member 2
 * Required Functions: App Routes
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadApp, searchApps, getAppDetails } = require('../controllers/appController');
const { verifyToken } = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', verifyToken, upload.single('apk'), uploadApp);
router.get('/search', searchApps);
router.get('/:id', getAppDetails);

module.exports = router;
