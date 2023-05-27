module.exports = (app) => {
  // eslint-disable-next-line global-require
  const food = require('../controllers/food.controller');
  // eslint-disable-next-line global-require
  const upload = require('../middleware/upload');
  // eslint-disable-next-line global-require
  const authorize = require('../middleware/authorize');
  // eslint-disable-next-line global-require
  const router = require('express').Router();
  // Create new food
  router.post('/', authorize.verifyAdmin, upload.single('picture'), food.create);
  // Retrieve all food items
  router.get('/:page?', authorize.verifyToken, food.findAll);
  // Retrieve single food item
  router.get('/find/:id', authorize.verifyToken, food.findOne);
  // Delete food item
  router.delete('/:id', authorize.verifyAdmin, food.delete);
  app.use('/food', router);
};
