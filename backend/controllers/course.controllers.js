const Course = require("../models/Course");
const User = require("../models/User");

async function addCourse(req,res){
    try{
        let teacher = await User.findById(req.params.id);
    if(!teacher){
        return res.status(400).json({error:"techer not found"});
    }
    let {title,description,passkey} = req.body;
    let newCourse = new Course({
        title,
        description,
        passkey,
        teacher : req.params.id,
    });
    await newCourse.save();
    teacher.courses.push({course:newCourse._id,points:0});
    await teacher.save();
    res.status(200).json(newCourse);
    }
    catch(err){

        res.status(500).json({error:err});
    }
    
}
function deleteCourse(){
    
}
function editCourse(){
    
}

module.exports = {addCourse,deleteCourse,editCourse};