"use server";

import { httpClient } from "@/lib/axios/httpClient";
import type {
  IProduct,
  IUpdateProductPayload,
} from "../types/product.types";

export const getProducts = async () => {
  try {
    return await httpClient.get<IProduct[]>("/products");
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  payload: IUpdateProductPayload
) => {
  try {
    return await httpClient.patch<IProduct>(
      `/products/${id}`,
      payload
    );
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    return await httpClient.delete(`/products/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};