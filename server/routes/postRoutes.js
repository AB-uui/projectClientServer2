const express = require('express');
const router = express.Router();

const { createPost, getAllPosts} = require('../controllers/postController');
const upload = require('../middleware/imagesMiddleware');   // הוספת middleware של העלאת קבצים

// POST /api/posts - יצירת פוסט עם תמונה
router.post('/', upload.single('image'), createPost);

// GET /api/posts?page=1&limit=6 - שליפת כל הפוסטים
router.get('/', getAllPosts); 

module.exports = router;
