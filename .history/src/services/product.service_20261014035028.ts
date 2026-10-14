"use server";

import { httpClient } from "@/lib/axios/httpClient";
import type {
  IProduct,
  IUpdateProductPayload,
} from "@/src/types/product.types";

export const getProducts = async (query = "") => {
  try {
    const queryString = query
      ? `?${query.replace(/^\?/, "")}`
      : "";

    return await httpClient.get<IProduct[]>(
      `/products${queryString}`
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    return await httpClient.get<IProduct>(
      `/products/${id}?include=productImages`
    );
  } catch (error) {
    console.error("Error fetching product:", error);
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