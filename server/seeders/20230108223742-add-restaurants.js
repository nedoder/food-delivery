module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Restaurants', [{
      geolocationId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      geolocationId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', {
      // eslint-disable-next-line no-undef
      [Op.or]: [{ geolocationId: 1 }, { geolocationId: 2 }],
    });
  },
};
