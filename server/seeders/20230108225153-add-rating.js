/* eslint-disable no-undef */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FoodRatings', [{
      foodId: 1,
      userId: 1,
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      foodId: 2,
      userId: 1,
      rating: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      foodId: 3,
      userId: 2,
      rating: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FoodRatings', {
      // eslint-disable-next-line no-sparse-arrays
      [Op.or]: [{
        foodId: 1,
      }, {
        foodId: 2,
      }, , {
          foodId: 3,
        }],
    });
  },
};
