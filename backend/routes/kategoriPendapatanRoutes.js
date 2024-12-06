const express = require('express');
const kategoriPendapatanController = require('../controllers/kategoriPendapatanController');
const { verifyToken } = require('../middleware/authMiddleware'); // Middleware autentikasi

const router = express.Router();

router.get('/', verifyToken, kategoriPendapatanController.getCategories);
router.post('/', verifyToken, kategoriPendapatanController.addCategory);

module.exports = router;
