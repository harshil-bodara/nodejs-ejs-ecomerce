const db = require("../confic/db");
const { category } = db;

const getCatagory = async (req, res) => {
  try {
    let categories = await category.findAll({ where: {} });
    res.status(200).json({ categories: categories });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const addCatagory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const allReadyExistcategory = await category.findOne({
      where: {
        categoryName: categoryName,
      },
    });

    if (allReadyExistcategory) {
      throw new Error("Category Already Exists");
    } else {
      if (!categoryName) {
        throw new Error("All fields are required");
      } else {
        const createCategory = await category.create({
          categoryName: categoryName,
        });
        let categories = await createCategory.save();
        return res.status(200).json({
          message: "Category add successfully",
          categories: categories,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteCatagory = async (req, res) => {
  let categories = await category.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({
    message: "Category delete successfully",
    categories: categories,
  });
};

const getOneCatagory = async (req, res) => {
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
    const { categoryName } = req.body;
    let updateCategory = req.body;
    const allReadyExistcategory = await category.findOne({
      where: {
        categoryName: categoryName,
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
  getCatagory,
  addCatagory,
  deleteCatagory,
  getOneCatagory,
  updateCatagory,
};
