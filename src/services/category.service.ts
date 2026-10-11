"use server";

import { httpClient } from "@/lib/axios/httpClient";
import type {
  ICategory,
  ICreateCategoryPayload,
} from "../types/category.types";

export const getCategories = async () => {
  try {
    return await httpClient.get<ICategory[]>("/categories");
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (
  payload: ICreateCategoryPayload
) => {
  try {
    const formData = new FormData();

    formData.append("name", payload.name.trim());

    if (payload.description?.trim()) {
      formData.append("description", payload.description.trim());
    }

    if (payload.file) {
      formData.append("file", payload.file);
    }

    return await httpClient.post("/categories", formData);
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    return await httpClient.delete(`/categories/${id}`);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};