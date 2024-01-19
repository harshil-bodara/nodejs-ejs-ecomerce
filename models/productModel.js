const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const { DataTypes } = Sequelize;

  const register = sequelize.define("products", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    files: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  return register;
};
