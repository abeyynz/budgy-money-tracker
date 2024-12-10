const express = require('express');
const kategoriPengeluaranController = require('../controllers/kategoriPengeluaranController');
const { verifyToken } = require('../middleware/authMiddleware'); // Middleware autentikasi

const router = express.Router();
/**
 * @swagger
 * /api/kategori-pengeluaran:
 *   get:
 *     summary: Mendapatkan daftar semua kategori pengeluaran
 *     tags: [Kategori Pengeluaran]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar kategori pengeluaran berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nama:
 *                         type: string
 *                         example: "Makanan"
 *       401:
 *         description: Token tidak valid atau tidak ditemukan
 *       403:
 *         description: Akses ditolak, token tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 *   post:
 *     summary: Menambahkan kategori pengeluaran baru
 *     tags: [Kategori Pengeluaran]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 example: "Transportasi"
 *     responses:
 *       201:
 *         description: Kategori pengeluaran berhasil ditambahkan
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
 *                       example: 2
 *                     nama:
 *                       type: string
 *                       example: "Transportasi"
 *       400:
 *         description: Nama kategori harus diisi
 *       401:
 *         description: Token tidak valid atau tidak ditemukan
 *       403:
 *         description: Akses ditolak, token tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */

router.get('/', verifyToken, kategoriPengeluaranController.getCategories);
router.post('/', verifyToken, kategoriPengeluaranController.addCategory);

module.exports = router;
