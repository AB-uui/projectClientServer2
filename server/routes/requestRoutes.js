const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: API for managing requests
 */

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new request
 *     tags: [Requests]
 *     description: Add a new request to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               question:
 *                 type: string
 *     responses:
 *       201:
 *         description: Request created successfully.
 *       400:
 *         description: Missing required fields or validation error.
 *       500:
 *         description: Server error.
 */
router.post('/', requestController.createRequest);

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Fetch all requests
 *     tags: [Requests]
 *     description: Retrieve all requests from the system with pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page.
 *     responses:
 *       200:
 *         description: A list of requests with pagination details.
 *       404:
 *         description: No requests found.
 *       500:
 *         description: Server error.
 */
router.get('/', requestController.getAllRequests);

/**
 * @swagger
 * /api/requests/untreated:
 *   get:
 *     summary: Fetch all untreated requests
 *     tags: [Requests]
 *     description: Retrieve all untreated requests from the system with pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page.
 *     responses:
 *       200:
 *         description: A list of untreated requests with pagination details.
 *       404:
 *         description: No untreated requests found.
 *       500:
 *         description: Server error.
 */
router.get('/untreated', requestController.getUntreatedRequests);

/**
 * @swagger
 * /api/requests/{id}:
 *   put:
 *     summary: Mark a request as treated
 *     tags: [Requests]
 *     description: Update the status of a request to treated.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               treated:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Request updated successfully.
 *       404:
 *         description: Request not found.
 *       500:
 *         description: Server error.
 */
router.put('/:id', requestController.updateTreated);

/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     summary: Delete an existing request
 *     tags: [Requests]
 *     description: Remove a request from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request to delete.
 *     responses:
 *       200:
 *         description: Request deleted successfully.
 *       404:
 *         description: Request not found.
 *       500:
 *         description: Server error.
 */
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
