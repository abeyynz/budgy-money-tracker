const pool = require('../database/db');

// Mendapatkan semua kategori pengeluaran
const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM kategori_pengeluaran');
  return result.rows;
};

// Menambahkan kategori pengeluaran baru
const addCategory = async (nama) => {
  const result = await pool.query(
    'INSERT INTO kategori_pengeluaran (nama) VALUES ($1) RETURNING *',
    [nama]
  );
  return result.rows[0];
};

module.exports = {
  getAllCategories,
  addCategory,
};
