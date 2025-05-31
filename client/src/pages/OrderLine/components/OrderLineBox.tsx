import React from "react";
import { SpoonSVG } from "../svg/Spoon";
import { OrderDoneSVG } from "../svg/OrderDone";
import { OrderProcessingSVG } from "../svg/OrderProcessing";

export type OrderStatus = "processing" | "done" | "not_picked_up";
export type OrderType = "dine_in" | "take_away";

export interface OrderLineBoxProps {
  orderNo: number;
  tableNo: string;
  time: string;
  items: string[];
  status: OrderStatus;
  type: OrderType;
}

const statusBtnColor = {
  processing: "#D87300",
  done: "#0E912F",
  not_picked_up: "#3B413D",
};

const statusColor = {
  processing: "#fdba74",
  done: "#0E912F",
  not_picked_up: "#3B413D",
};

const statusSubLabel = (status: OrderStatus, type: OrderType) => {
  if (status === "processing" && type === "dine_in") return "Ongoing: 4 Min";
  if (status === "processing" && type === "take_away") return "Ongoing: 4 Min";
  if (status === "done") return "Served";
  if (status === "not_picked_up") return "Not Picked up";
  return "";
};

const statusMainLabel = (status: OrderStatus, type: OrderType) => {
  if (type === "dine_in") return "Dine In";
  if (type === "take_away") return "Take Away";
  return "";
};

const OrderLineBox: React.FC<OrderLineBoxProps> = ({
  orderNo,
  tableNo,
  time,
  items,
  status,
  type,
}) => (
  <>
    <div className="orderline-card-header">
      <div className="orderline-card-info">
        <span>
          <SpoonSVG color={statusColor[status]} />
          <span className="orderline-card-number"># {orderNo}</span>
        </span>
        <span>Table: {tableNo}</span>
        <span>{time}</span>
        <span>{items.length - 1} Item</span>
      </div>
      <div style={{ textAlign: "right" }}>
        <span className={`orderline-type-badge ${type}`}>
          {statusMainLabel(status, type)}
          <br />
          <span
            style={{
              fontSize: "0.85em",
              color: "#6b7280",
              fontWeight: 500,
              display: "block",
              marginTop: "2px",
            }}
          >
            {status === "done"
              ? "Served"
              : status === "not_picked_up"
              ? "Not Picked up"
              : "Ongoing: 4 Min"}
          </span>
        </span>
      </div>
    </div>
    <div className="orderline-items-box">
      <div className="orderline-items-title">{items[0]}</div>
      <ul className="orderline-items-list">
        {items.slice(1).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
    <div>
      <span className={`orderline-status-btn ${status}`}>
        {status === "processing" && (
          <>
            Processing <OrderProcessingSVG color={statusBtnColor.processing} />
          </>
        )}
        {status === "done" && (
          <>
            Order Done <OrderDoneSVG color={statusBtnColor.done} />
          </>
        )}
        {status === "not_picked_up" && (
          <>
            Order Done
            <OrderDoneSVG color={statusBtnColor.not_picked_up} />
          </>
        )}
      </span>
    </div>
  </>
);

export default OrderLineBox;
