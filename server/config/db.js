/*
 * Database Adapter
 * Exports a unified query(sql, params) function.
 * DB_TYPE=mysql (default): uses mysql2 connection pool
 * DB_TYPE=sqlite: uses better-sqlite3 wrapped in a Promise
 */

const DB_TYPE = process.env.DB_TYPE || 'mysql';

let query;

if (DB_TYPE === 'sqlite') {
  const Database = require('better-sqlite3');
  const dbPath = process.env.DB_PATH || './devmarket.sqlite';
  const db = new Database(dbPath);

  // Wrap synchronous better-sqlite3 API in a Promise for a uniform async interface
  query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      try {
        const stmt = db.prepare(sql);
        // Determine statement type by the first keyword
        const verb = sql.trim().split(/\s+/)[0].toUpperCase();
        if (verb === 'SELECT' || verb === 'PRAGMA') {
          resolve(stmt.all(params));
        } else {
          const info = stmt.run(params);
          resolve(info);
        }
      } catch (err) {
        reject(err);
      }
    });
  };
} else {
  // MySQL mode (default)
  const mysql = require('mysql2/promise');

  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  // Verify connectivity at startup — exit if the DB is unreachable
  pool.getConnection()
    .then((conn) => {
      console.log('MySQL connected successfully');
      conn.release();
    })
    .catch((err) => {
      console.error('MySQL connection error:', err.message);
      process.exit(1);
    });

  query = (sql, params) => pool.execute(sql, params);
}

module.exports = { query };
