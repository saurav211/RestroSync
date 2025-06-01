import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import './Dashboard.css';
import OrderSummaryChart from './OrderSummaryChart';
import RevenueChart from './RevenueChart';
import TableDashboard from '../Table/TableDashboard';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalChefs: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalClients: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/dashboard/analytics');
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="analytics-section">
        <div className="analytics-card">
          <div className="analytics-icon">🍳</div>
          <div className="analytics-data">
            <h3>{analytics.totalChefs}</h3>
            <p>Total Chefs</p>
          </div>
        </div>
        <div className="analytics-card">
          <div className="analytics-icon">💰</div>
          <div className="analytics-data">
            <h3>₹{analytics.totalRevenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="analytics-card">
          <div className="analytics-icon">📦</div>
          <div className="analytics-data">
            <h3>{analytics.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="analytics-card">
          <div className="analytics-icon">👥</div>
          <div className="analytics-data">
            <h3>{analytics.totalClients}</h3>
            <p>Total Clients</p>
          </div>
        </div>
      </div>
      <div className="charts-section">
        <OrderSummaryChart />
        <div className="revenue-chart">
          <RevenueChart />
        </div>
        <div className="tables-status">
          <h4>Tables</h4>
          <div>
            <TableDashboard />
          </div>
        </div>
      </div>
      <div className="chef-orders">
        <h4>Chef Orders</h4>
        <table>
          <thead>
            <tr>
              <th>Chef Name</th>
              <th>Order Taken</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Manesh</td>
              <td>03</td>
            </tr>
            <tr>
              <td>Pritam</td>
              <td>07</td>
            </tr>
            <tr>
              <td>Yash</td>
              <td>05</td>
            </tr>
            <tr>
              <td>Tenzen</td>
              <td>08</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
