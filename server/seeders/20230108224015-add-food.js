module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FoodItems', [{
      name: 'pizza',
      price: 6.5,
      picture: 'pizza.webp',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'pasta',
      price: 7.5,
      picture: 'pasta.webp',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'burger',
      price: 5.5,
      picture: 'burger.webp',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FoodItems', {
      // eslint-disable-next-line no-sparse-arrays, no-undef
      [Op.or]: [{
        name: 'pizza',
      }, {
        name: 'pasta',
      }, , {
          name: 'burger',
        }],
    });
  },
};
