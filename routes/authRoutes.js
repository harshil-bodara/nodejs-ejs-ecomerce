const express = require("express");
const router = express.Router();
const uploads = require("../utils/createMulter");
const {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
} = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/register", uploads.single("profile"), registerUser);
router.put("/changePassword", changePassword);

module.exports = router;
