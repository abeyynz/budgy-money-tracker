const pool = require('../database/db');

// Mendapatkan semua pengeluaran berdasarkan user
const getAllPengeluaran = async (userId) => {
  const result = await pool.query(
    'SELECT p.id, p.nominal, p.tanggal, k.nama AS kategori, p.user_id FROM pengeluaran p JOIN kategori_pengeluaran k ON p.kategori_id = k.id WHERE p.user_id = $1',
    [userId]
  );
  return result.rows;
};

// Menambahkan pengeluaran baru
const addPengeluaran = async (nominal, kategoriId, userId, tanggal) => {
  const result = await pool.query(
    'INSERT INTO pengeluaran (nominal, kategori_id, user_id, tanggal) VALUES ($1, $2, $3, $4) RETURNING *',
    [nominal, kategoriId, userId, tanggal]
  );
  return result.rows[0];
};

// Mengupdate pengeluaran
const updatePengeluaran = async (id, nominal, kategoriId, tanggal) => {
  const result = await pool.query(
    'UPDATE pengeluaran SET nominal = $1, kategori_id = $2, tanggal = $3 WHERE id = $4 RETURNING *',
    [nominal, kategoriId, tanggal, id]
  );
  return result.rows[0];
};

// Menghapus pengeluaran
const deletePengeluaran = async (id) => {
  const result = await pool.query('DELETE FROM pengeluaran WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllPengeluaran,
  addPengeluaran,
  updatePengeluaran,
  deletePengeluaran,
};
