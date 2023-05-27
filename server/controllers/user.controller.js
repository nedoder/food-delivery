const { createUser, findUser, deleteUser } = require('../services/user.service');
const { deleteGeolocation } = require('../services/geolocation.service');

// Create new user
exports.create = async (req, res) => {
  if (!req.body.password) {
    res.status(400).send({
      message: 'Password cannot be empty!',
    });
    return;
  }
  if (!req.body.latitude || !req.body.longitude) {
    res.status(400).send({
      message: 'You must enter valid location!',
    });
    return;
  }
  if (!req.body.firstName || !req.body.lastName) {
    res.status(400).send({
      message: 'You must enter full name!',
    });
    return;
  }
  if (!req.body.username) {
    res.status(400).send({
      message: 'You must enter username!',
    });
    return;
  }
  if (!req.body.roleId) {
    res.status(400).send({
      message: 'You must enter user role!',
    });
    return;
  }

  try {
    const user = await createUser(req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Find a single user
exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await findUser(id);
    // eslint-disable-next-line no-unused-expressions
    user ? res.status(200).send(user) : res.status(404).send({
      message: `Cannot find user with id=${id}.`,
    });
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving user with id=${id}`,
    });
  }
};

// Delete single user
// eslint-disable-next-line consistent-return
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await findUser(id);
    if (!user) {
      return res.status(400).send({
        message: 'User not found.',
      });
    }

    await deleteUser(id);
    await deleteGeolocation(user.geolocationId);
    return res.status(200).send({
      message: 'User was deleted successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: `Error deleting user with id=${id}`,
    });
  }
};
