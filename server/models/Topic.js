const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
 category: { 
    type: String,
    default: 'For curious learners',
    //enum: ['טקסט', 'מוזיקה', 'תמונות', 'בניית אתרים', 'אחר']
    unique: true
 },
 isDefault: {
    type: Boolean,
    default: false
  }
  description: {
    type:String,
    required:true,
    maxLength:150
 },
  content:{
    type:String,
    required:true,
    minLength:50
 },
 iconTools: {
    type: String,
    required: true
  },
  // imageUrl:{
  //   type:String,
  //   default:""//default.png
  // },
 imageUrl:{
    type:String,
    default:""//default.png
 },
}
{
    timestamps:true
});

module.exports = mongoose.model('Topic', topicSchema);

