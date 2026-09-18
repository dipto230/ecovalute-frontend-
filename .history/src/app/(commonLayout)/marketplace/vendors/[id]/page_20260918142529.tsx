import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getVendors } from './_action';

const MarketPlaceVendorsByIdPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vendors"],
    queryFn: getVendors
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      

    </HydrationBoundary>
  )
}

export default MarketPlaceVendorsByIdPage