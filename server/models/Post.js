const mongoose = require("mongoose")

const postsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:40
    },
    summary:{
        type:String,
        required:true,
        maxLength:150
    },
    content:{
        type:String,
        required:true,
        minLength:50
    },
    imageUrl:{
        type:String,
        default:""//default.png
    },
},
{
    timestamps:true
})

module.exports = mongoose.model("Post",postsSchema)