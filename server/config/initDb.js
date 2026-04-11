/*
 * DB Schema Initialisation Helper
 * Creates the `users` and `apps` tables if they don't already exist.
 * Detects DB_TYPE and uses the appropriate SQL dialect.
 */

const fs = require('fs');
const path = require('path');
const { query } = require('./db');

const DB_TYPE = process.env.DB_TYPE || 'mysql';

const CREATE_USERS_MYSQL = `
CREATE TABLE IF NOT EXISTS users (
  uid        VARCHAR(128)                                        PRIMARY KEY,
  email      VARCHAR(255)                                        NOT NULL UNIQUE,
  role       ENUM('user', 'developer', 'administrator')          NOT NULL DEFAULT 'user',
  created_at TIMESTAMP                                           NOT NULL DEFAULT CURRENT_TIMESTAMP
)
`;

const CREATE_USERS_SQLITE = `
CREATE TABLE IF NOT EXISTS users (
  uid        VARCHAR(128)                                                          PRIMARY KEY,
  email      VARCHAR(255)                                                          NOT NULL UNIQUE,
  role       TEXT CHECK(role IN ('user', 'developer', 'administrator'))            NOT NULL DEFAULT 'user',
  created_at TIMESTAMP                                                             NOT NULL DEFAULT CURRENT_TIMESTAMP
)
`;

const CREATE_APPS_MYSQL = `
CREATE TABLE IF NOT EXISTS apps (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  developer_uid  VARCHAR(128)  NOT NULL,
  name           VARCHAR(255)  NOT NULL,
  description    TEXT          NOT NULL DEFAULT '',
  category       VARCHAR(100)  NOT NULL DEFAULT 'Other',
  version        VARCHAR(50)   NOT NULL DEFAULT '1.0',
  filename       VARCHAR(255)  NOT NULL,
  screenshots    TEXT,
  average_rating FLOAT         DEFAULT 4.8,
  status         ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  uploaded_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (developer_uid) REFERENCES users(uid)
)
`;

const CREATE_APPS_SQLITE = `
CREATE TABLE IF NOT EXISTS apps (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  developer_uid  VARCHAR(128)  NOT NULL,
  name           VARCHAR(255)  NOT NULL,
  description    TEXT          NOT NULL DEFAULT '',
  category       VARCHAR(100)  NOT NULL DEFAULT 'Other',
  version        VARCHAR(50)   NOT NULL DEFAULT '1.0',
  filename       VARCHAR(255)  NOT NULL,
  screenshots    TEXT,
  average_rating REAL          DEFAULT 4.8,
  status         TEXT CHECK(status IN ('pending', 'approved', 'rejected')) NOT NULL DEFAULT 'pending',
  uploaded_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (developer_uid) REFERENCES users(uid)
)
`;

async function migrateAppsTable() {
  const isSqlite = DB_TYPE === 'sqlite';

  if (isSqlite) {
    const cols = (await query('PRAGMA table_info(apps)')).map(c => c.name);
    if (!cols.includes('description')) {
      await query("ALTER TABLE apps ADD COLUMN description TEXT NOT NULL DEFAULT ''");
    }
    if (!cols.includes('category')) {
      await query("ALTER TABLE apps ADD COLUMN category VARCHAR(100) NOT NULL DEFAULT 'Other'");
    }
    if (!cols.includes('screenshots')) {
      await query("ALTER TABLE apps ADD COLUMN screenshots TEXT");
    }
    if (!cols.includes('average_rating')) {
      await query("ALTER TABLE apps ADD COLUMN average_rating REAL DEFAULT 4.8");
    }
    if (!cols.includes('version')) {
      await query("ALTER TABLE apps ADD COLUMN version VARCHAR(50) NOT NULL DEFAULT '1.0'");
    }
  } else {
    // MySQL: use ADD COLUMN IF NOT EXISTS (supported in MySQL 8.0+)
    const migrations = [
      "ALTER TABLE apps ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT ''",
      "ALTER TABLE apps ADD COLUMN IF NOT EXISTS category VARCHAR(100) NOT NULL DEFAULT 'Other'",
      "ALTER TABLE apps ADD COLUMN IF NOT EXISTS version VARCHAR(50) NOT NULL DEFAULT '1.0'",
      "ALTER TABLE apps ADD COLUMN IF NOT EXISTS screenshots TEXT",
      "ALTER TABLE apps ADD COLUMN IF NOT EXISTS average_rating FLOAT DEFAULT 4.8",
    ];
    for (const sql of migrations) {
      try {
        await query(sql);
      } catch (err) {
        // Column already exists — safe to ignore
        if (!err.message.includes('Duplicate column')) throw err;
      }
    }
  }
}

