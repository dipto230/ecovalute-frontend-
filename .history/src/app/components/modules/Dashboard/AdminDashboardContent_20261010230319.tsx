"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getDashboardData } from "@/src/services/dashboard.service"
import StatsCard from "../../shared/StatsCard"
import AdminAnalyticsCharts from "../../shared/AdminAnalyticsCharts"
import { ApiResponse } from "@/src/types/api.types"
import { IAdminDashboardData } from "@/src/types/dashboard.types"

const AdminDashboardContent = () => {
  const {
    data: adminDashboardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: true,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-xl border bg-muted/40"
          />
        ))}
      </div>
    )
  }

  if (isError || !adminDashboardData) {
    return (
      <div className="rounded-xl border p-5 text-sm text-red-600">
        Failed to load dashboard statistics.
      </div>
    )
  }

  const response =
    adminDashboardData as ApiResponse<IAdminDashboardData>

  const dashboard = response.data
  const data = dashboard.overview
  const vendors = dashboard.vendors
  const products = dashboard.products
  const orders = dashboard.orders
  const payments = dashboard.payments
  const ai = dashboard.ai

  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers,
      iconName: "users",
      description: "Total registered users",
    },
    {
      title: "Active Users",
      value: data.activeUsers,
      iconName: "user-check",
      description: `${data.blockedUsers} blocked users`,
    },
    {
      title: "Total Vendors",
      value: vendors.total,
      iconName: "store",
      description: `${vendors.active} active vendors`,
    },
    {
      title: "Total Products",
      value: products.total,
      iconName: "package",
      description: `${products.pending} awaiting approval`,
    },
    {
      title: "Total Orders",
      value: orders.total,
      iconName: "shopping-cart",
      description: `${orders.pending} pending orders`,
    },
    {
      title: "Total Payments",
      value: payments.total,
      iconName: "credit-card",
      description: `${payments.paid} paid payments`,
    },
    {
      title: "Total Revenue",
      value: `${payments.currency} ${payments.totalRevenue.toLocaleString()}`,
      iconName: "wallet",
      description: "Total recorded revenue",
    },
    {
      title: "AI Detections",
      value: ai.totalDetections,
      iconName: "scan-search",
      description: "Total AI detections",
    },
  ]

  // Monthly revenue and order chart
  const revenueData = dashboard.charts.monthly.map((item) => ({
    month: item.month,
    revenue: item.revenue,
    orders: item.orders,
  }))

  // Order status chart
  const orderStatusData = [
    { status: "Pending", count: orders.pending },
    { status: "Confirmed", count: orders.confirmed },
    { status: "Processing", count: orders.processing },
    { status: "Shipped", count: orders.shipped },
    { status: "Delivered", count: orders.delivered },
    { status: "Completed", count: orders.completed },
    { status: "Cancelled", count: orders.cancelled },
  ]

  // Category-wise data is not provided by the current API response.
  const categoryData: { category: string; count: number }[] = []

  // Vendor status chart
  const vendorStatusData = [
    { status: "Active", count: vendors.active },
    { status: "Pending", count: vendors.pending },
    { status: "Inactive", count: vendors.inactive },
    { status: "Suspended", count: vendors.suspended },
  ]

  // The API returns aggregate AI statistics, not label-wise detections.
  const aiDetectionData: { label: string; count: number }[] = []

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Dashboard Overview
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor users, vendors, marketplace activity and AI insights.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            iconName={stat.iconName}
            description={stat.description}
          />
        ))}
      </div>

      {/* Analytics Charts */}
      <AdminAnalyticsCharts
        revenueData={revenueData}
        orderStatusData={orderStatusData}
        categoryData={categoryData}
        vendorStatusData={vendorStatusData}
        aiDetectionData={aiDetectionData}
      />
    </section>
  )
}

export default AdminDashboardContent