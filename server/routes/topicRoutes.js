const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const upload = require('../middleware/upload');

// GET /api/topics - שליפת כל הנושאים
router.get('/', topicController.getAllTopics);
// GET /api/topics/tools?id=123&page=1&limit=6 - שליפת כלים לפי נושא
router.get('/tools', topicController.getTopicWithTools);
// POST /api/topics - יצירת נושא חדש
router.post('/', upload.single('image'), topicController.createTopic);
// PUT /api/topics/:id - עדכון נושא קיים
router.put('/:id', upload.single('image'), topicController.updateTopic);
// DELETE /api/topics/:id - מחיקת נושא קיים
router.delete('/:id', topicController.deleteTopic);

module.exports = router;
