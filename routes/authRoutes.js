const express = require("express");
const router = express.Router();
const { registerUser, loginUser, changePassword } = require("../controllers/authController");
const uploads = require("../utils/createMulter");

router.post("/register", uploads, registerUser);
router.post("/login", loginUser);
router.put("/changePassword", changePassword);

module.exports = router;
