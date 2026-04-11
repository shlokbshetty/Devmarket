/*
 * App Controller
 * Handles APK upload, listing, and single-app retrieval.
 */

const multer = require('multer');
const { query } = require('../config/db');

// ---------------------------------------------------------------------------
// Multer configuration
// ---------------------------------------------------------------------------

const storage = multer.diskStorage({
  destination: 'uploads/apk/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
  fileFilter: (req, file, cb) => {
    const isApk =
      file.mimetype === 'application/vnd.android.package-archive' ||
      file.originalname.endsWith('.apk');
    if (isApk) {
      cb(null, true);
    } else {
      const err = new Error('Only APK files are allowed');
      err.code = 'INVALID_FILE_TYPE';
      cb(err, false);
    }
  },
});

// ---------------------------------------------------------------------------
// Helper: normalise DB results across mysql2 and better-sqlite3
// ---------------------------------------------------------------------------

function selectRows(result) {
  if (Array.isArray(result) && Array.isArray(result[0])) {
    return result[0];
  }
  return result;
}

function insertId(result) {
  if (Array.isArray(result)) {
    return result[0].insertId;
  }
  return result.lastInsertRowid;
}

function formatApp(row) {
  const lanIp = process.env.LAN_IP || 'localhost';
  const port = process.env.PORT || 3000;
  
  let screenshots = [];
  try {
    screenshots = row.screenshots ? JSON.parse(row.screenshots) : [];
  } catch (e) {
    console.error("Failed to parse screenshots JSON:", e);
  }

  return {
    ...row,
    _id: row.id, // Frontend uses _id for consistency
    averageRating: row.average_rating,
    screenshots,
    downloadUrl: `http://${lanIp}:${port}/downloads/${row.filename}`,
  };
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

exports.uploadApp = (req, res) => {
  upload.single('apk')(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ success: false, message: 'File too large' });
      }
      if (err.code === 'INVALID_FILE_TYPE') {
        return res.status(400).json({ success: false, message: 'Only APK files are allowed' });
      }
      return res.status(500).json({ success: false, message: 'Upload error' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    try {
      const developer_uid = req.user.uid;
      const { name, description = '', category = 'Other', version = '1.0' } = req.body;
      const { filename } = req.file;

      const result = await query(
        'INSERT INTO apps (developer_uid, name, description, category, version, filename, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [developer_uid, name, description, category, version, filename, 'pending'],
      );

      const id = insertId(result);

      return res.status(201).json({
        success: true,
        app: { id, _id: id, name, filename, status: 'pending' },
      });
    } catch (dbErr) {
      console.error('uploadApp DB error:', dbErr);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
};

exports.getApps = async (req, res) => {
  try {
    const result = await query(
      "SELECT id, developer_uid, name, description, category, version, filename, screenshots, average_rating, status, uploaded_at FROM apps WHERE status = 'approved'",
      [],
    );

    const rows = selectRows(result);
    const apps = rows.map(formatApp);

    return res.json({ success: true, apps });
  } catch (err) {
    console.error('getApps error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getAppsSearch = async (req, res) => {
  try {
    const { q, category } = req.query;
    let sql = "SELECT id, developer_uid, name, description, category, version, filename, screenshots, average_rating, status, uploaded_at FROM apps WHERE status = 'approved'";
    const params = [];

    if (q) {
      sql += " AND name LIKE ?";
      params.push(`%${q}%`);
    }

    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }

    const result = await query(sql, params);
    const rows = selectRows(result);
    const apps = rows.map(formatApp);

    return res.json({ success: true, apps });
  } catch (err) {
    console.error('getAppsSearch error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getApp = async (req, res) => {
  try {
    const result = await query(
      "SELECT id, developer_uid, name, description, category, version, filename, screenshots, average_rating, status, uploaded_at FROM apps WHERE id = ? AND status = 'approved'",
      [req.params.id],
    );

    const rows = selectRows(result);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'App not found' });
    }

    return res.json({
      success: true,
      app: formatApp(rows[0]),
    });
  } catch (err) {
    console.error('getApp error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
