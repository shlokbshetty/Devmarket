/*
 * Assigned Member: Backend Member 1 (Auth & Admin Logic)
 * Required Functions: register(), login()
 */
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { name, contact, password } = req.body;
    
    if (!name || !contact || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const userExists = await User.findOne({ contact });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      contact,
      password: hashedPassword,
      role: 'user'
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          contact: user.contact,
          role: user.role,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { contact, password } = req.body;
    
    if (!contact || !password) {
      return res.status(400).json({ success: false, message: 'Please provide contact and password' });
    }
    
    const user = await User.findOne({ contact });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          contact: user.contact,
          role: user.role,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.mockFirebaseLogin = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    if (!name || !email || !role) {
      return res.status(400).json({ success: false, message: 'Missing fields for mock login' });
    }

    let user = await User.findOne({ contact: email });
    
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('mockpassword123!', salt);
      user = await User.create({
        name,
        contact: email,
        password: hashedPassword,
        role: role
      });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        contact: user.contact,
        role: user.role,
        token: generateToken(user._id)
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
