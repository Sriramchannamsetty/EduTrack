const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  schedule: [{
    day: { type: String },
    time: { type: String }
  }]
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
