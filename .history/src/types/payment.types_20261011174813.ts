export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

export type PaymentMethod =
  | "STRIPE"
  | "COD";

export interface IPaymentCustomer {
  id: string;
  name?: string;
  email?: string;
}

export interface IPaymentOrder {
  id: string;
  customer?: IPaymentCustomer;
}

export interface IPayment {
  id: string;
  orderId: string;
  amount: number | string;
  paymentMethod: PaymentMethod | string;
  transactionId: string | null;
  status: PaymentStatus | string;
  paidAt: string | null;
  order?: IPaymentOrder;
}

export interface IPaymentQuery {
  page?: number;
  limit?: number;
  status?: PaymentStatus;
}

export interface IPaymentResponse {
  success: boolean;
  message: string;
  data: IPayment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}