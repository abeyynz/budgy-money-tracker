const express = require('express');
const router = express.Router();
const rekomendasiController = require('../controllers/rekomendasiController');
const { verifyToken } = require('../middleware/authMiddleware');

// Mendapatkan rekomendasi terbaru untuk pengguna yang sedang login
router.get('/latest', verifyToken, rekomendasiController.getLatestRekomendasi);

module.exports = router;
