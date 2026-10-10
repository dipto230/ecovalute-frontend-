import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getVendors } from '@/src/services/vendor.service'
import { QueryClient } from '@tanstack/react-query'
import React from 'react'

const VendorsManagementPage = async() => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
    staleTime: 1000 * 60 * 60,

  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      
      </HydrationBoundary>
  )
}

export default VendorsManagementPage