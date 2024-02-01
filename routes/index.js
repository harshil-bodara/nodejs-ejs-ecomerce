const express = require("express");
const router = express.Router();
const adminRouter = require("./adminRoutes");
const authRouter = require("./authRoutes");
const categoryRouter = require("./categoryRoutes");
const productRouter = require("./productRoutes");
const { privateAuth, publicAuth } = require("../middlewares/authMiddleware");

// Public route
router.get("/register", publicAuth, (req, res) => {
  res.render("pages/registerUser", {
    title: "Register page",
    publicRoute: publicAuth,
  });
});

router.get("/login", publicAuth, (req, res) => {
  res.render("pages/loginUser", {
    title: "Login page",
    publicRoute: publicAuth,
  });
});

router.get("/forgotPassword", publicAuth, async (req, res) => {
  res.render("pages/forgotPassword", {
    title: "Reset password",
    authRoute: publicAuth,
  });
});

router.get("/resetPassword", publicAuth, async (req, res) => {
  res.render("pages/resetPassword", {
    title: "Reset password",
    authRoute: publicAuth,
  });
});

// Private route

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.cookie("isAuthenticated", "false");
  res.redirect("/login");
});

router.get("/changePassword", privateAuth, async (req, res) => {
  res.render("pages/changePassword", {
    title: "change password",
    authRoute: privateAuth,
  });
});

router.use("/admin", adminRouter);
router.use("/user", authRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

module.exports = router;
