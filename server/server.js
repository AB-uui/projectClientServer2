require("dotenv").config()

const express = require("express")
const cors = require("cors")
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const { default: mongoose } = require("mongoose")
const path = require('path'); 

const PORT = process.env.PORT || 4000
const app = express()

connectDB()

app.use(cors(corsOptions))
app.use(express.json())

// מאפשר גישה לתמונות מהתיקייה "images"
app.use('/images', express.static(path.join(__dirname, 'images')));

// ייבוא והגדרת הראוטרים
app.use('/api/posts',require('./routes/postsRoutes'))
app.use('/api/topics', require('./routes/topicRoutes'));
app.use('/api/tools', require('./routes/toolsRoutes'));

////////
// ייבוא ראוטרים
import authRoutes from './routes/auth.js';
import toolsRoutes from './routes/tools.js';
import chatRoutes from './routes/chat.js';


// חיבור לדאטהבייס
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('מחובר למסד הנתונים בהצלחה'))
  .catch((error) => console.error('שגיאה בחיבור למסד הנתונים:', error));

// הגדרת ראוטים
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/chat', chatRoutes);
/////////

mongoose.connection.once('open',()=>{
    console.log("connect mongoDB");
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
})

mongoose.connection.on('error',err=>{
    console.log(err);
})