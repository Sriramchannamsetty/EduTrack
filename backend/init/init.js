const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");  
const Course = require("../models/Course");  

const  MONGO_URL  = "mongodb+srv://sriram:Marirs%403074@cluster0.2qfcv.mongodb.net/edutrack?retryWrites=true&w=majority"  

async function initDatabase() {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("Connected to the database");

    await User.deleteMany({});
    await Course.deleteMany({});

    const teachers = [];
    for (let i = 0; i < 7; i++) {
      const password = bcrypt.hashSync(`teacher${i + 1}password`, 10); 
      const teacher = new User({
        username: `teacher${i + 1}`,
        name: `Teacher ${i + 1}`,
        email: `teacher${i + 1}@example.com`,
        password,
        role: "teacher",
      });
      teachers.push(teacher);
      await teacher.save();
    }

    const students = [];
    for (let i = 0; i < 18; i++) {
      const password = bcrypt.hashSync(`student${i + 1}password`, 10);
      const student = new User({
        username: `student${i + 1}`,
        name: `Student ${i + 1}`,
        email: `student${i + 1}@example.com`,
        password,
        role: "student",
      });
      students.push(student);
      await student.save();
    }
    const courses = [];
    for (let i = 0; i < 25; i++) {
      const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
      const course = new Course({
        title: `Course ${i + 1}`,
        description: `This is the description for Course ${i + 1}`,
        teacher: randomTeacher._id,
        passkey: `course${i + 1}passkey`, 
        students: students.slice(0, Math.floor(Math.random() * 18) + 1).map(student => student._id), 
        schedule: [
          { day: "Monday", time: "9:00 AM" },
          { day: "Wednesday", time: "11:00 AM" },
        ],
      });
      courses.push(course);
      await course.save();
    }

    console.log("Database initialized successfully!");

    mongoose.disconnect();
  } catch (err) {
    console.error("Error initializing database:", err);
    mongoose.disconnect();
  }
}

initDatabase();
