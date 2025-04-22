const Topic = require('../models/topic');
const Tool = require('../models/Tool');

// GET all topics
exports.getAllTopics = async (req, res) => {
  try {
    const maxLimit = 6;
    const totalPosts = await Topic.countDocuments();    
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 6, 1), maxLimit, totalPosts);
    const totalPages = Math.ceil(totalPosts / limit);
    const page = Math.min(Math.max(parseInt(req.query.page) || 0, 0), totalPages - 1);
    const skip = page * limit;
    const topics = await Post.find()
      .sort({ createdAt: -1 })  // מהחדש לישן
      .skip(skip) // דילוג על מספר הפוסטים בדף הנוכחי
      .limit(limit) // הגבלת מספר הפוסטים בדף הנוכחי
      .lean(); // מחזיר אובייקט פשוט במקום מונגווס
    if (!topics.length) {
        return res.status(400).send("no posts found");
    }
    res.status(200).json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET tools by topic 
exports.getTopicWithTools = async (req, res) => {
  try {
    const topicId = req.query.id;

    // מצא את הנושא
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    const maxLimit = 12;
    const totalPosts = await Post.countDocuments();
    
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 6, 1), maxLimit, totalPosts);
    const totalPages = Math.ceil(totalPosts / limit);
    const page = Math.min(Math.max(parseInt(req.query.page) || 0, 0), totalPages - 1);
    const skip = page * limit;
    // הבא את הכלים הקשורים לנושא
    const tools = await Tool.find({ topic: topicId })
    .sort({ createdAt: -1 })  // מהחדש לישן
    .skip(skip) // דילוג על מספר הפוסטים בדף הנוכחי
    .limit(limit) // הגבלת מספר הפוסטים בדף הנוכחי
    .lean(); // מחזיר אובייקט פשוט במקום מונגווס
    if (!tools.length) {
        // אם לא נמצאו כלים, החזר הודעה מתאימה
        return res.status(404).json({ message: 'tools for this topic not found' });
      }
    // החזר את שניהם
    res.status(200).json({ topic, tools });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// POST create topic
exports.createTopic = async (req, res) => {
    try {
      const { category, description, content, iconTools } = req.body;
      let isDefault = false; // ברירת מחדל היא false
  
      if (!category?.trim()) {
        isDefault = true; // אם אין קטגוריה, הנושא יהיה ברירת מחדל
      }
  
      if (!description?.trim() || !content?.trim() || !iconTools?.trim()) {
        return res.status(400).send("description, content and iconTools are required");
      }
  
      // אם הנושא מוגדר כברירת מחדל, נבדוק שאין כבר נושא ברירת מחדל אחר
      if (isDefault) {
        const existingDefaultTopic = await Topic.findOne({ isDefault: true });
        if (existingDefaultTopic) {
          return res.status(409).json({ message: 'A default topic already exists. Only one default topic is allowed.' });
        }
      } else {
        // אם יש קטגוריה, נבדוק אם קיימת כבר קטגוריה כזו
        const existingTopic = await Topic.findOne({ category: category.trim() });
        if (existingTopic) {
          return res.status(409).json({ message: `Category '${category.trim()}' already exists. You can update the existing topic if needed.`, existingTopicId: existingTopic._id });
        }
      }
  
      const imageUrl = req.file ? `/images/${req.file.filename}` : "";
      const topic = await Topic.create({
        category: category?.trim() || 'For curious learners', // אם אין קטגוריה, נשתמש בברירת המחדל של הסכמה
        description: description.trim(),
        content: content.trim(),
        iconTools: iconTools.trim(),
        imageUrl,
        isDefault
      });
  
      if (!topic) {
        return res.status(400).send("Failed to create topic");
      }
  
      res.status(201).json(`${topic.category} created`);
  
    } catch (error) {
      console.error('Error creating topic:', error);
      if (error.code === 11000 && error.keyPattern && error.keyPattern.category) {
        return res.status(409).json({ message: `Category '${req.body.category?.trim()}' already exists. You can update the existing topic if needed.` });
      }
      res.status(500).json({ message: 'Server error' });
    }
  };

// PUT update topic
exports.updateTopic = async (req, res) => {
    try {
      const { id } = req.params;
      const topicToUpdate = await Topic.findById(id);
  
      if (!topicToUpdate) {
        return res.status(404).json({ error: "No topic with such ID was found." });
      }
  
      const { category, description, content, iconTools } = req.body;
  
      if (!category?.trim() || !description?.trim() || !content?.trim() || !iconTools?.trim()) {
        return res.status(400).send("category, description, content and iconTools are required");
      }
  
      const imageUrl = req.file ? `/images/${req.file.filename}` : undefined;
  
      // בדיקה אם קיימת כבר קטגוריה זהה לנושא אחר
      const existingTopicWithSameCategory = await Topic.findOne({
        category: category.trim(),
        _id: { $ne: id } // $ne: id - מוודא שאנחנו לא בודקים את הנושא הנוכחי
      });
  
      if (existingTopicWithSameCategory) {
        return res.status(409).json({
          message: `Category '${category.trim()}' already exists. Please choose a different category.`,
          existingTopicId: existingTopicWithSameCategory._id
        });
      }
  
      // עדכון הערכים
      topicToUpdate.category = category.trim();
      topicToUpdate.description = description.trim();
      topicToUpdate.content = content.trim();
      topicToUpdate.iconTools = iconTools.trim();
      if (imageUrl) {
        topicToUpdate.imageUrl = imageUrl;
      }
  
      await topicToUpdate.save();
  
      res.status(200).json(`${topicToUpdate.category} updated`);
  
    } catch (error) {
      console.error('Error updating topic:', error);
      if (error.code === 11000 && error.keyPattern && error.keyPattern.category) {
        return res.status(409).json({ message: `Category '${req.body.category?.trim()}' already exists. Please choose a different category.` });
      }
      res.status(500).json({ error: "Server error" });
    }
  };
      

// DELETE topic
exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.status(200).json({ message: 'Item deleted successfully', name: topic.category });
} catch (error) {
    console.error('Error deleting topic:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
