const express = require('express');
const router = express.Router({ mergeParams: true });
const {addAssignment,deleteAssignment,editAssignment} = require('../controllers/assignment.controllers');


//create 
router.post("/new",addAssignment);
//delete
router.delete("/:assignmentid",deleteAssignment);
//edit
router.put("/:assignmentid",editAssignment);
module.exports = router;