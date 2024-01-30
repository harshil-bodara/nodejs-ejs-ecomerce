const express = require("express");
const router = express.Router();
const {
  getCatagories,
  addCatagories,
  deleteCatagory,
  getCatagory,
  updateCatagory,
} = require("../controllers/categoryController");
const {
  userAuthMiddleware,
  checkAuth,
} = require("../middlewares/authMiddleware");

router.get("/", userAuthMiddleware, checkAuth, getCatagories);
router.post("/add", userAuthMiddleware, addCatagories);
router.get("/delete/:id", userAuthMiddleware, deleteCatagory);
router.get("/edit/:id", userAuthMiddleware, checkAuth, getCatagory);
router.post("/update/:id", userAuthMiddleware, updateCatagory);

module.exports = router;
