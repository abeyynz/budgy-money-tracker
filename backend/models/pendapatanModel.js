const pool = require('../database/db');

// Mendapatkan semua pendapatan berdasarkan user
const getAllPendapatan = async (userId) => {
  const result = await pool.query(
    'SELECT p.id, p.nominal, p.tanggal, k.nama AS kategori, p.user_id FROM pendapatan p JOIN kategori_pendapatan k ON p.kategori_id = k.id WHERE p.user_id = $1',
    [userId]
  );
  return result.rows;
};

// Menambahkan pendapatan baru
const addPendapatan = async (nominal, kategoriId, userId, tanggal) => {
  const result = await pool.query(
    'INSERT INTO pendapatan (nominal, kategori_id, user_id, tanggal) VALUES ($1, $2, $3, $4) RETURNING *',
    [nominal, kategoriId, userId, tanggal]
  );
  return result.rows[0];
};

// Mengupdate pendapatan
const updatePendapatan = async (id, nominal, kategoriId, tanggal) => {
  const result = await pool.query(
    'UPDATE pendapatan SET nominal = $1, kategori_id = $2, tanggal = $3 WHERE id = $4 RETURNING *',
    [nominal, kategoriId, tanggal, id]
  );
  return result.rows[0];
};

// Menghapus pendapatan
const deletePendapatan = async (id) => {
  const result = await pool.query('DELETE FROM pendapatan WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllPendapatan,
  addPendapatan,
  updatePendapatan,
  deletePendapatan,
};
