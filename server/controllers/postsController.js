const Post = require('../models/Post');

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
        const totalPosts = await Post.countDocuments();
        
        const limit = Math.min(Math.max(parseInt(req.query.limit) || 6, 1), maxLimit, totalPosts);
        const totalPages = Math.ceil(totalPosts / limit);
        const page = Math.min(Math.max(parseInt(req.query.page) || 0, 0), totalPages - 1);
        const skip = page * limit;
    const posts = await Post.find()
      .sort({ createdAt: -1 })  // מהחדש לישן
      .skip(skip) // דילוג על מספר הפוסטים בדף הנוכחי
      .limit(limit) // הגבלת מספר הפוסטים בדף הנוכחי
      .lean(); // מחזיר אובייקט פשוט במקום מונגווס
    if (!posts.length) {
        return res.status(400).send("no posts found");
    }
    res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving posts', error: err.message });
    }
  };

module.exports = { createPost, getAllPosts };
