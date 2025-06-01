import api from "../../config/axios";

export async function placeOrderApi(orderData) {
  // orderData: { items, type, cookingInstructions, estimatedMinutes, ...userDetails }
  return api.post("/api/order", orderData);
}

export async function completeOrderApi(orderId) {
  return api.patch(`/api/order/${orderId}/complete`);
}

export async function getOrdersApi() {
  return api.get("/api/order");
}

export async function getMenuItemsApi() {
  return api.get("/api/menu");
}

export async function getMenuItemsByCategoryApi(category) {
  return api.get(`/api/menu/category/${category}`);
}
