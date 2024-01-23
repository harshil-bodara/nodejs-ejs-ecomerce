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

router.get("/", getProducts);
router.post("/add", uploads.single("image"), addProducts);
router.delete("/delete/:id", deleteProduct);
router.get("/update/:id", getProduct);
router.put("/update/:id", updateProduct);
router.get("/:key", searchProduct);

module.exports = router;
