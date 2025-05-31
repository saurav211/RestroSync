import "./Order.css";
import AddOrder from "./AddOrder/AddOrder";
import React, { useState } from "react";
import PlaceOrder from "./PlaceOrder/PlaceOrder";

function Order() {
  const [status, selectStatus] = useState('AddOrder');
  const [selectedOrder, setSelectedOrder] = useState([]);
  return (
    <div className="OrderMainContainer">
      {
        status === 'AddOrder' && <AddOrder selectStatus={selectStatus} setSelectedOrder={setSelectedOrder}/>
      }
      {
        status === 'PlaceOrder' && <PlaceOrder selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
      }
    </div>
  );
}

export default Order;
