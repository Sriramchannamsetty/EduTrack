const express = require("express");
const router = express.Router();
const Course = require("../models/Course"); 

async function allSearchedCourses(req, res) {
  try {
    const search = req.query.search;
    let query = {};

    if (search) {
      query = {
        title: { $regex: search, $options: "i" } 
      };
    }
    const courses = await Course.find(query, { title: 1, description: 1, teacher: 1 })
      .populate("teacher", "name"); 

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function getSuggestions(req, res) {
  try {
    const search = req.query.search;
    if (!search) return res.json([]); 

    const suggestions = await Course.find(
      { title: { $regex: search, $options: "i" } }, 
      { title: 1 }
    ).limit(5);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Define routes
router.get("/", allSearchedCourses);
router.get("/suggestions", getSuggestions);

module.exports = router;
