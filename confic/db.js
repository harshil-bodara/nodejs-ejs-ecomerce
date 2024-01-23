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

db.sequelize.sync().then(() => {
  console.log("done");
});

module.exports = db;
