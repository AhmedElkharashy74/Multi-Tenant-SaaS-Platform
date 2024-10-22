const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/authorize');


// Get all users with pagination and filtering
router.get('/', authenticate, authorize(['moderator']), UserController.findAll);

// Update a user by ID
router.put('/:id', authenticate, authorize(['admin', 'user']), UserController.update);

// Delete a user by ID
router.delete('/:id', authenticate, authorize(['admin' , 'moderator']), UserController.delete);

module.exports = router;
