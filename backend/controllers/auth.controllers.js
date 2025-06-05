const generatetoken = require("../utils/generateToken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { username, password, email, name, role } = req.body;
      console.log(req.body);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      role,
      email,
    });

    await newUser.save();
    generatetoken(res, newUser._id);

    res.status(200).json({
      message: "Signup successful!",
      _id: newUser._id,
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      profileImage: newUser.profileImage,
      courses: newUser.courses,
      assignments: newUser.assignments,
      schedule: newUser.schedule,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ error: "Username does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    generatetoken(res, existingUser._id);

    res.status(200).json({
      message: "Login successful!",
      _id: existingUser._id,
      username: existingUser.username,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      profileImage: existingUser.profileImage,
      courses: existingUser.courses,
      assignments: existingUser.assignments,
      schedule: existingUser.schedule,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editProfile = async (req, res) => {
  try {
    const { name, profileImage } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, profileImage },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ error: "User does not exist" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signup, login, logout, getMe, editProfile };
