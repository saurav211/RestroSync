const OrderService = require('./order.service');
const Order = require('./order.schema');

exports.placeOrder = async (req, res) => {
  try {
    const { items, type, cookingInstructions, estimatedMinutes } = req.body;
    const order = await OrderService.placeOrderWithAssignment({ items, type, cookingInstructions, estimatedMinutes });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.completeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderService.completeOrder(id);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrdersWithAutoComplete();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
