const pool = require('../database/db');

// Fungsi untuk mendapatkan user berdasarkan nama
const getUserByName = async (nama) => {
  const result = await pool.query('SELECT * FROM "user" WHERE nama = $1', [nama]);
  return result.rows[0];
};

// Fungsi untuk membuat user baru
const createUser = async (nama, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO "user" (nama, password) VALUES ($1, $2) RETURNING *',
    [nama, hashedPassword]
  );
  return result.rows[0];
};

module.exports = {
  getUserByName,
  createUser,
};
