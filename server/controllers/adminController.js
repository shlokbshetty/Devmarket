/*
 * Admin Controller
 * Handlers: getPendingApps, approveApp, rejectApp, promoteUser
 * Requirements: 4.4, 4.5, 7.1, 7.2, 7.3, 7.5
 */
const { query } = require('../config/db');

/**
 * Helper: extract affected row count from either mysql2 or better-sqlite3 result.
 * mysql2 returns [result, fields] where result.affectedRows is the count.
 * better-sqlite3 returns a RunResult with .changes.
 */
function affectedRows(result) {
  if (Array.isArray(result)) {
    // mysql2: [OkPacket, FieldPacket[]]
    return result[0].affectedRows;
  }
  // better-sqlite3: RunResult
  return result.changes;
}

/**
 * GET /api/admin/apps/pending
 * Returns all apps with status = "pending".
 */
exports.getPendingApps = async (req, res) => {
  try {
    const result = await query(`
      SELECT a.*, u.email as developer_email 
      FROM apps a
      JOIN users u ON a.developer_uid = u.uid
      WHERE a.status = ?
    `, ['pending']);
    
    const rows = Array.isArray(result) && Array.isArray(result[0]) ? result[0] : result;
    
    // Format for frontend expectations in AdminPanel.jsx
    const apps = rows.map(app => ({
      ...app,
      developerId: { name: app.developer_email }, // AdminPanel expects .developerId.name
      apkUrl: process.env.LAN_IP 
        ? `http://${process.env.LAN_IP}:3000/downloads/${app.filename}`
        : `/downloads/${app.filename}`,
      createdAt: app.uploaded_at // AdminPanel expects .createdAt
    }));

    res.json({ success: true, apps });
  } catch (err) {
    console.error('getPendingApps error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * PUT /api/admin/apps/:id/approve
 * Sets app status to "approved". Returns 404 if no row was affected.
 */
exports.approveApp = async (req, res) => {
  try {
    const result = await query(
      'UPDATE apps SET status = ? WHERE id = ?',
      ['approved', req.params.id]
    );
    if (affectedRows(result) === 0) {
      return res.status(404).json({ success: false, message: 'App not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('approveApp error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * PUT /api/admin/apps/:id/reject
 * Sets app status to "rejected". Returns 404 if no row was affected.
 */
exports.rejectApp = async (req, res) => {
  try {
    const result = await query(
      'UPDATE apps SET status = ? WHERE id = ?',
      ['rejected', req.params.id]
    );
    if (affectedRows(result) === 0) {
      return res.status(404).json({ success: false, message: 'App not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('rejectApp error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * GET /api/admin/users
 * Returns all users from the users table.
 * Requirements: 5.1, 5.4
 */
exports.getUsers = async (req, res) => {
  try {
    const result = await query('SELECT uid, email, role, created_at FROM users');
    const rows = Array.isArray(result) && Array.isArray(result[0]) ? result[0] : result;
    res.json({ success: true, users: rows });
  } catch (err) {
    console.error('getUsers error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * PUT /api/admin/users/:uid/promote
 * Sets user role to "developer". Returns 404 if no row was affected.
 */
exports.promoteUser = async (req, res) => {
  try {
    const result = await query(
      'UPDATE users SET role = ? WHERE uid = ?',
      ['developer', req.params.uid]
    );
    if (affectedRows(result) === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('promoteUser error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
