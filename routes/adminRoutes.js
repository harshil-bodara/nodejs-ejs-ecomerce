const express = require("express");
const router = express.Router();
const { getAllCatagories } = require("../controllers/categoryController");
const { getAllProducts } = require("../controllers/productController");
const { getAllUser } = require("../controllers/authController");

const {
  userAuthMiddleware,
  checkAuth,
  adminAuth,
} = require("../middlewares/authMiddleware");

router.get("/user", checkAuth, getAllUser);
router.get("/category", checkAuth, getAllCatagories);
router.get("/product", checkAuth, getAllProducts);

module.exports = router;
