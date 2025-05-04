const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    clientType: {
      type: String,
      enum: ['free', 'subscriber', 'subscriber_plus'],
      required: true
    },
    // תוקף המנוי
    subscriptionEndDate: {
      type: Date,
      required: function() {
        return this.clientType !== 'free'; // אם זה לא חינם, אז התאריך יהיה חובה
      }
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Client', clientSchema);
  