const pool = require('../database/db');
// const { addSaldo } = require('./saldoModel');

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
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Tambahkan pendapatan baru
    const resultPendapatan = await client.query(
      'INSERT INTO pendapatan (nominal, kategori_id, user_id, tanggal) VALUES ($1, $2, $3, $4) RETURNING *',
      [nominal, kategoriId, userId, tanggal]
    );

    // Perbarui saldo
    // await addSaldo(nominal, userId, tanggal);

    await client.query('COMMIT');

    return resultPendapatan.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
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
