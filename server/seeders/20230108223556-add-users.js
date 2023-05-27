module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Tatjana',
      lastName: 'Doderovic',
      username: 'nedoder',
      password: '$2b$10$QWv.mLv2PSCyzN6hpNBzru6Hny4hYGjA4DxbDGDGBw.9f1Zelzlhy',
      roleId: 1,
      geolocationId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Tanja',
      lastName: 'Doder',
      username: 'doder',
      password: '$2b$10$QWv.mLv2PSCyzN6hpNBzru6Hny4hYGjA4DxbDGDGBw.9f1Zelzlhy',
      roleId: 2,
      geolocationId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      // eslint-disable-next-line no-undef
      [Op.or]: [{ username: 'nedoder' }, { username: 'doder' }],
    });
  },
};
