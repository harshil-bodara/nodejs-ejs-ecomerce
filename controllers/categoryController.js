const db = require("../confic/db");
const { category } = db;

const getCatagories = async (req, res) => {
  try {
    let categories = await category.findAll();
    res.render("pages/category", {
      category: categories,
    });
    res.status(200).json({ categories: categories });
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
      if (allReadyExistCategory) {
        throw new Error("Category Already Exists");
      } else {
        const createCategories = await category.create({
          name: name,
        });
        let categories = await createCategories.save();

        res.redirect("/category");
        // return res.status(200).json({
        //   message: "Category add successfully",
        //   categories: categories,
        // });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteCatagory = async (req, res) => {
  try {
    const { name } = req.body;
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
        categories: categories,
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
    res.status(200).json({ categories: categories });
  } catch (error) {
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
      return res.status(200).json({
        message: "Category update successfully",
        categories: categories,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCatagories,
  addCatagories,
  deleteCatagory,
  getCatagory,
  updateCatagory,
};
