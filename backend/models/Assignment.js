const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  points: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  question: { type: String },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
