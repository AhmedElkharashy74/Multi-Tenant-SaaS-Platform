const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// User registration
router.post('/register', UserController.create);

// User login
router.post('/login', UserController.login);

module.exports = router