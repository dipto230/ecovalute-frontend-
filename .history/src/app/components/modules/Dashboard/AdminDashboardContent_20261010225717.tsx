"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getDashboardData } from "@/src/services/dashboard.service"
import StatsCard from "../../shared/StatsCard"
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
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
        Failed to load dashboard statistics. Please try again.
      </div>
    )
  }

  const response =
    adminDashboardData as ApiResponse<IAdminDashboardData>

  const data = response.data.overview
  const vendors = response.data.vendors
  const products = response.data.products
  const orders = response.data.orders
  const payments = response.data.payments
  const ai = response.data.ai

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
      description: "Total AI detections performed",
    },
    {
      title: "Price Estimations",
      value: ai.totalPriceEstimations,
      iconName: "chart-no-axes-combined",
      description: "AI-powered price estimations",
    },
    {
      title: "Market Comparisons",
      value: ai.totalMarketComparisons,
      iconName: "chart-bar",
      description: "Total market comparisons",
    },
    {
      title: "Pending Products",
      value: products.pending,
      iconName: "clock",
      description: "Products awaiting approval",
    },
    {
      title: "Confirmed Orders",
      value: orders.confirmed,
      iconName: "check-circle",
      description: "Orders confirmed successfully",
    },
  ]

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Dashboard Overview
        </h2>

        <p className="text-sm text-muted-foreground">
          Monitor your users, vendors, products, orders, payments, and AI insights.
        </p>
      </div>

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
    </section>
  )
}

export default AdminDashboardContent