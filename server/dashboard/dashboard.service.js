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

exports.getRevenueStats = async (period = 'day') => {
  const now = new Date();
  let startDate, groupBy, dateFormat;

  if (period === 'day') {
    // For daily: last 7 days (Mon-Sun)
    const dayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)
    // Get last Monday
    const lastMonday = new Date(now);
    lastMonday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    lastMonday.setHours(0, 0, 0, 0);
    startDate = lastMonday;
    groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$placedAt' } };
    dateFormat = 'YYYY-MM-DD';
  } else if (period === 'week') {
    // For weekly: last 4 weeks
    const fourWeeksAgo = new Date(now);
    fourWeeksAgo.setDate(now.getDate() - 28);
    fourWeeksAgo.setHours(0, 0, 0, 0);
    startDate = fourWeeksAgo;
    groupBy = { $isoWeek: '$placedAt' };
    dateFormat = 'YYYY-[W]WW';
  } else if (period === 'month') {
    // For monthly: last 12 months
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    startDate = twelveMonthsAgo;
    groupBy = { $dateToString: { format: '%Y-%m', date: '$placedAt' } };
    dateFormat = 'YYYY-MM';
  } else {
    throw new Error('Invalid period type');
  }

  // Aggregate revenue by group
  const revenueData = await Order.aggregate([
    { $match: { placedAt: { $gte: startDate } } },
    { $unwind: '$items' },
    {
      $group: {
        _id: groupBy,
        total: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Format result for chart
  return revenueData.map(item => ({
    label: item._id,
    total: item.total,
  }));
};
