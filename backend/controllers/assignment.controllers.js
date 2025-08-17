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
        req.io.to(req.params.courseid).emit("newAssignment",{message:`new assignment was added in ${course.title}`});
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

async function submitAssignment(req,res){
    try {
       
        let {id,courseid,assignmentid} = req.params;
        console.log(id+" "+courseid+" "+assignmentid);
    let student = await User.findById(id);
    
    let course = await Course.findById(courseid);
    console.log("hello");
    let assignment = await Assignment.findById(assignmentid);
   
    if (!student || student.role !== "student") {
        return res.status(400).json({ error: "Student not found or not authorized" });
    }
    if(!student.courses.some(c=>c.course.toString()==courseid)){
        return res.status(400).json({ error: "Course not found" });
    }
    if(!student.assignments.some(a=>a.assignment.toString()==assignmentid)){
       // console.log(assignmentid)
        return res.status(400).json({ error: "Assignment not found" });
    }
    if(!course.assignments.some(a=>a.toString()==assignmentid)){
        return res.status(400).json({ error: "Assignment not found in course" });
    }
    let solution = req.body.solution;
    let curDate = new Date();
    let assignmentEntry = student.assignments.find(a => a.assignment.toString() === assignmentid);
        if (!assignmentEntry) {
            return res.status(400).json({ error: "Assignment not found" });
        }
    let before=assignmentEntry.submitted;
    let after= curDate<=assignment.dueDate? "YES":"LATE";
    let incpoints=0;
    console.log(before);
    if(before=="NO"&&after=="YES"){incpoints=assignment.points;}
    if(before=="NO"&&after=="LATE"){incpoints=assignment.points/2;}
    if(before=="YES"&&after=="LATE"){incpoints=-assignment.points/2;}

    await User.findByIdAndUpdate(
        id,
        {
            // Increase points for the specific course
            $inc: { "courses.$[course].points": incpoints },
    
            // Set assignment fields in the assignments array
            $set: {
                "assignments.$[assignment].submitted": after,
                "assignments.$[assignment].submissionDate": curDate,
                "assignments.$[assignment].solution": solution
            }
        },
        {
            arrayFilters: [
                { "course.course": courseid },  // Filter for the specific course
                { "assignment.assignment": assignmentid }  // Filter for the specific assignment
            ]
        }
    );
    
    
    
    //student = await User.findByIdAndUpdate(id,{assignments:{solution:solution,submitted:true,submissionDate:new Date()}});
    res.status(200).json({msg:"Assignment submitted",student});
    await student.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
    
}

module.exports = {addAssignment,deleteAssignment,editAssignment,submitAssignment};