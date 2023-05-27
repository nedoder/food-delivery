const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FoodComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FoodComment.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      FoodComment.belongsTo(models.FoodItem, {
        foreignKey: 'foodId',
        targetKey: 'id',
      });
    }
  }
  FoodComment.init({
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'FoodComment',
  });
  return FoodComment;
};
