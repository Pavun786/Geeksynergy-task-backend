const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
   
   
    Name:{
        type:String,
        required:true,
        trim:true
    },
   
    Email : {
        type : String,
        required : true,
        unique : true
    },

    Mobile:{
        type:Number,
        required : true 
    },
    Password:{
        type:String,
        required:true,
       
    },
    Profession : {
        type:String,
        required:true,
       
    }
    
   
},
    {timestamps: true}
)

module.exports = mongoose.model("User",userSchema)