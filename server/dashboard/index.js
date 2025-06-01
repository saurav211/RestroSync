const express = require('express');
const router = express.Router();
const dashboardService = require('./dashboard.service');

router.get('/analytics', async (req, res) => {
  try {
    const analytics = await dashboardService.getDashboardAnalytics();
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/order-summary', async (req, res) => {
  try {
    const { filter } = req.query;
    const summary = await dashboardService.getOrderSummary(filter);
    res.json(summary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/revenue', async (req, res) => {
  try {
    const { period } = req.query;
    const stats = await dashboardService.getRevenueStats(period || 'day');
    res.json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
