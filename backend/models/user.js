const mongoose= require("mongoose")

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:30,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true
    },
    password:{
        type:String,
        required:true
    }

},
{
    timestamps:true
})

const User= mongoose.model("User",userSchema)

module.exports= User