const { FoodComment, FoodItem } = require('../models');

// create comment
exports.createComment = async (data) => {
  const {
    comment,
    userId,
    foodId,
  } = data;
  return FoodComment.create({
    comment,
    userId,
    foodId,
  });
};

// find all comments
exports.findComments = async (page, limit) => FoodComment.findAndCountAll({
  limit,
  offset: parseInt(page * limit, 10),
  include: [
    {
      model: FoodItem,
    },
  ],
});

// find single comment
exports.findComment = async (id) => FoodComment.findByPk(id);

// delete single comment
exports.deleteComment = async (id) => FoodComment.destroy({ where: { id } });
