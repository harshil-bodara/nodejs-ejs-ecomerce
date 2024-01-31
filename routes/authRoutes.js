const express = require("express");
const router = express.Router();
const uploads = require("../utils/createMulter");
const {
  registerUser,
  loginUser,
  resetPassword
} = require("../controllers/authController");
const {userAuthMiddleware} = require("../middlewares/authMiddleware");

router.post("/login", loginUser);
router.post("/register", uploads.single("profile"), registerUser);
router.post("/resetPassword", userAuthMiddleware, resetPassword);

module.exports = router;
