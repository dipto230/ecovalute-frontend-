"use client"
import React from 'react'
import {useQuery} from "@tanstack/react-query"
import { getDashboardData } from '@/src/services/dashboard.service'
const AdminDashboardContent = () => {
  const {data : adminDashboardDate} = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: true


  })
  const {d}
  return (
    <div>AdminDashboardContent</div>
  )
}

export default AdminDashboardContent