const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const categoryRouter = require("./categoryRoutes");
const productRouter = require("./productRoutes");

router.get("/register", (req, res) => {
  res.render("pages/registerUser", { title: "Register page" });
});

router.get("/login", (req, res) => {
  res.render("pages/loginUser", { title: "Login page" });
});

router.get("/category", (req, res) => {
  res.render("pages/category", { title: "Category page" });
});

router.get("/product", (req, res) => {
  res.render("pages/product", { title: "Product page" });
});

router.use("/user", authRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

module.exports = router;
