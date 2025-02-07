const Course = require("../models/Course");
const User = require("../models/User");

async function addCourse(req,res){
    try{
        let teacher = await User.findById(req.params.id);
    if(!teacher){
        return res.status(400).json({error:"teacher not found"});
    }
    let {title,description,passkey} = req.body;
    let newCourse = new Course({
        title,
        description,
        passkey,
        teacher : req.params.id,
    });
    await newCourse.save();

    res.status(200).json(newCourse);
    }
    catch(err){

        res.status(500).json({error:err.message});
    }
    
}
async function deleteCourse(req, res) {
    try {
        let { courseid } = req.params;
        //if teacher
        let teacher = await User.findById(req.params.id);
        if(!teacher||teacher.role!=="teacher")return res.status(400).json({error:"not a teacher"});
        let course = await Course.findById(courseid);
        if(!course||course.teacher.equals(teacher._id))return res.status(400).json({error:"you have not created this course"});
        // 1. Find and delete the course (Middleware will handle teacher/student updates)
        let deletedCourse = await Course.findOneAndDelete({ _id: courseid });

        if (!deletedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully", deletedCourse });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function editCourse(req,res){
    try{
        console.log("edit course");
        let {courseid} = req.params;
        let teacher = await User.findById(req.params.id);
        if(!teacher||teacher.role!=="teacher")return res.status(400).json({error:"not a teacher"});
        let course = await Course.findById(courseid);
        if(!course||course.teacher.equals(teacher._id))return res.status(400).json({error:"you have not created this course"});
        let {title,description,passkey} = req.body;
        let updatedCourse = {
        title,
        description,
        passkey,
        teacher : req.params.id,
        };
        await Course.findByIdAndUpdate(courseid,updatedCourse);
        res.status(200).json({message:"Course updated successfully",updatedCourse});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
    
}

module.exports = {addCourse,deleteCourse,editCourse};