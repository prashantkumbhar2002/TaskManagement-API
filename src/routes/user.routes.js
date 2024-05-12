const express = require('express');
const UserController = require('../controllers/users.controller.js');
const { body } = require('express-validator');
const authenticateUser  = require('../middlewares/auth.middleware.js');

const router = express.Router();

// Registration route
router.route('/register')
.post([
    body('username').notEmpty().withMessage('Username is required'),
    body('fullName').notEmpty().withMessage('Full Name is required'),
    body('password').notEmpty().withMessage('Password is required')
],UserController.registerUser);

// Login route
router.route('/login')
.post([
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
],UserController.loginUser);

// Logout route
router.route('/logout')
.post(authenticateUser, UserController.logoutUser);

// Refresh access token route
router.route('/refresh-token')
.post(UserController.refreshAccessToken);

// Change password route
router.route('/change-password')
.post([
    body('oldPassword').notEmpty().withMessage('Old Password is required'),
    body('newPassword').notEmpty().withMessage('New Password is required')
],authenticateUser, UserController.changeCurrentPassword);

// Get current user route
router.route('/current-user')
.get(authenticateUser, UserController.getCurrentUser);

// Update account details route
// router.put('/update-account', authenticateUser, UserController.updateAccountDetails);

module.exports = router;
