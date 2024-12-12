const express = require('express');
const pengeluaranController = require('../controllers/pengeluaranController');
const { verifyToken } = require('../middleware/authMiddleware'); // Middleware autentikasi

const router = express.Router();
/**
 * @swagger
 * /api/pengeluaran:
 *   get:
 *     summary: Mendapatkan semua pengeluaran berdasarkan user ID
 *     tags: [Pengeluaran]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data pengeluaran berhasil diambil
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
 *                     example: 300000
 *                   tanggal:
 *                     type: string
 *                     example: "2024-12-06"
 *                   kategori:
 *                     type: string
 *                     example: "Makan"
 *                   user_id:
 *                     type: integer
 *                     example: 123
 *   post:
 *     summary: Menambahkan data pengeluaran baru
 *     tags: [Pengeluaran]
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
 *                 example: 300000
 *               kategoriId:
 *                 type: integer

 *               tanggal:
 *                 type: string
 *                 example: "2024-12-06"
 *     responses:
 *       201:
 *         description: Data pengeluaran berhasil ditambahkan
 *   
 */

router.get('/', verifyToken, pengeluaranController.getPengeluaran);
router.post('/', verifyToken, pengeluaranController.addPengeluaran);

/**
 * @swagger
 * /api/pengeluaran/{id}:
 *   put:
 *     summary: Memperbarui data pengeluaran berdasarkan ID
 *     tags: [Pengeluaran]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pengeluaran
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nominal:
 *                 type: number
 *                 example: 400000
 *               kategoriId:
 *                 type: integer
 *                 example: 3
 *               tanggal:
 *                 type: string
 *                 example: "2024-12-10"
 *     responses:
 *       200:
 *         description: Data pengeluaran berhasil diperbarui
 *   delete:
 *     summary: Menghapus data pengeluaran berdasarkan ID
 *     tags: [Pengeluaran]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pengeluaran
 *     responses:
 *       200:
 *         description: Data pengeluaran berhasil dihapus
 */ 

router.put('/:id', verifyToken, pengeluaranController.updatePengeluaran);
router.delete('/:id', verifyToken, pengeluaranController.deletePengeluaran);

module.exports = router;
