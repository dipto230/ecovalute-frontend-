import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getVendors } from '@/src/services/vendor.service'

import React from 'react'
import VendorsTable from "@/src/app/components/modules/Admin/VendorsManagements/VendorsTable";

const VendorsManagementPage = async () => {
  const vendorColumns = [
    {accessorKey: "name", header: "N"}
  ]
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
    staleTime: 1000 * 60 * 60,

  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VendorsTable/>
      </HydrationBoundary>
  )
}

export default VendorsManagementPage