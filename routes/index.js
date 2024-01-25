const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const categoryRouter = require("./categoryRoutes");
const productRouter = require("./productRoutes");
const db = require("../confic/db");
const { category } = db;
const { product } = db;
const userAuthMiddleware = require("../middlewares/authMiddleware");

// if (!userAuthMiddleware) {
// ejs Routes
router.get("/register", (req, res) => {
  res.render("pages/registerUser", { title: "Register page" });
});

router.get("/login", (req, res) => {
  res.render("pages/loginUser", { title: "Login page" });
});
// } else{
// Category routes
router.get("/category", async (req, res) => {
  let categories = await category.findAll();
  res.render("pages/category", {
    title: "Category page",
    category: categories,
  });
});

router.get("/update/:id", async (req, res) => {
  let categories = await category.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (categories == null) {
    res.redirect("/category");
  } else {
    res.render("pages/updateCategory", {
      title: "Edit category",
      category: categories,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  let updateCategory = req.body;
  let categories = await category.update(updateCategory, {
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/category");
  res.render("pages/updateCategory", {
    title: "Edit category",
    category: categories,
  });
});

// Product routes
router.get("/product", async (req, res) => {
  let products = await product.findAll();
  res.render("pages/product", { title: "Product page", product: products });
});

// }

router.use("/user", authRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

module.exports = router;
