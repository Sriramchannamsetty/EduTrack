const express = require("express");
const router = express.Router({ mergeParams: true });
const {getLeaderboard} = require('../controllers/leaderboard.controllers')
const  loggedIn  = require("../middlewares/loggedIn");
router.get("/",getLeaderboard);
module.exports = router;
