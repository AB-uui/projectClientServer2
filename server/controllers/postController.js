const Post = require('../models/Post');
const getPagination = require('../utils/pagination');

// יצירת פוסט חדש
const createPost = async (req, res) => {
  try {
    const { title, summary, content } = req.body;
    if (!title?.trim() || !summary?.trim() || !content?.trim()) {
        // אם לא נשלחו כותרת, תקציר או תוכן - מחזיר שגיאה
        return res.status(400).send("title, summary, and content are required");
    }
    // אם יש קובץ תמונה - שומר את הנתיב שלה
    const imageUrl = req.file ? `/images/${req.file.filename}` : null;
    const post = await Post.create({title,summary, content, imageUrl}); // יוצר פוסט חדש עם הכותרת והתוכן שנשלחו בבקשה
    if(!post){
        return res.status(400).send("invalid post")
    }
    res.status(201).json(`${post.title} created`);                // מחזיר תשובה ללקוח
  } catch (error) {
    console.error('❌ Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// שליפת כל הפוסטים
const getAllPosts = async (req, res) => {
    try {
        const maxLimit = 12;
        
        const { limit, skip, page, totalPages, totalCount } = getPagination(req, Post, maxLimit);
    const posts = await Post.find()
      .sort({ createdAt: -1 })  // מהחדש לישן
      .skip(skip) // דילוג על מספר הפוסטים בדף הנוכחי
      .limit(limit) // הגבלת מספר הפוסטים בדף הנוכחי
      .lean(); // מחזיר אובייקט פשוט במקום מונגווס
    if (!posts.length) {
        return res.status(400).send("no posts found");
    }
    res.status(200).json({posts, page, totalPages, count: posts.length, totalCount });
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving posts', error: err.message });
    }
  };

module.exports = { createPost, getAllPosts }
