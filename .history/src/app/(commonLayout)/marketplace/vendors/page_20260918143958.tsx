import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import VendorList from '@/src/app/components/modules/vendors/VendorList';
import { getVendors } from './[id]/_action';

const MarketPlaceVendorsByIdPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vendors"],
    queryFn: getVendors()
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VendorList/>

    </HydrationBoundary>
  )
}

export default MarketPlaceVendorsByIdPage