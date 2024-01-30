const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("e-commerce", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

try {
  sequelize.authenticate();
  console.log("table created successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/userModel.js")(sequelize, DataTypes);
db.category = require("../models/categoryModel.js")(sequelize, DataTypes);
db.product = require("../models/productModel.js")(sequelize, DataTypes);

// user to category Relation
db.user.hasMany(db.category, { foreignKey: 'userId', as:'category' });
db.category.belongsTo(db.user, {
  foreignKey: 'userId',
  as:'user',
  constraints: true,
  onDelete: "CASCADE",
});

// category to product Relation
db.category.hasMany(db.product, {foreignKey: 'categoryId', as:'product' });
db.product.belongsTo(db.category, {
  foreignKey: 'categoryId',
  as:'categories',
  constraints: true,
  onDelete: "CASCADE",
});

db.sequelize.sync().then(() => {
  console.log("done");
});

module.exports = db;
