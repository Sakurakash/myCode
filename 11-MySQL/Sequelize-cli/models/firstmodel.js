'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class firstModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  firstModel.init({
    key: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'firstModel',
  });
  return firstModel;
};