import { getVendors } from '@/src/services/vendor.service'
import { QueryClient } from '@tanstack/react-query'
import React from 'react'

const VendorsManagementPage = async() => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
    staleTime: 10
  })
  return (
    <div>VendorsManagementPage</div>
  )
}

export default VendorsManagementPage