const dashboardService = require('./dashboard.service');

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const analytics = await dashboardService.getDashboardAnalytics();
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};