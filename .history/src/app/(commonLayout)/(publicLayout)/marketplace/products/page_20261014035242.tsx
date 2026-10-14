
import { getProducts } from "@/src/services/product.service";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products = [];
  let hasError = false;

  try {
    const response = await getProducts(
      "page=1&limit=100&include=productImages"
    );

    products = response.data ?? [];
  } catch (error) {
    console.error("Marketplace products error:", error);
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
            Please check your login session and backend
            connection, then refresh the page.
          </p>
        </div>
      </main>
    );
  }

  return <ProductsClient products={products} />;
}
