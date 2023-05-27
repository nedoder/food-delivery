module.exports = (app) => {
  // eslint-disable-next-line global-require
  const roles = require('../controllers/role.controller');
  // eslint-disable-next-line global-require
  const authorize = require('../middleware/authorize');
  // eslint-disable-next-line global-require
  const router = require('express').Router();
  // Create new role
  router.post('/', roles.create);
  // Retrieve all roles
  router.get('/', authorize.verifyAdmin, roles.findAll);
  // Delete role
  router.delete('/:id', authorize.verifyAdmin, roles.delete);
  app.use('/role', router);
};