async function initDb() {
  const isSqlite = DB_TYPE === 'sqlite';
  const createUsers = isSqlite ? CREATE_USERS_SQLITE : CREATE_USERS_MYSQL;
  const createApps  = isSqlite ? CREATE_APPS_SQLITE  : CREATE_APPS_MYSQL;

  await query(createUsers);
  await query(createApps);
  await migrateAppsTable();

  console.log('DB schema initialised (users, apps)');
}

async function seedDemoData() {
  const demoEmail = process.env.DEMO_ADMIN_EMAIL;
  if (!demoEmail) {
    console.warn('DEMO_ADMIN_EMAIL not set — skipping demo data seed');
    return;
  }

  // 1. Ensure uploads/apk/ directory and placeholder APK exist
  const uploadsDir = path.join(__dirname, '../../uploads/apk');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const apkPath = path.join(uploadsDir, 'demo-app.apk');
  if (!fs.existsSync(apkPath)) {
    fs.writeFileSync(apkPath, 'PLACEHOLDER_APK');
    console.log('Created placeholder uploads/apk/demo-app.apk');
  }

  // 2. Insert demo admin user if not present
  const userResult = await query(
    'SELECT uid FROM users WHERE email = ?',
    [demoEmail]
  );
  // SQLite returns an array directly; MySQL returns [rows, fields]
  const userRows = Array.isArray(userResult[0]) ? userResult[0] : userResult;
  if (userRows.length === 0) {
    await query(
      "INSERT INTO users (uid, email, role) VALUES (?, ?, 'administrator')",
      ['demo-admin', demoEmail]
    );
    console.log(`Seeded demo admin user: ${demoEmail}`);
  }

  // 3. Insert Demo Apps if not present
  const appsToSeed = [
    { 
      name: 'SynthCode Pro', 
      desc: 'Powerful visual IDE for android developers. Featuring real-time code preview and AI assistenza.', 
      cat: 'Productivity', 
      file: 'demo-app.apk',
      rating: 4.9,
      screenshots: JSON.stringify([
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600"
      ])
    },
    { 
      name: 'Void Runner', 
      desc: 'Inifinte runner game in space. Dodge obstacles and collect void shards.', 
      cat: 'Games', 
      file: 'demo-app.apk',
      rating: 4.6,
      screenshots: JSON.stringify([
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600"
      ])
    },
    { 
      name: 'GuardRail AI', 
      desc: 'Security scanner for your cloud apps. Ensure your infrastructure is rock solid.', 
      cat: 'Security', 
      file: 'demo-app.apk',
      rating: 4.8,
      screenshots: JSON.stringify([
        "https://images.unsplash.com/photo-1614064641913-6b71a30f10e4?w=800"
      ])
    },
    { 
      name: 'Prism Design', 
      desc: 'Graphic design tool for mobile interfaces. Create stunning UI on the go.', 
      cat: 'Creative Tools', 
      file: 'demo-app.apk',
      rating: 4.7,
      screenshots: JSON.stringify([
        "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=800"
      ])
    },
  ];

  for (const app of appsToSeed) {
    const appResult = await query(
      "SELECT id FROM apps WHERE name = ?",
      [app.name]
    );
    const appRows = Array.isArray(appResult[0]) ? appResult[0] : appResult;
    if (appRows.length === 0) {
      await query(
        "INSERT INTO apps (developer_uid, name, description, category, version, filename, screenshots, average_rating, status) VALUES (?, ?, ?, ?, '1.0', ?, ?, ?, 'approved')",
        ['demo-admin', app.name, app.desc, app.cat, app.file, app.screenshots, app.rating]
      );
      console.log(`Seeded app: ${app.name}`);
    }
  }
}

module.exports = { initDb, seedDemoData };
