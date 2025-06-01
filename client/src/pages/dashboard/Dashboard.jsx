import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import './Dashboard.css';
import OrderSummaryChart from './OrderSummaryChart';
import RevenueChart from './RevenueChart';
import TableDashboard from '../Table/TableDashboard';
import Sidebar from '../sidebar/Sidebar';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalChefs: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalClients: 0,
  });
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/dashboard/analytics');
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    const fetchChefs = async () => {
      try {
        const res = await axios.get('/api/chef');
        setChefs(res.data);
      } catch (error) {
        console.error('Error fetching chefs:', error);
      }
    };

    fetchAnalytics();
    fetchChefs();
  }, []);

  return (<div style={{ display: 'flex' }}>
    <Sidebar  />
    <div className="dashboard-container" style={{ flex: 1 }}>
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
            {chefs.map((chef) => (
              <tr key={chef._id}>
                <td>{chef.name}</td>
                <td>{chef.ordersProcessing ? chef.ordersProcessing.length.toString().padStart(2, '0') : '00'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
