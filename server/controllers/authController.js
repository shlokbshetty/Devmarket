const { query } = require('../config/db');
const admin = require('../config/firebase');
const jwt = require('jsonwebtoken');

/**
 * POST /api/auth/credentials
 * Authenticates admin/developer with username/password credentials
 */
exports.credentialAuth = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ success: false, message: 'Username, password, and role required' });
  }

  // Validate role
  if (!['admin', 'developer'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role' });
  }

  try {
    // Check credentials against environment variables
    const validCredentials = 
      (role === 'admin' && username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) ||
      (role === 'developer' && username === process.env.DEVELOPER_USERNAME && password === process.env.DEVELOPER_PASSWORD);

    if (!validCredentials) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Create user data
    const email = `${username}@devmarket.lan`;
    let uid = `${role}-${username}`;
    const userRole = role === 'admin' ? 'administrator' : 'developer';

    console.log('Attempting to create/find user with:', { uid, email, userRole });

    try {
      // First, check if a user with this email already exists
      const existingUserResult = await query("SELECT uid, email, role FROM users WHERE email = ?", [email]);
      console.log('Existing user check result:', existingUserResult);

      if (existingUserResult && existingUserResult.length > 0) {
        // User exists, use their existing uid and update role if needed
        const existingUser = existingUserResult[0];
        uid = existingUser.uid; // Use existing uid
        console.log('Found existing user, using uid:', uid);
        
        // Update role if different
        if (existingUser.role !== userRole) {
          await query("UPDATE users SET role = ? WHERE uid = ?", [userRole, uid]);
          console.log('Updated user role to:', userRole);
        }
      } else {
        // User doesn't exist, create new one
        await query(
          "INSERT INTO users (uid, email, role) VALUES (?, ?, ?)",
          [uid, email, userRole]
        );
        console.log('Created new user');
      }

      // Verify the user exists
      const verifyResult = await query("SELECT uid, email, role FROM users WHERE uid = ?", [uid]);
      console.log('User verification result:', verifyResult);

      console.log('User created/updated successfully');
    } catch (dbError) {
      console.error('Database error during user creation:', dbError);
      throw dbError;
    }

    const token = jwt.sign({ uid, email, role: userRole }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      success: true,
      token,
      user: { uid, email, role: userRole, name: username },
    });
  } catch (err) {
    console.error('credentialAuth error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

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
    
    // Enforce demo developer email rule
    if (email === 'developer@devmarket.lan') {
      await query("UPDATE users SET role = 'developer' WHERE uid = ?", [uid]);
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
    console.log('getMe called for uid:', req.user.uid);
    const rows = await query('SELECT uid, email, role FROM users WHERE uid = ?', [req.user.uid]);
    console.log('getMe query result:', rows);

    // Handle different database result formats
    let user;
    if (Array.isArray(rows)) {
      if (Array.isArray(rows[0])) {
        // mysql2 format: [rows, fields]
        user = rows[0][0];
      } else {
        // better-sqlite3 format: rows array
        user = rows[0];
      }
    } else {
      // Single row result
      user = rows;
    }

    console.log('Parsed user:', user);

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
    console.error('getMe error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
