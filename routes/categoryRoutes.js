const express = require("express");
const router = express.Router();
const {
  getCatagories,
  getAllCatagories,
  addCatagories,
  deleteCatagory,
  getCatagory,
  updateCatagory,
} = require("../controllers/categoryController");
const {
  userAuthMiddleware,
  privateAuth,
} = require("../middlewares/authMiddleware");

router.get("/", userAuthMiddleware, privateAuth, getCatagories);
router.get("/",  getAllCatagories);
router.post("/add", userAuthMiddleware, addCatagories);
router.get("/delete/:id", userAuthMiddleware, deleteCatagory);
router.get("/edit/:id", userAuthMiddleware, privateAuth, getCatagory);
router.post("/update/:id", userAuthMiddleware, updateCatagory);

module.exports = router;
