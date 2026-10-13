
import { getProducts } from "@/src/services/product.service";

import type { IProduct } from "@/src/types/product.types";

export default async function CustomerProductsPage() {
  let products: IProduct[] = [];
  let errorMessage = "";

  
  try {
    const response = await getProducts();

    products = Array.isArray(response.data)
      ? response.data
      : [];
  } catch (error) {
    console.error("Failed to load customer products:", error);
    errorMessage = "Unable to load products. Please try again later.";
  }

  // Return JSX outside try/catch
  return (
    <CustomerProductsClient
      products={products}
      errorMessage={errorMessage}
    />
  );
}
