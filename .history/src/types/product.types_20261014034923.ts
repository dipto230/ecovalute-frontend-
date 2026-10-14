export type ProductStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "SOLD"
  | "AVAILABLE";

export type ProductCondition =
  | "NEW"
  | "USED"
  | "REFURBISHED";

export interface IProductVendor {
  id: string;
  name?: string | null;
  email?: string | null;
  companyName?: string | null;
}

export interface IProductCategory {
  id: string;
  name?: string | null;
}

export interface IProduct {
  id: string;
  title: string;
  description?: string | null;
  brand?: string | null;
  model?: string | null;
  condition: ProductCondition;
  quantity: number;
  estimatedPrice: number | string;
  status: ProductStatus;
  vendorId: string;
  categoryId: string;
  vendor?: IProductVendor | null;
  category?: IProductCategory | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  productImages?: IProductImage[];
}

export interface IUpdateProductPayload {
  title?: string;
  description?: string;
  brand?: string;
  model?: string;
  condition?: ProductCondition;
  quantity?: number;
  estimatedPrice?: number;
  status?: ProductStatus;
  vendorId?: string;
  categoryId?: string;
}

export interface IProductImage {
  id: string;
  imageUrl: string;
  productId: string;
}