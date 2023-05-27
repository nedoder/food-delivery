module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Geolocations', [{
      latitude: 45.894783,
      longitude: 67.49494,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      latitude: 90.484848,
      longitude: 45.22222,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Geolocations', {
      // eslint-disable-next-line no-undef
      [Op.or]: [{ latitude: 45.894783 }, { latitude: 90.484848 }],
    });
  },
};
