const express = require('express');
const UserController = require('../controllers/users.controller.js');
const authenticateUser  = require('../middlewares/auth.middleware.js');

const router = express.Router();

// Registration route
router.route('/register')
.post(UserController.registerUser);

// Login route
router.route('/login')
.post(UserController.loginUser);

// Logout route
router.route('/logout')
.post(authenticateUser, UserController.logoutUser);

// Refresh access token route
router.route('/refresh-token')
.post(UserController.refreshAccessToken);

// Change password route
router.route('/change-password')
.post(authenticateUser, UserController.changeCurrentPassword);

// Get current user route
router.route('/current-user')
.get(authenticateUser, UserController.getCurrentUser);

// Update account details route
// router.put('/update-account', authenticateUser, UserController.updateAccountDetails);

module.exports = router;
