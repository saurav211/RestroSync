import { useEffect } from "react";

export default function OrderItem({ item , addOrder, decreaseOrder}) {
  useEffect(() => {}, [item]);
  return (
    <div className="OrderItem">
      <div className="OrderItemImage">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="OrderItemDetails">
        <div className="OrderItem_name">{item.name}</div>
        <div className="OrderInfo">
          <div className="OrderItem_price">₹{item.price}</div>
          <div className="OrderItemManage">
            {item.order >= 1 && (
              <>
                <button
                  className="OrderItemManageButton"
                  onClick={() => decreaseOrder(item)}
                >
                  <i className="pi pi-minus"></i>
                </button>

                {item.order}
              </>
            )}
            <button
              className="OrderItemManageButton"
              onClick={() => addOrder(item)}
            >
              <i className="pi pi-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
