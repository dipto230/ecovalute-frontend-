```tsx
import { getProducts } from "@/src/services/product.service";
import type { IProduct } from "@/src/types/product.types";
import CustomerProductsClient from "./CustomerProductsClient";

export default async function CustomerProductsPage() {
  try {
    const response = await getProducts();
    const products = response.data as IProduct[];

    return (
      <CustomerProductsClient
        products={Array.isArray(products) ? products : []}
      />
    );
  } catch (error) {
    console.error("Failed to load customer products:", error);

    return (
      <CustomerProductsClient
        products={[]}
        initialError="We couldn't load products. Please check your connection and try again."
      />
    );
  }
}
