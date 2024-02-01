const express = require("express");
const router = express.Router();
const { getAllCatagories } = require("../controllers/categoryController");
const { getAllProducts } = require("../controllers/productController");
const { getAllUser } = require("../controllers/authController");

const { privateAuth } = require("../middlewares/authMiddleware");

router.get("/user", privateAuth, getAllUser);
router.get("/category", privateAuth, getAllCatagories);
router.get("/product", privateAuth, getAllProducts);

module.exports = router;
