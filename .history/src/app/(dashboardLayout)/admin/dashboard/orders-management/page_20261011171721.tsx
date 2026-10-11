import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import OrdersTable from "@/src/app/components/modules/Admin/OrdersManagements/OrdersTable";
import { getOrders } from "@/src/services/order.service";

const OrdersManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["orders", 1, 10, "ALL"],
    queryFn: () =>
      getOrders({
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
        <OrdersTable />
      </div>
    </HydrationBoundary>
  );
};

export default OrdersManagementPage;