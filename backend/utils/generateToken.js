const jwt=require("jsonwebtoken");
require("dotenv").config();
const generatetoken= (res,id)=>{
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, //MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: true,
	});
}
module.exports=generatetoken;