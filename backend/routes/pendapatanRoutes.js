const express = require('express');
const pendapatanController = require('../controllers/pendapatanController');
const { verifyToken } = require('../middleware/authMiddleware'); // Middleware autentikasi

const router = express.Router();

router.get('/', verifyToken, pendapatanController.getPendapatan);
router.post('/', verifyToken, pendapatanController.addPendapatan);
router.put('/:id', verifyToken, pendapatanController.updatePendapatan);
router.delete('/:id', verifyToken, pendapatanController.deletePendapatan);

module.exports = router;
