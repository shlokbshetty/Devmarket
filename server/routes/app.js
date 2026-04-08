/*
 * Assigned Member: Backend Member 2
 * Required Functions: App Routes
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadApp, searchApps, getAppDetails } = require('../controllers/appController');
const { verifyToken, isDeveloper } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Ensure the uploads directory exists
    const fs = require('fs');
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/upload', verifyToken, uploadApp); // Keeps old route for backwards compatibility if needed
router.post('/upload-apk', verifyToken, isDeveloper, upload.single('apk'), uploadApp);
router.get('/search', searchApps);
router.get('/:id', getAppDetails);

module.exports = router;
