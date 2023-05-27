const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { findByUsername } = require('../services/user.service');

// eslint-disable-next-line consistent-return
exports.login = async (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: 'You must enter username!',
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: 'You must enter password!',
    });
    return;
  }
  try {
    const user = await findByUsername(req.body.username);
    if (!user) {
      res.status(404).send({
        message: 'User not found.',
      });
      return;
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password,
    );
    if (!passwordIsValid) {
      res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
      return;
    }
    const token = jwt.sign({ id: user.id, role: user.UserRole.name }, config.secret, {
      expiresIn: config.expiresIn,
    });
    res.status(200).send({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.UserRole.name,
      token,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
