"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.getNavItemsByRole = exports.customerNavItems = exports.adminNavItems = exports.vendorNavItems = exports.getCommonNavItems = void 0;
var authUtils_1 = require("./authUtils");
exports.getCommonNavItems = function (role) {
    var defaultDashboard = authUtils_1.getDefaultDashboardRoute(role);
    return [
        {
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home"
                },
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard"
                },
                {
                    title: "My Profile",
                    href: "/my-profile",
                    icon: "User"
                },
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings"
                },
            ]
        },
    ];
};
exports.vendorNavItems = [
    {
        title: "Store Management",
        items: [
            {
                title: "Products",
                href: "/vendor/dashboard/products",
                icon: "Package"
            },
            {
                title: "Categories",
                href: "/vendor/dashboard/categories",
                icon: "Tags"
            },
            {
                title: "Offers",
                href: "/vendor/dashboard/offers",
                icon: "BadgePercent"
            },
        ]
    },
    {
        title: "Order Management",
        items: [
            {
                title: "Orders",
                href: "/vendor/dashboard/orders",
                icon: "ShoppingCart"
            },
        ]
    },
    {
        title: "Customer Engagement",
        items: [
            {
                title: "Reviews",
                href: "/vendor/dashboard/reviews",
                icon: "Star"
            },
        ]
    },
];
exports.adminNavItems = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admin-management",
                icon: "Shield"
            },
            {
                title: "Users",
                href: "/admin/dashboard/users-management",
                icon: "Users"
            },
            {
                title: "Vendors",
                href: "/admin/dashboard/vendors-management",
                icon: "Store"
            },
        ]
    },
    {
        title: "Marketplace Management",
        items: [
            {
                title: "Products",
                href: "/admin/dashboard/products-management",
                icon: "Package"
            },
            {
                title: "Categories",
                href: "/admin/dashboard/categories-management",
                icon: "Tags"
            },
        ]
    },
    {
        title: "Order & Payment",
        items: [
            {
                title: "Orders",
                href: "/admin/dashboard/orders-management",
                icon: "ShoppingCart"
            },
            {
                title: "Payments",
                href: "/admin/dashboard/payment-management",
                icon: "CreditCard"
            },
        ]
    },
    {
        title: "Content Management",
        items: [
            {
                title: "Reviews",
                href: "/admin/dashboard/reviews-management",
                icon: "Star"
            },
        ]
    },
];
exports.customerNavItems = [
    {
        title: "Shopping",
        items: [
            {
                title: "Products",
                href: "/dashboard/products",
                icon: "Package"
            },
            {
                title: "Orders",
                href: "/dashboard/orders",
                icon: "ShoppingCart"
            },
            {
                title: "Reviews",
                href: "/dashboard/reviews",
                icon: "Star"
            },
        ]
    },
];
exports.getNavItemsByRole = function (role) {
    var commonNavItems = exports.getCommonNavItems(role);
    switch (role) {
        case "SUPER_ADMIN":
        case "ADMIN":
            return __spreadArrays(commonNavItems, exports.adminNavItems);
        case "VENDOR":
            return __spreadArrays(commonNavItems, exports.vendorNavItems);
        case "CUSTOMER":
            return __spreadArrays(commonNavItems, exports.customerNavItems);
        default:
            return commonNavItems;
    }
};
