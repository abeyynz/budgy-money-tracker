const pool = require('../database/db');

// Mendapatkan semua kategori pendapatan
const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM kategori_pendapatan');
  return result.rows;
};

// Menambahkan kategori pendapatan baru
const addCategory = async (nama) => {
  const result = await pool.query(
    'INSERT INTO kategori_pendapatan (nama) VALUES ($1) RETURNING *',
    [nama]
  );
  return result.rows[0];
};

module.exports = {
  getAllCategories,
  addCategory,
};
