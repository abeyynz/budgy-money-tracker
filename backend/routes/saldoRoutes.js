const express = require('express');
const saldoController = require('../controllers/saldoController');
const { verifyToken } = require('../middleware/authMiddleware');  // Middleware autentikasi

const router = express.Router();

router.get('/', verifyToken, saldoController.getSaldo);

// router.post('/', verifyToken, saldoController.addSaldo);

module.exports = router;
