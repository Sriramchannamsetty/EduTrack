const express = require('express');
const router = express.Router({ mergeParams: true });
const {addCourse,deleteCourse,editCourse} = require('../controllers/assignment.controllers');
module.exports = router;

//create 
router.post("/new",addCourse);
//delete
router.delete("/:assignmentid",deleteCourse);
//edit
router.put("/:assignmentid",editCourse);