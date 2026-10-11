export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED";

export interface IOrderProduct {
  id: string;
  title?: string | null;
  brand?: string | null;
  model?: string | null;
}

export interface IOrderOffer {
  id: string;
  offerPrice?: number | string;
  product?: IOrderProduct | null;
}

export interface IOrderParty {
  id: string;
  name?: string | null;
  email?: string | null;
  companyName?: string | null;
}

export interface IOrder {
  id: string;
  offerId: string;
  customerId: string;
  vendorId: string;
  finalPrice: number | string;
  status: OrderStatus;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  offer?: IOrderOffer | null;
  customer?: IOrderParty | null;
  vendor?: IOrderParty | null;
}

export interface IOrderMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IOrderQuery {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}