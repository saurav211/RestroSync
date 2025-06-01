const Chef = require('../chef/chef.schema');
const Order = require('../order/order.schema');

exports.getDashboardAnalytics = async () => {
  // Total Chefs
  const totalChefs = await Chef.countDocuments();

  // Total Revenue
  const orders = await Order.find();
  const totalRevenue = orders.reduce((sum, order) => {
    const orderTotal = order.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0);
    return sum + orderTotal;
  }, 0);

  // Total Orders
  const totalOrders = orders.length;

  // Total Clients (assuming unique phone numbers represent unique clients)
  const uniqueClients = new Set(orders.map(order => order.phone));
  const totalClients = uniqueClients.size;

  return {
    totalChefs,
    totalRevenue,
    totalOrders,
    totalClients
  };
};

exports.getOrderSummary = async (filter) => {
  const now = new Date();
  let startDate;

  if (filter === 'day') {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (filter === 'week') {
    const firstDayOfWeek = now.getDate() - now.getDay();
    startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
  } else if (filter === 'month') {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else {
    throw new Error('Invalid filter type');
  }

  const orders = await Order.find({ placedAt: { $gte: startDate } });

  const summary = {
    served: 0,
    dineIn: 0,
    takeAway: 0,
  };

  orders.forEach(order => {
    if (order.type === 'Dine In') {
      summary.dineIn++;
    } else if (order.type === 'Take Away') {
      summary.takeAway++;
    }
  });

  // Update Served calculation
  summary.served = summary.dineIn + summary.takeAway;

  return summary;
};
