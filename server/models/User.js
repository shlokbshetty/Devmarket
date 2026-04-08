/*
 * Assigned Member: Backend Member 1 (Auth & Admin Logic)
 * Required Functions: User Schema definition
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true, unique: true }, // email or phone
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'developer', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
