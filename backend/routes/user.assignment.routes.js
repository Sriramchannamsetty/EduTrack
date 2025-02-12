const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
async function getAssignment(req,res){
    try {
        let {id} = req.params;
    let user = await User.findById(id).populate("assignments.assignment");
    if(!user){
        return res.status(400).json({error:"user not found"});
    }
      res.status(200).json(user.assignments);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

router.get("/",getAssignment);

module.exports = router;

