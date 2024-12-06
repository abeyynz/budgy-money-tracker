const pool = require('../database/db');

// Mendapatkan nilai target untuk pengguna tertentu
const getTargetByUser = async (userId) => {
  const result = await pool.query(
    'SELECT id, nominal FROM target WHERE user_id = $1',
    [userId]
  );
  return result.rows[0]; // Mengembalikan satu data target
};

// Mengupdate nilai target untuk pengguna tertentu
const updateTargetByUser = async (userId, nominal) => {
  const result = await pool.query(
    `
    UPDATE target
    SET nominal = $1
    WHERE user_id = $2
    RETURNING id, nominal
    `,
    [nominal, userId]
  );
  return result.rows[0]; // Mengembalikan data yang telah diperbarui
};

module.exports = {
  getTargetByUser,
  updateTargetByUser,
};
