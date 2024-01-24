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

// Relation
db.user.hasMany(db.category);
db.category.belongsTo(db.user, {
  constraints: true,
  onDelete: "CASCADE",
});

db.category.hasMany(db.product);
db.product.belongsTo(db.category, {
  constraints: true,
  onDelete: "CASCADE",
});

db.sequelize.sync().then(() => {
  console.log("done");
});

module.exports = db;
