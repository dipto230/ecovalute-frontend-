"use server";

import { httpClient } from "@/lib/axios/httpClient";
import type { IPaymentQuery } from "@/src/types/payment.types";

export const getPayments = async (
  params?: IPaymentQuery,
) => {
  try {
    return await httpClient.get("/payments", {
      params: params
        ? {
            page: params.page,
            limit: params.limit,
            status: params.status,
          }
        : undefined,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};