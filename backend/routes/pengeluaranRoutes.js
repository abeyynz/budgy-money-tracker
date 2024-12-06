const express = require('express');
const pengeluaranController = require('../controllers/pengeluaranController');
const { verifyToken } = require('../middleware/authMiddleware'); // Middleware autentikasi

const router = express.Router();
router.get('/', verifyToken, pengeluaranController.getPengeluaran);
router.post('/', verifyToken, pengeluaranController.addPengeluaran);
router.put('/:id', verifyToken, pengeluaranController.updatePengeluaran);
router.delete('/:id', verifyToken, pengeluaranController.deletePengeluaran);

module.exports = router;
