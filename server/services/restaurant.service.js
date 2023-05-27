const Sequelize = require('sequelize');
const { Restaurant, Geolocation } = require('../models');

// create restaurant
exports.createRestaurant = async (data) => {
  const {
    latitude,
    longitude,
  } = data;

  const geolocation = await Geolocation.create({ latitude, longitude });

  return Restaurant.create({
    geolocationId: geolocation.id,
  });
};

// find all restaurants
exports.findRestaurants = async (page, limit) => Restaurant.findAndCountAll({
  limit,
  offset: parseInt(page * limit, 10),
  include: [{ all: true, include: [{ all: true }] }],
});

// find all restaurants, order by distance from given user
exports.findAllRestaurants = async (lat, lng) => Restaurant.findAll({
  attributes: [[Sequelize.literal(`6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(${lng}) - radians(longitude)) + sin(radians(${lat})) * sin(radians(latitude)))`), 'distance']],
  order: Sequelize.col('distance'),
  include: [{ all: true, include: [{ all: true }] }],
});

// find single restaurant
exports.findRestaurant = async (id) => Restaurant.findByPk(id);

// delete single restaurant
exports.deleteRestaurant = async (id) => Restaurant.destroy({ where: { id } });
