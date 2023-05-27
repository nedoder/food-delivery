const bcrypt = require('bcrypt');
const { User, Geolocation, UserRole } = require('../models');

// create user
exports.createUser = async (data) => {
  const {
    firstName,
    lastName,
    username,
    password,
    roleId,
    latitude,
    longitude,
  } = data;

  const geolocation = await Geolocation.create({ latitude, longitude });

  return User.create({
    firstName,
    lastName,
    username,
    password: bcrypt.hashSync(password, 10),
    roleId,
    geolocationId: geolocation.id,
  });
};

// find single user
exports.findUser = async (id) => User.findByPk(id, {
  include: [{ all: true, include: [{ all: true }] }],
});

// find user by username
exports.findByUsername = async (username) => User.findOne({
  where: {
    username,
  },
  include: [
    {
      model: UserRole,
    },
  ],
});

// delete single user
exports.deleteUser = async (id) => User.destroy({ where: { id } });
