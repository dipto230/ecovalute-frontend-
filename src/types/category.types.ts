export interface ICategory {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
}

export interface ICreateCategoryPayload {
  name: string;
  description?: string;
  file?: File | null;
}