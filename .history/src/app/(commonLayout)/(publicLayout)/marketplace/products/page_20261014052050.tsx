```tsx
import { getProducts } from "@/src/services/product.service";
import ProductsClient from "./ProductsClient";
import type { IProduct } from "@/src/types/product.types";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products: IProduct[] = [];
  let hasError = false;

  try {
    const response = await getProducts(
      "page=1&limit=100&include=productImages"
    );

    console.log(
      "[Marketplace] Full response:",
      JSON.stringify(response, null, 2)
    );

    const responseData: unknown = response.data;

    if (Array.isArray(responseData)) {
      // Case 1: response.data directly contains products
      products = responseData as IProduct[];
    } else if (
      responseData !== null &&
      typeof responseData === "object" &&
      "data" in responseData &&
      Array.isArray(responseData.data)
    ) {
      // Case 2: response.data.data contains products
      products = responseData.data as IProduct[];
    } else {
      console.error(
        "[Marketplace] Unexpected response structure:",
        responseData
      );

      products = [];
    }

    console.log("[Marketplace] Count:", products.length);

    console.log(
      "[Marketplace] Status:",
      products.map((product) => ({
        id: product.id,
        title: product.title,
        status: product.status,
        quantity: product.quantity,
      }))
    );
  } catch (error) {
    console.error("[Marketplace] Products error:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <main className="min-h-[60vh] bg-white px-5 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Products could not be loaded
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            Please check the backend connection and try again.
          </p>
        </div>
      </main>
    );
  }

  return <ProductsClient products={products} />;
}
