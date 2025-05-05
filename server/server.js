require("dotenv").config()

const express = require("express")
const cors = require("cors")
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const { default: mongoose } = require("mongoose")
const path = require('path'); 
const cron = require('node-cron');
const { deleteOldUntreated } = require('./controllers/requestController');
const cookieParser = require('cookie-parser');
const setupSwagger = require('./config/swagger');

const PORT = process.env.PORT || 4000
const app = express()
// Setup Swagger
setupSwagger(app);

connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser()); // מאפשרת לנו לקרוא את הקוקיז שנשלחות מהלקוח
app.use(express.urlencoded({extended:true})) // מאפשרת לנו לקרוא את הנתונים שנשלחים מהלקוח בפורמט של urlencoded



// מאפשר גישה לתמונות מהתיקייה "images"
app.use('/images', express.static(path.join(__dirname, 'images')));

// ייבוא והגדרת הראוטרים
app.use('/api/posts',require('./routes/postRoutes'))
app.use('/api/topics', require('./routes/topicRoutes'));
app.use('/api/tools', require('./routes/toolRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
// ארבעתם עדין לא עובדים
app.use('/api/users', require('./routes/userRoutes'));
//app.use('/api/providers', require('./routes/providerRoutes'));
//app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));



mongoose.connection.once('open',()=>{
    console.log("connect mongoDB");
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
    // cron job: מחיקה אוטומטית של פניות לא מטופלות
    // כל יום בשעה 2:00 בלילה
    cron.schedule('0 2 * * *', async () => {
    console.log('Running daily cleanup task...');
    await deleteOldUntreated();
  });
})

mongoose.connection.on('error',err=>{
    console.log(err);
})

// לייצא את ה PORT של השרת
module.exports = PORT