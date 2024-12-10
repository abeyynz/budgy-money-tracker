const express = require('express');
const kategoriPendapatanController = require('../controllers/kategoriPendapatanController');
const { verifyToken } = require('../middleware/authMiddleware'); // Middleware autentikasi

const router = express.Router();
/**
 * @swagger
 * /api/kategori-pendapatan:
 *   get:
 *     summary: Mendapatkan daftar semua kategori pendapatan
 *     tags: [Kategori Pendapatan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar kategori pendapatan berhasil diambil
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
 *                         example: "Gaji"
 *       401:
 *         description: Token tidak valid atau tidak ditemukan
 *       403:
 *         description: Akses ditolak, token tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 *   post:
 *     summary: Menambahkan kategori pendapatan baru
 *     tags: [Kategori Pendapatan]
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
 *                 example: "Investasi"
 *     responses:
 *       201:
 *         description: Kategori pendapatan berhasil ditambahkan
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
 *                       example: "Investasi"
 *       400:
 *         description: Nama kategori harus diisi
 *       401:
 *         description: Token tidak valid atau tidak ditemukan
 *       403:
 *         description: Akses ditolak, token tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */

router.get('/', verifyToken, kategoriPendapatanController.getCategories);
router.post('/', verifyToken, kategoriPendapatanController.addCategory);

module.exports = router;
