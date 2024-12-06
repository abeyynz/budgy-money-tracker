const express = require('express');
const kategoriPengeluaranController = require('../controllers/kategoriPengeluaranController');
const { verifyToken } = require('../middleware/authMiddleware'); // Middleware autentikasi

const router = express.Router();

router.get('/', verifyToken, kategoriPengeluaranController.getCategories);
router.post('/', verifyToken, kategoriPengeluaranController.addCategory);

module.exports = router;
