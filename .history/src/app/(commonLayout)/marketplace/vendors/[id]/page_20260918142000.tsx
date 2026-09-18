import React from 'react'
import { QueryClient } from '@tanstack/react-query';

const MarketPlaceVendorsByIdPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn
  })
  return (
    <div>MarketPlaceVendorsByIdPage</div>
  )
}

export default MarketPlaceVendorsByIdPage