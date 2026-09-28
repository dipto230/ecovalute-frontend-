
"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ---------------------------------------------
// Types
// ---------------------------------------------

export interface RevenueChartData {
  month: string;
  revenue: number;
  orders: number;
}

export interface StatusChartData {
  status: string;
  count: number;
}

export interface CategoryChartData {
  category: string;
  count: number;
}

export interface AIDetectionChartData {
  label: string;
  count: number;
}

interface AdminAnalyticsChartsProps {
  revenueData: RevenueChartData[];
  orderStatusData: StatusChartData[];
  categoryData: CategoryChartData[];
  vendorStatusData: StatusChartData[];
  aiDetectionData: AIDetectionChartData[];
}

// ---------------------------------------------
// Chart colors
// ---------------------------------------------

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#06B6D4",
];

const formatLabel = (value: string) =>
  value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

// ---------------------------------------------
// Reusable empty state
// ---------------------------------------------

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex h-[280px] items-center justify-center">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">
          No data available
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {message}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Chart card wrapper
// ---------------------------------------------

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="min-w-0 overflow-hidden rounded-xl">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="min-w-0">
        {children}
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------
// 1. Monthly Revenue & Orders
// ---------------------------------------------

function RevenueOrdersChart({
  data,
}: {
  data: RevenueChartData[];
}) {
  return (
    <ChartCard
      title="Revenue & Orders"
      description="Monthly revenue and order activity"
    >
      {data.length === 0 ? (
        <EmptyChart message="Monthly analytics will appear here." />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 12, left: 8, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />

            <YAxis
              yAxisId="revenue"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(value: number) =>
                value >= 1000
                  ? `${(value / 1000).toFixed(0)}k`
                  : `${value}`
              }
              width={42}
            />

            <YAxis
              yAxisId="orders"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              allowDecimals={false}
              width={30}
            />

            <Tooltip
              formatter={(value, name) => {
                const amount = Number(value);

                return name === "Revenue"
                  ? formatCurrency(amount)
                  : amount;
              }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--background))",
                fontSize: 12,
              }}
            />

            <Legend />

            <Line
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#3B82F6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />

            <Line
              yAxisId="orders"
              type="monotone"
              dataKey="orders"
              name="Orders"
              stroke="#10B981"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}

// ---------------------------------------------
// 2. Order Status Distribution
// ---------------------------------------------

function OrderStatusChart({
  data,
}: {
  data: StatusChartData[];
}) {
  const chartData = data.filter(
    (item) => Number.isFinite(item.count) && item.count > 0
  );

  return (
    <ChartCard
      title="Order Status"
      description="Distribution of marketplace orders"
    >
      {chartData.length === 0 ? (
        <EmptyChart message="Order status statistics will appear here." />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="45%"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={3}
              stroke="none"
            >
              {chartData.map((item, index) => (
                <Cell
                  key={`${item.status}-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [value, "Orders"]}
              labelFormatter={(label) => formatLabel(String(label))}
            />

            <Legend
              formatter={(value) => formatLabel(String(value))}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}

// ---------------------------------------------
// 3. Products by Category
// ---------------------------------------------

function ProductsCategoryChart({
  data,
}: {
  data: CategoryChartData[];
}) {
  return (
    <ChartCard
      title="Products by Category"
      description="Listed products across e-waste categories"
    >
      {data.length === 0 ? (
        <EmptyChart message="Product category statistics will appear here." />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 12, left: -15, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
            />

            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickMargin={10}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              allowDecimals={false}
            />

            <Tooltip
              formatter={(value) => [value, "Products"]}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--background))",
                fontSize: 12,
              }}
            />

            <Bar
              dataKey="count"
              name="Products"
              fill="#3B82F6"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}

// ---------------------------------------------
// 4. Vendor Verification Status
// ---------------------------------------------

function VendorStatusChart({
  data,
}: {
  data: StatusChartData[];
}) {
  const chartData = data.filter(
    (item) => Number.isFinite(item.count) && item.count > 0
  );

  return (
    <ChartCard
      title="Vendor Verification"
      description="Vendor onboarding and verification status"
    >
      {chartData.length === 0 ? (
        <EmptyChart message="Vendor verification statistics will appear here." />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="45%"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={3}
              stroke="none"
            >
              {chartData.map((item, index) => (
                <Cell
                  key={`${item.status}-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [value, "Vendors"]}
              labelFormatter={(label) => formatLabel(String(label))}
            />

            <Legend
              formatter={(value) => formatLabel(String(value))}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}

// ---------------------------------------------
// 5. AI Detection Analytics
// ---------------------------------------------

function AIDetectionChart({
  data,
}: {
  data: AIDetectionChartData[];
}) {
  return (
    <ChartCard
      title="AI Detection Analytics"
      description="Most frequently detected product labels"
    >
      {data.length === 0 ? (
        <EmptyChart message="AI detection statistics will appear here." />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="hsl(var(--border))"
            />

            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              allowDecimals={false}
            />

            <YAxis
              type="category"
              dataKey="label"
              width={100}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />

            <Tooltip
              formatter={(value) => [value, "Detections"]}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--background))",
                fontSize: 12,
              }}
            />

            <Bar
              dataKey="count"
              name="Detections"
              fill="#8B5CF6"
              radius={[0, 6, 6, 0]}
              maxBarSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}

// ---------------------------------------------
// Main Admin Analytics Component
// ---------------------------------------------

export default function AdminAnalyticsCharts({
  revenueData,
  orderStatusData,
  categoryData,
  vendorStatusData,
  aiDetectionData,
}: AdminAnalyticsChartsProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Marketplace Analytics
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor sales, orders, vendors, products and AI activity.
        </p>
      </div>

      {/* Main revenue chart */}
      <RevenueOrdersChart data={revenueData} />

      {/* Order and category analytics */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <OrderStatusChart data={orderStatusData} />
        <ProductsCategoryChart data={categoryData} />
      </div>

      {/* Vendor and AI analytics */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <VendorStatusChart data={vendorStatusData} />
        <AIDetectionChart data={aiDetectionData} />
      </div>
    </section>
  );
}