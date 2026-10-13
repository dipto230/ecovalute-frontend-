"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var order_service_1 = require("@/src/services/order.service");
var statusConfig = {
    PENDING: {
        label: "Pending",
        className: "bg-amber-50 text-amber-700 ring-amber-200"
    },
    CONFIRMED: {
        label: "Confirmed",
        className: "bg-sky-50 text-sky-700 ring-sky-200"
    },
    PROCESSING: {
        label: "Processing",
        className: "bg-blue-50 text-blue-700 ring-blue-200"
    },
    SHIPPED: {
        label: "Shipped",
        className: "bg-violet-50 text-violet-700 ring-violet-200"
    },
    DELIVERED: {
        label: "Delivered",
        className: "bg-emerald-50 text-emerald-700 ring-emerald-200"
    },
    COMPLETED: {
        label: "Completed",
        className: "bg-green-50 text-green-700 ring-green-200"
    },
    CANCELLED: {
        label: "Cancelled",
        className: "bg-rose-50 text-rose-700 ring-rose-200"
    }
};
var formatPrice = function (price) {
    var amount = Number(price);
    if (!Number.isFinite(amount))
        return "—";
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    }).format(amount);
};
var formatDate = function (date) {
    if (!date)
        return "Date unavailable";
    var parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime()))
        return "Date unavailable";
    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(parsedDate);
};
var getProductName = function (order) {
    var _a, _b, _c, _d, _e, _f;
    return ((_b = (_a = order.offer) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.title) ||
        [(_d = (_c = order.offer) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.brand, (_f = (_e = order.offer) === null || _e === void 0 ? void 0 : _e.product) === null || _f === void 0 ? void 0 : _f.model]
            .filter(Boolean)
            .join(" ") ||
        "E-waste product";
};
var getVendorName = function (order) {
    var _a, _b, _c;
    return ((_a = order.vendor) === null || _a === void 0 ? void 0 : _a.companyName) || ((_b = order.vendor) === null || _b === void 0 ? void 0 : _b.name) || ((_c = order.vendor) === null || _c === void 0 ? void 0 : _c.email) ||
        "Vendor";
};
var canCancelOrder = function (status) {
    return !["CANCELLED", "COMPLETED", "DELIVERED", "SHIPPED"].includes(status);
};
function CustomerOrdersClient(_a) {
    var _this = this;
    var initialOrders = _a.initialOrders, errorMessage = _a.errorMessage;
    var router = navigation_1.useRouter();
    var _b = react_1.useState(initialOrders), orders = _b[0], setOrders = _b[1];
    var _c = react_1.useState(""), search = _c[0], setSearch = _c[1];
    var _d = react_1.useState("ALL"), activeFilter = _d[0], setActiveFilter = _d[1];
    var _e = react_1.useState(null), expandedOrder = _e[0], setExpandedOrder = _e[1];
    var _f = react_1.useState(""), actionError = _f[0], setActionError = _f[1];
    var _g = react_1.useState(""), actionSuccess = _g[0], setActionSuccess = _g[1];
    var _h = react_1.useState(null), pendingOrderId = _h[0], setPendingOrderId = _h[1];
    var _j = react_1.useTransition(), isPending = _j[0], startTransition = _j[1];
    var counts = react_1.useMemo(function () {
        return {
            total: orders.length,
            pending: orders.filter(function (order) { return order.status === "PENDING"; }).length,
            progress: orders.filter(function (order) {
                return ["CONFIRMED", "PROCESSING", "SHIPPED"].includes(order.status);
            }).length,
            completed: orders.filter(function (order) {
                return ["DELIVERED", "COMPLETED"].includes(order.status);
            }).length,
            cancelled: orders.filter(function (order) { return order.status === "CANCELLED"; }).length
        };
    }, [orders]);
    var filteredOrders = react_1.useMemo(function () {
        var query = search.trim().toLowerCase();
        return orders.filter(function (order) {
            var matchesStatus = activeFilter === "ALL" || order.status === activeFilter;
            var searchableText = [
                order.id,
                getProductName(order),
                getVendorName(order),
                order.status,
            ]
                .join(" ")
                .toLowerCase();
            return matchesStatus && (!query || searchableText.includes(query));
        });
    }, [orders, search, activeFilter]);
    var handleCancel = function (order) {
        var confirmed = window.confirm("Are you sure you want to cancel the order for \"" + getProductName(order) + "\"?");
        if (!confirmed)
            return;
        setActionError("");
        setActionSuccess("");
        setPendingOrderId(order.id);
        startTransition(function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, order_service_1.cancelOrder(order.id)];
                    case 1:
                        _a.sent();
                        setOrders(function (current) {
                            return current.map(function (item) {
                                return item.id === order.id
                                    ? __assign(__assign({}, item), { status: "CANCELLED" }) : item;
                            });
                        });
                        setActionSuccess("Your order has been cancelled successfully.");
                        router.refresh();
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Failed to cancel order:", error_1);
                        setActionError("Could not cancel this order. It may no longer be eligible for cancellation.");
                        return [3 /*break*/, 4];
                    case 3:
                        setPendingOrderId(null);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    var statCards = [
        {
            label: "Total orders",
            value: counts.total,
            icon: lucide_react_1.ShoppingBag,
            iconClass: "bg-emerald-50 text-emerald-700",
            accent: "from-emerald-500 to-teal-600"
        },
        {
            label: "Pending",
            value: counts.pending,
            icon: lucide_react_1.Clock3,
            iconClass: "bg-amber-50 text-amber-700",
            accent: "from-amber-400 to-orange-500"
        },
        {
            label: "In progress",
            value: counts.progress,
            icon: lucide_react_1.Truck,
            iconClass: "bg-blue-50 text-blue-700",
            accent: "from-blue-500 to-indigo-500"
        },
        {
            label: "Completed",
            value: counts.completed,
            icon: lucide_react_1.CheckCircle2,
            iconClass: "bg-teal-50 text-teal-700",
            accent: "from-teal-500 to-emerald-600"
        },
    ];
    return (React.createElement("main", { className: "min-h-screen bg-[#f5f8f6] px-4 py-6 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "mx-auto max-w-[1500px] space-y-7" },
            React.createElement("section", { className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end" },
                React.createElement("div", null,
                    React.createElement("div", { className: "mb-3 flex items-center gap-2 text-sm font-medium text-emerald-700" },
                        React.createElement(lucide_react_1.Leaf, { size: 17 }),
                        React.createElement("span", null, "EcoValuate"),
                        React.createElement("span", { className: "text-gray-400" }, "/"),
                        React.createElement("span", null, "Shopping")),
                    React.createElement("h1", { className: "text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" }, "My Orders"),
                    React.createElement("p", { className: "mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base" }, "Track your purchases, check order status, and manage your sustainable shopping journey.")),
                React.createElement(link_1["default"], { href: "/marketplace", className: "inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#c4f64b] px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-[#b4eb35]" },
                    "Explore marketplace",
                    React.createElement(lucide_react_1.ArrowUpRight, { size: 18 }))),
            React.createElement("section", { className: "relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#064e48] via-[#066b5b] to-[#078466] px-6 py-8 text-white shadow-lg sm:px-9 sm:py-10" },
                React.createElement("div", { className: "pointer-events-none absolute -right-12 -top-24 -z-10 h-72 w-72 rounded-full border-[35px] border-white/5" }),
                React.createElement("div", { className: "pointer-events-none absolute -bottom-28 right-36 -z-10 h-60 w-60 rounded-full border-[30px] border-white/5" }),
                React.createElement("div", { className: "relative flex flex-col justify-between gap-6 md:flex-row md:items-center" },
                    React.createElement("div", { className: "max-w-2xl" },
                        React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-50" },
                            React.createElement(lucide_react_1.Leaf, { size: 14 }),
                            "YOUR SUSTAINABLE SHOPPING"),
                        React.createElement("h2", { className: "mt-5 text-3xl font-bold leading-tight sm:text-4xl" },
                            "Every order makes",
                            React.createElement("br", { className: "hidden sm:block" }),
                            " a difference."),
                        React.createElement("p", { className: "mt-3 max-w-xl text-sm leading-6 text-emerald-50/90 sm:text-base" }, "Keep track of your orders and give electronics a second life through responsible reuse and recycling.")),
                    React.createElement("div", { className: "flex h-24 w-24 shrink-0 items-center justify-center self-start rounded-3xl border border-white/20 bg-white/10 md:h-32 md:w-32 md:self-center" },
                        React.createElement(lucide_react_1.Package, { className: "h-12 w-12 text-[#c4f64b] md:h-16 md:w-16" })))),
            errorMessage && (React.createElement("div", { role: "alert", className: "flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-800 sm:flex-row sm:items-center sm:justify-between" },
                React.createElement("div", { className: "flex items-start gap-3" },
                    React.createElement(lucide_react_1.XCircle, { className: "mt-0.5 shrink-0", size: 21 }),
                    React.createElement("div", null,
                        React.createElement("p", { className: "font-semibold" }, "Could not load your orders"),
                        React.createElement("p", { className: "mt-1 text-sm" }, errorMessage))),
                React.createElement("button", { onClick: function () { return router.refresh(); }, className: "inline-flex w-fit items-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-rose-100" },
                    React.createElement(lucide_react_1.RefreshCw, { size: 15 }),
                    "Try again"))),
            actionError && (React.createElement("div", { role: "alert", className: "rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" }, actionError)),
            actionSuccess && (React.createElement("div", { role: "status", className: "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" }, actionSuccess)),
            React.createElement("section", null,
                React.createElement("div", { className: "mb-4 flex items-center justify-between gap-3" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs font-bold uppercase tracking-[0.18em] text-emerald-700" }, "Your overview"),
                        React.createElement("h2", { className: "mt-1 text-xl font-bold text-slate-900 sm:text-2xl" }, "Order summary")),
                    React.createElement("span", { className: "hidden items-center gap-1.5 text-xs text-slate-500 sm:flex" },
                        React.createElement("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }),
                        "Based on loaded orders")),
                React.createElement("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" }, statCards.map(function (card) {
                    var Icon = card.icon;
                    return (React.createElement("article", { key: card.label, className: "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6" },
                        React.createElement("div", { className: "absolute left-0 top-0 h-1 w-full bg-gradient-to-r " + card.accent }),
                        React.createElement("div", { className: "flex items-center justify-between gap-3" },
                            React.createElement("p", { className: "text-sm font-medium text-slate-500" }, card.label),
                            React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl " + card.iconClass },
                                React.createElement(Icon, { size: 21 }))),
                        React.createElement("p", { className: "mt-5 text-3xl font-bold tracking-tight text-slate-900" }, card.value),
                        React.createElement("p", { className: "mt-2 text-xs text-slate-400" }, card.label === "Total orders"
                            ? "Orders returned by the API"
                            : "Current order status")));
                }))),
            React.createElement("section", { className: "overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm" },
                React.createElement("div", { className: "border-b border-slate-100 p-5 sm:p-7" },
                    React.createElement("div", { className: "flex flex-col justify-between gap-4 lg:flex-row lg:items-center" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-xl font-bold text-slate-900" }, "Order history"),
                            React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "View and manage your recent purchases.")),
                        React.createElement("div", { className: "relative w-full lg:max-w-sm" },
                            React.createElement(lucide_react_1.Search, { size: 18, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" }),
                            React.createElement("input", { type: "search", value: search, onChange: function (event) { return setSearch(event.target.value); }, placeholder: "Search product, vendor, order ID...", className: "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" }))),
                    React.createElement("div", { className: "mt-6 flex gap-2 overflow-x-auto pb-1" }, [
                        "ALL",
                        "PENDING",
                        "CONFIRMED",
                        "PROCESSING",
                        "SHIPPED",
                        "DELIVERED",
                        "COMPLETED",
                        "CANCELLED",
                    ].map(function (filter) {
                        var label = filter === "ALL" ? "All orders" : statusConfig[filter].label;
                        return (React.createElement("button", { key: filter, onClick: function () { return setActiveFilter(filter); }, className: "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition " + (activeFilter === filter
                                ? "bg-[#075e50] text-white shadow-sm"
                                : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800") }, label));
                    }))),
                filteredOrders.length === 0 ? (React.createElement("div", { className: "px-5 py-16 text-center sm:px-8" },
                    React.createElement("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700" },
                        React.createElement(lucide_react_1.ShoppingBag, { size: 30 })),
                    React.createElement("h3", { className: "mt-5 text-lg font-bold text-slate-900" }, orders.length === 0
                        ? "Your order history is empty"
                        : "No matching orders found"),
                    React.createElement("p", { className: "mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500" }, orders.length === 0
                        ? "Once you place an order from an accepted offer, it will appear here."
                        : "Try a different search term or change the status filter."),
                    orders.length === 0 && (React.createElement(link_1["default"], { href: "/marketplace", className: "mt-6 inline-flex items-center gap-2 rounded-xl bg-[#c4f64b] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#b4eb35]" },
                        "Explore marketplace",
                        React.createElement(lucide_react_1.ArrowRight, { size: 17 }))))) : (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "hidden overflow-x-auto md:block" },
                        React.createElement("table", { className: "w-full min-w-[850px] text-left" },
                            React.createElement("thead", null,
                                React.createElement("tr", { className: "bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500" },
                                    React.createElement("th", { className: "px-6 py-4 font-semibold" }, "Product"),
                                    React.createElement("th", { className: "px-5 py-4 font-semibold" }, "Order date"),
                                    React.createElement("th", { className: "px-5 py-4 font-semibold" }, "Vendor"),
                                    React.createElement("th", { className: "px-5 py-4 font-semibold" }, "Amount"),
                                    React.createElement("th", { className: "px-5 py-4 font-semibold" }, "Status"),
                                    React.createElement("th", { className: "px-6 py-4 text-right font-semibold" }, "Action"))),
                            React.createElement("tbody", { className: "divide-y divide-slate-100" }, filteredOrders.map(function (order) {
                                var status = statusConfig[order.status];
                                return (React.createElement("tr", { key: order.id, className: "transition hover:bg-emerald-50/30" },
                                    React.createElement("td", { className: "px-6 py-5" },
                                        React.createElement("div", { className: "flex items-center gap-3" },
                                            React.createElement("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" },
                                                React.createElement(lucide_react_1.Package, { size: 21 })),
                                            React.createElement("div", { className: "min-w-0" },
                                                React.createElement("p", { className: "max-w-[230px] truncate text-sm font-semibold text-slate-900" }, getProductName(order)),
                                                React.createElement("p", { className: "mt-1 text-xs text-slate-400" },
                                                    "#",
                                                    order.id.slice(0, 8))))),
                                    React.createElement("td", { className: "px-5 py-5" },
                                        React.createElement("div", { className: "flex items-center gap-2 text-sm text-slate-600" },
                                            React.createElement(lucide_react_1.CalendarDays, { size: 15, className: "text-slate-400" }),
                                            formatDate(order.createdAt))),
                                    React.createElement("td", { className: "px-5 py-5" },
                                        React.createElement("span", { className: "text-sm text-slate-600" }, getVendorName(order))),
                                    React.createElement("td", { className: "px-5 py-5" },
                                        React.createElement("span", { className: "whitespace-nowrap text-sm font-bold text-slate-900" }, formatPrice(order.finalPrice))),
                                    React.createElement("td", { className: "px-5 py-5" },
                                        React.createElement("span", { className: "inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset " + status.className }, status.label)),
                                    React.createElement("td", { className: "px-6 py-5" },
                                        React.createElement("div", { className: "flex items-center justify-end gap-2" },
                                            React.createElement("button", { onClick: function () {
                                                    return setExpandedOrder(function (current) {
                                                        return current === order.id ? null : order.id;
                                                    });
                                                }, className: "rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800" }, expandedOrder === order.id
                                                ? "Hide details"
                                                : "Details"),
                                            canCancelOrder(order.status) && (React.createElement("button", { disabled: isPending && pendingOrderId === order.id, onClick: function () { return handleCancel(order); }, className: "rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50" }, isPending && pendingOrderId === order.id
                                                ? "Cancelling..."
                                                : "Cancel"))))));
                            })))),
                    React.createElement("div", { className: "space-y-3 p-4 md:hidden" }, filteredOrders.map(function (order) {
                        var status = statusConfig[order.status];
                        return (React.createElement("article", { key: order.id, className: "rounded-2xl border border-slate-200 p-4" },
                            React.createElement("div", { className: "flex items-start gap-3" },
                                React.createElement("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" },
                                    React.createElement(lucide_react_1.Package, { size: 23 })),
                                React.createElement("div", { className: "min-w-0 flex-1" },
                                    React.createElement("h3", { className: "break-words text-sm font-bold text-slate-900" }, getProductName(order)),
                                    React.createElement("p", { className: "mt-1 text-xs text-slate-400" },
                                        "#",
                                        order.id.slice(0, 8)),
                                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, getVendorName(order))),
                                React.createElement("span", { className: "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset " + status.className }, status.label)),
                            React.createElement("div", { className: "mt-4 flex items-center justify-between border-t border-slate-100 pt-4" },
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-xs text-slate-500" }, "Total amount"),
                                    React.createElement("p", { className: "mt-1 text-base font-bold text-slate-900" }, formatPrice(order.finalPrice)),
                                    React.createElement("p", { className: "mt-1 text-xs text-slate-400" }, formatDate(order.createdAt))),
                                React.createElement("div", { className: "flex flex-col gap-2" },
                                    React.createElement("button", { onClick: function () {
                                            return setExpandedOrder(function (current) {
                                                return current === order.id ? null : order.id;
                                            });
                                        }, className: "rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600" }, expandedOrder === order.id
                                        ? "Hide details"
                                        : "Details"),
                                    canCancelOrder(order.status) && (React.createElement("button", { disabled: isPending && pendingOrderId === order.id, onClick: function () { return handleCancel(order); }, className: "rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 disabled:opacity-50" }, isPending && pendingOrderId === order.id
                                        ? "Cancelling..."
                                        : "Cancel order"))))));
                    })),
                    filteredOrders
                        .filter(function (order) { return order.id === expandedOrder; })
                        .map(function (order) { return (React.createElement("div", { key: order.id, className: "border-t border-emerald-100 bg-emerald-50/50 px-5 py-5 sm:px-7" },
                        React.createElement("div", { className: "flex items-center justify-between gap-3" },
                            React.createElement("h3", { className: "font-bold text-slate-900" }, "Order details"),
                            React.createElement("button", { onClick: function () { return setExpandedOrder(null); }, className: "text-sm font-medium text-slate-500 hover:text-slate-900" }, "Close")),
                        React.createElement("div", { className: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" },
                            React.createElement("div", { className: "rounded-xl border border-slate-200 bg-white p-4" },
                                React.createElement("p", { className: "text-xs text-slate-500" }, "Full order ID"),
                                React.createElement("p", { className: "mt-2 break-all text-sm font-semibold text-slate-800" }, order.id)),
                            React.createElement("div", { className: "rounded-xl border border-slate-200 bg-white p-4" },
                                React.createElement("p", { className: "text-xs text-slate-500" }, "Offer ID"),
                                React.createElement("p", { className: "mt-2 break-all text-sm font-semibold text-slate-800" }, order.offerId)),
                            React.createElement("div", { className: "rounded-xl border border-slate-200 bg-white p-4" },
                                React.createElement("p", { className: "text-xs text-slate-500" }, "Order updated"),
                                React.createElement("p", { className: "mt-2 text-sm font-semibold text-slate-800" }, formatDate(order.updatedAt))),
                            React.createElement("div", { className: "rounded-xl border border-slate-200 bg-white p-4" },
                                React.createElement("p", { className: "text-xs text-slate-500" }, "Current status"),
                                React.createElement("p", { className: "mt-2 text-sm font-semibold text-slate-800" }, statusConfig[order.status].label))))); }),
                    React.createElement("div", { className: "flex flex-col gap-3 border-t border-slate-100 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-7" },
                        React.createElement("p", null,
                            "Showing ",
                            filteredOrders.length,
                            " of ",
                            orders.length,
                            " loaded orders"),
                        React.createElement("button", { onClick: function () { return router.refresh(); }, className: "inline-flex w-fit items-center gap-2 font-semibold text-emerald-800 transition hover:text-emerald-600" },
                            React.createElement(lucide_react_1.RefreshCw, { size: 15 }),
                            "Refresh orders",
                            React.createElement(lucide_react_1.ArrowDownRight, { size: 15 })))))),
            React.createElement("p", { className: "pb-2 text-center text-xs text-slate-400" }, "EcoValuate \u00B7 Give e-waste a second life."))));
}
exports["default"] = CustomerOrdersClient;
