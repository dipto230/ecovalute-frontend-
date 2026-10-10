import React from 'react'
import {useQuery} from "@tanstack/react-query"
const AdminDashboardContent = () => {
  const {} = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData


  })
  return (
    <div>AdminDashboardContent</div>
  )
}

export default AdminDashboardContent