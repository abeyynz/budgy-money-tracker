const express = require('express');
const router = express.Router();
const targetController = require('../controllers/targetController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, targetController.getTarget);

router.put('/', verifyToken, targetController.updateTarget);

module.exports = router;
