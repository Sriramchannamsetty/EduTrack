const express = require("express");
const router = express.Router({ mergeParams: true });
const { signup, login, logout,getMe, editProfile } = require("../controllers/auth.controllers");
const  loggedIn  = require("../middlewares/loggedIn");

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);
router.get("/getMe",loggedIn,getMe);
router.put("/getMe/:id",loggedIn,editProfile);

module.exports = router;
