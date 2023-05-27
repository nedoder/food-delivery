module.exports = (app) => {
  // eslint-disable-next-line global-require
  const order = require('../controllers/order.controller');
  // eslint-disable-next-line global-require
  const authorize = require('../middleware/authorize');
  // eslint-disable-next-line global-require
  const router = require('express').Router();
  // Create new order
  router.post('/', authorize.verifyToken, order.createOrder);
  // Create new order
  router.patch('/confirm/:id', authorize.verifyToken, order.processOrder);
  // find one order
  router.get('/:id', order.findOne);
  // update one order
  router.patch('/:id', order.update);
  // Delete order
  router.delete('/:id', authorize.verifyToken, order.delete);
  app.use('/order', router);
};
