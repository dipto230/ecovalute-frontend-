"use client"
import React from 'react'
import {useQuery} from "@tanstack/react-query"
import { getDashboardData } from '@/src/services/dashboard.service'
import StatsCard from '../../shared/StatsCard'
import { ApiResponse } from '@/src/types/api.types'
import { IAdminDashboardData } from '@/src/types/dashboard.types'
const AdminDashboardContent = () => {
  const {data : adminDashboardDate} = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: true


  })
  const {data} = adminDashboardDate as ApiResponse<IAdminDashboardData>;
  return (
    <div>
      <StatsCard
      title="Total Users"
        value={data.totalUsers}
        iconName=
        description="Number of Users "
      />
    </div>
  )
}

export default AdminDashboardContent