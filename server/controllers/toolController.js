const Tool = require('../models/Tool');
const getPagination = require('../utils/pagination');

exports.getAllTools = async (req, res) => {
  try {
    const maxLimit = 6;
    const { limit, skip, page, totalPages, totalCount } = getPagination(req, Tool, maxLimit);
    
    const tools = await Tool.find().populate('topic') 
      .sort({ createdAt: -1 })  // מהחדש לישן
      .skip(skip) // דילוג על מספר הפוסטים בדף הנוכחי
      .limit(limit) // הגבלת מספר הפוסטים בדף הנוכחי
      .lean(); // מחזיר אובייקט פשוט במקום מונגווס
    if (!tools.length) {
        return res.status(400).send("no posts found");
    } 
    res.status(200).json({tools, page, totalPages, count: tools.length, totalCount });
  } catch (error) {
    console.error('Error fetching tools:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTool = async (req, res) => {
  try {
    const {
      name, descriptionUnique, logoOwners, url,
      isOpenSource, sourceCodeUrl, linkOurGuide, linkOurVideo, topic
    } = req.body;

    if (!name?.trim() || !descriptionUnique?.trim() || !logoOwners?.trim() || !url?.trim()) {
      return res.status(400).send("Missing required fields");
    }

    if (isOpenSource && !sourceCodeUrl?.trim()) {
      return res.status(400).send("sourceCodeUrl is required for open source tools");
    }

    const tool = await Tool.create({
      name, descriptionUnique, logoOwners, url,
      isOpenSource, sourceCodeUrl, linkOurGuide, linkOurVideo, topic
    });

    if (!tool) {
        return res.status(400).send("Failed to create tool");
    }

    res.status(201).json(`${tool.name} created`);

  } catch (error) {
    console.error('Error creating tool:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTool = async (req, res) => {
    try {
        const { id } = req.params;
        const tool = await Tool.findById(id);
        if (!tool) {
          return res.status(404).json({ error: "No tool with such ID was found." });
        }
        const { name, descriptionUnique, logoOwners, url,
            isOpenSource, sourceCodeUrl, linkOurGuide, linkOurVideo, topic  } = req.body;
            if (!name?.trim() || !descriptionUnique?.trim() || !logoOwners?.trim() || !url?.trim()) {
                return res.status(400).send("Missing required fields");
              }
          
              if (isOpenSource && !sourceCodeUrl?.trim()) {
                return res.status(400).send("sourceCodeUrl is required for open source tools");
              }
          
        // עדכון הערכים
        tool.name = name;
        tool.descriptionUnique = descriptionUnique;
        tool.logoOwners = logoOwners;
        tool.url = url;
        tool.isOpenSource = isOpenSource;
        tool.sourceCodeUrl = sourceCodeUrl;
        tool.linkOurGuide = linkOurGuide;
        tool.linkOurVideo = linkOurVideo;
        tool.topic = topic;
      
        await tool.save();
      
        res.status(200).json(`${tool.name} updated`)

        } catch (err) {
            console.error('Error updating tool:', error);
            res.status(500).json({ error: "Server error" });
        }
};

exports.deleteTool = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);
    if (!tool) return res.status(404).json({ message: 'Tool not found' });
    res.json({ message: 'Tool deleted' });
  } catch (error) {
    console.error('Error deleting tool:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
