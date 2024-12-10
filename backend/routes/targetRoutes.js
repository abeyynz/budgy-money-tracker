const express = require('express');
const router = express.Router();
const targetController = require('../controllers/targetController');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/target:
 *   get:
 *     summary: Mendapatkan nilai target untuk pengguna tertentu
 *     tags: [Target]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data target berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nominal:
 *                       type: number
 *                       example: 5000000
 *                     tanggal:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-10"
 *       401:
 *         description: Token tidak valid atau tidak ditemukan
 *       403:
 *         description: Akses ditolak, token tidak valid
 *       404:
 *         description: Target tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 *   post:
 *     summary: Menambahkan target baru untuk pengguna tertentu
 *     tags: [Target]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nominal:
 *                 type: number
 *                 example: 5000000
 *               tanggal:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-10"
 *     responses:
 *       201:
 *         description: Target berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nominal:
 *                       type: number
 *                       example: 5000000
 *                     tanggal:
 *                       type: string
 *                       format: date
 *                       example: "2024-12-10"
 *       400:
 *         description: Data yang dikirim tidak valid
 *       401:
 *         description: Token tidak valid atau tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */

router.get('/', verifyToken, targetController.getTarget);
router.post('/', verifyToken, targetController.addTarget);
router.put('/', verifyToken, targetController.updateTarget); // Tetap ada di API, tidak didokumentasikan

module.exports = router;
