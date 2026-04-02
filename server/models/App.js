/*
 * Assigned Member: Backend Member 2 (App Marketplace & Reviews)
 * Required Functions: App Schema definition
 */
const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  apkUrl: { type: String, required: true }, 
  screenshots: [{ type: String }],
  status: { type: String, enum: ['Pending', 'Live', 'Rejected'], default: 'Pending' }, 
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

appSchema.index({ name: 'text', category: 'text' });

module.exports = mongoose.model('App', appSchema);
