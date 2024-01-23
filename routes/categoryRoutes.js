const express = require("express");
const router = express.Router();
const {
  getCatagories,
  addCatagories,
  deleteCatagory,
  getCatagory,
  updateCatagory,
} = require("../controllers/categoryController");
const userAuthMiddleware = require("../middlewares/authMiddleware");

router.get("/", getCatagories);
router.post("/add", addCatagories);
router.delete("/delete/:id", deleteCatagory);
router.get("/update/:id", getCatagory);
router.put("/update/:id", updateCatagory);

module.exports = router;
