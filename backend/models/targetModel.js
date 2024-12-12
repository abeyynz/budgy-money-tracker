const pool = require('../database/db');

// Mendapatkan nilai target untuk pengguna tertentu
const getTargetByUser = async (userId) => {
  const result = await pool.query(
    'SELECT id, nominal, tanggal FROM target WHERE user_id = $1',
    [userId]
  );
  return result.rows;
};

// Menambahkan target untuk pengguna tertentu
const addTarget = async (userId, nominal, tanggal) => {
  const result = await pool.query(
    `
    INSERT INTO target (user_id, nominal, tanggal)
    VALUES ($1, $2, $3)
    RETURNING id, user_id, nominal, tanggal
    `,
    [userId, nominal, tanggal]
  );
  return result.rows[0]; // Mengembalikan data yang baru ditambahkan
};

// Mengupdate nilai target untuk pengguna tertentu
const updateTargetByUser = async (userId, nominal, tanggal) => {
  const result = await pool.query(
    `
    UPDATE target
    SET nominal = $1, tanggal = $2
    WHERE user_id = $3
    RETURNING id, nominal, tanggal
    `,
    [nominal, tanggal, userId]
  );
  return result.rows[0]; // Mengembalikan data yang telah diperbarui
};

module.exports = {
  getTargetByUser,
  addTarget,
  updateTargetByUser,
};
