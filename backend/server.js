require("dotenv").config();
const express= require("express")
const cors= require("cors")

const app= express()

const port= 3000;
app.use(express.json())
const connectDB= require("./config/db")

app.use(cors({
    origin: "http://localhost:5173"
}));
app.get("/",(req,res)=>{
    res.json({
        message: "backend is working"
    })

})

const authRoutes= require("./routes/authroutes")
app.use("/api/auth", authRoutes)

const startServer= async ()=>{
    try{
        await connectDB();
        app.listen(port, ()=>{
            console.log(`server is running on port ${port}`)
        })

    }catch(error){
        console.log("server failed to start", error.message)
    }
}

startServer();