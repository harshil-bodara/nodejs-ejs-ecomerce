const db = require("../confic/db");
const { category, user } = db;
const { privateAuth } = require("../middlewares/authMiddleware");

// for user
const getCatagories = async (req, res) => {
  try {
    const { id } = req.user;
    let categories = await category.findAll({
      where: { userId: id },
    });
    res.render("pages/category", {
      title: "Category page",
      category: categories,
      token: req.cookies,
      authRoute: privateAuth,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// for admin
const getAllCatagories = async (req, res) => {
  try {
    let categories = await category.findAll({});
    res.render("admin/adminCategory", {
      title: "Admin Category",
      category: categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const addCatagories = async (req, res) => {
  try {
    const { name } = req.body;
    const allReadyExistCategory = await category.findOne({
      where: {
        name: name,
      },
    });

    if (!name) {
      throw new Error("All fields are required");
    } else {
      // if (allReadyExistCategory) {
      //   throw new Error("Category Already Exists");
      // } else {
      const { id } = req.user;
      const createCategories = await category.create({
        name: name,
        userId: id,
      });
      await createCategories.save();
      res.redirect("/category");
      // }
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteCatagory = async (req, res) => {
  try {
    const allReadyExistCategory = await category.findAll({
      where: {
        name: category.name,
      },
    });
    if (allReadyExistCategory) {
      let categories = await category.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({
        message: "Category delete successfully",
        category: categories,
      });
    } else {
      throw new Error("Category not found");
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getCatagory = async (req, res) => {
  try {
    let categories = await category.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (categories == null) {
      res.redirect("/category");
    } else {
      res.render("pages/updateCategory", {
        title: "Edit category",
        category: categories,
        authRoute: privateAuth,
      });
    }
  } catch (error) {
    res.redirect("/login");
    return res.status(400).json({
      message: error.message,
    });
  }
};

const updateCatagory = async (req, res) => {
  try {
    const { name } = req.body;
    let updateCategory = req.body;
    const allReadyExistcategory = await category.findOne({
      where: {
        name: name,
      },
    });

    if (allReadyExistcategory) {
      throw new Error("Category Already Exists");
    } else {
      let categories = await category.update(updateCategory, {
        where: {
          id: req.params.id,
        },
      });
      res.render("pages/category", {
        category: categories,
      });
      res.redirect("/category");
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCatagories,
  getAllCatagories,
  addCatagories,
  deleteCatagory,
  getCatagory,
  updateCatagory,
};
