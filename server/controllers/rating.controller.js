const {
  createRating, findRating, findRatings, uniqueRating, deleteRating,
} = require('../services/rating.service');

// Create new rating
exports.create = async (req, res) => {
  if (!req.body.userId) {
    res.status(400).send({
      message: 'You must enter user!',
    });
    return;
  }
  if (!req.body.foodId) {
    res.status(400).send({
      message: 'You must enter food item!',
    });
    return;
  }
  if (!req.body.rating) {
    res.status(400).send({
      message: 'You must enter rating!',
    });
    return;
  }
  try {
    const ratings = await uniqueRating(req.body.userId, req.body.foodId);
    if (ratings.length === 0) {
      const rating = await createRating(req.body);
      res.status(200).send(rating);
      return;
    }
    res.status(404).send({
      message: 'This item is already rated.',
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Retrieve all ratings from the database.
exports.findAll = async (req, res) => {
  const page = parseInt(req.query.page, 10) - 1;
  const limit = 20;

  try {
    const restaurants = await findRatings(page, limit);
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Find a single rating
exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const rating = await findRating(id);
    // eslint-disable-next-line no-unused-expressions
    rating ? res.status(200).send(rating) : res.status(404).send({
      message: `Cannot find rating with id=${id}.`,
    });
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving rating with id=${id}`,
    });
  }
};

// Delete single rating
// eslint-disable-next-line consistent-return
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const rating = await findRating(id);
    if (!rating) {
      return res.status(400).send({
        message: 'Rating not found.',
      });
    }

    await deleteRating(id);
    return res.status(200).send({
      message: 'Rating was deleted successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: `Error deleting rating with id=${id}`,
    });
  }
};
