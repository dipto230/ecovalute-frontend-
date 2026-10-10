import { QueryClient } from '@tanstack/react-query'
import React from 'react'

const VendorsManagementPage = async() => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["vendors"]
    queryFn: 
  })
  return (
    <div>VendorsManagementPage</div>
  )
}

export default VendorsManagementPage