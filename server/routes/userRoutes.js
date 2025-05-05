const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const verifyRole = require('../middleware/verifyRole');
const {
  getProfile,
  updateProfile,
  requestProvider,
  getAllUsers,
  toggleUserActive,
  getAllProviderRequests,
  updateProviderStatus
} = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profile routes
 */

router.use(verifyJWT);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: User not found
 */
router.get('/profile', getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: User not found
 */
router.put('/profile', updateProfile);

/**
 * @swagger
 * /api/users/provider-request:
 *   post:
 *     summary: Request to become a provider
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               logoUrl:
 *                 type: string
 *               toolUrl:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               signature:
 *                 type: string
 *     responses:
 *       201:
 *         description: Provider request submitted successfully
 *       500:
 *         description: Error submitting provider request
 */
router.post('/provider-request', requestProvider);

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *       403:
 *         description: Access denied
 */
router.get('/all', verifyRole('admin'), getAllUsers);

/**
 * @swagger
 * /api/users/{userId}/toggle-active:
 *   patch:
 *     summary: Toggle user active status (admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User status toggled successfully
 *       404:
 *         description: User not found
 */
router.patch('/:userId/toggle-active', verifyRole('admin'), toggleUserActive);

/**
 * @swagger
 * /api/users/provider-requests:
 *   get:
 *     summary: Get all provider requests (admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of provider requests
 *       403:
 *         description: Access denied
 */
router.get('/provider-requests', verifyRole('admin'), getAllProviderRequests);

/**
 * @swagger
 * /api/users/provider-request/{id}/status:
 *   patch:
 *     summary: Update provider request status (admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *     responses:
 *       200:
 *         description: Provider request status updated successfully
 *       404:
 *         description: Provider request not found
 */
router.patch('/provider-request/:id/status', verifyRole('admin'), updateProviderStatus);

module.exports = router;
