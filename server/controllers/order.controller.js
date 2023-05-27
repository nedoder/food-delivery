const {
  createOrder, findOrder, updateOrder, updateOrderStatus, deleteOrder,
} = require('../services/order.service');
const { findUser } = require('../services/user.service');
const { findAllRestaurants } = require('../services/restaurant.service');

// Create new order
exports.createOrder = async (req, res) => {
  if (!req.body.quantity) {
    res.status(400).send({
      message: 'You must enter quantity!',
    });
    return;
  }
  if (!req.body.foodId) {
    res.status(400).send({
      message: 'You must enter food!',
    });
    return;
  }
  if (!req.body.total) {
    res.status(400).send({
      message: 'You must enter total price!',
    });
    return;
  }
  if (!req.body.userId) {
    res.status(400).send({
      message: 'You must enter user!',
    });
    return;
  }
  try {
    const order = await createOrder(req.body);
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Processing order
exports.processOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await findUser(req.body.userId);
    // eslint-disable-next-line max-len
    const restaurants = await findAllRestaurants(user.Geolocation.latitude, user.Geolocation.longitude);
    let deliveryRestaurant = null;
    const fifteenMin = 15 * 60000; // 60000 being the number of milliseconds in a minute
    const now = new Date();
    const fifteenMinutesAgo = new Date(now - fifteenMin);
    // console.log(restaurants);
    // eslint-disable-next-line no-plusplus, no-restricted-syntax
    for (const restaurant of restaurants) {
      const orders = restaurant.Orders;
      if (!orders.length || orders.every((order) => order.updatedAt < fifteenMinutesAgo)) {
        deliveryRestaurant = restaurant.Geolocation.Restaurant.id;
        break;
      }
    }
    if (deliveryRestaurant !== null) {
      req.body.restaurantId = deliveryRestaurant;
      await updateOrderStatus({
        userId: req.body.userId,
        restaurantId: req.body.restaurantId,
        total: req.body.total,
        status: 'approved',
      }, id);
      res.status(200).send({
        message: 'Your order is accepted!',
      });
    } else {
      await updateOrderStatus({
        userId: req.body.userId,
        status: 'rejected',
      }, id);
      res.status(400).send({
        message: 'All restaurants are busy at the moment!',
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Retrieve all orders from the database.
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await findOrder(id);
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update single order
// eslint-disable-next-line consistent-return
exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await findOrder(id);
    if (!order) {
      return res.status(400).send({
        message: 'Order not found.',
      });
    }

    await updateOrder(req.body, id);
    return res.status(200).send({
      message: 'Order was updated successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};

// Delete single order
// eslint-disable-next-line consistent-return
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await findOrder(id);
    if (!order) {
      return res.status(404).send({
        message: 'Order not found.',
      });
    }

    await deleteOrder(id);
    return res.status(200).send({
      message: 'Order was deleted successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: `Error deleting order with id=${id}`,
    });
  }
};
