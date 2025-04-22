const toolSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    descriptionUnique: {
        type: String,
        required: true,
        maxLength: 150
    },
    logoOwners: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    isOpenSource: {
        type: Boolean,
        default: false
    },
    sourceCodeUrl: {
        type: String,
        required: function() {
            return this.isOpenSource; // אם זה קוד פתוח, אז הקישור יהיה חובה
        }
    },
    linkOurGuide: {
        type: String // למנויים הדרכה שלנו
    },
    linkOurVideo: {
        type: String // למנויים פרימיום סרטון למידה שלנו
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic', // קישור לנושא
        required: true,
        default: async function getDefaultTopicId() {
            let defaultTopic = await Topic.findOne({ isDefault: true });
            if (!defaultTopic) {
              defaultTopic = new Topic({ category: 'For curious learners', description: 'נושא ברירת מחדל ללומדים סקרנים', content: 'תוכן ברירת מחדל כלשהו', iconTools: 'default-icon', isDefault: true });
              await defaultTopic.save();
            }
            return defaultTopic._id;
          }
    }
});
  
  module.exports = mongoose.model('Tool', toolSchema);
  