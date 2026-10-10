"use client"
import React from 'react'
import {useQuery} from "@tanstack/react-query"
import { getDashboardData } from '@/src/services/dashboard.service'
const AdminDashboardContent = () => {
  const {} = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: true


  })
  return (
    <div>AdminDashboardContent</div>
  )
}

export default AdminDashboardContent