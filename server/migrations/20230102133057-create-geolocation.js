module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Geolocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      latitude: {
        type: Sequelize.FLOAT(15, 12),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Latitude cannot be empty',
          },
        },
      },
      longitude: {
        type: Sequelize.FLOAT(15, 12),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Longitude cannot be empty',
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Geolocations');
  },
};
