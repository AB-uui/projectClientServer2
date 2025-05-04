const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],//לבדוק אם חובה
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  question: {
    type: String,
    required: [true, 'Question is required'],
    minlength: [5, 'Question must be at least 5 characters'],
    maxlength: [300, 'Question must be at most 300 characters'],
    trim: true
  },
  treated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // מוסיף createdAt ו-updatedAt
});

module.exports = mongoose.model('Request', requestSchema);
