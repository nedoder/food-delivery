const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      Order.belongsTo(models.Restaurant, {
        foreignKey: 'restaurantId',
        targetKey: 'id',
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: 'orderId',
        targetKey: 'id',
      });
    }
  }
  Order.init({
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
