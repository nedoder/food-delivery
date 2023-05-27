const { Order, OrderItem } = require('../models');

// create order
exports.createOrder = async (data) => {
  const {
    userId,
    foodId,
    quantity,
    amount,
    total,
  } = data;

  const order = await Order.create({
    status: 'draft',
    userId,
    total,
  });
  await OrderItem.create({
    foodId, quantity, amount, orderId: order.id,
  });

  return order;
};

// find single order
exports.findOrder = async (id) => Order.findByPk(
  id,
  {
    include: [{ all: true, include: [{ all: true }] }],
  },
);

// update single order
exports.updateOrder = async (data, id) => {
  const {
    status,
    userId,
    restaurantId,
    foodId,
    quantity,
    amount,
    total,
  } = data;

  const order = await Order.findByPk(id);
  await OrderItem.create({
    foodId, quantity, amount, orderId: id,
  });
  return Order.update({
    status,
    userId,
    restaurantId,
    total,
  }, {
    where: { id: order.id },
  });
};

// update order status
exports.updateOrderStatus = async (data, id) => {
  const {
    userId,
    status,
    restaurantId,
    total,
  } = data;

  const order = await Order.findByPk(id);
  return Order.update({
    userId,
    status,
    restaurantId,
    total,
  }, {
    where: { id: order.id },
  });
};

// find ordered items
exports.findOrderedItems = async (userId, itemId) => Order.findAll({
  where: {
    userId,
    '$OrderItems.foodId$': itemId,
  },
  include: [{ all: true, include: [{ all: true }] }],
});

// delete single order
exports.deleteOrder = async (id) => Order.destroy({ where: { id } });
