const pool = require('../database/db');

// Mendapatkan rekomendasi terbaru untuk pengguna tertentu
const getLatestRekomendasiByUser = async (userId) => {
  
  const result = await pool.query(
    `
    SELECT id, nominal, tanggal
    FROM rekomendasi
    WHERE user_id = $1
    ORDER BY tanggal DESC
    LIMIT 1
    `,
    [userId]
  );
  return result.rows[0]; // Mengembalikan baris pertama (terbaru)
};

module.exports = {
  getLatestRekomendasiByUser,
};
