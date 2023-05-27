const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.belongsTo(models.Geolocation, {
        foreignKey: 'geolocationId',
        targetKey: 'id',
      });
      Restaurant.hasMany(models.Order, {
        foreignKey: 'restaurantId',
        onDelete: 'CASCADE',
      });
    }
  }
  Restaurant.init({
    geolocationId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};
