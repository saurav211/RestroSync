import React, {useState, useEffect} from 'react'
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { BurgerSvg } from '../svg/burgerSvg';
import { PizzaSvg } from '../svg/PizzaSvg';
import { DrinkSvg } from '../svg/DrinkSvg';
import { FrenchfriesSvg } from '../svg/FrenchfriesSvg';
import { VeggiesSvg } from '../svg/VeggiesSvg';
import { getMenuItemsByCategoryApi } from "../orderApi";
import Greet from '../Greet/Greet';
import OrderItem from '../OrderItem/OrderItem';


export default function AddOrder({selectStatus, setSelectedOrder}) {

  const [orderCategories, setOrderCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    let categories = [
      { id: 1, name: "Burger", icon: <BurgerSvg /> },
      { id: 2, name: "Pizza", icon: <PizzaSvg /> },
      { id: 3, name: "Drink", icon: <DrinkSvg /> },
      { id: 4, name: "French fries", icon: <FrenchfriesSvg /> },
      { id: 5, name: "Veggies", icon: <VeggiesSvg /> },
    ];
    setOrderCategories(categories);
  }, []);

  async function getOrder(itemName) {
    setOrderItems([]);
    const res = await getMenuItemsByCategoryApi(itemName);
    setOrderItems(res.data.map(item => ({
      id: item._id,
      name: item.name,
      price: item.price,
      order: 0,
      category: item.category,
      image: item.image || null
    })));
  }

  function addOrder(item) {
    setSelectedOrder((prevOrders) => {
      const existingOrder = prevOrders.find((order) => order.id === item.id);
      if (existingOrder) {
        return prevOrders.map((order) =>
          order.id === item.id ? { ...order, order: order.order + 1 } : order
        );
      } else {
        return [...prevOrders, { ...item, order: 1 }];
      }
    });

    setOrderItems((prevItems) =>
      prevItems.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, order: orderItem.order + 1 }
          : orderItem
      )
    );
  }

  function decreaseOrder(item) {
    setSelectedOrder((prevOrders) => {
      const existingOrder = prevOrders.find((order) => order.id === item.id);
      if (existingOrder && existingOrder.order > 1) {
        return prevOrders.map((order) =>
          order.id === item.id ? { ...order, order: order.order - 1 } : order
        );
      } else {
        return prevOrders.filter((order) => order.id !== item.id);
      }
    });

    setOrderItems((prevItems) =>
      prevItems.map((orderItem) =>
        orderItem.id === item.id && orderItem.order > 0
          ? { ...orderItem, order: orderItem.order - 1 }
          : orderItem
      )
    );
  }
  return (
    <>
    <div className="OrderHeader">
        <Greet />
        <div className="OrderSearch">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              style={{
                width: "100%",
                height: "2.5rem",
                background: "var(--inputBackground)",
              }}
              placeholder="Search"
            />
          </IconField>
        </div>
      </div>
      <div className="OrderType">
        {orderCategories.map((category) => (
          <div
            className={
              selectedCategory.name === category.name
                ? "SelectedCategory OrderTypeItem"
                : "OrderTypeItem"
            }
            key={category.id}
            onClick={() => {
              setSelectedCategory(category);
              getOrder(category.name);
            }}
          >
            {category.icon}
            <span className="OrderTypeName">{category.name}</span>
          </div>
        ))}
      </div>

      <div className="OrderContainer">
        <div className="OrderContainerHeader">{selectedCategory.name}</div>
        <div className="OrderContainerBody">
          {orderItems.map((item) => {
            return (
              <OrderItem
                key={item.id}
                item={item}
                addOrder={addOrder}
                decreaseOrder={decreaseOrder}
              />
            );
          })}
        </div>
      </div>
      <div className="FooterContainer">
        <Button
          label="Next"
          className="p-button-raised p-button-rounded p-button-secondary"
          style={{ height: "2rem" , fontSize: '0.8rem', padding: '0.5rem 2rem'}}
          onClick={() => {
            selectStatus("PlaceOrder");
          }}
        />
      </div>
    </>
  );
}