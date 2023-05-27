module.exports = (app) => {
  // eslint-disable-next-line global-require
  const user = require('../controllers/user.controller');
  // eslint-disable-next-line global-require
  const auth = require('../controllers/auth.controller');
  // eslint-disable-next-line global-require
  const authorize = require('../middleware/authorize');
  // eslint-disable-next-line global-require
  const router = require('express').Router();
  // Create new user
  router.post('/', user.create);
  // login
  router.post('/login', auth.login);
  // Retrieve single user
  router.get('/:id', authorize.verifyToken, user.findOne);
  // Delete a user
  router.delete('/:id', authorize.verifyToken, user.delete);
  app.use('/user', router);
};
