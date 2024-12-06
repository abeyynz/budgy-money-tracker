const pool = require('../database/db');

// Mendapatkan saldo pengguna berdasarkan user_id
const getSaldo = async (userId) => {
  const result = await pool.query('SELECT * FROM saldo WHERE user_id = $1 ORDER BY tanggal DESC LIMIT 1', [userId]);
  return result.rows[0];  // Mengembalikan saldo terakhir untuk pengguna
};

// Menambahkan saldo baru (hanya digunakan setelah pendapatan atau pengeluaran)
const addSaldo = async (nominal, userId, tanggal) => {
  const result = await pool.query(
    'INSERT INTO saldo (nominal, user_id, tanggal) VALUES ($1, $2, $3) RETURNING *',
    [nominal, userId, tanggal]
  );
  return result.rows[0];  // Mengembalikan saldo yang baru ditambahkan
};

module.exports = {
  getSaldo,
  addSaldo,
};
