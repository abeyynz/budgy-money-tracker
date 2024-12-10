const express = require('express');
const saldoController = require('../controllers/saldoController');
const { verifyToken } = require('../middleware/authMiddleware');  // Middleware autentikasi

const router = express.Router();

/**
 * @swagger
 * /api/saldo:
 *   get:
 *     summary: Mendapatkan saldo terakhir untuk pengguna tertentu
 *     tags: [Saldo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Saldo berhasil diambil
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
 *                   example: 1000000
 *                 user_id:
 *                   type: integer
 *                   example: 2
 *                 tanggal:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-06"
 *       401:
 *         description: Token tidak valid atau tidak ditemukan
 *       403:
 *         description: Akses ditolak, token tidak valid
 *       404:
 *         description: Saldo tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */

router.get('/', verifyToken, saldoController.getSaldo);

// router.post('/', verifyToken, saldoController.addSaldo);

module.exports = router;
