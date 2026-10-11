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
var date_fns_1 = require("date-fns");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var order_service_1 = require("@/src/services/order.service");
var table_1 = require("../../../ui/table");
var statusStyles = {
    PENDING: "border-amber-200 bg-amber-50 text-amber-700",
    CONFIRMED: "border-blue-200 bg-blue-50 text-blue-700",
    PROCESSING: "border-violet-200 bg-violet-50 text-violet-700",
    SHIPPED: "border-indigo-200 bg-indigo-50 text-indigo-700",
    DELIVERED: "border-cyan-200 bg-cyan-50 text-cyan-700",
    COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
    CANCELLED: "border-red-200 bg-red-50 text-red-700"
};
var transitions = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["PROCESSING", "CANCELLED"],
    PROCESSING: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: ["COMPLETED"],
    COMPLETED: [],
    CANCELLED: []
};
var statusLabels = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled"
};
var display = function (value) { return value || "N/A"; };
var formatPrice = function (value) {
    var amount = Number(value);
    return value !== null &&
        value !== undefined &&
        Number.isFinite(amount)
        ? amount.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        : "N/A";
};
function OrdersTable() {
    var _this = this;
    var _a, _b;
    var queryClient = react_query_1.useQueryClient();
    var _c = react_1.useState(""), search = _c[0], setSearch = _c[1];
    var _d = react_1.useState("ALL"), statusFilter = _d[0], setStatusFilter = _d[1];
    var _e = react_1.useState(1), page = _e[0], setPage = _e[1];
    var limit = 10;
    var _f = react_query_1.useQuery({
        queryKey: ["orders", page, limit, statusFilter],
        queryFn: function () {
            return order_service_1.getOrders(__assign({ page: page,
                limit: limit, sortBy: "createdAt", sortOrder: "desc" }, (statusFilter !== "ALL"
                ? { status: statusFilter }
                : {})));
        }
    }), response = _f.data, isLoading = _f.isLoading, isError = _f.isError, isFetching = _f.isFetching, refetch = _f.refetch;
    // httpClient returns the backend response object directly.
    var orders = react_1.useMemo(function () {
        var _a;
        return ((_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : []);
    }, [response]);
    var meta = response === null || response === void 0 ? void 0 : response.meta;
    var updateMutation = react_query_1.useMutation({
        mutationFn: function (_a) {
            var id = _a.id, status = _a.status;
            return order_service_1.updateOrderStatus(id, status);
        },
        onSuccess: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: ["orders"]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }
    });
    var cancelMutation = react_query_1.useMutation({
        mutationFn: order_service_1.cancelOrder,
        onSuccess: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: ["orders"]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }
    });
    var filteredOrders = react_1.useMemo(function () {
        var term = search.trim().toLowerCase();
        if (!term)
            return orders;
        return orders.filter(function (order) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return [
                order.id,
                (_b = (_a = order.offer) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.title,
                (_d = (_c = order.offer) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.brand,
                (_e = order.customer) === null || _e === void 0 ? void 0 : _e.name,
                (_f = order.customer) === null || _f === void 0 ? void 0 : _f.email,
                (_g = order.vendor) === null || _g === void 0 ? void 0 : _g.name,
                (_h = order.vendor) === null || _h === void 0 ? void 0 : _h.companyName,
                (_j = order.vendor) === null || _j === void 0 ? void 0 : _j.email,
                order.status,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase()
                .includes(term);
        });
    }, [orders, search]);
    var total = (_a = meta === null || meta === void 0 ? void 0 : meta.total) !== null && _a !== void 0 ? _a : orders.length;
    var totalPages = (_b = meta === null || meta === void 0 ? void 0 : meta.totalPage) !== null && _b !== void 0 ? _b : 1;
    var busy = updateMutation.isPending || cancelMutation.isPending;
    return (React.createElement("div", { className: "w-full min-w-0 space-y-6" },
        React.createElement("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700" },
                    React.createElement(lucide_react_1.PackageCheck, { className: "size-6" })),
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-slate-900" }, "Orders Management"),
                    React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Monitor orders and manage their delivery status."))),
            React.createElement("div", { className: "rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm" },
                React.createElement("p", { className: "text-xs font-medium text-slate-500" }, "Total Orders"),
                React.createElement("p", { className: "mt-1 text-xl font-bold text-slate-900" }, total))),
        (updateMutation.isError || cancelMutation.isError) && (React.createElement("div", { role: "alert", className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" }, "Order action failed. The status may not be allowed by the backend, or the request may have failed. Please try again.")),
        (updateMutation.isSuccess || cancelMutation.isSuccess) && (React.createElement("div", { className: "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" }, "Order action completed successfully.")),
        React.createElement("div", { className: "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" },
            React.createElement("div", { className: "flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "font-semibold text-slate-900" }, "All Orders"),
                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "Review orders and update their status.")),
                React.createElement("div", { className: "flex flex-col gap-2 sm:flex-row" },
                    React.createElement("div", { className: "relative sm:w-64" },
                        React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" }),
                        React.createElement("input", { type: "search", value: search, onChange: function (event) { return setSearch(event.target.value); }, placeholder: "Search current page...", "aria-label": "Search orders on this page", className: "h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" })),
                    React.createElement("select", { value: statusFilter, onChange: function (event) {
                            setStatusFilter(event.target.value);
                            setPage(1);
                        }, "aria-label": "Filter orders by status", className: "h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-emerald-400" },
                        React.createElement("option", { value: "ALL" }, "All statuses"),
                        Object.keys(statusLabels).map(function (status) { return (React.createElement("option", { key: status, value: status }, statusLabels[status])); })),
                    React.createElement("button", { type: "button", onClick: function () { return refetch(); }, disabled: isFetching, className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 disabled:opacity-50" },
                        React.createElement(lucide_react_1.RefreshCw, { className: "size-4 " + (isFetching ? "animate-spin" : "") }),
                        "Refresh"))),
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement(table_1.Table, { className: "w-full min-w-[1250px]" },
                    React.createElement(table_1.TableHeader, null,
                        React.createElement(table_1.TableRow, { className: "border-b border-slate-200 bg-slate-50/80" }, [
                            "Order / Product",
                            "Customer",
                            "Vendor",
                            "Final Price",
                            "Order Date",
                            "Status",
                            "Update Status",
                            "Actions",
                        ].map(function (heading) { return (React.createElement(table_1.TableHead, { key: heading, className: "h-12 whitespace-nowrap px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500" }, heading)); }))),
                    React.createElement(table_1.TableBody, null, isLoading ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: 8, className: "h-56 text-center" },
                            React.createElement(lucide_react_1.Loader2, { className: "mx-auto mb-3 size-7 animate-spin text-emerald-600" }),
                            React.createElement("p", { className: "text-sm text-slate-500" }, "Loading orders...")))) : isError ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: 8, className: "h-56 text-center" },
                            React.createElement("p", { className: "font-semibold text-red-600" }, "Unable to load orders"),
                            React.createElement("button", { type: "button", onClick: function () { return refetch(); }, className: "mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700" }, "Try Again")))) : filteredOrders.length ? (filteredOrders.map(function (order) {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                        var allowed = (_a = transitions[order.status]) !== null && _a !== void 0 ? _a : [];
                        var createdAt = order.createdAt
                            ? new Date(order.createdAt)
                            : null;
                        return (React.createElement(table_1.TableRow, { key: order.id, className: "border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40" },
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" },
                                React.createElement("p", { className: "max-w-48 truncate font-semibold text-slate-800" }, display((_c = (_b = order.offer) === null || _b === void 0 ? void 0 : _b.product) === null || _c === void 0 ? void 0 : _c.title)),
                                React.createElement("p", { className: "mt-1 max-w-48 truncate text-xs text-slate-400" },
                                    "#",
                                    order.id)),
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" },
                                React.createElement("p", { className: "max-w-40 truncate text-sm font-medium text-slate-700" }, display((_d = order.customer) === null || _d === void 0 ? void 0 : _d.name)),
                                React.createElement("p", { className: "max-w-40 truncate text-xs text-slate-400" }, display((_e = order.customer) === null || _e === void 0 ? void 0 : _e.email))),
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" },
                                React.createElement("p", { className: "max-w-40 truncate text-sm font-medium text-slate-700" }, display((_g = (_f = order.vendor) === null || _f === void 0 ? void 0 : _f.companyName) !== null && _g !== void 0 ? _g : (_h = order.vendor) === null || _h === void 0 ? void 0 : _h.name)),
                                React.createElement("p", { className: "max-w-40 truncate text-xs text-slate-400" }, display((_j = order.vendor) === null || _j === void 0 ? void 0 : _j.email))),
                            React.createElement(table_1.TableCell, { className: "whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-800" },
                                "\u20B9",
                                formatPrice(order.finalPrice)),
                            React.createElement(table_1.TableCell, { className: "whitespace-nowrap px-4 py-4 text-sm text-slate-600" }, createdAt &&
                                !Number.isNaN(createdAt.getTime())
                                ? date_fns_1.format(createdAt, "dd MMM yyyy")
                                : "N/A"),
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" },
                                React.createElement("span", { className: "inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold " + statusStyles[order.status] }, statusLabels[order.status])),
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" }, allowed.length ? (React.createElement("select", { value: "", disabled: busy, "aria-label": "Update status for order " + order.id, onChange: function (event) {
                                    var nextStatus = event.target.value;
                                    if (!nextStatus)
                                        return;
                                    updateMutation.mutate({
                                        id: order.id,
                                        status: nextStatus
                                    });
                                }, className: "h-9 max-w-40 rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 outline-none focus:border-emerald-400 disabled:opacity-50" },
                                React.createElement("option", { value: "", disabled: true }, "Change status"),
                                allowed.map(function (status) { return (React.createElement("option", { key: status, value: status }, statusLabels[status])); }))) : (React.createElement("span", { className: "text-xs text-slate-400" }, "No further changes"))),
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" },
                                order.status !== "CANCELLED" &&
                                    order.status !== "COMPLETED" &&
                                    order.status !== "DELIVERED" &&
                                    order.status !== "SHIPPED" && (React.createElement("button", { type: "button", title: "Cancel order", "aria-label": "Cancel order " + order.id, disabled: busy, onClick: function () {
                                        if (window.confirm("Cancel order " + order.id + "?")) {
                                            cancelMutation.mutate(order.id);
                                        }
                                    }, className: "inline-flex size-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50" },
                                    React.createElement(lucide_react_1.XCircle, { className: "size-4" }))),
                                order.status === "COMPLETED" && (React.createElement(lucide_react_1.CheckCircle2, { className: "size-5 text-emerald-600" })))));
                    })) : (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: 8, className: "h-56 text-center" },
                            React.createElement(lucide_react_1.PackageCheck, { className: "mx-auto mb-3 size-8 text-slate-300" }),
                            React.createElement("p", { className: "font-semibold text-slate-800" }, "No orders found"),
                            React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Try another status or search term."))))))),
            React.createElement("div", { className: "flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between" },
                React.createElement("p", { className: "text-sm text-slate-500" },
                    "Showing",
                    " ",
                    React.createElement("span", { className: "font-semibold text-slate-800" }, filteredOrders.length),
                    " ",
                    "orders on this page \u00B7",
                    " ",
                    React.createElement("span", { className: "font-semibold text-slate-800" }, total),
                    " ",
                    "total"),
                React.createElement("div", { className: "flex items-center gap-2" },
                    React.createElement("button", { type: "button", disabled: page <= 1 || isFetching, onClick: function () { return setPage(function (current) { return Math.max(1, current - 1); }); }, className: "inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40" },
                        React.createElement(lucide_react_1.ChevronLeft, { className: "size-4" }),
                        "Previous"),
                    React.createElement("span", { className: "text-sm text-slate-500" },
                        page,
                        " / ",
                        Math.max(1, totalPages)),
                    React.createElement("button", { type: "button", disabled: page >= totalPages || isFetching, onClick: function () {
                            return setPage(function (current) { return Math.min(totalPages, current + 1); });
                        }, className: "inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40" },
                        "Next",
                        React.createElement(lucide_react_1.ChevronRight, { className: "size-4" })))))));
}
exports["default"] = OrdersTable;
