const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  searchProduct,
} = require("../controllers/productController");
const userAuthMiddleware = require("../middlewares/authMiddleware");
const uploads = require("../utils/createMulter");

router.get("/",userAuthMiddleware, getProducts);
router.post("/add", userAuthMiddleware, uploads.single("image"), addProducts);
router.delete("/delete/:id", userAuthMiddleware, deleteProduct);
router.get("/update/:id", userAuthMiddleware,  getProduct);
router.put("/update/:id", userAuthMiddleware, updateProduct);
router.get("/:key", userAuthMiddleware, searchProduct);

module.exports = router;
