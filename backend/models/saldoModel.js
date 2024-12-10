const pool = require('../database/db');

// Mendapatkan saldo pengguna berdasarkan user_id
const getSaldo = async (userId) => {
  const result = await pool.query('SELECT * FROM saldo WHERE user_id = $1 ORDER BY tanggal DESC LIMIT 1', [userId]);
  return result.rows[0];  // Mengembalikan saldo terakhir untuk pengguna
};

// Menambahkan saldo baru (hanya digunakan setelah pendapatan atau pengeluaran)
const addSaldo = async (nominal, userId, tanggal) => {
  const client = await pool.connect();
  try {
    // Mulai transaksi
    await client.query('BEGIN');

    // Dapatkan saldo terakhir
    const lastSaldoResult = await client.query(
      'SELECT nominal FROM saldo WHERE user_id = $1 ORDER BY tanggal DESC LIMIT 1',
      [userId]
    );
    const lastSaldo = lastSaldoResult.rows[0]?.nominal || 0;

    // Hitung saldo baru
    const newSaldo = lastSaldo + nominal;

    // Tambahkan saldo baru
    const result = await client.query(
      'INSERT INTO saldo (nominal, user_id, tanggal) VALUES ($1, $2, $3) RETURNING *',
      [newSaldo, userId, tanggal]
    );

    // Commit transaksi
    await client.query('COMMIT');

    return result.rows[0]; // Mengembalikan saldo baru
  } catch (error) {
    // Rollback jika ada kesalahan
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};


module.exports = {
  getSaldo,
  addSaldo,
};
