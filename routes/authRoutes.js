const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const uploads = require("../utils/createMulter");

router.post("/register", uploads, registerUser);
router.post("/login", loginUser);

module.exports = router;
