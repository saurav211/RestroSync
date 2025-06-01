const Chef = require('../chef/chef.schema');
const Table = require('../table/table.schema');
const Order = require('./order.schema');
const MenuItem = require('../menu/menuItem.schema');

// Helper to get chef with soonest availability
const determineBestChef = async () => {
  const chefs = await Chef.find();
  let bestChef = null;
  let soonest = null;
  const now = new Date();
  chefs.forEach(chef => {
    if (!chef.ordersProcessing.length) {
      if (!soonest || now < soonest) {
        bestChef = chef;
        soonest = now;
      }
    } else {
      const lastOrder = chef.ordersProcessing.reduce((a, b) => a.estimatedFinish > b.estimatedFinish ? a : b);
      if (!soonest || lastOrder.estimatedFinish < soonest) {
        bestChef = chef;
        soonest = lastOrder.estimatedFinish;
      }
    }
  });
  return bestChef;
};

// Place new order and assign chef/table
exports.placeOrderWithAssignment = async ({ items, type, cookingInstructions, estimatedMinutes }) => {
  // Find best chef
  const chef = await determineBestChef();
  if (!chef) throw new Error('No chefs available');

  // Calculate estimatedMinutes if not provided
  let totalMinutes = 0;
  if (!estimatedMinutes) {
    for (const item of items) {
      // Find menu item by name
      const menuItem = await MenuItem.findOne({ name: item.name });
      if (menuItem && menuItem.timeToPrepare) {
        totalMinutes += menuItem.timeToPrepare * (item.quantity || 1);
      } else {
        totalMinutes += 5 * (item.quantity || 1); // fallback default
      }
    }
  }
  const minutes = estimatedMinutes || totalMinutes || 15;

  // Estimate finish time
  const now = new Date();
  const estimatedFinish = new Date(now.getTime() + minutes * 60000);
  // Assign table if dine in
  let tableId = null;
  if (type === 'Dine In') {
    const table = await Table.findOne({ booked: false, reserved: false });
    if (!table) throw new Error('No tables available');
    table.booked = true;
    await table.save();
    tableId = table._id;
  }
  // Create order
  const order = new Order({ items, type, tableId, chefId: chef._id, cookingInstructions, estimatedFinish });
  await order.save();
  // Add order to chef
  chef.ordersProcessing.push({ orderId: order._id, estimatedFinish });
  await chef.save();
  return order;
};

// Complete an order
exports.completeOrder = async (orderId) => {
  // Find the order
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  // Mark order as Done
  order.status = 'Done';
  await order.save();

  // Remove order from chef's processing list
  if (order.chefId) {
    await Chef.findByIdAndUpdate(order.chefId, {
      $pull: { ordersProcessing: { orderId: order._id } }
    });
  }

  // Free up the table if dine-in
  if (order.type === 'Dine In' && order.tableId) {
    await Table.findByIdAndUpdate(order.tableId, { booked: false });
  }

  return order;
};

// Auto-complete orders whose estimatedFinish has passed
exports.autoCompleteOrders = async () => {
  const now = new Date();
  // Find all processing orders where estimatedFinish is in the past
  const orders = await Order.find({ status: 'Processing', estimatedFinish: { $lte: now } });
  for (const order of orders) {
    order.status = 'Done';
    // Calculate actual time taken
    if (order.placedAt && order.estimatedFinish) {
      order.timeTaken = Math.round((order.estimatedFinish - order.placedAt) / 60000); // in minutes
    }
    await order.save();
    // Remove from chef's processing list
    if (order.chefId) {
      await Chef.findByIdAndUpdate(order.chefId, {
        $pull: { ordersProcessing: { orderId: order._id } }
      });
    }
    // Free up the table if dine-in
    if (order.type === 'Dine In' && order.tableId) {
      await Table.findByIdAndUpdate(order.tableId, { booked: false });
    }
  }
};

// Get all orders with auto-complete
exports.getAllOrdersWithAutoComplete = async () => {
  const now = new Date();
  const orders = await Order.find().populate('tableId').populate('chefId').sort({ placedAt: -1 });
  const updatePromises = orders.map(async (order) => {
    let shouldUpdate = false;
    if (
      (order.estimatedFinish && order.estimatedFinish <= now) ||
      (order.placedAt && order.timeTaken && (new Date(order.placedAt.getTime() + order.timeTaken * 60000) <= now))
    ) {
      if (order.status !== 'Done') {
        order.status = 'Done';
        shouldUpdate = true;
        // Free up the table if dine-in
        if (order.type === 'Dine In' && order.tableId) {
          await Table.findByIdAndUpdate(order.tableId, { booked: false });
        }
        // Remove order from chef's processing list
        if (order.chefId) {
          await Chef.findByIdAndUpdate(order.chefId, {
            $pull: { ordersProcessing: { orderId: order._id } }
          });
        }
      }
    }
    if (shouldUpdate) {
      await order.save();
    }
    return order;
  });
  return Promise.all(updatePromises);
};
