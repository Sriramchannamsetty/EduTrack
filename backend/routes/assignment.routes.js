const express = require('express');
const router = express.Router({ mergeParams: true });
const {addAssignment,deleteAssignment,editAssignment,submitAssignment} = require('../controllers/assignment.controllers');


//create 
router.post("/new",addAssignment);
//delete
router.delete("/:assignmentid",deleteAssignment);
//edit
router.put("/:assignmentid",editAssignment);

//submit assignment
router.post("/:assignmentid",submitAssignment);
module.exports = router;