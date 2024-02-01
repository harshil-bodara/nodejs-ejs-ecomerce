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
const {userAuthMiddleware, privateAuth} = require("../middlewares/authMiddleware");
const uploads = require("../utils/createMulter");

router.get("/",userAuthMiddleware, privateAuth, getProducts);
router.post("/add", userAuthMiddleware, uploads.single("image"), addProducts);
router.get("/delete/:id", userAuthMiddleware, deleteProduct);
router.get("/edit/:id", userAuthMiddleware,privateAuth,  getProduct);
router.post("/update/:id", userAuthMiddleware, uploads.single("image"), updateProduct);
router.get("/:key", userAuthMiddleware, searchProduct);

module.exports = router;
