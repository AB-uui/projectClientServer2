const mongoose = require("mongoose")

const connectDB = async ()=>{
    //לראות אח"כ אם צריך את השורה הזו בשביל יותר גמישות
   // mongoose.set('strictQuery', false)
   // לבדוק אם להוריד את השורה הזו
    mongoose.set('debug', true)
    
    if (!process.env.DATABASE_URI_H) {
        throw new Error('DATABASE_URI_H is not defined in the environment');
      }      
    try{
        await mongoose.connect(process.env.DATABASE_URI_H)
    }
    catch (err){
        console.error(`error connect to db ${err}`);
    }
}

module.exports = connectDB