"use client"
import React from 'react'
import {useQuery} from "@tanstack/react-query"
import { getDashboardData } from '@/src/services/dashboard.service'
import StatsCard from '../../shared/StatsCard'
const AdminDashboardContent = () => {
  const {data : adminDashboardDate} = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: true


  })
  const {data} = adminDashboardDate as Api
  return (
    <div>
      <StatsCard
      title="Total Users"
      value={}
      />
    </div>
  )
}

export default AdminDashboardContent