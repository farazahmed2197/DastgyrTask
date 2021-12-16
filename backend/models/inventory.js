const { DataTypes, Model } = require('sequelize');
const sequelize = require("../dbConnect");

class Inventory extends Model {}

Inventory.init({
  // Model attributes are defined here
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  SKU: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cause: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
    
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Inventory' // We need to choose the model name
});

module.exports = Inventory;