const { FoodRating, User } = require('../models');

// create rating
exports.createRating = async (data) => {
  const {
    rating,
    userId,
    foodId,
  } = data;

  return FoodRating.create({
    rating,
    userId,
    foodId,
  });
};

// find all ratings
exports.findRatings = async (page, limit) => FoodRating.findAndCountAll({
  limit,
  offset: parseInt(page * limit, 10),
  include: [
    {
      model: User,
    },
  ],
});

// check if already rated
exports.uniqueRating = async (userId, foodId) => FoodRating.findAll({
  where: {
    userId,
    foodId,
  },
});

// find single rating
exports.findRating = async (id) => FoodRating.findByPk(id);

// delete single rating
exports.deleteRating = async (id) => FoodRating.destroy({ where: { id } });
