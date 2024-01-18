const db = require("../confic/db");
const { product } = db;
const Sequelize = require("sequelize");

const getProduct = async (req, res) => {
  try {
    let products = await product.findAll({ where: {} });
    res.status(200).json({ products: products });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { productName, description, category, price } = req.body;

    if (!productName && description && category && price) {
      throw new Error("All fields are required");
    } else {
      const createProduct = await product.create({
        productName: productName,
        description: description,
        category: category,
        price: price,
      });
      let products = await createProduct.save();
      return res.status(200).json({
        message: "Product add successfully",
        products: products,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let products = await product.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      message: "Product delete successfully",
      products: products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    let products = await product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ products: products });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    let updateProduct = req.body;
    let products = await product.update(updateProduct, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      message: "Product update successfully",
      products: products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    let result = await product.findAll({
      where: {
        productName: { [Sequelize.Op.regexp]: req.params.key }
      }
    });
    return res.status(200).json({
      result: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProduct,
  addProduct,
  deleteProduct,
  getOneProduct,
  updateProduct,
  searchProduct,
};
