const {
  createComment, findComment, findComments, deleteComment,
} = require('../services/comment.service');
const { findOrderedItems } = require('../services/order.service');

// Create new comment
// eslint-disable-next-line consistent-return
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
  if (!req.body.comment) {
    res.status(400).send({
      message: 'You must enter comment!',
    });
    return;
  }
  try {
    const items = await findOrderedItems(req.body.userId, req.body.foodId);
    if (items.length > 0) {
      const comment = await createComment(req.body);
      res.status(200).send(comment);
      return;
    }
    res.status(400).send({
      message: 'You cannot comment on food that is not ordered before.',
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Retrieve all comments from the database.
exports.findAll = async (req, res) => {
  const page = parseInt(req.query.page, 10) - 1;
  const limit = parseInt(req.query.limit, 10) || 1;

  try {
    const restaurants = await findComments(page, limit);
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete single comment
// eslint-disable-next-line consistent-return
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await findComment(id);
    if (!comment) {
      return res.status(404).send({
        message: 'Comment not found.',
      });
    }

    await deleteComment(id);
    return res.status(200).send({
      message: 'Comment was deleted successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: `Error deleting comment with id=${id}`,
    });
  }
};
