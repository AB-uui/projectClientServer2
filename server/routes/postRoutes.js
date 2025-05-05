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

const { createPost, getAllPosts } = require('../controllers/postController');
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

module.exports = router;
