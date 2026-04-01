/*
 * Assigned Member: Backend Member 2 (App Marketplace & Reviews)
 * Required Functions: App Schema definition
 */
const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  title: String,
  description: String,
  developerId: String, // Reference to User model
  apkUrl: String, // Needs the storage bucket URL from the DevOps setup
  screenshots: [String],
  status: { type: String, default: 'Pending' }, // "Pending", "Live", "Rejected"
  ratings: [Number],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('App', appSchema);
