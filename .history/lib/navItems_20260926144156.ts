```ts
import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home",
                },
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                },
                {
                    title: "My Profile",
                    href: "/my-profile",
                    icon: "User",
                },
            ],
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings",
                },
            ],
        },
    ];
};

export const vendorNavItems: NavSection[] = [
    {
        title: "Store Management",
        items: [
            {
                title: "Products",
                href: "/vendor/dashboard/products",
                icon: "Package",
            },
            {
                title: "Categories",
                href: "/vendor/dashboard/categories",
                icon: "Tags",
            },
            {
                title: "Offers",
                href: "/vendor/dashboard/offers",
                icon: "BadgePercent",
            },
        ],
    },
    {
        title: "Order Management",
        items: [
            {
                title: "Orders",
                href: "/vendor/dashboard/orders",
                icon: "ShoppingCart",
            },
        ],
    },
    {
        title: "Customer Engagement",
        items: [
            {
                title: "Reviews",
                href: "/vendor/dashboard/reviews",
                icon: "Star",
            },
        ],
    },
];

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admin-management",
                icon: "Shield",
            },
            {
                title: "Users",
                href: "/admin/dashboard/users-management",
                icon: "Users",
            },
            {
                title: "Vendors",
                href: "/admin/dashboard/vendors-management",
                icon: "Store",
            },
        ],
    },
    {
        title: "Marketplace Management",
        items: [
            {
                title: "Products",
                href: "/admin/dashboard/products-management",
                icon: "Package",
            },
            {
                title: "Categories",
                href: "/admin/dashboard/categories-management",
                icon: "Tags",
            },
        ],
    },
    {
        title: "Order & Payment",
        items: [
            {
                title: "Orders",
                href: "/admin/dashboard/orders-management",
                icon: "ShoppingCart",
            },
            {
                title: "Payments",
                href: "/admin/dashboard/payment-management",
                icon: "CreditCard",
            },
        ],
    },
    {
        title: "Content Management",
        items: [
            {
                title: "Reviews",
                href: "/admin/dashboard/reviews-management",
                icon: "Star",
            },
        ],
    },
];

export const customerNavItems: NavSection[] = [
    {
        title: "Shopping",
        items: [
            {
                title: "Products",
                href: "/dashboard/products",
                icon: "Package",
            },
            {
                title: "Orders",
                href: "/dashboard/orders",
                icon: "ShoppingCart",
            },
            {
                title: "Reviews",
                href: "/dashboard/reviews",
                icon: "Star",
            },
        ],
    },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "SUPER_ADMIN":
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];

        case "VENDOR":
            return [...commonNavItems, ...vendorNavItems];

        case "CUSTOMER":
            return [...commonNavItems, ...customerNavItems];

        default:
            return commonNavItems;
    }
};

