"use client";
"use strict";
exports.__esModule = true;
;
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var scroll_area_1 = require("@/components/ui/scroll-area");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
var button_1 = require("../../ui/button");
var badge_1 = require("../../ui/badge");
var MOCK_NOTIFICATIONS = [
    {
        id: "1",
        user_id: "user-1",
        title: "New Product Order",
        message: "A new order has been placed for your product. Please check the order details.",
        is_read: false,
        created_at: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
        id: "2",
        user_id: "user-1",
        title: "Order Status Updated",
        message: "Your order status has been updated. Please check your order details.",
        is_read: true,
        created_at: new Date(Date.now() - 1000 * 60 * 60)
    },
    {
        id: "3",
        user_id: "user-1",
        title: "System Notification",
        message: "The system will undergo scheduled maintenance. Some services may be temporarily unavailable.",
        is_read: false,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
        id: "4",
        user_id: "user-1",
        title: "New User Registered",
        message: "A new user has registered on the platform.",
        is_read: true,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 48)
    },
];
var NotificationDropdown = function () {
    var unreadCount = MOCK_NOTIFICATIONS.filter(function (notification) { return !notification.is_read; }).length;
    return (React.createElement(dropdown_menu_1.DropdownMenu, null,
        React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline", size: "icon", className: "relative" },
                React.createElement(lucide_react_1.Bell, { className: "h-5 w-5" }),
                unreadCount > 0 && (React.createElement(badge_1.Badge, { className: "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0", variant: "destructive" },
                    React.createElement("span", { className: "text-[10px]" }, unreadCount > 9 ? "9+" : unreadCount))))),
        React.createElement(dropdown_menu_1.DropdownMenuContent, { align: "end", className: "w-80" },
            React.createElement(dropdown_menu_1.DropdownMenuLabel, { className: "flex items-center justify-between" },
                React.createElement("span", null, "Notifications"),
                unreadCount > 0 && (React.createElement(badge_1.Badge, { variant: "secondary", className: "ml-2" },
                    unreadCount,
                    " new"))),
            React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
            React.createElement(scroll_area_1.ScrollArea, { className: "h-75" }, MOCK_NOTIFICATIONS.length > 0 ? (MOCK_NOTIFICATIONS.map(function (notification) { return (React.createElement(dropdown_menu_1.DropdownMenuItem, { key: notification.id, className: "flex cursor-pointer flex-col items-start gap-2 p-3" },
                React.createElement("div", { className: "flex w-full items-start gap-3" },
                    React.createElement("div", { className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full " + (notification.is_read
                            ? "bg-muted"
                            : "bg-primary/10") },
                        React.createElement(lucide_react_1.Bell, { className: "h-4 w-4 " + (notification.is_read
                                ? "text-muted-foreground"
                                : "text-primary") })),
                    React.createElement("div", { className: "min-w-0 flex-1 space-y-1" },
                        React.createElement("div", { className: "flex items-start justify-between gap-2" },
                            React.createElement("p", { className: "text-sm font-medium leading-tight" }, notification.title),
                            !notification.is_read && (React.createElement("div", { className: "mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" }))),
                        React.createElement("p", { className: "line-clamp-2 text-xs text-muted-foreground" }, notification.message),
                        React.createElement("p", { className: "text-xs text-muted-foreground" }, date_fns_1.formatDistanceToNow(notification.created_at, {
                            addSuffix: true
                        })))))); })) : (React.createElement("div", { className: "p-6 text-center text-sm text-muted-foreground" }, "No notifications"))),
            React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
            React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "cursor-pointer justify-center text-center" }, "View All Notifications"))));
};
exports["default"] = NotificationDropdown;
