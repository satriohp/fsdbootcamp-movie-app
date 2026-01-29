require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Koneksi Database Gagal:', err.stack);
  } else {
    console.log('Koneksi Database Berhasil pada:', res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};