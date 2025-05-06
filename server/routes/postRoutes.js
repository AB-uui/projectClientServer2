// const express = require('express');
// const router = express.Router();

// const { createPost, getAllPosts} = require('../controllers/postController');
// const upload = require('../middleware/imagesMiddleware');   // הוספת middleware של העלאת קבצים

// // POST /api/posts - יצירת פוסט עם תמונה
// router.post('/', upload.single('image'), createPost);

// // GET /api/posts?page=1&limit=6 - שליפת כל הפוסטים
// router.get('/', getAllPosts); 

// module.exports = router;
const express = require('express');
const router = express.Router();

const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const upload = require('../middleware/imagesMiddleware'); // Middleware for file uploads

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API for managing posts
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post with an image
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', upload.single('image'), createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of posts per page
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       400:
 *         description: Invalid request
 */
router.get('/', getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       404:
 *         description: Post not found
 */
router.get('/:id', getPostById);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Post not found
 */
router.put('/:id', updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete('/:id', deletePost);

module.exports = router;
