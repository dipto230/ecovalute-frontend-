"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var formatPrice = function (price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(Number(price || 0));
};
var conditionLabels = {
    NEW: "New",
    USED: "Used",
    REFURBISHED: "Refurbished"
};
var statusLabels = {
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    SOLD: "Sold",
    AVAILABLE: "Available"
};
function statusClass(status) {
    switch (status) {
        case "AVAILABLE":
        case "APPROVED":
            return "bg-emerald-50 text-emerald-700 ring-emerald-200";
        case "SOLD":
            return "bg-slate-100 text-slate-600 ring-slate-200";
        case "REJECTED":
            return "bg-rose-50 text-rose-700 ring-rose-200";
        default:
            return "bg-amber-50 text-amber-700 ring-amber-200";
    }
}
function conditionClass(condition) {
    switch (condition) {
        case "NEW":
            return "bg-blue-50 text-blue-700";
        case "REFURBISHED":
            return "bg-violet-50 text-violet-700";
        default:
            return "bg-orange-50 text-orange-700";
    }
}
function CustomerProductsClient(_a) {
    var products = _a.products, initialError = _a.initialError;
    var _b = react_1.useState(""), search = _b[0], setSearch = _b[1];
    var _c = react_1.useState("ALL"), statusFilter = _c[0], setStatusFilter = _c[1];
    var _d = react_1.useState("ALL"), conditionFilter = _d[0], setConditionFilter = _d[1];
    var _e = react_1.useState("newest"), sortBy = _e[0], setSortBy = _e[1];
    var _f = react_1.useState(false), showFilters = _f[0], setShowFilters = _f[1];
    var filteredProducts = react_1.useMemo(function () {
        var query = search.trim().toLowerCase();
        return products
            .filter(function (product) {
            var _a, _b, _c;
            var matchesSearch = !query ||
                [
                    product.title,
                    product.brand,
                    product.model,
                    product.description,
                    (_a = product.category) === null || _a === void 0 ? void 0 : _a.name,
                    (_b = product.vendor) === null || _b === void 0 ? void 0 : _b.name,
                    (_c = product.vendor) === null || _c === void 0 ? void 0 : _c.companyName,
                ].some(function (value) { return value === null || value === void 0 ? void 0 : value.toLowerCase().includes(query); });
            var matchesStatus = statusFilter === "ALL" || product.status === statusFilter;
            var matchesCondition = conditionFilter === "ALL" ||
                product.condition === conditionFilter;
            return matchesSearch && matchesStatus && matchesCondition;
        })
            .sort(function (a, b) {
            var _a, _b;
            if (sortBy === "price-low") {
                return Number(a.estimatedPrice) - Number(b.estimatedPrice);
            }
            if (sortBy === "price-high") {
                return Number(b.estimatedPrice) - Number(a.estimatedPrice);
            }
            if (sortBy === "name") {
                return a.title.localeCompare(b.title);
            }
            return (new Date((_a = b.createdAt) !== null && _a !== void 0 ? _a : 0).getTime() -
                new Date((_b = a.createdAt) !== null && _b !== void 0 ? _b : 0).getTime());
        });
    }, [products, search, statusFilter, conditionFilter, sortBy]);
    var availableCount = products.filter(function (product) {
        return product.status === "AVAILABLE" || product.status === "APPROVED";
    }).length;
    var soldCount = products.filter(function (product) { return product.status === "SOLD"; }).length;
    var resetFilters = function () {
        setSearch("");
        setStatusFilter("ALL");
        setConditionFilter("ALL");
        setSortBy("newest");
    };
    return (React.createElement("main", { className: "min-h-screen bg-[#f5f8f6] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-9" },
        React.createElement("div", { className: "mx-auto max-w-7xl space-y-7" },
            React.createElement("header", { className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end" },
                React.createElement("div", null,
                    React.createElement("div", { className: "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700" },
                        React.createElement(lucide_react_1.Leaf, { size: 15 }),
                        "ECOVALUATE MARKETPLACE"),
                    React.createElement("h1", { className: "text-3xl font-semibold tracking-tight sm:text-4xl" }, "Products"),
                    React.createElement("p", { className: "mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base" }, "Explore electronics, compare prices, and discover products ready for a second life.")),
                React.createElement(link_1["default"], { href: "/marketplace", className: "inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800" },
                    "Explore marketplace",
                    React.createElement(lucide_react_1.ArrowRight, { size: 16 }))),
            React.createElement("section", { className: "relative isolate overflow-hidden rounded-[25px] bg-gradient-to-br from-[#073f3c] via-[#075c50] to-[#07866d] p-6 text-white sm:p-8" },
                React.createElement("div", { className: "pointer-events-none absolute -right-10 -top-20 -z-10 h-60 w-60 rounded-full border border-white/10" }),
                React.createElement("div", { className: "pointer-events-none absolute -bottom-20 right-32 -z-10 h-44 w-44 rounded-full bg-lime-300/10 blur-3xl" }),
                React.createElement("div", { className: "relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between" },
                    React.createElement("div", { className: "max-w-xl" },
                        React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium" },
                            React.createElement(lucide_react_1.Sparkles, { size: 14, className: "text-lime-300" }),
                            "SMARTER ELECTRONICS, LESS WASTE"),
                        React.createElement("h2", { className: "mt-4 text-2xl font-semibold tracking-tight sm:text-3xl" }, "Find value in every device."),
                        React.createElement("p", { className: "mt-3 text-sm leading-6 text-emerald-50/80" }, "Discover electronics and support a more sustainable way to reuse technology.")),
                    React.createElement("div", { className: "flex shrink-0 gap-3" },
                        React.createElement("div", { className: "rounded-2xl border border-white/15 bg-white/10 p-4" },
                            React.createElement("p", { className: "text-2xl font-semibold" }, products.length),
                            React.createElement("p", { className: "mt-1 text-xs text-emerald-50/75" }, "Listed products")),
                        React.createElement("div", { className: "rounded-2xl border border-white/15 bg-white/10 p-4" },
                            React.createElement("p", { className: "text-2xl font-semibold" }, availableCount),
                            React.createElement("p", { className: "mt-1 text-xs text-emerald-50/75" }, "Available / approved"))))),
            initialError && (React.createElement("section", { role: "alert", className: "rounded-2xl border border-rose-200 bg-rose-50 p-5" },
                React.createElement("h2", { className: "font-semibold text-rose-800" }, "Unable to load products"),
                React.createElement("p", { className: "mt-1 text-sm text-rose-700" }, initialError))),
            React.createElement("section", { className: "rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5" },
                React.createElement("div", { className: "flex flex-col gap-3 lg:flex-row" },
                    React.createElement("div", { className: "relative min-w-0 flex-1" },
                        React.createElement(lucide_react_1.Search, { size: 19, className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" }),
                        React.createElement("input", { type: "search", value: search, onChange: function (event) { return setSearch(event.target.value); }, placeholder: "Search by product, brand, model or category...", "aria-label": "Search products", className: "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" })),
                    React.createElement("button", { type: "button", onClick: function () { return setShowFilters(!showFilters); }, className: "inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition " + (showFilters
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50") },
                        React.createElement(lucide_react_1.SlidersHorizontal, { size: 17 }),
                        "Filters",
                        React.createElement(lucide_react_1.ChevronDown, { size: 15, className: "transition " + (showFilters ? "rotate-180" : "") })),
                    React.createElement("label", { className: "flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3" },
                        React.createElement("span", { className: "text-xs text-slate-500" }, "Sort:"),
                        React.createElement("select", { value: sortBy, onChange: function (event) { return setSortBy(event.target.value); }, "aria-label": "Sort products", className: "min-w-0 bg-transparent text-sm font-medium outline-none" },
                            React.createElement("option", { value: "newest" }, "Newest"),
                            React.createElement("option", { value: "price-low" }, "Price: low to high"),
                            React.createElement("option", { value: "price-high" }, "Price: high to low"),
                            React.createElement("option", { value: "name" }, "Name: A\u2013Z")))),
                showFilters && (React.createElement("div", { className: "mt-4 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2" },
                    React.createElement("label", { className: "block" },
                        React.createElement("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500" }, "Product status"),
                        React.createElement("select", { value: statusFilter, onChange: function (event) { return setStatusFilter(event.target.value); }, className: "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400" },
                            React.createElement("option", { value: "ALL" }, "All statuses"),
                            React.createElement("option", { value: "AVAILABLE" }, "Available"),
                            React.createElement("option", { value: "APPROVED" }, "Approved"),
                            React.createElement("option", { value: "PENDING" }, "Pending"),
                            React.createElement("option", { value: "SOLD" }, "Sold"),
                            React.createElement("option", { value: "REJECTED" }, "Rejected"))),
                    React.createElement("label", { className: "block" },
                        React.createElement("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500" }, "Condition"),
                        React.createElement("select", { value: conditionFilter, onChange: function (event) { return setConditionFilter(event.target.value); }, className: "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400" },
                            React.createElement("option", { value: "ALL" }, "All conditions"),
                            React.createElement("option", { value: "NEW" }, "New"),
                            React.createElement("option", { value: "USED" }, "Used"),
                            React.createElement("option", { value: "REFURBISHED" }, "Refurbished"))))),
                React.createElement("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500" },
                    React.createElement("p", null,
                        "Showing",
                        " ",
                        React.createElement("span", { className: "font-semibold text-slate-800" }, filteredProducts.length),
                        " ",
                        "of ",
                        products.length,
                        " products"),
                    (search || statusFilter !== "ALL" || conditionFilter !== "ALL") && (React.createElement("button", { type: "button", onClick: resetFilters, className: "inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-600" },
                        React.createElement(lucide_react_1.X, { size: 14 }),
                        "Clear filters")))),
            filteredProducts.length === 0 ? (React.createElement("section", { className: "rounded-2xl border border-slate-200/80 bg-white px-5 py-16 text-center shadow-sm" },
                React.createElement("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700" },
                    React.createElement(lucide_react_1.PackageSearch, { size: 30 })),
                React.createElement("h2", { className: "mt-5 text-lg font-semibold" }, products.length === 0
                    ? "No products available"
                    : "No matching products"),
                React.createElement("p", { className: "mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500" }, products.length === 0
                    ? "Products returned by the current API will appear here when available."
                    : "Try another search term or clear your filters to see more products."),
                products.length > 0 ? (React.createElement("button", { type: "button", onClick: resetFilters, className: "mt-5 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800" }, "Clear filters")) : (React.createElement(link_1["default"], { href: "/marketplace", className: "mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800" },
                    "Browse marketplace ",
                    React.createElement(lucide_react_1.ArrowRight, { size: 16 }))))) : (React.createElement("section", null,
                React.createElement("div", { className: "mb-4 flex items-center justify-between gap-3" },
                    React.createElement("div", null,
                        React.createElement("h2", { className: "text-lg font-semibold" }, "Explore products"),
                        React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Browse the products returned by your API.")),
                    React.createElement("span", { className: "hidden items-center gap-1.5 text-xs text-slate-500 sm:inline-flex" },
                        React.createElement(lucide_react_1.Filter, { size: 14 }),
                        "Filtered results")),
                React.createElement("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" }, filteredProducts.map(function (product) { return (React.createElement(ProductCard, { key: product.id, product: product })); })))),
            React.createElement("footer", { className: "flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between" },
                React.createElement("p", null,
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " EcoValuate"),
                React.createElement("p", null, "Give E-Waste a Second Life.")))));
}
exports["default"] = CustomerProductsClient;
function ProductCard(_a) {
    var _b, _c, _d, _e, _f, _g;
    var product = _a.product;
    var condition = (_b = conditionLabels[product.condition]) !== null && _b !== void 0 ? _b : product.condition;
    var status = (_c = statusLabels[product.status]) !== null && _c !== void 0 ? _c : product.status;
    var productIsAvailable = product.status === "AVAILABLE" || product.status === "APPROVED";
    return (React.createElement("article", { className: "group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5" },
        React.createElement("div", { className: "relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[#e8f8ef] via-[#f4faf6] to-[#e7f4ed]" },
            React.createElement("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(16,185,129,0.12),transparent_60%)]" }),
            React.createElement("div", { className: "relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white bg-white/80 text-emerald-800 shadow-sm transition duration-300 group-hover:scale-105" },
                React.createElement(lucide_react_1.Box, { size: 43, strokeWidth: 1.25 })),
            React.createElement("span", { className: "absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold " + conditionClass(product.condition) }, condition),
            React.createElement("span", { className: "absolute right-4 top-4 rounded-full px-2.5 py-1.5 text-[11px] font-semibold ring-1 ring-inset " + statusClass(product.status) }, status)),
        React.createElement("div", { className: "flex flex-1 flex-col p-5" },
            React.createElement("div", { className: "flex items-start justify-between gap-3" },
                React.createElement("div", { className: "min-w-0" },
                    React.createElement("p", { className: "truncate text-xs font-medium uppercase tracking-wider text-emerald-700" }, ((_d = product.category) === null || _d === void 0 ? void 0 : _d.name) || "Electronics"),
                    React.createElement("h3", { className: "mt-2 line-clamp-2 min-h-12 text-base font-semibold leading-6 text-slate-900" }, product.title)),
                React.createElement("div", { className: "shrink-0 rounded-lg bg-slate-50 p-2 text-slate-500" },
                    React.createElement(lucide_react_1.Box, { size: 17 }))),
            (product.brand || product.model) && (React.createElement("p", { className: "mt-2 truncate text-sm text-slate-500" }, [product.brand, product.model].filter(Boolean).join(" · "))),
            React.createElement("p", { className: "mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500" }, ((_e = product.description) === null || _e === void 0 ? void 0 : _e.trim()) || "Product details available on the marketplace."),
            React.createElement("div", { className: "mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-4" },
                React.createElement("div", null,
                    React.createElement("p", { className: "text-xs text-slate-500" }, "Estimated price"),
                    React.createElement("p", { className: "mt-1 text-xl font-semibold tracking-tight text-emerald-800" }, formatPrice(product.estimatedPrice))),
                React.createElement("div", { className: "text-right" },
                    React.createElement("p", { className: "text-xs text-slate-500" }, "Quantity"),
                    React.createElement("p", { className: "mt-1 text-sm font-semibold text-slate-800" }, product.quantity))),
            React.createElement("div", { className: "mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4" },
                React.createElement("div", { className: "min-w-0" },
                    React.createElement("p", { className: "text-[11px] text-slate-400" }, "Seller"),
                    React.createElement("p", { className: "mt-1 truncate text-xs font-medium text-slate-600" }, ((_f = product.vendor) === null || _f === void 0 ? void 0 : _f.companyName) || ((_g = product.vendor) === null || _g === void 0 ? void 0 : _g.name) ||
                        "Marketplace seller")),
                productIsAvailable ? (React.createElement(link_1["default"], { href: "/marketplace/products", className: "inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800" },
                    "View products ",
                    React.createElement(lucide_react_1.ArrowRight, { size: 14 }))) : (React.createElement("span", { className: "inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2.5 text-xs font-medium text-slate-500" },
                    React.createElement(lucide_react_1.CheckCircle2, { size: 14 }),
                    status))))));
}
