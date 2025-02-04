const express = require("express");
const router = express.Router({ mergeParams: true });
const { signup, login, logout } = require("../controllers/auth.controllers");

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
