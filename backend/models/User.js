const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["teacher", "student"], required: true },
  profileImage: { type: String },  
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course", points: Number }],
  assignments: [{ 
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
    submitted: { type: Boolean, default: false },
    submissionDate: { type: Date },
    solution:{type:String},
  }] ,
  schedule: [{
    day: { type: String },
    time: { type: String }
  }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
