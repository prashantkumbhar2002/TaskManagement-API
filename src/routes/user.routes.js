const express = require('express');
const UserController = require('../controllers/users.controller.js');
const { body } = require('express-validator');
const authenticateUser  = require('../middlewares/auth.middleware.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to user management
 */
// Registration route
/**
 * Register a new user.
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided credentials.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               fullName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 */
router.route('/register')
.post([
    body('username').notEmpty().withMessage('Username is required'),
    body('fullName').notEmpty().withMessage('Full Name is required'),
    body('password').notEmpty().withMessage('Password is required')
],UserController.registerUser);

// Login route
 /**
 * Login a user with username and password.
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login user
 *     description: Login a user with the provided username and password.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged-in Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 loggedInUser:
 *                   type: object
 */
router.route('/login')
.post([
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
],UserController.loginUser);

// Logout route
 /**
 * Logout the currently authenticated user.
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout user
 *     description: Logout the currently authenticated user.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.route('/logout')
.post(authenticateUser, UserController.logoutUser);

// Refresh access token route
/**
 * Refresh access token using refresh token.
 * @swagger
 * /api/v1/users/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Refresh access token using a valid refresh token.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Access token refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 accessToken:
 *                   type: string
 */
router.route('/refresh-token')
.post(UserController.refreshAccessToken);

/**
 * @swagger
 * /api/v1/users/change-password:
 *   put:
 *     summary: Change current user's password
 *     description: Change the password of the currently authenticated user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid password or user not found
 *       500:
 *         description: Server error
 */
router.route('/change-password')
.post([
    body('oldPassword').notEmpty().withMessage('Old Password is required'),
    body('newPassword').notEmpty().withMessage('New Password is required')
],authenticateUser, UserController.changeCurrentPassword);

// Get current user route
/**
 * Get details of the currently authenticated user.
 * @swagger
 * /api/v1/users/current-user:
 *   get:
 *     summary: Get current user details
 *     description: Get details of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *       500:
 *         description: Server error
 */
router.route('/current-user')
.get(authenticateUser, UserController.getCurrentUser);

// Update account details route
// router.put('/update-account', authenticateUser, UserController.updateAccountDetails);

module.exports = router;
