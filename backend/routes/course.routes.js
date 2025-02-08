const express = require('express');
const router = express.Router({ mergeParams: true });
const {addCourse,deleteCourse,editCourse,joinCourse,leaveCourse} = require('../controllers/course.controllers');

router.post("/new",addCourse);

router.delete("/:courseid",deleteCourse);

router.put("/:courseid",editCourse);


router.post("/:courseid",joinCourse);

router.delete("/:courseid/leave",leaveCourse);

module.exports = router;