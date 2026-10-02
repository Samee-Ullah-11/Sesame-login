const bcrypt= require("bcrypt")
const User= require("../models/user")

const { registerSchema}= require("../validation/authValidation")

const registerUser= async (req, res)=>{
    try{
        //validate user
        const { error, value}= registerSchema.validate(req.body);
        if(error){
           return res.status(400).json({
                message: error.details[0].message
            })
        }
        // if validate then get the values
        const { name, email, password}= value;

        // check if the user already existin
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message:"user already exist"
            })
        }
        
        // hash password
        const hashPassword= await bcrypt.hash(password,10)
        
        // register new user
        const user = await User.create({
            name,
            email,
            password:hashPassword
        })
        res.status(201).json({
            message:"user registration successfull",
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    }catch(error){
        console.log("registration error", error)
        res.status(500).json({
            message:"user registration failed",
            error: error.message
        })
    }
}

module.exports= {registerUser}

