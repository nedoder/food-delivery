const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Geolocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Geolocation.hasOne(models.Restaurant, {
        foreignKey: 'geolocationId',
        targetKey: 'id',
      });
      Geolocation.hasOne(models.User, {
        foreignKey: 'geolocationId',
        targetKey: 'id',
      });
    }
  }
  Geolocation.init({
    latitude: DataTypes.FLOAT(15, 12),
    longitude: DataTypes.FLOAT(15, 12),
  }, {
    sequelize,
    modelName: 'Geolocation',
  });
  return Geolocation;
};
