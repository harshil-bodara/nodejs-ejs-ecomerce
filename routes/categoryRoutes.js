const express = require("express");
const router = express.Router();
const {
  getCatagories,
  addCatagories,
  deleteCatagory,
  getCatagory,
  updateCatagory,
} = require("../controllers/categoryController");
const {userAuthMiddleware, checkAuth} = require("../middlewares/authMiddleware");

router.get("/", userAuthMiddleware,checkAuth, getCatagories);
router.post("/add", userAuthMiddleware, addCatagories);
<<<<<<< Updated upstream
router.delete("/delete/:id", userAuthMiddleware, deleteCatagory);
router.get("/update/:id", userAuthMiddleware, getCatagory);
router.put("/update/:id", userAuthMiddleware, updateCatagory);
=======
router.get("/delete/:id", userAuthMiddleware, deleteCatagory);
router.get("/edit/:id", userAuthMiddleware,checkAuth, getCatagory);
router.post("/update/:id", userAuthMiddleware, updateCatagory);
>>>>>>> Stashed changes

module.exports = router;
