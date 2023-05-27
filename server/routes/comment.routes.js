module.exports = (app) => {
  // eslint-disable-next-line global-require
  const comment = require('../controllers/comment.controller');
  // eslint-disable-next-line global-require
  const authorize = require('../middleware/authorize');
  // eslint-disable-next-line global-require
  const router = require('express').Router();
  // Create new comment
  router.post('/', authorize.verifyToken, comment.create);
  // Retrieve all comments
  router.get('/:page?:limit?', comment.findAll);
  // Delete comment
  router.delete('/:id', authorize.verifyToken, comment.delete);
  app.use('/comment', router);
};
