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
courseSchema.pre("findOneAndDelete",async function(next){
  try {
    const course = await this.model.findOne(this.getQuery());
    if (!course) {
      return next(new Error("Course not found"));
    }
    const assignments = await Assignment.find({ course: course._id });
    for (const assignment of assignments) {
      await Assignment.findByIdAndDelete(assignment._id);
    }
    next();
  } catch (error) {
    console.error("Error in pre-delete course middleware:", error);
    next(error);
  }
})
courseSchema.post("findOneAndDelete", async function (data) {
  try {
      if (!data) return; 
            let course=data;    
            await User.findByIdAndUpdate(course.teacher, {
              $pull: { courses: { course: course._id } } 
            });
            await User.updateMany(
              { _id: { $in: course.students } },  
              { $pull: { courses: { course: course._id } } }  
            );


  } catch (error) {
      console.error("Error in post-delete middleware:", error);
  }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
