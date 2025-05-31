import React from "react";
import OrderLineBox from "./components/OrderLineBox";
import type { OrderLineBoxProps } from "./components/OrderLineBox";
import "./OrderLine.css"; // Import the CSS

const orders: OrderLineBoxProps[] = [
  {
    orderNo: 108,
    tableNo: "A05",
    time: "9:47 AM",
    items: [
      "1 x Value Set Meals",
      "1 x Double Cheeseburger",
      "1 x Apple Pie",
      "1 x Coca-Cola L",
    ],
    status: "processing",
    type: "dine_in",
  },
  {
    orderNo: 108,
    tableNo: "A05",
    time: "9:47 AM",
    items: [
      "1 x Value Set Meals",
      "1 x Double Cheeseburger",
      "1 x Apple Pie",
      "1 x Coca-Cola L",
    ],
    status: "done",
    type: "dine_in",
  },
  {
    orderNo: 108,
    tableNo: "A05",
    time: "9:47 AM",
    items: [
      "1 x Value Set Meals",
      "1 x Double Cheeseburger",
      "1 x Apple Pie",
      "1 x Coca-Cola L",
    ],
    status: "not_picked_up",
    type: "take_away",
  },
  {
    orderNo: 108,
    tableNo: "A05",
    time: "9:47 AM",
    items: [
      "1 x Value Set Meals",
      "1 x Double Cheeseburger",
      "1 x Apple Pie",
      "1 x Coca-Cola L",
    ],
    status: "processing",
    type: "dine_in",
  },
  {
    orderNo: 108,
    tableNo: "A05",
    time: "9:47 AM",
    items: [
      "1 x Value Set Meals",
      "1 x Double Cheeseburger",
      "1 x Apple Pie",
      "1 x Coca-Cola L",
    ],
    status: "processing",
    type: "dine_in",
  },
  {
    orderNo: 108,
    tableNo: "A05",
    time: "9:47 AM",
    items: [
      "1 x Value Set Meals",
      "1 x Double Cheeseburger",
      "1 x Apple Pie",
      "1 x Coca-Cola L",
    ],
    status: "not_picked_up",
    type: "take_away",
  },
  {
    orderNo: 108,
    tableNo: "A05",
    time: "9:47 AM",
    items: [
      "1 x Value Set Meals",
      "1 x Double Cheeseburger",
      "1 x Apple Pie",
      "1 x Coca-Cola L",
    ],
    status: "done",
    type: "dine_in",
  },
  {
    orderNo: 108,
    tableNo: "A05",
    time: "9:47 AM",
    items: [
      "1 x Value Set Meals",
      "1 x Double Cheeseburger",
      "1 x Apple Pie",
      "1 x Coca-Cola L",
    ],
    status: "processing",
    type: "dine_in",
  },
];

const OrderLine: React.FC = () => (
  <div className="orderline-root">
      <h2 className="orderline-title">Order Line</h2>
    <div className="orderline-container">
      <div className="orderline-grid">
        {orders.map((order, idx) => (
          <div
            key={idx}
            className={`orderline-card ${order.status}`}
          >
            <OrderLineBox {...order} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default OrderLine;
