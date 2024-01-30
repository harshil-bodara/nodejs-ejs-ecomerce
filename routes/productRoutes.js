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
const {userAuthMiddleware, checkAuth} = require("../middlewares/authMiddleware");
const uploads = require("../utils/createMulter");

router.get("/",userAuthMiddleware, checkAuth, getProducts);
router.post("/add", userAuthMiddleware, uploads.single("image"), addProducts);
router.get("/delete/:id", userAuthMiddleware, deleteProduct);
router.get("/edit/:id", userAuthMiddleware,checkAuth,  getProduct);
router.post("/update/:id", userAuthMiddleware,uploads.single("image"), updateProduct);
router.get("/:key", userAuthMiddleware, searchProduct);

module.exports = router;
