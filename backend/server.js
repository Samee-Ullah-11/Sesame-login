const express= require("express")
const cors= require("cors")
const mongoose= require("mongoose")

const app= express()

const port= 3000;
app.use(express.json())


app.use(cors({
    origin: "http://localhost:5173"
}));

const authRoutes= require("./routes/authroutes")


app.get("/",(req,res)=>{
    res.json({
        message: "backend is working"
    })

})
app.use("/api/auth", authRoutes)


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})