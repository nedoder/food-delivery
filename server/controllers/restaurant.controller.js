const {
  createRestaurant, findRestaurant, findRestaurants, deleteRestaurant,
} = require('../services/restaurant.service');
const { findGeolocation, deleteGeolocation } = require('../services/geolocation.service');

// Create new restaurant
// eslint-disable-next-line consistent-return
exports.create = async (req, res) => {
  if (!req.body.latitude || !req.body.longitude) {
    res.status(400).send({
      message: 'You must enter valid location!',
    });
    return;
  }
  try {
    const location = await findGeolocation(req.body.latitude, req.body.longitude);
    if (location.length === 0) {
      const restaurant = await createRestaurant(req.body);
      res.status(200).send(restaurant);
      return;
    }
    res.status(400).send({
      message: 'Restaurant already exists.',
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Retrieve all restaurants from the database.
exports.findAll = async (req, res) => {
  const page = parseInt(req.query.page, 10) - 1;
  const limit = 20;

  try {
    const restaurants = await findRestaurants(page, limit);
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete single restaurant
// eslint-disable-next-line consistent-return
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await findRestaurant(id);
    if (!restaurant) {
      return res.status(400).send({
        message: 'Restaurant not found.',
      });
    }

    await deleteRestaurant(id);
    await deleteGeolocation(restaurant.geolocationId);
    return res.status(200).send({
      message: 'Restaurant was deleted successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: `Error deleting restaurant with id=${id}`,
    });
  }
};
