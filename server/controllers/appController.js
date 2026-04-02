/*
 * Assigned Member: Backend Member 2 (App Marketplace & Reviews)
 * Required Functions: uploadApp(), searchApps(), getAppDetails()
 */
const App = require('../models/App');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.uploadApp = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    
    if (!name || !description || !category || !req.file) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: 'Please provide all fields and the APK file' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "devmarket/apks"
    });
    
    // Clean up temporary file
    fs.unlinkSync(req.file.path);

    const app = await App.create({
      name,
      description,
      category,
      developerId: req.user._id,
      apkUrl: result.secure_url,
      status: 'Pending'
    });

    res.status(201).json({ success: true, data: app });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchApps = async (req, res) => {
  try {
    const { q } = req.query;
    let query = { status: 'Live' };
    
    if (q) {
      query.$text = { $search: q };
    }
    
    const apps = await App.find(query).select('name category averageRating screenshots apkUrl').limit(50);
    
    res.json({ success: true, data: apps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAppDetails = async (req, res) => {
  try {
    const app = await App.findById(req.params.id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'App not found' });
    }
    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
