const Sequelize = require('sequelize');
const { FoodItem, FoodRating } = require('../models');

// create food item
exports.createFood = async (data) => {
  const {
    name,
    price,
    picture,
  } = data;

  return FoodItem.create({
    name,
    price,
    picture,
  });
};

// find all food items
exports.findFood = async (page, limit) => FoodItem.findAndCountAll({
  limit,
  offset: parseInt(page * limit, 10),
  subQuery: false,
  attributes: {
    include: [
      [Sequelize.fn('AVG', Sequelize.col('FoodRatings.rating')), 'total_rating'],
    ],
  },
  include: [
    {
      model: FoodRating,
      as: 'FoodRatings',
      required: false,
      attributes: [],
    },
  ],
  group: ['FoodItem.id'],
  order: [
    [Sequelize.literal('total_rating'), 'DESC'],
  ],
});

// find single food item
exports.findFoodItem = async (id) => FoodItem.findByPk(id);

// delete single food item
exports.deleteFood = async (id) => FoodItem.destroy({ where: { id } });
