const express=require("express");
 require("dotenv").config();
const app=express();
const mongoose=require("mongoose");
const authRoutes=require("./routes/auth.routes");
const courseRoutes = require("./routes/course.routes")
const assignmentRoutes=require("./routes/assignment.routes")
const cookieParser = require("cookie-parser");
const connectdb = async()=>{
   await mongoose.connect(process.env.MONGO_URL);
}
connectdb().then( console.log("database connected"));
const cors = require("cors");
const loggedIn = require("./middlewares/loggedIn");

// Allow requests from frontend (React running on localhost:5173)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
   res.header("Access-Control-Allow-Credentials", "true");
   
   // Handle preflight requests
   if (req.method === "OPTIONS") {
       return res.sendStatus(204);
   }

   next();
});

app.get("/home",(req,res)=>{res.send("welcome to edutrack");});
app.use("/api/auth",authRoutes);
app.use("/api/:id/course",courseRoutes);
app.use("/api/:id/course/:courseid/assignment",assignmentRoutes);
app.listen( process.env.PORT,()=>{console.log("listening at port ",process.env.PORT);})