export interface NavItem {
  title: string
  href: string
  icon: string
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

export interface PieChartData {
  status: string
  count: number
}

// Products by Category
export interface CategoryChartData {
  category: string
  count: number
}

// Monthly Revenue & Orders
export interface RevenueChartData {
  month: string
  revenue: number
  orders: number
}

export interface AIDetectionChartData {
  label: string
  count: number
}

// Dashboard Overview
export interface DashboardOverview {
  totalUsers: number
  activeUsers: number
  blockedUsers: number
  totalCustomers: number
  totalAdmins: number
  totalVendors: number
  totalProducts: number
  totalOrders: number
  totalPayments: number
  paidPayments: number
  totalCategories: number
}

// Vendor Statistics
export interface VendorStatistics {
  total: number
  active: number
  pending: number
  inactive: number
  suspended: number
}

// Product Statistics
export interface ProductStatistics {
  total: number
  pending: number
  approved: number
  rejected: number
  sold: number
  available: number
}

// Order Statistics
export interface OrderStatistics {
  total: number
  pending: number
  confirmed: number
  processing: number
  shipped: number
  delivered: number
  completed: number
  cancelled: number
}

// Payment Statistics
export interface PaymentStatistics {
  total: number
  paid: number
  pending: number
  failed: number
  totalRevenue: number
  currency: string
}

// AI Statistics
export interface AIStatistics {
  totalDetections: number
  totalPriceEstimations: number
  totalMarketComparisons: number
}

// Monthly Chart Data
export interface MonthlyChartData {
  month: string
  users: number
  products: number
  orders: number
  aiDetections: number
  revenue: number
}

// Dashboard Charts
export interface DashboardCharts {
  monthly: MonthlyChartData[]
}

// Complete Admin Dashboard Response Data
export interface IAdminDashboardData {
  overview: DashboardOverview
  vendors: VendorStatistics
  products: ProductStatistics
  orders: OrderStatistics
  payments: PaymentStatistics
  ai: AIStatistics
  charts: DashboardCharts
  generatedAt: string
}