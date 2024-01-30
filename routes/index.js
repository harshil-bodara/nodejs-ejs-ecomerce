const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const categoryRouter = require("./categoryRoutes");
const productRouter = require("./productRoutes");
const { checkAuth, loginAuth } = require("../middlewares/authMiddleware");

// Public route
router.get("/register", loginAuth, (req, res) => {
  res.render("pages/registerUser", {
    title: "Register page",
    publicRoute: loginAuth,
  });
});

router.get("/login", loginAuth, (req, res) => {
  res.render("pages/loginUser", {
    title: "Login page",
    publicRoute: loginAuth,
  });
});


// Private route
router.get("/resetPassword", checkAuth, async (req, res) => {
  res.render("pages/resetPassword", {
    title: "Reset password",
    authRoute: checkAuth,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.cookie("isAuthenticated", "false");
  res.redirect("/login");
});

router.use("/user", authRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

module.exports = router;
