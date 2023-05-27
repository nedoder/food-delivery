const { Geolocation } = require('../models');

// find all geolocations
exports.findGeolocation = async (latitude, longitude) => Geolocation.findAll({
  where: {
    latitude,
    longitude,
  },
});

// delete geolocation
exports.deleteGeolocation = async (id) => Geolocation.destroy({ where: { id } });
