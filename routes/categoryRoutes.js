const express = require("express");
const router = express.Router();
const {getCatagory, addCatagory, deleteCatagory,getOneCatagory, updateCatagory} = require("../controllers/categoryController");
const userAuthMiddleware = require("../middlewares/authMiddleware");

router.get("/category", getCatagory);
router.post("/category/add",  addCatagory);
router.delete("/category/del/:id", deleteCatagory);
router.get("/category/update/:id",  getOneCatagory);
router.put("/category/update/:id", updateCatagory);

module.exports =  router ;
