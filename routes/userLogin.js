const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Example route for user login
router.post('/', authController.login);
router.post('/admin', authController.loginAdmin);

module.exports = router;
