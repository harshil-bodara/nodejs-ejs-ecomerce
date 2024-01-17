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

db.register = require("../models/registerModel.js")(sequelize, DataTypes);

db.sequelize.sync().then(() => {
  console.log("done");
});

module.exports = db;
