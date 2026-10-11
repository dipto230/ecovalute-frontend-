
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import type { IPaymentQuery, IPayment } from "@/src/types/payment.types";

export const getPayments = async (params?: IPaymentQuery) => {
  try {
    return await httpClient.get<IPayment[]>("/payments", {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
        ...(params?.status && params.status !== "ALL"
          ? { status: params.status }
          : {}),
      },
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};
