import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const periods = [
  { value: 'day', label: 'Daily (Mon-Sun)' },
  { value: 'week', label: 'Weekly' },
  { value: 'month', label: 'Monthly' },
];

const RevenueChart = () => {
  const [period, setPeriod] = useState('day');
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axios.get(`/api/dashboard/revenue?period=${period}`);
        const labels = res.data.map(item => item.label);
        const totals = res.data.map(item => item.total);
        setData({
          labels,
          datasets: [
            {
              label: 'Revenue',
              data: totals,
              borderColor: '#4caf50',
              backgroundColor: 'rgba(76,175,80,0.1)',
              tension: 0.4,
              fill: true,
            },
          ],
        });
      } catch (err) {
        setData({ labels: [], datasets: [] });
      }
    };
    fetchRevenue();
  }, [period]);

  return (
    <div style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 2px 8px #eee' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <h4 style={{ margin: 0 }}>Revenue</h4>
        <select value={period} onChange={e => setPeriod(e.target.value)}>
          {periods.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <Line data={data} options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: false },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: v => `₹${v}` } },
        },
      }} />
    </div>
  );
};

export default RevenueChart;
