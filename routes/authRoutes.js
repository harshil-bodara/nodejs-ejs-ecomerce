const express = require("express");
const router = express.Router();
const uploads = require("../utils/createMulter");
const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/authController");

router.post("/register", uploads.single("profile"), registerUser);
router.post("/login", loginUser);
router.put("/changePassword", changePassword);

module.exports = router;
