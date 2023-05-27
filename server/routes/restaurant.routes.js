module.exports = (app) => {
  // eslint-disable-next-line global-require
  const restaurant = require('../controllers/restaurant.controller');
  // eslint-disable-next-line global-require
  const authorize = require('../middleware/authorize');
  // eslint-disable-next-line global-require
  const router = require('express').Router();
  // Create new restaurant
  router.post('/', authorize.verifyAdmin, restaurant.create);
  // Retrieve all restaurants
  router.get('/:page?', restaurant.findAll);
  // Delete restaurant
  router.delete('/:id', authorize.verifyAdmin, restaurant.delete);
  app.use('/restaurant', router);
};
