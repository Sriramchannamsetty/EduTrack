const generatetoken=require("../utils/generateToken");
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const signup=async (req,res)=>{
    try{
      const {username,password,email,name,role}=req.body;
    //   console.log(username,password,email,name,role);
      const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        return res.status(400).json({error: "email is not valid"});
      }
      const existingUser=await User.findOne({username});
     
      if(existingUser){
        return res.status(400).json({error: "user already exist"});
      }
     
      const salt=await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,salt);
      //console.log("hi ",hashedPassword);
      const newUser=new User({
        username,
        password:hashedPassword,
        name,
        role,
        email,
      });
       generatetoken(res,newUser._id);
      await newUser.save();
     
     res.status(200).json({
  _id: newUser._id,
  username: newUser.username,
  name: newUser.name,
  email: newUser.email,
  role: newUser.role,
  profileImage: newUser.profileImage,
  courses: newUser.courses,
  assignments: newUser.assignments,
  schedule: newUser.schedule,
});

    }
    catch(err){
        res.status(500).json({error:err});
    }

      

};
const login=async (req,res)=>{
    console.log(req.body);
    try{
   const {username,password}=req.body;
   const existingUser= await User.findOne({username});
   if(!existingUser){
     return res.status(400).json({error:"username doesnot exist"});
   }
   const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)
   if(!isPasswordCorrect){
     return res.status(400).json({error:"incorrect password"});
   }
   generatetoken(res,existingUser._id);
   res.status(200).json({
    _id: existingUser._id,
    username: existingUser.username,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
    profileImage: existingUser.profileImage,
    courses: existingUser.courses,
    assignments: existingUser.assignments,
    schedule: existingUser.schedule,
  });
  }
  catch(err){
    res.status(500).json({error:"server error"});
  }

};
const logout=async(req,res)=>{

    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
module.exports={signup,login,logout,getMe};