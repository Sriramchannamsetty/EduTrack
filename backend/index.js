const express=require("express");
 require("dotenv").config();
const app=express();
const mongoose=require("mongoose");
const authRoutes=require("./routes/auth.routes");
const connectdb = async()=>{
   await mongoose.connect(process.env.MONGO_URL);
}
connectdb().then( console.log("database connected"));

app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{res.send("welcome to edutrack");});
app.use("/api/auth",authRoutes);
app.listen( process.env.PORT,()=>{console.log("listening at port ",process.env.PORT);})