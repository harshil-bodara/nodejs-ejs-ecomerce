const db = require("../confic/db");
const { product, category, user } = db;
const Sequelize = require("sequelize");
const fs = require("fs");
const { checkAuth } = require("../middlewares/authMiddleware");

// for user
const getProducts = async (req, res) => {
  try {
    const { id } = req.user;
    let categories = await category.findAll({
      where: { userId: id },
    });
    let products = await product.findAll({
      include: [
        {
          model: category,
          as: "categories",
        },
      ],
    });
    res.render("pages/product", {
      title: "Product page",
      product: products,
      category: categories,
      authRoute: checkAuth,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// for admin
const getAllProducts = async (req, res) => {
  try {
    let products = await product.findAll({});
    res.render("admin/adminProduct", {
      title: "Product page",
      product: products,
    });
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
        categoryId: category,
      });
      let products = await createProduct.save();
      res.redirect("/product");
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
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
        product: products,
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
    const { id } = req.user;
    let categories = await category.findAll({
      where: { userId: id },
    });

    if (products == null) {
      res.redirect("/product");
    } else {
      res.render("pages/updateProduct", {
        title: "Edit Product",
        product: products,
        category: categories,
        authRoute: checkAuth,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    let updateProduct = req.body;
    let newImage = "";
    if (req.file) {
      newImage = req.file.filename;
      try {
        fs.unlinkSync("../upload" + req.body.oldImage);
      } catch (error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    } else {
      newImage = req.body.oldImage;
    }

    let products = await product.update(updateProduct, {
      where: {
        id: req.params.id,
      },
    });
    res.render("pages/product", {
      product: products,
    });
    res.redirect("/product");
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
  getAllProducts,
  addProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  searchProduct,
};
