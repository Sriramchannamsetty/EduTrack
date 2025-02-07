const mongoose = require("mongoose");
const User = require("./User");
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  passkey : {type:String,require:true},
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  schedule: [{
    day: { type: String },
    time: { type: String }
  }]
});
courseSchema.post("save", async(data)=>{
  console.log("post method of save"+" "+data);
  let teacher = await User.findById(data.teacher);
  teacher.courses.push({course:data._id,points:0});
  await teacher.save();
});
courseSchema.post("findOneAndDelete", async function (data) {
  try {
      console.log("Post method of findOneAndDelete triggered");

      if (!data) return; // Ensure data exists

      // 1. Remove from teacher
      let teacher = await User.findById(data.teacher);
      if (teacher) {
          let courseIndex = teacher.courses.findIndex(c => c.course.toString() === data._id.toString());
          if (courseIndex !== -1) {
              teacher.courses.splice(courseIndex, 1);
              await teacher.save();
          }
      }

      // 2. Remove from students
      for (let studentId of data.students) {
          let student = await User.findById(studentId);
          if (student) {
              let studentCourseIndex = student.courses.findIndex(c => c.course.toString() === data._id.toString());
              if (studentCourseIndex !== -1) {
                  student.courses.splice(studentCourseIndex, 1);
                  await student.save();
              }
          }
      }
  } catch (error) {
      console.error("Error in post-delete middleware:", error);
  }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
