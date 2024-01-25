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

router.get("/", userAuthMiddleware, getCatagories);
router.post("/add", userAuthMiddleware, addCatagories);
router.delete("/delete/:id", userAuthMiddleware,  deleteCatagory);
router.get("/update/:id", userAuthMiddleware,  getCatagory);
router.put("/update/:id", userAuthMiddleware , updateCatagory);

module.exports = router;
