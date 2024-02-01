const express = require("express");
const router = express.Router();
const uploads = require("../utils/createMulter");
const {
  registerUser,
  loginUser,
  resetPassword,
  forgotPassword,
  changePassword,
} = require("../controllers/authController");
const { userAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/login", loginUser);
router.post("/register", uploads.single("profile"), registerUser);
router.post("/resetPassword", resetPassword);
router.post("/forgotPassword", forgotPassword);
router.post("/changePassword", userAuthMiddleware, changePassword);

module.exports = router;
