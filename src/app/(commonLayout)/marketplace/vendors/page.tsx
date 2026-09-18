import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import VendorList from "@/src/app/components/modules/vendors/VendorList";

import { getVendors } from "./_action";

const MarketPlaceVendorsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VendorList />
    </HydrationBoundary>
  );
};

export default MarketPlaceVendorsPage;