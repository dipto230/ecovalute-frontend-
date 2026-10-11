
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getPayments } from "@/src/services/payment.service";
import PaymentsTable from "@/src/app/components/modules/Admin/PaymentsManagements/PaymentsTable";

const PaymentsManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["payments", 1, 10, "ALL"],
    queryFn: () =>
      getPayments({
        page: 1,
        limit: 10,
        status: "ALL",
      }),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
        <PaymentsTable />
      </div>
    </HydrationBoundary>
  );
};

export default PaymentsManagementPage;
