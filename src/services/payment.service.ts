
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

export interface ICheckoutSession {
  sessionId: string;
  checkoutUrl: string | null;
  orderId: string;
  amount: number;
  currency: string;
}

export const createCheckoutSession = async (orderId: string) => {
  try {
    const response = await httpClient.post<ICheckoutSession>(
      "/payment/create-checkout-session",
      { orderId }
    );

    if (!response.success || !response.data?.checkoutUrl) {
      throw new Error("Unable to create Stripe Checkout session.");
    }

    return response.data;
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    throw error;
  }
};
