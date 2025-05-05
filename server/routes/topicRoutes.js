const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const upload = require('../middleware/upload');

/**
 * @swagger
 * tags:
 *   name: Topics
 *   description: API for managing topics
 */

/**
 * @swagger
 * /api/topics:
 *   get:
 *     summary: Retrieve all topics
 *     tags: [Topics]
 *     responses:
 *       200:
 *         description: List of topics retrieved successfully
 *       400:
 *         description: No topics found
 */
router.get('/', topicController.getAllTopics);

/**
 * @swagger
 * /api/topics/tools:
 *   get:
 *     summary: Retrieve tools by topic
 *     tags: [Topics]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Tools retrieved successfully
 *       404:
 *         description: Topic or tools not found
 */
router.get('/tools', topicController.getTopicWithTools);

/**
 * @swagger
 * /api/topics:
 *   post:
 *     summary: Create a new topic
 *     tags: [Topics]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               iconTools:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Topic created successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Duplicate category or default topic already exists
 */
router.post('/', upload.single('image'), topicController.createTopic);

/**
 * @swagger
 * /api/topics/{id}:
 *   put:
 *     summary: Update an existing topic
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               iconTools:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Topic updated successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Topic not found
 *       409:
 *         description: Duplicate category
 */
router.put('/:id', upload.single('image'), topicController.updateTopic);

/**
 * @swagger
 * /api/topics/{id}:
 *   delete:
 *     summary: Delete a topic
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Topic deleted successfully
 *       404:
 *         description: Topic not found
 */
router.delete('/:id', topicController.deleteTopic);

module.exports = router;
