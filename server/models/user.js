const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Geolocation, {
        foreignKey: 'geolocationId',
        targetKey: 'id',
      });
      User.belongsTo(models.UserRole, {
        foreignKey: 'roleId',
        targetKey: 'id',
      });
      User.hasMany(models.Order, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(models.FoodComment, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(models.FoodRating, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    geolocationId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
