module.exports = (app) => {
  // eslint-disable-next-line global-require
  const rating = require('../controllers/rating.controller');
  // eslint-disable-next-line global-require
  const authorize = require('../middleware/authorize');
  // eslint-disable-next-line global-require
  const router = require('express').Router();
  // Create new rating
  router.post('/', authorize.verifyToken, rating.create);
  // Retrieve all ratings
  router.get('/:page?', rating.findAll);
  // Retrieve single rating
  router.get('/find/:id', rating.findOne);
  // Delete rating
  router.delete('/:id', authorize.verifyToken, rating.delete);
  app.use('/rating', router);
};
