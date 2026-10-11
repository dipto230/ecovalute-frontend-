"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var payment_service_1 = require("@/src/services/payment.service");
var table_1 = require("../../../ui/table");
var badge_1 = require("../../../ui/badge");
var PAGE_SIZE = 10;
var getStatusStyle = function (status) {
    switch (status === null || status === void 0 ? void 0 : status.toUpperCase()) {
        case "PAID":
            return "border-emerald-200 bg-emerald-50 text-emerald-700";
        case "PENDING":
            return "border-amber-200 bg-amber-50 text-amber-700";
        case "FAILED":
            return "border-red-200 bg-red-50 text-red-700";
        case "REFUNDED":
            return "border-violet-200 bg-violet-50 text-violet-700";
        default:
            return "border-slate-200 bg-slate-50 text-slate-600";
    }
};
var displayValue = function (value) {
    if (value === null || value === undefined || value === "") {
        return "N/A";
    }
    return String(value);
};
var formatAmount = function (amount) {
    var value = Number(amount);
    if (!Number.isFinite(value))
        return "—";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value);
};
var formatDate = function (value) {
    if (!value)
        return "N/A";
    var date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "N/A"
        : date_fns_1.format(date, "dd MMM yyyy, hh:mm a");
};
var PaymentsTable = function () {
    var _a, _b, _c, _d, _e, _f, _g;
    var _h = react_1.useState(""), search = _h[0], setSearch = _h[1];
    var _j = react_1.useState("ALL"), status = _j[0], setStatus = _j[1];
    var _k = react_1.useState(1), page = _k[0], setPage = _k[1];
    var _l = react_1.useState(null), selectedPayment = _l[0], setSelectedPayment = _l[1];
    var _m = react_query_1.useQuery({
        queryKey: ["payments", page, PAGE_SIZE, status],
        queryFn: function () {
            return payment_service_1.getPayments({
                page: page,
                limit: PAGE_SIZE,
                status: status
            });
        }
    }), response = _m.data, isLoading = _m.isLoading, isError = _m.isError, isFetching = _m.isFetching, refetch = _m.refetch;
    // httpClient returns ApiResponse<T>, not AxiosResponse<T>.
    var payments = ((_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : []);
    var meta = response === null || response === void 0 ? void 0 : response.meta;
    var total = Number((_b = meta === null || meta === void 0 ? void 0 : meta.total) !== null && _b !== void 0 ? _b : payments.length);
    var totalPages = Math.max(1, Number((_c = meta === null || meta === void 0 ? void 0 : meta.totalPages) !== null && _c !== void 0 ? _c : Math.ceil(total / PAGE_SIZE)));
    // Search applies to the current server-returned page.
    var filteredPayments = payments.filter(function (payment) {
        var _a, _b, _c, _d;
        var searchText = search.trim().toLowerCase();
        if (!searchText)
            return true;
        return [
            payment.id,
            payment.orderId,
            payment.transactionId,
            payment.paymentMethod,
            payment.status,
            (_b = (_a = payment.order) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.name,
            (_d = (_c = payment.order) === null || _c === void 0 ? void 0 : _c.customer) === null || _d === void 0 ? void 0 : _d.email,
        ]
            .filter(Boolean)
            .some(function (value) {
            return String(value).toLowerCase().includes(searchText);
        });
    });
    var paidOnPage = payments.filter(function (payment) { var _a; return ((_a = payment.status) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === "PAID"; }).length;
    var pendingOnPage = payments.filter(function (payment) { var _a; return ((_a = payment.status) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === "PENDING"; }).length;
    var paidAmountOnPage = payments
        .filter(function (payment) { var _a; return ((_a = payment.status) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === "PAID"; })
        .reduce(function (sum, payment) { return sum + Number(payment.amount || 0); }, 0);
    var stats = [
        {
            label: "Total Payments",
            value: total,
            icon: lucide_react_1.ReceiptText,
            description: "All matching records",
            color: "bg-blue-50 text-blue-700"
        },
        {
            label: "Paid on This Page",
            value: paidOnPage,
            icon: lucide_react_1.CircleCheck,
            description: "Successful payments",
            color: "bg-emerald-50 text-emerald-700"
        },
        {
            label: "Pending on This Page",
            value: pendingOnPage,
            icon: lucide_react_1.Clock3,
            description: "Awaiting confirmation",
            color: "bg-amber-50 text-amber-700"
        },
        {
            label: "Paid Amount on This Page",
            value: formatAmount(paidAmountOnPage),
            icon: lucide_react_1.Wallet,
            description: "Paid records on current page",
            color: "bg-violet-50 text-violet-700"
        },
    ];
    return (React.createElement("div", { className: "w-full min-w-0 space-y-6" },
        React.createElement("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700" },
                    React.createElement(lucide_react_1.CreditCard, { className: "size-6" })),
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-slate-900" }, "Payments"),
                    React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Monitor transactions and payment records."))),
            React.createElement("button", { type: "button", onClick: function () { return refetch(); }, disabled: isFetching, className: "inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-60 sm:self-auto" },
                React.createElement(lucide_react_1.RefreshCw, { className: "size-4 " + (isFetching ? "animate-spin" : "") }),
                "Refresh")),
        React.createElement("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" }, stats.map(function (item) {
            var Icon = item.icon;
            return (React.createElement("div", { key: item.label, className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" },
                React.createElement("div", { className: "flex items-start justify-between gap-3" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm font-medium text-slate-500" }, item.label),
                        React.createElement("p", { className: "mt-2 break-words text-2xl font-bold text-slate-900" }, item.value)),
                    React.createElement("div", { className: "flex size-11 shrink-0 items-center justify-center rounded-xl " + item.color },
                        React.createElement(Icon, { className: "size-5" }))),
                React.createElement("p", { className: "mt-3 text-xs text-slate-400" }, item.description)));
        })),
        React.createElement("div", { className: "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" },
            React.createElement("div", { className: "flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "font-semibold text-slate-900" }, "All Transactions"),
                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "Search and filter payment records.")),
                React.createElement("div", { className: "flex flex-col gap-2 sm:flex-row" },
                    React.createElement("div", { className: "relative sm:w-72" },
                        React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" }),
                        React.createElement("input", { type: "search", value: search, onChange: function (event) { return setSearch(event.target.value); }, placeholder: "Search transaction or order...", "aria-label": "Search payments", className: "h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" })),
                    React.createElement("select", { value: status, onChange: function (event) {
                            setStatus(event.target.value);
                            setPage(1);
                        }, "aria-label": "Filter payment status", className: "h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-400" },
                        React.createElement("option", { value: "ALL" }, "All statuses"),
                        React.createElement("option", { value: "PAID" }, "Paid"),
                        React.createElement("option", { value: "PENDING" }, "Pending"),
                        React.createElement("option", { value: "FAILED" }, "Failed"),
                        React.createElement("option", { value: "REFUNDED" }, "Refunded")))),
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement(table_1.Table, { className: "w-full min-w-[1100px]" },
                    React.createElement(table_1.TableHeader, null,
                        React.createElement(table_1.TableRow, { className: "bg-slate-50 hover:bg-slate-50" }, [
                            "Payment",
                            "Order ID",
                            "Customer",
                            "Amount",
                            "Method",
                            "Status",
                            "Payment Date",
                            "Details",
                        ].map(function (heading) { return (React.createElement(table_1.TableHead, { key: heading, className: "h-12 whitespace-nowrap px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500" }, heading)); }))),
                    React.createElement(table_1.TableBody, null, isLoading ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: 8, className: "h-56 text-center" },
                            React.createElement("div", { className: "flex flex-col items-center gap-3" },
                                React.createElement(lucide_react_1.Loader2, { className: "size-7 animate-spin text-emerald-600" }),
                                React.createElement("span", { className: "text-sm text-slate-500" }, "Loading payments..."))))) : isError ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: 8, className: "h-56 text-center" },
                            React.createElement("p", { className: "font-semibold text-red-600" }, "Unable to load payments."),
                            React.createElement("button", { type: "button", onClick: function () { return refetch(); }, className: "mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700" }, "Try Again")))) : filteredPayments.length > 0 ? (filteredPayments.map(function (payment) {
                        var _a, _b, _c, _d;
                        return (React.createElement(table_1.TableRow, { key: payment.id, className: "border-b border-slate-100 hover:bg-emerald-50/40" },
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" },
                                React.createElement("div", { className: "flex items-center gap-3" },
                                    React.createElement("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" },
                                        React.createElement(lucide_react_1.CreditCard, { className: "size-5" })),
                                    React.createElement("div", { className: "min-w-0" },
                                        React.createElement("p", { className: "max-w-44 truncate text-sm font-semibold text-slate-800" }, payment.transactionId || payment.id),
                                        React.createElement("p", { className: "mt-1 text-xs text-slate-400" }, "Payment record")))),
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" },
                                React.createElement("span", { className: "block max-w-40 truncate font-mono text-xs text-slate-600" }, payment.orderId)),
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" },
                                React.createElement("div", { className: "max-w-48" },
                                    React.createElement("p", { className: "truncate text-sm font-medium text-slate-700" }, displayValue((_b = (_a = payment.order) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.name)),
                                    React.createElement("p", { className: "truncate text-xs text-slate-400" }, displayValue((_d = (_c = payment.order) === null || _c === void 0 ? void 0 : _c.customer) === null || _d === void 0 ? void 0 : _d.email)))),
                            React.createElement(table_1.TableCell, { className: "whitespace-nowrap px-4 py-4" },
                                React.createElement("span", { className: "text-sm font-bold text-slate-800" }, formatAmount(payment.amount))),
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" },
                                React.createElement("span", { className: "inline-flex rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600" }, displayValue(payment.paymentMethod))),
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" },
                                React.createElement(badge_1.Badge, { variant: "outline", className: "rounded-full px-2.5 py-1 text-xs font-semibold " + getStatusStyle(payment.status) },
                                    React.createElement("span", { className: "mr-1.5 size-1.5 rounded-full bg-current" }),
                                    displayValue(payment.status).replaceAll("_", " "))),
                            React.createElement(table_1.TableCell, { className: "whitespace-nowrap px-4 py-4 text-sm text-slate-600" }, formatDate(payment.paidAt)),
                            React.createElement(table_1.TableCell, { className: "px-4 py-4" },
                                React.createElement("button", { type: "button", onClick: function () { return setSelectedPayment(payment); }, "aria-label": "View payment details", className: "inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700" },
                                    React.createElement(lucide_react_1.Eye, { className: "size-3.5" }),
                                    "View"))));
                    })) : (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: 8, className: "h-56 text-center" },
                            React.createElement("div", { className: "flex flex-col items-center gap-3" },
                                React.createElement("div", { className: "flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400" },
                                    React.createElement(lucide_react_1.Wallet, { className: "size-7" })),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "font-semibold text-slate-800" }, "No payments found"),
                                    React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Try another search or status filter."))))))))),
            !isLoading && !isError && (React.createElement("div", { className: "flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" },
                React.createElement("p", { className: "text-sm text-slate-500" },
                    "Page ",
                    React.createElement("span", { className: "font-semibold text-slate-800" }, page),
                    " ",
                    "of",
                    " ",
                    React.createElement("span", { className: "font-semibold text-slate-800" }, totalPages),
                    " · ",
                    React.createElement("span", { className: "font-semibold text-slate-800" }, total),
                    " ",
                    "payments"),
                React.createElement("div", { className: "flex items-center gap-2" },
                    React.createElement("button", { type: "button", disabled: page <= 1 || isFetching, onClick: function () { return setPage(function (current) { return Math.max(1, current - 1); }); }, className: "inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40" },
                        React.createElement(lucide_react_1.ChevronLeft, { className: "size-4" }),
                        "Previous"),
                    React.createElement("button", { type: "button", disabled: page >= totalPages || isFetching, onClick: function () { return setPage(function (current) { return Math.min(totalPages, current + 1); }); }, className: "inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40" },
                        "Next",
                        React.createElement(lucide_react_1.ChevronRight, { className: "size-4" })))))),
        selectedPayment && (React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm", onClick: function () { return setSelectedPayment(null); } },
            React.createElement("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "payment-details-title", className: "w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl", onClick: function (event) { return event.stopPropagation(); } },
                React.createElement("div", { className: "flex items-center justify-between border-b border-slate-100 p-5" },
                    React.createElement("div", null,
                        React.createElement("h2", { id: "payment-details-title", className: "text-lg font-bold text-slate-900" }, "Payment Details"),
                        React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "Full payment record")),
                    React.createElement("button", { type: "button", "aria-label": "Close payment details", onClick: function () { return setSelectedPayment(null); }, className: "rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" },
                        React.createElement(lucide_react_1.X, { className: "size-5" }))),
                React.createElement("div", { className: "space-y-4 p-5" },
                    React.createElement("div", { className: "rounded-xl bg-emerald-50 p-4" },
                        React.createElement("p", { className: "text-sm text-emerald-700" }, "Payment amount"),
                        React.createElement("p", { className: "mt-1 text-3xl font-bold text-emerald-800" }, formatAmount(selectedPayment.amount))),
                    [
                        ["Payment ID", selectedPayment.id],
                        ["Order ID", selectedPayment.orderId],
                        ["Transaction ID", selectedPayment.transactionId],
                        ["Payment Method", selectedPayment.paymentMethod],
                        ["Status", selectedPayment.status],
                        ["Customer", (_e = (_d = selectedPayment.order) === null || _d === void 0 ? void 0 : _d.customer) === null || _e === void 0 ? void 0 : _e.name],
                        ["Customer Email", (_g = (_f = selectedPayment.order) === null || _f === void 0 ? void 0 : _f.customer) === null || _g === void 0 ? void 0 : _g.email],
                        ["Payment Date", formatDate(selectedPayment.paidAt)],
                    ].map(function (_a) {
                        var label = _a[0], value = _a[1];
                        return (React.createElement("div", { key: label, className: "flex flex-col gap-1 border-b border-slate-100 pb-3 last:border-0 sm:flex-row sm:items-start sm:justify-between" },
                            React.createElement("span", { className: "text-sm text-slate-500" }, label),
                            React.createElement("span", { className: "max-w-full break-all text-sm font-medium text-slate-800 sm:max-w-[60%] sm:text-right" }, displayValue(value))));
                    })),
                React.createElement("div", { className: "flex justify-end border-t border-slate-100 p-5" },
                    React.createElement("button", { type: "button", onClick: function () { return setSelectedPayment(null); }, className: "rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700" }, "Close")))))));
};
exports["default"] = PaymentsTable;
