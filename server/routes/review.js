/*
 * Assigned Member: Backend Member 2
 * Required Functions: Review Routes
 */
const express = require('express');
const router = express.Router();
const { submitReview } = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, submitReview);

module.exports = router;
