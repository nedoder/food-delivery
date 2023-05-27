const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderItem.belongsTo(models.FoodItem, {
        foreignKey: 'foodId',
        targetKey: 'id',
      });
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'orderId',
        targetKey: 'id',
      });
    }
  }
  OrderItem.init({
    foodId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};
