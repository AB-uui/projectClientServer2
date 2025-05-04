const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    name: {
     type: String,
     required: true
    },
    logoUrl: {
     type: String,
     required: true
    },
    toolUrl: {
     type: String, 
     required: true
    },
    openSourceUrl: { 
     type: String 
    },
  
    serviceType: {
      type: String,
      enum: ['payment_advertisement', 'payment_commission', 'discount_advertisement', 'admin_added'],
      required: true
    },
  
    // רשות, אחד חובה לפי סוג השירות
    // אם זה תשלום פרסומת, אז חובה אחד מהם
    freeToolLink: {
      type: String,
      required: function() {
        return this.serviceType === 'payment_advertisement' && !this.networkLocationDetails;
      }
    },
    networkLocationDetails: {
     type: String,
     required: function() {
        return this.serviceType === 'payment_advertisement' && !this.freeToolLink;
      }
    },
    // אם זה תשלום תווך, אז חובה אחד מהם
    paymentDetails: { 
     type: String,
        required: function() {
            return this.serviceType === 'payment_commission' && !this.paypalAccount;
        }
     }, 
    paypalAccount: {
     type: String,
        required: function() {
            return this.serviceType === 'payment_commission' && !this.paymentDetails;
        }
    },
    //אם זה הנחת פרסומת או תשלום תווך, אז חובה. הרשאת מנהל בלבד
    discountPercentage: { 
     type: Number,
     min: 0, max: 100,
     required: function() {
        return this.serviceType === 'discount_advertisement' || this.serviceType === 'payment_commission';
      }
    },
  
    // מידע נוסף
    description: {
     type: String,
     maxLength: 300
    },
    category: { 
     type: String,
     enum: ['text', 'music', 'images', 'website_building', 'other'],// לבדוק אם זה בסדר
    },
    notes: { 
     type: String,
     maxLength: 300
    },
  
    // חובה
    // חתימה דיגיטלית
    signature: { 
     type: String,
     required: true 
    },
    // מצב הבקשה
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    // קובץ הסכם
    agreementFileUrl: { type: String }
  },
 { timestamps: true }
);
  
  module.exports = mongoose.model('provider', providerSchema);
  