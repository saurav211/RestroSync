








import React, { useMemo } from "react";
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
  onComplete?: () => void;
  placedAt?: string;
  estimatedFinish?: string;
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

const getOngoingTime = (placedAt: string) => {
  if (!placedAt) return "-";
  const now = new Date();
  const placed = new Date(placedAt);
  const diffMs = now.getTime() - placed.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  return `${diffMin} Min`;
};

const getTimeLeft = (estimatedFinish?: string) => {
  if (!estimatedFinish) return "-";
  const now = new Date();
  const finish = new Date(estimatedFinish);
  const diffMs = finish.getTime() - now.getTime();
  const diffMin = Math.ceil(diffMs / 60000);
  return diffMin > 0 ? `${diffMin} min left` : "Ready";
};

const OrderLineBox: React.FC<OrderLineBoxProps & { orderIndex?: number; timeTaken?: number }> = ({
  orderNo,
  tableNo,
  time,
  items,
  status,
  type,
  onComplete,
  placedAt,
  estimatedFinish,
  orderIndex,
  timeTaken
}) => {
  const ongoingTime = useMemo(() => getOngoingTime(placedAt || ""), [placedAt]);
  // Use a simple order number (e.g., #108)
  const orderNumber = `#${orderIndex !== undefined ? 108 + orderIndex : orderNo.toString().slice(-3)}`;

  return (
    <>
      <div className="orderline-card-header">
        <div className="orderline-card-info">
          <span>
            <SpoonSVG color={statusColor[status]} />
            <span className="orderline-card-number">{orderNumber}</span>
          </span>
          <span>Table: {tableNo}</span>
          <span>{time}</span>
          <span>{items.length} Item{items.length > 1 ? 's' : ''}</span>
        </div>
        <span className={`orderline-type-badge ${type}`} style={{ position: 'static', marginLeft: 12 }}>
          {statusMainLabel(status, type)}<br />
          <span style={{ fontSize: "0.85em", color: "#6b7280", fontWeight: 500, display: "block", marginTop: "2px" }}>
            {status === "processing"
              ? getTimeLeft(estimatedFinish)
              : status === "done" && typeof timeTaken === "number"
              ? `Prepared in ${timeTaken} min`
              : status === "not_picked_up"
              ? "Not Picked up"
              : "Served"}
          </span>
        </span>
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
      {status === "processing" && onComplete && (
        <button
          className="order-complete-btn"
          onClick={onComplete}
        >
          Mark as Done
        </button>
      )}
    </>
  );
};

export default OrderLineBox;
