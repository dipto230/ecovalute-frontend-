
export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "ALL";

export interface IPaymentQuery {
  page?: number;
  limit?: number;
  status?: PaymentStatus;
}

export interface IPaymentCustomer {
  id: string;
  name?: string | null;
  email?: string | null;
}

export interface IPaymentOrder {
  id: string;
  customer?: IPaymentCustomer | null;
  customerId?: string;
  finalPrice?: number | string;
}

export interface IPayment {
  id: string;
  orderId: string;
  amount: number | string;
  paymentMethod: string;
  transactionId: string | null;
  status: string;
  paidAt: string | null;
  order?: IPaymentOrder | null;
}

export interface IPaymentMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
