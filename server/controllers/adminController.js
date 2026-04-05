/*
 * Assigned Member: Backend Member 1 (Auth & Admin Logic)
 * Required Functions: approveApp(), removeMalicious()
 */
const App = require('../models/App');

exports.getPendingApps = async (req, res) => {
  try {
    const apps = await App.find({ status: 'Pending' }).populate('developerId', 'name contact').sort({ createdAt: -1 });
    res.json({ success: true, data: apps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveApp = async (req, res) => {
  try {
    const app = await App.findById(req.params.id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'App not found' });
    }
    
    app.status = 'Live';
    await app.save();
    
    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeMalicious = async (req, res) => {
  try {
    const app = await App.findById(req.params.id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'App not found' });
    }
    
    await App.deleteOne({ _id: app._id });
    
    res.json({ success: true, data: { message: 'App removed successfully' } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
