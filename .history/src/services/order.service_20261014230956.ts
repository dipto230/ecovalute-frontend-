"use server";

import { httpClient } from "@/lib/axios/httpClient";
import type {
  IOrderQuery,
  OrderStatus,
} from "@/src/types/order.types";

export const getOrders = async (params?: IOrderQuery) => {
  try {
      return await httpClient.get("/orders", { 
        params
     });
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getMyOrders = async (params?: IOrderQuery) => {
  try {
    return await httpClient.get("/orders/my-orders", { params });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    throw error;
  }
};

export const getOrderById = async (id: string) => {
  try {
    return await httpClient.get(`/orders/${id}`);
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus
) => {
  try {
    return await httpClient.patch(`/orders/${id}/status`, {
      status,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const cancelOrder = async (id: string) => {
  try {
    return await httpClient.patch(`/orders/${id}/cancel`, {});
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
};


export const buyNowOrder = async (productId: string) => {
  try {
    return await httpClient.post("/orders/buy-now", {
      productId,
    });
  } catch (error) {
    console.error("Error creating Buy Now order:", error);
    throw error;
  }
};
