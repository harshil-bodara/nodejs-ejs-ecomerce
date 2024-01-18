const express = require("express");
const router = express.Router();
const {
  getProduct,
  addProduct,
  deleteProduct,
  getOneProduct,
  updateProduct,
  searchProduct
} = require("../controllers/productController");
const userAuthMiddleware = require("../middlewares/authMiddleware");
const uploads = require("../utils/createMulter");

router.get("/product", getProduct);
router.post("/product/add", uploads, addProduct);
router.delete("/product/del/:id", deleteProduct);
router.get("/product/update/:id", getOneProduct);
router.put("/product/update/:id", updateProduct);
router.get("/search/:key", searchProduct);

module.exports = router;
