const jwt = require('jsonwebtoken');

/**
 * verifyToken
 * - Extracts Bearer token from Authorization header
 * - Verifies it with JWT_SECRET (backend-issued JWT, not Firebase token)
 * - Attaches req.user = { uid, email, role } and calls next()
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { uid: decoded.uid, email: decoded.email, role: decoded.role };
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

/**
 * requireAdmin
 * - Allows only users with role === 'administrator'
 * - Returns 403 for all other roles
 */
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'administrator') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Forbidden' });
};

/**
 * requireDeveloper
 * - Allows users with role === 'developer' or role === 'administrator'
 * - Returns 403 for all other roles
 */
const requireDeveloper = (req, res, next) => {
  if (req.user && (req.user.role === 'developer' || req.user.role === 'administrator')) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Forbidden' });
};

module.exports = { verifyToken, requireAdmin, requireDeveloper };
