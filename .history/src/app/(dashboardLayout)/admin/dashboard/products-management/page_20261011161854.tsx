import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import React from "react";
import ProductsTable from "@/src/app/components/modules/Admin/ProductsManagements/ProductsTable";
import { getProducts } from "@/src/services/product.service";

const ProductsManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
        <ProductsTable />
      </div>
    </HydrationBoundary>
  );
};

export default ProductsManagementPage;