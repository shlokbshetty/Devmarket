/*
 * Assigned Member: Backend Member 2 (App Marketplace & Reviews)
 * Required Functions: submitReview()
 */
const Review = require('../models/Review');
const App = require('../models/App');

exports.submitReview = async (req, res) => {
  try {
    const { appId, rating, comment } = req.body;
    
    if (!appId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const app = await App.findById(appId);
    if (!app) {
      return res.status(404).json({ success: false, message: 'App not found' });
    }

    const review = await Review.create({
      appId,
      userId: req.user._id,
      rating: Number(rating),
      comment
    });

    const allReviews = await Review.find({ appId });
    const avgRating = allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;
    
    app.averageRating = avgRating;
    await app.save();

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
