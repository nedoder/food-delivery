const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FoodRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FoodRating.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      FoodRating.belongsTo(models.FoodItem, {
        foreignKey: 'foodId',
        targetKey: 'id',
      });
    }
  }
  FoodRating.init({
    rating: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'FoodRating',
  });
  return FoodRating;
};
