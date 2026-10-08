export interface NavItem {
    title : string,
    href : string,
    icon : string
}

export interface NavSection {
    title ?: string,
    items : NavItem[]
}

export interface PieChartData {
  status: string;
  count: number;
}

// Products by Category
export interface CategoryChartData {
  category: string;
  count: number;
}

// Monthly Revenue & Orders
export interface RevenueChartData {
  month: string;
  revenue: number;
  orders: number;
}


export interface AIDetectionChartData {
  label: string;
  count: number;
}



export interface IAdminDashboardData {
  totalProducts: number;
  totalOrders: number;
  totalVendors: number;
  totalUsers: number;
  totalRevenue: number;

  // Optional additional dashboard metrics
  pendingOrders?: number;
  pendingVendors?: number;
  totalCategories?: number;
  totalAIDetections?: number;


  revenueData: RevenueChartData[];
  orderStatusData: PieChartData[];
  categoryData: CategoryChartData[];
  vendorStatusData: PieChartData[];
  aiDetectionData: AIDetectionChartData[];
}