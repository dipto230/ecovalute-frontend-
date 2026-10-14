"use server";

import { httpClient } from "@/lib/axios/httpClient";
import type {
  IProduct,
  IUpdateProductPayload,
} from "@/src/types/product.types";

type ProductQueryInput =
  | string
  | {
      queryKey?: readonly unknown[];
    }
  | undefined;

const normalizeProductQuery = (
  input: ProductQueryInput
): string => {
  let query = "";

  if (typeof input === "string") {
    query = input;
  } else if (
    input &&
    typeof input === "object" &&
    Array.isArray(input.queryKey)
  ) {
    const queryParams = input.queryKey[1];

    if (typeof queryParams === "string") {
      query = queryParams;
    } else if (
      queryParams &&
      typeof queryParams === "object"
    ) {
      query = new URLSearchParams(
        Object.entries(queryParams as Record<string, unknown>)
          .filter(
            ([, value]) =>
              value !== undefined && value !== null
          )
          .map(([key, value]) => [key, String(value)])
      ).toString();
    }
  }

  return query.replace(/^\?/, "");
};

export const getProducts = async (
  query: ProductQueryInput = ""
) => {
  try {
    const queryString = normalizeProductQuery(query);

    return await httpClient.get<IProduct[]>(
      `/products${queryString ? `?${queryString}` : ""}`
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