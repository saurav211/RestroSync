import React from 'react'
import { Button } from "primereact/button";
export default function PlacedOrderItem({ item, setSelectedOrder }) {

    const addOrder = (item) => {
        setSelectedOrder((prev) => {
            const existingItem = prev.find((i) => i.id === item.id);
            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, order: i.order + 1 } : i
                );
            }
            return [...prev, { ...item, order: 1 }];
        });
    }
    const decreaseOrder = (item) => {
        setSelectedOrder((prev) => {
            const existingItem = prev.find((i) => i.id === item.id);
            if (existingItem && existingItem.order > 1) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, order: i.order - 1 } : i
                );
            }
            return prev.filter((i) => i.id !== item.id);
        });
    }
return (
    <div className="PlacedOrderItem">
        <div className="PlacedOrderItemImage">
            <img src={item.image} alt={item.name} />
        </div>
        <div className="PlacedOrderItemDetails">
            <div className="PlacedOrderItemActions">
                <div>{item.name}</div>
                <Button
                    icon="pi pi-times"
                    severity="danger"
                    style={{ width: "1.5rem", height: "1.5rem", lineHeight: "1.5rem" }}
                    rounded
                    aria-label="Remove"
                    onClick={() =>
                        setSelectedOrder((prev) => prev.filter((i) => i.id !== item.id))
                    }
                />
            </div>
            <div>₹{item.price}</div>
            <div className="PlacedOrderItemManage">

            <div className="OrderItemManage">
            {item.order >= 1 && (
              <>
                <Button
                  outlined
                  severity='secondary'
                  style={{ width: "1rem", height: "1rem", padding: "0.7rem", justifyContent : "center"}}
                  onClick={() => decreaseOrder(item)}
                >
                  <i className="pi pi-minus"></i>
                </Button>

                {item.order}
              </>
            )}
            <Button
              outlined
                  severity='secondary'
                  style={{ width: "1rem", height: "1rem", padding: "0.7rem", justifyContent : "center"}}
              onClick={() => addOrder(item)}
            >
              <i className="pi pi-plus"></i>
            </Button>
          </div>
            </div>
        </div>
    </div>
);
}
