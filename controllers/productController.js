const db = require("../confic/db");
const { product } = db;
const Sequelize = require("sequelize");

const getProducts = async (req, res) => {
  try {
    let products = await product.findAll();
    res.status(200).json({ products: products });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const addProducts = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const { filename } = req.file;
    if (!name && description && category && price && filename) {
      throw new Error("All fields are required");
    } else {
      const createProduct = await product.create({
        name: name,
        description: description,
        category: category,
        price: price,
        image: filename,
      });
      let products = await createProduct.save();
      res.redirect("/product");
      // return res.status(200).json({
      //   message: "Product add successfully",
      //   products: products,
      // });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { name } = req.body;
    let allReadyExistProduct = product.findAll({
      where: {
        name: product.name,
      },
    });
    if (allReadyExistProduct) {
      let products = await product.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({
        message: "Product delete successfully",
        products: products,
      });
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getProduct = async (req, res) => {
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
        productName: { [Sequelize.Op.regexp]: req.params.key },
      },
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
  getProducts,
  addProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  searchProduct,
};
