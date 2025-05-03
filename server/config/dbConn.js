const mongoose = require("mongoose")

const connectDB = async ()=>{
    //לראות אח"כ אם צריך את השורה הזו בשביל יותר גמישות
   // mongoose.set('strictQuery', false)
   // לבדוק אם להוריד את השורה הזו
    mongoose.set('debug', true)
    
    if (!process.env.DB_MONGODB_URI) {
        throw new Error('DB_MONGODB_URI is not defined in the environment');
      }      
    try{
        await mongoose.connect(process.env.DB_MONGODB_URI)
    }
    catch (err){
        console.error(`error connect to db ${err}`);
    }
}

module.exports = connectDB