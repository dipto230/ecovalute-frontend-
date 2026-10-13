"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var auth_service_1 = require("@/src/services/auth.service");
var order_service_1 = require("@/src/services/order.service");
var money = function (value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(Number(value !== null && value !== void 0 ? value : 0));
};
var dateFormat = function (value) {
    if (!value)
        return "Date unavailable";
    var date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return "Date unavailable";
    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(date);
};
var getStatusStyle = function (status) {
    switch (status) {
        case "COMPLETED":
        case "DELIVERED":
            return "bg-emerald-50 text-emerald-700 ring-emerald-200";
        case "SHIPPED":
            return "bg-blue-50 text-blue-700 ring-blue-200";
        case "PROCESSING":
        case "CONFIRMED":
            return "bg-violet-50 text-violet-700 ring-violet-200";
        case "CANCELLED":
            return "bg-rose-50 text-rose-700 ring-rose-200";
        default:
            return "bg-amber-50 text-amber-700 ring-amber-200";
    }
};
var getProductName = function (order) {
    var _a, _b, _c, _d, _e, _f;
    return ((_b = (_a = order.offer) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.title) || ((_d = (_c = order.offer) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.brand) || ((_f = (_e = order.offer) === null || _e === void 0 ? void 0 : _e.product) === null || _f === void 0 ? void 0 : _f.model) ||
        "E-waste product";
};
var getCustomerName = function (user) {
    var _a, _b, _c, _d;
    return (user === null || user === void 0 ? void 0 : user.name) || (user === null || user === void 0 ? void 0 : user.fullName) || ((_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.name) || ((_b = user === null || user === void 0 ? void 0 : user.email) === null || _b === void 0 ? void 0 : _b.split("@")[0]) || ((_d = (_c = user === null || user === void 0 ? void 0 : user.user) === null || _c === void 0 ? void 0 : _c.email) === null || _d === void 0 ? void 0 : _d.split("@")[0]) ||
        "there";
};
function CustomerDashboardPage() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, userResult, ordersResult, user, orderResponse, responseData, orders, meta, totalOrders, pendingOrders, inProgressOrders, completedOrders, cancelledOrders, recentOrders;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Promise.allSettled([
                        auth_service_1.getUserInfo(),
                        order_service_1.getMyOrders({ page: 1, limit: 100, sortBy: "createdAt", sortOrder: "desc" }),
                    ])];
                case 1:
                    _b = _c.sent(), userResult = _b[0], ordersResult = _b[1];
                    user = userResult.status === "fulfilled" ? userResult.value : null;
                    orderResponse = ordersResult.status === "fulfilled"
                        ? ordersResult.value
                        : null;
                    responseData = orderResponse === null || orderResponse === void 0 ? void 0 : orderResponse.data;
                    orders = Array.isArray(responseData)
                        ? responseData
                        : Array.isArray(responseData === null || responseData === void 0 ? void 0 : responseData.data)
                            ? responseData.data
                            : [];
                    meta = !Array.isArray(responseData)
                        ? responseData === null || responseData === void 0 ? void 0 : responseData.meta : undefined;
                    totalOrders = (_a = meta === null || meta === void 0 ? void 0 : meta.total) !== null && _a !== void 0 ? _a : orders.length;
                    pendingOrders = orders.filter(function (order) { return order.status === "PENDING"; }).length;
                    inProgressOrders = orders.filter(function (order) {
                        return ["CONFIRMED", "PROCESSING", "SHIPPED"].includes(order.status);
                    }).length;
                    completedOrders = orders.filter(function (order) {
                        return ["DELIVERED", "COMPLETED"].includes(order.status);
                    }).length;
                    cancelledOrders = orders.filter(function (order) { return order.status === "CANCELLED"; }).length;
                    recentOrders = orders.slice(0, 5);
                    return [2 /*return*/, (React.createElement("main", { className: "min-h-screen bg-[#f5f8f6] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-9" },
                            React.createElement("div", { className: "mx-auto max-w-7xl space-y-8" },
                                React.createElement("section", { className: "relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-[#073f3c] via-[#075b50] to-[#07866d] p-6 text-white shadow-xl shadow-emerald-950/10 sm:p-9 lg:p-10" },
                                    React.createElement("div", { className: "pointer-events-none absolute -right-10 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10" }),
                                    React.createElement("div", { className: "pointer-events-none absolute -right-2 -top-16 -z-10 h-56 w-56 rounded-full border border-white/10" }),
                                    React.createElement("div", { className: "pointer-events-none absolute -bottom-24 right-28 -z-10 h-52 w-52 rounded-full bg-lime-300/10 blur-3xl" }),
                                    React.createElement("div", { className: "relative flex flex-col justify-between gap-7 md:flex-row md:items-center" },
                                        React.createElement("div", { className: "max-w-2xl" },
                                            React.createElement("div", { className: "mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-50" },
                                                React.createElement(lucide_react_1.Sparkles, { className: "h-3.5 w-3.5 text-lime-300" }),
                                                "YOUR SUSTAINABLE LIVING SPACE"),
                                            React.createElement("h1", { className: "text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl" },
                                                "Welcome back, ",
                                                getCustomerName(user),
                                                "!"),
                                            React.createElement("p", { className: "mt-4 max-w-xl text-sm leading-7 text-emerald-50/85 sm:text-base" }, "Manage your orders, explore reusable electronics, and make every sustainable choice count."),
                                            React.createElement("div", { className: "mt-7 flex flex-wrap gap-3" },
                                                React.createElement(link_1["default"], { href: "/marketplace", className: "inline-flex items-center gap-2 rounded-xl bg-lime-300 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-lime-200" },
                                                    "Explore marketplace",
                                                    React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" })),
                                                React.createElement(link_1["default"], { href: "/price-estimation", className: "inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15" },
                                                    React.createElement(lucide_react_1.Bot, { className: "h-4 w-4" }),
                                                    "AI price estimation"))),
                                        React.createElement("div", { className: "hidden shrink-0 items-center justify-center md:flex" },
                                            React.createElement("div", { className: "flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-inner" },
                                                React.createElement(lucide_react_1.Recycle, { className: "h-20 w-20 text-lime-200", strokeWidth: 1.25 }))))),
                                ordersResult.status === "rejected" && (React.createElement("section", { role: "alert", className: "rounded-2xl border border-rose-200 bg-rose-50 p-5" },
                                    React.createElement("h2", { className: "font-semibold text-rose-800" }, "Could not load your orders"),
                                    React.createElement("p", { className: "mt-1 text-sm text-rose-700" }, "Please check your login session and API connection, then refresh this page."))),
                                React.createElement("section", null,
                                    React.createElement("div", { className: "mb-5 flex flex-wrap items-end justify-between gap-3" },
                                        React.createElement("div", null,
                                            React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700" }, "YOUR OVERVIEW"),
                                            React.createElement("h2", { className: "mt-1 text-2xl font-semibold tracking-tight" }, "Dashboard overview")),
                                        React.createElement(link_1["default"], { href: "/dashboard/orders", className: "inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-600" },
                                            "View all orders ",
                                            React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" }))),
                                    React.createElement("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" }, [
                                        {
                                            title: "Total orders",
                                            value: totalOrders,
                                            description: "Orders placed",
                                            icon: lucide_react_1.ShoppingBag,
                                            iconClass: "bg-emerald-50 text-emerald-700",
                                            trendIcon: lucide_react_1.ArrowUpRight
                                        },
                                        {
                                            title: "Pending orders",
                                            value: pendingOrders,
                                            description: "Awaiting confirmation",
                                            icon: lucide_react_1.Clock3,
                                            iconClass: "bg-amber-50 text-amber-700",
                                            trendIcon: lucide_react_1.Clock3
                                        },
                                        {
                                            title: "In progress",
                                            value: inProgressOrders,
                                            description: "Being processed or shipped",
                                            icon: lucide_react_1.Truck,
                                            iconClass: "bg-blue-50 text-blue-700",
                                            trendIcon: lucide_react_1.ArrowUpRight
                                        },
                                        {
                                            title: "Completed",
                                            value: completedOrders,
                                            description: "Delivered or completed",
                                            icon: lucide_react_1.CheckCircle2,
                                            iconClass: "bg-teal-50 text-teal-700",
                                            trendIcon: lucide_react_1.ArrowDownRight
                                        },
                                    ].map(function (stat) {
                                        var Icon = stat.icon;
                                        var TrendIcon = stat.trendIcon;
                                        return (React.createElement("article", { key: stat.title, className: "group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/5 sm:p-6" },
                                            React.createElement("div", { className: "flex items-start justify-between gap-3" },
                                                React.createElement("div", null,
                                                    React.createElement("p", { className: "text-sm font-medium text-slate-500" }, stat.title),
                                                    React.createElement("p", { className: "mt-3 text-3xl font-semibold tracking-tight text-slate-900" }, stat.value)),
                                                React.createElement("div", { className: "rounded-xl p-3 " + stat.iconClass },
                                                    React.createElement(Icon, { className: "h-5 w-5" }))),
                                            React.createElement("div", { className: "mt-5 flex items-center gap-2 text-xs text-slate-500" },
                                                React.createElement(TrendIcon, { className: "h-3.5 w-3.5" }),
                                                stat.description)));
                                    }))),
                                React.createElement("div", { className: "grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]" },
                                    React.createElement("section", { className: "min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm" },
                                        React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5 sm:p-6" },
                                            React.createElement("div", null,
                                                React.createElement("h2", { className: "text-lg font-semibold" }, "Recent orders"),
                                                React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Keep track of your latest purchases.")),
                                            React.createElement(link_1["default"], { href: "/dashboard/orders", className: "rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800" }, "See all")),
                                        ordersResult.status === "fulfilled" &&
                                            recentOrders.length === 0 ? (React.createElement("div", { className: "flex flex-col items-center px-6 py-14 text-center" },
                                            React.createElement("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700" },
                                                React.createElement(lucide_react_1.Package, { className: "h-8 w-8" })),
                                            React.createElement("h3", { className: "mt-5 font-semibold" }, "No orders yet"),
                                            React.createElement("p", { className: "mt-2 max-w-sm text-sm leading-6 text-slate-500" }, "Your orders will appear here once you complete your first purchase."),
                                            React.createElement(link_1["default"], { href: "/marketplace", className: "mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800" },
                                                "Browse marketplace ",
                                                React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" })))) : (React.createElement("div", { className: "divide-y divide-slate-100" }, recentOrders.map(function (order) { return (React.createElement("div", { key: order.id, className: "flex flex-col gap-3 p-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between sm:px-6" },
                                            React.createElement("div", { className: "flex min-w-0 items-start gap-3" },
                                                React.createElement("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800" },
                                                    React.createElement(lucide_react_1.Package, { className: "h-5 w-5" })),
                                                React.createElement("div", { className: "min-w-0" },
                                                    React.createElement("p", { className: "truncate font-semibold text-slate-900" }, getProductName(order)),
                                                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" },
                                                        "Order #",
                                                        order.id.slice(-8).toUpperCase()),
                                                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, dateFormat(order.createdAt)))),
                                            React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3 sm:justify-end" },
                                                React.createElement("span", { className: "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset " + getStatusStyle(order.status) }, order.status.replaceAll("_", " ")),
                                                React.createElement("span", { className: "min-w-24 text-left font-semibold tabular-nums sm:text-right" }, money(order.finalPrice)),
                                                React.createElement(link_1["default"], { href: "/dashboard/orders", "aria-label": "View orders", className: "rounded-lg p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-800" },
                                                    React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" }))))); }))),
                                        ordersResult.status === "fulfilled" &&
                                            recentOrders.length > 0 && (React.createElement("div", { className: "border-t border-slate-100 px-5 py-4 sm:px-6" },
                                            React.createElement("p", { className: "text-xs text-slate-500" },
                                                "Showing ",
                                                recentOrders.length,
                                                " recent orders",
                                                totalOrders > recentOrders.length
                                                    ? " out of " + totalOrders
                                                    : "")))),
                                    React.createElement("aside", { className: "space-y-5" },
                                        React.createElement("section", { className: "rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6" },
                                            React.createElement("div", { className: "flex items-center gap-3" },
                                                React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800" },
                                                    React.createElement(lucide_react_1.Wallet, { className: "h-5 w-5" })),
                                                React.createElement("div", null,
                                                    React.createElement("h2", { className: "font-semibold" }, "Order summary"),
                                                    React.createElement("p", { className: "text-xs text-slate-500" }, "Current order status"))),
                                            React.createElement("div", { className: "mt-5 space-y-4" }, [
                                                {
                                                    label: "Pending",
                                                    value: pendingOrders,
                                                    color: "bg-amber-400"
                                                },
                                                {
                                                    label: "In progress",
                                                    value: inProgressOrders,
                                                    color: "bg-blue-500"
                                                },
                                                {
                                                    label: "Completed",
                                                    value: completedOrders,
                                                    color: "bg-emerald-500"
                                                },
                                                {
                                                    label: "Cancelled",
                                                    value: cancelledOrders,
                                                    color: "bg-rose-400"
                                                },
                                            ].map(function (item) { return (React.createElement("div", { key: item.label },
                                                React.createElement("div", { className: "mb-2 flex items-center justify-between text-sm" },
                                                    React.createElement("span", { className: "text-slate-600" }, item.label),
                                                    React.createElement("span", { className: "font-semibold text-slate-900" }, item.value)),
                                                React.createElement("div", { className: "h-2 overflow-hidden rounded-full bg-slate-100" },
                                                    React.createElement("div", { className: "h-full rounded-full " + item.color, style: {
                                                            width: (totalOrders > 0
                                                                ? Math.min((item.value / totalOrders) * 100, 100)
                                                                : 0) + "%"
                                                        } })))); }))),
                                        React.createElement("section", { className: "overflow-hidden rounded-2xl bg-gradient-to-br from-[#e7f8ef] to-[#f4fce9] p-5 sm:p-6" },
                                            React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm" },
                                                React.createElement(lucide_react_1.Leaf, { className: "h-5 w-5" })),
                                            React.createElement("h2", { className: "mt-4 text-lg font-semibold text-emerald-950" }, "Give electronics a second life."),
                                            React.createElement("p", { className: "mt-2 text-sm leading-6 text-emerald-900/75" }, "Explore reusable electronics and discover smarter ways to manage e-waste."),
                                            React.createElement(link_1["default"], { href: "/marketplace", className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-700" },
                                                "Explore products ",
                                                React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" }))),
                                        React.createElement("section", { className: "rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6" },
                                            React.createElement("div", { className: "flex items-center gap-3" },
                                                React.createElement("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700" },
                                                    React.createElement(lucide_react_1.Bot, { className: "h-5 w-5" })),
                                                React.createElement("div", null,
                                                    React.createElement("h2", { className: "font-semibold" }, "AI price estimation"),
                                                    React.createElement("p", { className: "text-xs text-slate-500" }, "Estimate your device value"))),
                                            React.createElement("p", { className: "mt-3 text-sm leading-6 text-slate-600" }, "Upload an electronics image to explore an AI-powered price estimate and market price comparisons."),
                                            React.createElement(link_1["default"], { href: "/price-estimation", className: "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100" },
                                                "Estimate a price ",
                                                React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" }))))),
                                React.createElement("footer", { className: "flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between" },
                                    React.createElement("p", null,
                                        "\u00A9 ",
                                        new Date().getFullYear(),
                                        " EcoValuate. Give e-waste a second life."),
                                    React.createElement(link_1["default"], { href: "/my-profile", className: "font-medium text-emerald-800 hover:text-emerald-600" }, "Manage your profile")))))];
            }
        });
    });
}
exports["default"] = CustomerDashboardPage;
