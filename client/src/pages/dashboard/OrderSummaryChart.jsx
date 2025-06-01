import React, { useEffect, useRef, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import axios from '../../config/axios';

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

const OrderSummaryChart = () => {
  const [summary, setSummary] = useState({ served: 0, dineIn: 0, takeAway: 0 });
  const [filter, setFilter] = useState('day');
  const canvasRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(`/api/dashboard/order-summary?filter=${filter}`);
        const data = response.data;
        setSummary({
          served: data.dineIn + data.takeAway,
          dineIn: data.dineIn,
          takeAway: data.takeAway,
        });
      } catch (error) {
        console.error('Error fetching order summary:', error);
      }
    };

    fetchSummary();
  }, [filter]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const data = {
      labels: ['Served', 'Dine In', 'Take Away'],
      datasets: [
        {
          data: [summary.served, summary.dineIn, summary.takeAway],
          backgroundColor: ['#333333', '#666666', '#999999'],
          hoverBackgroundColor: ['#222222', '#555555', '#888888'],
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: false, // Hides the legend titles
        },
      },
    };

    const ctx = canvasRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data,
      options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [summary]);

  return (
    <div className="order-summary-container" style={{ backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div className="order-summary-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Order Summary</h4>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ddd' }}>
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
        </select>
      </div>
      <div className="order-summary-cards" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div className="order-summary-card" style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #ddd', borderRadius: '10px', padding: '10px 20px', textAlign: 'center', color: '#333' }}>
          <h3 style={{ fontSize: '24px', margin: '0' }}>{summary.served}</h3>
          <p style={{ fontSize: '14px', margin: '5px 0 0' }}>Served</p>
        </div>
        <div className="order-summary-card" style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #ddd', borderRadius: '10px', padding: '10px 20px', textAlign: 'center', color: '#333' }}>
          <h3 style={{ fontSize: '24px', margin: '0' }}>{summary.dineIn}</h3>
          <p style={{ fontSize: '14px', margin: '5px 0 0' }}>Dine In</p>
        </div>
        <div className="order-summary-card" style={{ backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #ddd', borderRadius: '10px', padding: '10px 20px', textAlign: 'center', color: '#333' }}>
          <h3 style={{ fontSize: '24px', margin: '0' }}>{summary.takeAway}</h3>
          <p style={{ fontSize: '14px', margin: '5px 0 0' }}>Take Away</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '120px', height: '120px', marginRight: '20px' }}>
          <canvas ref={canvasRef} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#666', fontSize: '14px', flex: '0 0 80px' }}>Take Away</span>
            <span style={{ color: '#666', fontSize: '14px', flex: '0 0 40px' }}>{Math.round((summary.takeAway / (summary.served || 1)) * 100)}%</span>
            <div style={{ flex: 1, height: '8px', backgroundColor: '#f0f0f0', position: 'relative' }}>
              <div style={{ width: `${Math.round((summary.takeAway / (summary.served || 1)) * 100)}%`, height: '100%', backgroundColor: '#999' }}></div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#666', fontSize: '14px', flex: '0 0 80px' }}>Served</span>
            <span style={{ color: '#666', fontSize: '14px', flex: '0 0 40px' }}>{Math.round((summary.served / (summary.served || 1)) * 100)}%</span>
            <div style={{ flex: 1, height: '8px', backgroundColor: '#f0f0f0', position: 'relative' }}>
              <div style={{ width: `${Math.round((summary.served / (summary.served || 1)) * 100)}%`, height: '100%', backgroundColor: '#666' }}></div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#666', fontSize: '14px', flex: '0 0 80px' }}>Dine In</span>
            <span style={{ color: '#666', fontSize: '14px', flex: '0 0 40px' }}>{Math.round((summary.dineIn / (summary.served || 1)) * 100)}%</span>
            <div style={{ flex: 1, height: '8px', backgroundColor: '#f0f0f0', position: 'relative' }}>
              <div style={{ width: `${Math.round((summary.dineIn / (summary.served || 1)) * 100)}%`, height: '100%', backgroundColor: '#333' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryChart;
