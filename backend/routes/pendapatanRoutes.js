const express = require('express');
const pendapatanController = require('../controllers/pendapatanController');
const { verifyToken } = require('../middleware/authMiddleware'); // Middleware autentikasi

const router = express.Router();
/**
 * @swagger
 * /api/pendapatan:
 *   get:
 *     summary: Mendapatkan semua pendapatan berdasarkan user ID
 *     tags: [Pendapatan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data pendapatan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nominal:
 *                     type: number
 *                     example: 5000000
 *                   tanggal:
 *                     type: string
 *                     example: "2024-12-06"
 *                   kategori:
 *                     type: string
 *                     example: "Gaji Bulanan"
 *                   user_id:
 *                     type: integer
 *                     example: 123
 *   post:
 *     summary: Menambahkan data pendapatan baru
 *     tags: [Pendapatan]
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
 *               kategoriId:
 *                 type: integer
 *                 example: 2
 *               tanggal:
 *                 type: string
 *                 example: "2024-12-06"
 *     responses:
 *       201:
 *         description: Data pendapatan berhasil ditambahkan
 *   put:
 *     summary: Memperbarui data pendapatan berdasarkan ID
 *     tags: [Pendapatan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pendapatan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nominal:
 *                 type: number
 *                 example: 6000000
 *               kategoriId:
 *                 type: integer
 *                 example: 3
 *               tanggal:
 *                 type: string
 *                 example: "2024-12-10"
 *     responses:
 *       200:
 *         description: Data pendapatan berhasil diperbarui
 *   delete:
 *     summary: Menghapus data pendapatan berdasarkan ID
 *     tags: [Pendapatan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pendapatan
 *     responses:
 *       200:
 *         description: Data pendapatan berhasil dihapus
 */

router.get('/', verifyToken, pendapatanController.getPendapatan);
router.post('/', verifyToken, pendapatanController.addPendapatan);
router.put('/:id', verifyToken, pendapatanController.updatePendapatan);
router.delete('/:id', verifyToken, pendapatanController.deletePendapatan);

module.exports = router;
