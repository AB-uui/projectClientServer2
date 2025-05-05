const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');

/**
 * @swagger
 * tags:
 *   name: Tools
 *   description: API for managing tools
 */

/**
 * @swagger
 * /api/tools:
 *   get:
 *     summary: Fetch all tools
 *     tags: 
 *       - Tools
 *     description: Retrieve all tools with optional pagination.
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
 *         description: A list of tools with pagination details.
 *       400:
 *         description: No tools found.
 *       500:
 *         description: Server error.
 */
router.get('/', toolController.getAllTools);

/**
 * @swagger
 * /api/tools:
 *   post:
 *     summary: Create a new tool
 *     tags: 
 *       - Tools
 *     description: Add a new tool to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               descriptionUnique:
 *                 type: string
 *               logoOwners:
 *                 type: string
 *               url:
 *                 type: string
 *               isOpenSource:
 *                 type: boolean
 *               sourceCodeUrl:
 *                 type: string
 *               linkOurGuide:
 *                 type: string
 *               linkOurVideo:
 *                 type: string
 *               topic:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tool created successfully.
 *       400:
 *         description: Missing required fields or validation error.
 *       500:
 *         description: Server error.
 */
router.post('/', toolController.createTool);

/**
 * @swagger
 * /api/tools/{id}:
 *   put:
 *     summary: Update an existing tool
 *     tags: 
 *       - Tools
 *     description: Modify the details of an existing tool.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tool to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               descriptionUnique:
 *                 type: string
 *               logoOwners:
 *                 type: string
 *               url:
 *                 type: string
 *               isOpenSource:
 *                 type: boolean
 *               sourceCodeUrl:
 *                 type: string
 *               linkOurGuide:
 *                 type: string
 *               linkOurVideo:
 *                 type: string
 *               topic:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tool updated successfully.
 *       400:
 *         description: Missing required fields or validation error.
 *       404:
 *         description: Tool not found.
 *       500:
 *         description: Server error.
 */
router.put('/:id', toolController.updateTool);

/**
 * @swagger
 * /api/tools/{id}:
 *   delete:
 *     summary: Delete an existing tool
 *     tags: 
 *       - Tools
 *     description: Remove a tool from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tool to delete.
 *     responses:
 *       200:
 *         description: Tool deleted successfully.
 *       404:
 *         description: Tool not found.
 *       500:
 *         description: Server error.
 */
router.delete('/:id', toolController.deleteTool);

module.exports = router;
