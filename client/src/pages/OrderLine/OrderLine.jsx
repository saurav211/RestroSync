import React, { useEffect, useState } from "react";
import OrderLineBox from "./components/OrderLineBox";
import { getOrdersApi, completeOrderApi } from "../order/orderApi";
import "./OrderLine.css";

const OrderLine = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrdersApi();
      setOrders(res.data);
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const handleComplete = async (orderId) => {
    await completeOrderApi(orderId);
    fetchOrders();
  };

  return (
    <div className="orderline-root">
      <div className="orderline-container">
        <div className="orderline-title">Order Line</div>
        <div className="orderline-grid">
          {orders.map((order, idx) => (
            <div className={`orderline-card ${order.status}`} key={order._id}>
              <OrderLineBox
                orderNo={order._id}
                tableNo={order.tableId?.name || order.tableId?.numberOfSeats || "-"}
                time={new Date(order.placedAt).toLocaleTimeString()}
                items={order.items.map(i => `${i.quantity} x ${i.name}`)}
                status={order.status.toLowerCase().replace(" ", "_")}
                type={order.type.toLowerCase().replace(" ", "_")}
                onComplete={() => handleComplete(order._id)}
                placedAt={order.placedAt}
                estimatedFinish={order.estimatedFinish}
                orderIndex={idx}
                timeTaken={order.timeTaken}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderLine;
