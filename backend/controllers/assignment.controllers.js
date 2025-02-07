const Course = require("../models/Course");
const User = require("../models/User");
const Assignment=require("../models/Assignment");
async function addAssignment(req, res) {
    try {
        let teacher = await User.findById(req.params.id);
        if (!teacher || teacher.role !== "teacher") {
            return res.status(400).json({ error: "Teacher not found or not authorized" });
        }

        let course = await Course.findById(req.params.courseid);
        if (!course) {
            return res.status(400).json({ error: "Course not found" });
        }

        if (!course.teacher.equals(teacher._id)) {
            return res.status(403).json({ error: "You are not the teacher of this course" });
        }

        let { title, description, points, dueDate, question } = req.body;
        let newAssignment = new Assignment({
            title,
            description,
            points,
            course: req.params.courseid,  
            dueDate,
            question,
        });

        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteAssignment(req,res){
    try{
    let assignment=await Assignment.findById(req.params.assignmentid);
    if(!assignment){
        return res.status(400).json({error:"Assignment doesnot exist"});
    }
    let teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== "teacher") {
        return res.status(400).json({ error: "Teacher not found or not authorized" });
    }

    let course = await Course.findById(req.params.courseid);
    if (!course) {
        return res.status(400).json({ error: "Course not found" });
    }

    if (!course.teacher.equals(teacher._id)) {
        return res.status(403).json({ error: "You are not the teacher of this course" });
    }
    await Assignment.findByIdAndDelete(req.params.assignmentid);
    res.status(201).json({msg:"successfully deleted"});}
    catch(err){
        res.status(500).json({error:err.message});
    }
}
async function editAssignment(req,res){
    try{
        let assignment=await Assignment.findById(req.params.assignmentid);
        if(!assignment){
            return res.status(400).json({error:"Assignment doesnot exist"});
        }
        let teacher = await User.findById(req.params.id);
        if (!teacher || teacher.role !== "teacher") {
            return res.status(400).json({ error: "Teacher not found or not authorized" });
        }
    
        let course = await Course.findById(req.params.courseid);
        if (!course) {
            return res.status(400).json({ error: "Course not found" });
        }
    
        if (!course.teacher.equals(teacher._id)) {
            return res.status(403).json({ error: "You are not the teacher of this course" });
        }
        let { title, description, points, dueDate, question } = req.body;
        assignment = await Assignment.findByIdAndUpdate(
            req.params.assignmentid,
            { title, description, points, dueDate, question }, 
            { new: true, runValidators: true }
        );

        res.status(200).json({ msg: "Assignment successfully updated", assignment });}
        catch(err){
            res.status(500).json({error:err.message});
        }
}

module.exports = {addAssignment,deleteAssignment,editAssignment};