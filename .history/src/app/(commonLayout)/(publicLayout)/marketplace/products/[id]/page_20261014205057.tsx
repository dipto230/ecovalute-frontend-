
import { notFound } from "next/navigation";

import {
  getProductById,
  getProducts,
} from "@/src/services/product.service";
import type { IProduct } from "@/src/types/product.types";

import ProductDetailsClient from "./ProductDetailsClient";

export const dynamic = "force-dynamic";

function unwrapResponse(value: unknown): unknown {
  let current = value;

  for (let i = 0; i < 4; i++) {
    if (
      current &&
      typeof current === "object" &&
      !Array.isArray(current) &&
      !("id" in current) &&
      "data" in current
    ) {
      current = (current as { data: unknown }).data;
      continue;
    }

    break;
  }

  return current;
}

function toProduct(value: unknown): IProduct | null {
  const data = unwrapResponse(value);

  if (
    !data ||
    typeof data !== "object" ||
    !("id" in data) ||
    !("title" in data)
  ) {
    return null;
  }

  return data as IProduct;
}

function toProducts(value: unknown): IProduct[] {
  const data = unwrapResponse(value);

  if (Array.isArray(data)) {
    return data as IProduct[];
  }

  if (
    data &&
    typeof data === "object" &&
    "products" in data &&
    Array.isArray(data.products)
  ) {
    return data.products as IProduct[];
  }

  return [];
}

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  if (!id || id.length > 200) {
    notFound();
  }

  let product: IProduct | null = null;
  let relatedProducts: IProduct[] = [];

  try {
    const response = await getProductById(id);
    product = toProduct(response);
  } catch (error) {
    console.error("[ProductDetailsPage] Failed to fetch product:", error);
  }

  if (!product) {
    notFound();
  }

  try {
    const response = await getProducts(
      "page=1&limit=100&include=productImages"
    );

    relatedProducts = toProducts(response).filter(
      (item) =>
        item.id !== product.id &&
        item.status === "APPROVED" &&
        Number(item.quantity) > 0 &&
        (!product.categoryId ||
          item.categoryId === product.categoryId)
    );
  } catch (error) {
    console.error(
      "[ProductDetailsPage] Failed to fetch related products:",
      error
    );
  }

  return (
    <ProductDetailsClient
      product={product}
      relatedProducts={relatedProducts.slice(0, 4)}
    />
  );
}
