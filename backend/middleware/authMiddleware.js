const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Ambil token dari header Authorization

  if (!token) {
    return res.status(403).json({ success: false, message: 'Akses ditolak, token tidak ditemukan.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token tidak valid' });
    }
    req.user = decoded; // Menyimpan data user dalam req.user
    next(); // Lanjutkan ke middleware berikutnya atau handler
  });
};

module.exports = { verifyToken };
