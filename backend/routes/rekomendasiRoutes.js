const express = require('express');
const router = express.Router();
const rekomendasiController = require('../controllers/rekomendasiController');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/rekomendasi:
 *   get:
 *     summary: Mendapatkan rekomendasi terbaru untuk pengguna tertentu
 *     tags: [Rekomendasi]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data rekomendasi terbaru berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nominal:
 *                   type: number
 *                   example: 100000
 *                 tanggal:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-06"
 *       401:
 *         description: Token tidak valid atau tidak ditemukan
 *       403:
 *         description: Akses ditolak, token tidak valid
 *       404:
 *         description: Rekomendasi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */

router.get('/latest', verifyToken, rekomendasiController.getLatestRekomendasi);

module.exports = router;
