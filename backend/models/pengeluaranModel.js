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
  const client = await pool.connect();
  try {
    // Mulai transaksi
    await client.query('BEGIN');

    // Tambahkan pengeluaran baru
    const resultPengeluaran = await client.query(
      'INSERT INTO pengeluaran (nominal, kategori_id, user_id, tanggal) VALUES ($1, $2, $3, $4) RETURNING *',
      [nominal, kategoriId, userId, tanggal]
    );

    // // Dapatkan saldo terakhir
    // const lastSaldoResult = await client.query(
    //   'SELECT nominal FROM saldo WHERE user_id = $1 ORDER BY tanggal DESC LIMIT 1',
    //   [userId]
    // );
    // const lastSaldo = lastSaldoResult.rows[0]?.nominal || 0;

    // // Hitung saldo baru dengan mengurangi pengeluaran
    // const newSaldo = lastSaldo - nominal;

    // // Validasi jika saldo tidak boleh negatif
    // if (newSaldo < 0) {
    //   throw new Error('Saldo tidak mencukupi untuk melakukan pengeluaran.');
    // }

    // // Tambahkan saldo baru
    // await client.query(
    //   'INSERT INTO saldo (nominal, user_id, tanggal) VALUES ($1, $2, $3)',
    //   [newSaldo, userId, tanggal]
    // );

    // Commit transaksi
    await client.query('COMMIT');

    return resultPengeluaran.rows[0]; // Kembalikan data pengeluaran baru
  } catch (error) {
    // Rollback jika ada kesalahan
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
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
