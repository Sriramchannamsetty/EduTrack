const mongoose = require("mongoose");
const Course = require("./Course");
const User = require("./User");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  points: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  question: { type: String },
});
assignmentSchema.post("save", async function (data) {
  try {
      let course = await Course.findById(data.course);
      if (!course) {
          console.error("Course not found for assignment:", data._id);
          return;
      }
      course.assignments.push(data._id);
      await course.save();
      await User.findByIdAndUpdate(course.teacher, {
          $push: { assignments: { assignment: data._id, submitted: "NO", submissionDate: null, solution: null } }
      });
      await User.updateMany(
          { _id: { $in: course.students } }, 
          { $push: { assignments: { assignment: data._id, submitted: "NO", submissionDate: null, solution: null } } }
      );

  } catch (err) {
      console.error("Error in assignmentSchema post-save middleware:", err);
  }
});
assignmentSchema.post("findOneAndDelete",async function(data){
          let course=await Course.findById(data.course);
          if(!course){
            console.error("Course not found for assignment:", data._id);
            return;
          }
          await Course.findByIdAndUpdate(course._id, {
            $pull: { assignments: data._id }
          });
          await User.findByIdAndUpdate(course.teacher, {
            $pull: { assignments: { assignment: data._id } }
        });
        await User.updateMany(
          { _id: { $in: course.students } },
          { $pull: { assignments: { assignment: data._id } } }
      );  
})

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
