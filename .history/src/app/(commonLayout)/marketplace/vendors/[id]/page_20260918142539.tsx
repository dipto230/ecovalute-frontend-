import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getVendors } from './_action';
import VendorList from '@/src/app/components/modules/vendors/VendorList';

const MarketPlaceVendorsByIdPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vendors"],
    queryFn: getVendors
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VendorList/>

    </HydrationBoundary>
  )
}

export default MarketPlaceVendorsByIdPage