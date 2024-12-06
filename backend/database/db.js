const { Pool } = require('pg'); 
require('dotenv').config(); 

// Konfigurasi koneksi database
const pool = new Pool({
  host: process.env.DB_HOST,     
  port: process.env.DB_PORT,    
  user: process.env.DB_USER,     
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
});

// Tes koneksi ke database
pool.connect((err, client, release) => {
  if (err) {
    console.error('Koneksi ke database gagal:', err.stack);
  } else {
    console.log('Koneksi ke database berhasil!');
  }
  release(); 
});

// Ekspor db untuk digunakan di model
module.exports = pool;
