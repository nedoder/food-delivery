const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FoodItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FoodItem.hasMany(models.FoodRating, {
        foreignKey: 'foodId',
        targetKey: 'id',
      });
      FoodItem.hasMany(models.FoodComment, {
        foreignKey: 'foodId',
        targetKey: 'id',
      });
      FoodItem.hasMany(models.OrderItem, {
        foreignKey: 'foodId',
        targetKey: 'id',
      });
    }
  }
  FoodItem.init({
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    price: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'FoodItem',
  });
  return FoodItem;
};
