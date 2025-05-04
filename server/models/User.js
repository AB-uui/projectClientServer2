const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
},
  phone: {
    type: String,
    required: false // Optional field
  },
  role: {
    type: String,
    enum: ['guest', 'admin', 'provider', 'client'], // לבדוק אם להשאיר את הguest
    default: 'guest', // Default role is 'guest'
    required: true
  },
  roleRef: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'roleRefModel'
  },
  roleRefModel: {
    type: String,
    enum: ['Provider', 'Client'],
    required: function () {
      return this.role === 'provider' || this.role === 'client';
    }
  },
  active: {
    type: Boolean,
    default: false // Default is inactive
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
