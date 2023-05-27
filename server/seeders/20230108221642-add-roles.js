module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserRoles', [{
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserRoles', {
      // eslint-disable-next-line no-undef
      [Op.or]: [{ name: 'Admin' }, { name: 'User' }],
    });
  },
};
