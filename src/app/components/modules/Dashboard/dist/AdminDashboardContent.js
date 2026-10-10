"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var dashboard_service_1 = require("@/src/services/dashboard.service");
var StatsCard_1 = require("../../shared/StatsCard");
var AdminAnalyticsCharts_1 = require("../../shared/AdminAnalyticsCharts");
var AdminDashboardContent = function () {
    var _a = react_query_1.useQuery({
        queryKey: ["admin-dashboard-data"],
        queryFn: dashboard_service_1.getDashboardData,
        refetchOnWindowFocus: true
    }), adminDashboardData = _a.data, isLoading = _a.isLoading, isError = _a.isError;
    if (isLoading) {
        return (react_1["default"].createElement("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" }, Array.from({ length: 8 }).map(function (_, index) { return (react_1["default"].createElement("div", { key: index, className: "h-32 animate-pulse rounded-xl border bg-muted/40" })); })));
    }
    if (isError || !adminDashboardData) {
        return (react_1["default"].createElement("div", { className: "rounded-xl border p-5 text-sm text-red-600" }, "Failed to load dashboard statistics."));
    }
    var response = adminDashboardData;
    var dashboard = response.data;
    var data = dashboard.overview;
    var vendors = dashboard.vendors;
    var products = dashboard.products;
    var orders = dashboard.orders;
    var payments = dashboard.payments;
    var ai = dashboard.ai;
    var stats = [
        {
            title: "Total Users",
            value: data.totalUsers,
            iconName: "users",
            description: "Total registered users"
        },
        {
            title: "Active Users",
            value: data.activeUsers,
            iconName: "user-check",
            description: data.blockedUsers + " blocked users"
        },
        {
            title: "Total Vendors",
            value: vendors.total,
            iconName: "store",
            description: vendors.active + " active vendors"
        },
        {
            title: "Total Products",
            value: products.total,
            iconName: "package",
            description: products.pending + " awaiting approval"
        },
        {
            title: "Total Orders",
            value: orders.total,
            iconName: "shopping-cart",
            description: orders.pending + " pending orders"
        },
        {
            title: "Total Payments",
            value: payments.total,
            iconName: "credit-card",
            description: payments.paid + " paid payments"
        },
        {
            title: "Total Revenue",
            value: payments.currency + " " + payments.totalRevenue.toLocaleString(),
            iconName: "wallet",
            description: "Total recorded revenue"
        },
        {
            title: "AI Detections",
            value: ai.totalDetections,
            iconName: "scan-search",
            description: "Total AI detections"
        },
    ];
    // Monthly revenue and order chart
    var revenueData = dashboard.charts.monthly.map(function (item) { return ({
        month: item.month,
        revenue: item.revenue,
        orders: item.orders
    }); });
    // Order status chart
    var orderStatusData = [
        { status: "Pending", count: orders.pending },
        { status: "Confirmed", count: orders.confirmed },
        { status: "Processing", count: orders.processing },
        { status: "Shipped", count: orders.shipped },
        { status: "Delivered", count: orders.delivered },
        { status: "Completed", count: orders.completed },
        { status: "Cancelled", count: orders.cancelled },
    ];
    // Category-wise data is not provided by the current API response.
    var categoryData = [];
    // Vendor status chart
    var vendorStatusData = [
        { status: "Active", count: vendors.active },
        { status: "Pending", count: vendors.pending },
        { status: "Inactive", count: vendors.inactive },
        { status: "Suspended", count: vendors.suspended },
    ];
    // The API returns aggregate AI statistics, not label-wise detections.
    var aiDetectionData = [];
    return (react_1["default"].createElement("section", { className: "space-y-8" },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("h2", { className: "text-2xl font-bold tracking-tight" }, "Dashboard Overview"),
            react_1["default"].createElement("p", { className: "mt-1 text-sm text-muted-foreground" }, "Monitor users, vendors, marketplace activity and AI insights.")),
        react_1["default"].createElement("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" }, stats.map(function (stat) { return (react_1["default"].createElement(StatsCard_1["default"], { key: stat.title, title: stat.title, value: stat.value, iconName: stat.iconName, description: stat.description })); })),
        react_1["default"].createElement(AdminAnalyticsCharts_1["default"], { revenueData: revenueData, orderStatusData: orderStatusData, categoryData: categoryData, vendorStatusData: vendorStatusData, aiDetectionData: aiDetectionData })));
};
exports["default"] = AdminDashboardContent;
