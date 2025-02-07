const express = require('express');
const router = express.Router({ mergeParams: true });
const {addCourse,deleteCourse,editCourse} = require('../controllers/course.controllers');
module.exports = router;

//create course
router.post("/new",addCourse);
//delete
router.delete("/:courseid",deleteCourse);
//edit
router.patch("/:courseid",editCourse);

