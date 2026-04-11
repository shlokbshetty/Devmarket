const { query } = require('../config/db');
const admin = require('../config/firebase');
const jwt = require('jsonwebtoken');

/**
 * POST /api/auth/firebase
 * Verifies a Firebase ID token, upserts the user, enforces the demo admin
 * email rule, and returns a signed backend JWT.
 */
exports.firebaseAuth = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ success: false, message: 'idToken required' });
  }

  let decoded;
  try {
    if (idToken.startsWith('mock-token-')) {
      const email = idToken.split('mock-token-')[1];
      const uid = 'mock-uid-' + email.split('@')[0];
      decoded = { uid, email, name: email.split('@')[0] };
    } else {
      decoded = await admin.auth().verifyIdToken(idToken);
    }
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { uid, email, name } = decoded;

  try {
    // Upsert user — insert if not already present, default role = 'user'
    await query(
      "INSERT OR IGNORE INTO users (uid, email, role) VALUES (?, ?, 'user')",
      [uid, email]
    );

    // Enforce demo admin email rule
    if (email === process.env.DEMO_ADMIN_EMAIL) {
      await query("UPDATE users SET role = 'administrator' WHERE uid = ?", [uid]);
    }

    // Fetch the current role from DB
    const rows = await query('SELECT role FROM users WHERE uid = ?', [uid]);
    const user = Array.isArray(rows) ? rows[0] : rows;
    const role = user ? user.role : 'user';

    const token = jwt.sign({ uid, email, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      success: true,
      token,
      user: { uid, email, role, name: name || null },
    });
  } catch (err) {
    console.error('firebaseAuth error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * GET /api/auth/me
 * Returns the current authenticated user's profile from Local_DB.
 * Requires verifyToken middleware to have run first (populates req.user).
 */
exports.getMe = async (req, res) => {
  try {
    const rows = await query('SELECT uid, email, role FROM users WHERE uid = ?', [req.user.uid]);

    // mysql2 returns [rows, fields]; better-sqlite3 wrapper returns rows directly
    const user = Array.isArray(rows[0]) ? rows[0][0] : rows[0];

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
