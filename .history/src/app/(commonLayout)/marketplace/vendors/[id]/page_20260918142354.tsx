import React from 'react'
import { QueryClient } from '@tanstack/react-query';
import { getVendors } from './_action';

const MarketPlaceVendorsByIdPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vendors"],
    queryFn: getVendors
  });
  return (
    <div></div>
  )
}

export default MarketPlaceVendorsByIdPage