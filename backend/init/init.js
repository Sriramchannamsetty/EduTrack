const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");  
const Course = require("../models/Course");  

const MONGO_URL = "mongodb+srv://20223046genaigdscmnnit24:uStirEcNoppK7ZBV@cluster0.bcjio.mongodb.net/edutrack?retryWrites=true&w=majority&";

async function initDatabase() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to the database");

    // Clear existing data
    await User.deleteMany({});
     await Course.deleteMany({});

    // // Create Teachers
    // const teachers = [];
    // for (let i = 0; i < 7; i++) {
    //   const password = bcrypt.hashSync(`teacher${i + 1}password`, 10);
    //   const teacher = new User({
    //     username: `teacher${i + 1}`,
    //     name: `Teacher ${i + 1}`,
    //     email: `teacher${i + 1}@example.com`,
    //     password,
    //     role: "teacher",
    //     courses: [] // Initialize empty courses array
    //   });
    //   await teacher.save();
    //   teachers.push(teacher);
    // }

    // // Create Students
    // const students = [];
    // for (let i = 0; i < 18; i++) {
    //   const password = bcrypt.hashSync(`student${i + 1}password`, 10);
    //   const student = new User({
    //     username: `student${i + 1}`,
    //     name: `Student ${i + 1}`,
    //     email: `student${i + 1}@example.com`,
    //     password,
    //     role: "student",
    //     courses: [] // Initialize empty courses array
    //   });
    //   await student.save();
    //   students.push(student);
    // }

    // // Create Courses
    // for (let i = 0; i < 25; i++) {
    //   const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
    //   const enrolledStudents = students.slice(0, Math.floor(Math.random() * students.length) + 1);

    //   const course = new Course({
    //     title: `Course ${i + 1}`,
    //     description: `This is the description for Course ${i + 1}`,
    //     teacher: randomTeacher._id,
    //     passkey: `course${i + 1}passkey`,
    //     students: enrolledStudents.map(student => student._id),
    //     schedule: [
    //       { day: "Monday", time: "9:00 AM" },
    //       { day: "Wednesday", time: "11:00 AM" },
    //     ],
    //   });
    //   await course.save();

    //   // Add course with points to teacher's courses list
    //   randomTeacher.courses.push({ course: course._id, points: 0 }); // Teachers might not need points, but adding 0
    //   await randomTeacher.save();

    //   // Add course with points to students' courses list
    //   for (const student of enrolledStudents) {
    //     student.courses.push({ course: course._id, points: 0 }); // Assign random points
    //     await student.save();
    //   }
    // }

    console.log("Database initialized successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error initializing database:", err);
    mongoose.disconnect();
  }
}

initDatabase();
