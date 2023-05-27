module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Restaurants', // name of Source model
      'geolocationId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Geolocations', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.changeColumn(
      'Orders', // name of Source model
      'userId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.changeColumn(
      'Orders', // name of Source model
      'restaurantId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.changeColumn(
      'Users', // name of Source model
      'geolocationId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Geolocations', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.changeColumn(
      'Users', // name of Source model
      'roleId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserRoles', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );

    await queryInterface.changeColumn(
      'FoodRatings', // name of Source model
      'userId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.changeColumn(
      'FoodRatings', // name of Source model
      'foodId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'FoodItems', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.changeColumn(
      'FoodComments', // name of Source model
      'userId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.changeColumn(
      'FoodComments', // name of Source model
      'foodId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'FoodItems', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.changeColumn(
      'OrderItems', // name of Source model
      'foodId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'FoodItems', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.changeColumn(
      'OrderItems', // name of Source model
      'orderId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Restaurants', // name of Source model
      'geolocationId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      },
    );
    await queryInterface.changeColumn(
      'Orders', // name of Source model
      'userId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      },
    );
    await queryInterface.changeColumn(
      'Orders', // name of Source model
      'restaurantId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      },
    );
    await queryInterface.changeColumn(
      'Users', // name of Source model
      'geolocationId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      },
    );
    await queryInterface.changeColumn(
      'Users', // name of Source model
      'roleId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      },
    );
    await queryInterface.changeColumn(
      'FoodRatings', // name of Source model
      'userId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      },
    );
    await queryInterface.changeColumn(
      'FoodRatings', // name of Source model
      'foodId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      },
    );
    await queryInterface.changeColumn(
      'FoodComments', // name of Source model
      'userId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      },
    );
    await queryInterface.changeColumn(
      'FoodComments', // name of Source model
      'foodId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      },
    );
    await queryInterface.changeColumn(
      'OrderItems', // name of Source model
      'foodId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      },
    );
    await queryInterface.changeColumn(
      'OrderItems', // name of Source model
      'orderId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      },
    );
  },
};
