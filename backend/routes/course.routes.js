const express = require('express');
const router = express.Router({ mergeParams: true });
const {addCourse,deleteCourse,editCourse} = require('../controllers/course.controllers');


//create course
router.post("/new",addCourse);
//delete
router.delete("/:courseid",deleteCourse);
//edit
router.put("/:courseid",editCourse);

module.exports = router;