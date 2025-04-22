const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');

// GET /api/tools?page=1&limit=6 - שליפת כל הכלים
router.get('/', toolController.getAllTools);
// POST /api/tools - יצירת כלי חדש
router.post('/', toolController.createTool);
// PUT /api/tools/:id - עדכון כלי קיים
router.put('/:id', toolController.updateTool);
// DELETE /api/tools/:id - מחיקת כלי קיים
router.delete('/:id', toolController.deleteTool);

module.exports = router;
