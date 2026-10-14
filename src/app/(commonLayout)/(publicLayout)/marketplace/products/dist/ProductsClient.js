"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var PAGE_SIZE = 12;
var formatPrice = function (price) {
    var amount = Number(price);
    if (!Number.isFinite(amount)) {
        return "Price unavailable";
    }
    return "\u20B9" + amount.toLocaleString("en-IN", {
        maximumFractionDigits: 2
    });
};
var conditionLabel = {
    NEW: "New",
    USED: "Pre-owned",
    REFURBISHED: "Refurbished"
};
function ProductsClient(_a) {
    var _b;
    var products = _a.products;
    var _c = react_1.useState(""), search = _c[0], setSearch = _c[1];
    var _d = react_1.useState("ALL"), category = _d[0], setCategory = _d[1];
    var _e = react_1.useState("ALL"), condition = _e[0], setCondition = _e[1];
    var _f = react_1.useState("newest"), sort = _f[0], setSort = _f[1];
    var _g = react_1.useState(1), page = _g[0], setPage = _g[1];
    var _h = react_1.useState(false), filtersOpen = _h[0], setFiltersOpen = _h[1];
    // Only approved products with available stock are displayed.
    var approvedProducts = react_1.useMemo(function () {
        return products.filter(function (product) {
            return product.status === "APPROVED" &&
                Number(product.quantity) > 0;
        });
    }, [products]);
    var categories = react_1.useMemo(function () {
        var map = new Map();
        approvedProducts.forEach(function (product) {
            var _a;
            if (product.categoryId) {
                map.set(product.categoryId, ((_a = product.category) === null || _a === void 0 ? void 0 : _a.name) || "Other");
            }
        });
        return Array.from(map.entries())
            .map(function (_a) {
            var id = _a[0], name = _a[1];
            return ({ id: id, name: name });
        })
            .sort(function (a, b) { return a.name.localeCompare(b.name); });
    }, [approvedProducts]);
    var filteredProducts = react_1.useMemo(function () {
        var term = search.trim().toLowerCase();
        var result = approvedProducts.filter(function (product) {
            var _a, _b, _c;
            var searchableText = [
                product.title,
                product.description,
                product.brand,
                product.model,
                (_a = product.category) === null || _a === void 0 ? void 0 : _a.name,
                (_b = product.vendor) === null || _b === void 0 ? void 0 : _b.name,
                (_c = product.vendor) === null || _c === void 0 ? void 0 : _c.companyName,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            if (term && !searchableText.includes(term)) {
                return false;
            }
            if (category !== "ALL" &&
                product.categoryId !== category) {
                return false;
            }
            if (condition !== "ALL" &&
                product.condition !== condition) {
                return false;
            }
            return true;
        });
        result.sort(function (a, b) {
            if (sort === "price-low") {
                return (Number(a.estimatedPrice) -
                    Number(b.estimatedPrice));
            }
            if (sort === "price-high") {
                return (Number(b.estimatedPrice) -
                    Number(a.estimatedPrice));
            }
            return (new Date(b.createdAt || 0).getTime() -
                new Date(a.createdAt || 0).getTime());
        });
        return result;
    }, [approvedProducts, search, category, condition, sort]);
    var totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
    var currentPage = Math.min(page, totalPages);
    var visibleProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    var resetFilters = function () {
        setSearch("");
        setCategory("ALL");
        setCondition("ALL");
        setSort("newest");
        setPage(1);
    };
    var hasFilters = search.trim() !== "" ||
        category !== "ALL" ||
        condition !== "ALL";
    return (React.createElement("main", { className: "min-h-screen bg-white text-neutral-900" },
        React.createElement("section", { className: "border-b border-neutral-100 bg-white" },
            React.createElement("div", { className: "mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20" },
                React.createElement("div", { className: "grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs font-medium tracking-wide text-neutral-600" },
                            React.createElement(lucide_react_1.Leaf, { size: 15, className: "text-neutral-800" }),
                            "A MORE CONSCIOUS MARKETPLACE"),
                        React.createElement("h1", { className: "max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl" },
                            "Good electronics.",
                            React.createElement("span", { className: "mt-1 block font-normal text-neutral-400" }, "A second life.")),
                        React.createElement("p", { className: "mt-6 max-w-lg text-base leading-7 text-neutral-500 sm:text-lg" }, "Discover pre-owned electronics worth keeping. Find useful products, compare prices, and make a more thoughtful choice."),
                        React.createElement("a", { href: "#product-list", className: "mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-700" },
                            "Explore collection",
                            React.createElement(lucide_react_1.ArrowRight, { size: 17 })),
                        React.createElement("div", { className: "mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-500" },
                            React.createElement("span", { className: "inline-flex items-center gap-2" },
                                React.createElement(lucide_react_1.Check, { size: 15, className: "text-neutral-800" }),
                                "Approved listings"),
                            React.createElement("span", { className: "inline-flex items-center gap-2" },
                                React.createElement(lucide_react_1.Check, { size: 15, className: "text-neutral-800" }),
                                "Stock available"))),
                    React.createElement("div", { className: "relative" },
                        React.createElement("div", { className: "rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 sm:p-8" },
                            React.createElement("div", { className: "flex items-start justify-between gap-4" },
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-xs font-medium uppercase tracking-[0.2em] text-neutral-500" }, "The EcoValuate edit"),
                                    React.createElement("h2", { className: "mt-3 max-w-xs text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl" }, "Better finds. Less waste.")),
                                React.createElement("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white" },
                                    React.createElement(lucide_react_1.Leaf, { size: 23, strokeWidth: 1.5 }))),
                            React.createElement("div", { className: "mt-8 space-y-3" },
                                React.createElement("div", { className: "flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4" },
                                    React.createElement("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-50" },
                                        React.createElement(lucide_react_1.PackageSearch, { size: 23, strokeWidth: 1.5 })),
                                    React.createElement("div", { className: "min-w-0 flex-1" },
                                        React.createElement("p", { className: "text-sm font-medium text-neutral-900" }, "Thoughtfully listed"),
                                        React.createElement("p", { className: "mt-1 text-xs leading-5 text-neutral-500" }, "Explore approved products with stock.")),
                                    React.createElement(lucide_react_1.ArrowRight, { size: 17, className: "shrink-0 text-neutral-400" })),
                                React.createElement("div", { className: "flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4" },
                                    React.createElement("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-50" },
                                        React.createElement(lucide_react_1.ArrowDownUp, { size: 22, strokeWidth: 1.5 })),
                                    React.createElement("div", { className: "min-w-0 flex-1" },
                                        React.createElement("p", { className: "text-sm font-medium text-neutral-900" }, "Compare with ease"),
                                        React.createElement("p", { className: "mt-1 text-xs leading-5 text-neutral-500" }, "Search, filter, and sort listings.")),
                                    React.createElement(lucide_react_1.ArrowRight, { size: 17, className: "shrink-0 text-neutral-400" }))),
                            React.createElement("div", { className: "mt-5 flex items-center justify-between border-t border-neutral-200 pt-5" },
                                React.createElement("span", { className: "text-sm text-neutral-500" }, "Products ready to discover"),
                                React.createElement("span", { className: "text-lg font-semibold tabular-nums text-neutral-950" }, approvedProducts.length.toString().padStart(2, "0")))),
                        React.createElement("div", { className: "pointer-events-none absolute -bottom-3 -right-3 -z-10 h-32 w-32 rounded-full bg-neutral-100 blur-2xl" }))))),
        React.createElement("section", { id: "product-list", className: "mx-auto max-w-7xl scroll-mt-8 px-5 py-12 sm:px-8 sm:py-16" },
            React.createElement("div", { className: "mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" },
                React.createElement("div", null,
                    React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500" }, "The marketplace"),
                    React.createElement("h2", { className: "mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl" }, "Find your next essential."),
                    React.createElement("p", { className: "mt-3 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base" }, "Browse electronics selected for another useful chapter, at prices worth comparing.")),
                React.createElement("p", { className: "text-sm text-neutral-500" },
                    React.createElement("span", { className: "font-semibold text-neutral-950" }, filteredProducts.length),
                    " ",
                    filteredProducts.length === 1 ? "product" : "products")),
            React.createElement("div", { className: "rounded-2xl border border-neutral-200 bg-white p-3 sm:p-4" },
                React.createElement("div", { className: "flex flex-col gap-3 lg:flex-row" },
                    React.createElement("div", { className: "relative min-w-0 flex-1" },
                        React.createElement(lucide_react_1.Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400", size: 18 }),
                        React.createElement("input", { value: search, onChange: function (event) {
                                setSearch(event.target.value);
                                setPage(1);
                            }, placeholder: "Search by product, brand or model...", "aria-label": "Search products", className: "h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-10 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500" }),
                        search && (React.createElement("button", { type: "button", onClick: function () {
                                setSearch("");
                                setPage(1);
                            }, "aria-label": "Clear search", className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900" },
                            React.createElement(lucide_react_1.X, { size: 16 })))),
                    React.createElement("button", { type: "button", onClick: function () { return setFiltersOpen(!filtersOpen); }, "aria-expanded": filtersOpen, className: "inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 lg:hidden" },
                        React.createElement(lucide_react_1.SlidersHorizontal, { size: 17 }),
                        "Filters"),
                    React.createElement("div", { className: "relative lg:w-56 lg:shrink-0" },
                        React.createElement(lucide_react_1.ArrowDownUp, { className: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500", size: 17 }),
                        React.createElement("select", { value: sort, onChange: function (event) {
                                setSort(event.target.value);
                                setPage(1);
                            }, "aria-label": "Sort products", className: "h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white pl-11 pr-4 text-sm font-medium text-neutral-800 outline-none transition focus:border-neutral-500" },
                            React.createElement("option", { value: "newest" }, "Newest first"),
                            React.createElement("option", { value: "price-low" }, "Price: low to high"),
                            React.createElement("option", { value: "price-high" }, "Price: high to low")))),
                React.createElement("div", { className: "grid gap-4 border-t border-neutral-100 pt-4 sm:grid-cols-2 lg:grid-cols-3 " + (filtersOpen ? "" : "hidden lg:grid") },
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "category-filter", className: "mb-2 block text-xs font-medium text-neutral-500" }, "Category"),
                        React.createElement("select", { id: "category-filter", value: category, onChange: function (event) {
                                setCategory(event.target.value);
                                setPage(1);
                            }, className: "h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-800 outline-none focus:border-neutral-500" },
                            React.createElement("option", { value: "ALL" }, "All categories"),
                            categories.map(function (item) { return (React.createElement("option", { key: item.id, value: item.id }, item.name)); }))),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "condition-filter", className: "mb-2 block text-xs font-medium text-neutral-500" }, "Condition"),
                        React.createElement("select", { id: "condition-filter", value: condition, onChange: function (event) {
                                setCondition(event.target.value);
                                setPage(1);
                            }, className: "h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-800 outline-none focus:border-neutral-500" },
                            React.createElement("option", { value: "ALL" }, "All conditions"),
                            React.createElement("option", { value: "NEW" }, "New"),
                            React.createElement("option", { value: "USED" }, "Pre-owned"),
                            React.createElement("option", { value: "REFURBISHED" }, "Refurbished"))),
                    React.createElement("div", { className: "flex items-end" },
                        React.createElement("button", { type: "button", onClick: resetFilters, className: "inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-950" },
                            React.createElement(lucide_react_1.X, { size: 15 }),
                            "Reset filters")))),
            hasFilters && (React.createElement("div", { className: "mt-5 flex flex-wrap items-center gap-2" },
                React.createElement("span", { className: "mr-1 text-xs text-neutral-500" }, "Filters"),
                search.trim() && (React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-700" },
                    "Search: ",
                    search,
                    React.createElement("button", { type: "button", onClick: function () {
                            setSearch("");
                            setPage(1);
                        }, "aria-label": "Remove search filter" },
                        React.createElement(lucide_react_1.X, { size: 13 })))),
                category !== "ALL" && (React.createElement("span", { className: "rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-700" }, (_b = categories.find(function (item) { return item.id === category; })) === null || _b === void 0 ? void 0 : _b.name)),
                condition !== "ALL" && (React.createElement("span", { className: "rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-700" }, conditionLabel[condition] || condition)),
                React.createElement("button", { type: "button", onClick: resetFilters, className: "ml-1 text-xs font-medium text-neutral-500 underline underline-offset-4 hover:text-neutral-950" }, "Clear all"))),
            visibleProducts.length > 0 ? (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "mt-7 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" }, visibleProducts.map(function (product) {
                    var _a, _b, _c, _d, _e;
                    var image = (_b = (_a = product.productImages) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.imageUrl;
                    var vendorName = ((_c = product.vendor) === null || _c === void 0 ? void 0 : _c.companyName) || ((_d = product.vendor) === null || _d === void 0 ? void 0 : _d.name) ||
                        "Marketplace seller";
                    return (React.createElement("article", { key: product.id, className: "group min-w-0" },
                        React.createElement(link_1["default"], { href: "/marketplace/products/" + product.id, className: "block", "aria-label": "View " + product.title },
                            React.createElement("div", { className: "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50" },
                                image ? (React.createElement("img", { src: image, alt: product.title, loading: "lazy", className: "h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" })) : (React.createElement("div", { className: "flex flex-col items-center gap-3 text-neutral-400" },
                                    React.createElement(lucide_react_1.Package, { size: 39, strokeWidth: 1.2 }),
                                    React.createElement("span", { className: "text-xs" }, "Image coming soon"))),
                                React.createElement("span", { className: "absolute left-3 top-3 rounded-full border border-neutral-200/80 bg-white/95 px-3 py-1.5 text-[11px] font-medium text-neutral-700 backdrop-blur" }, conditionLabel[product.condition] ||
                                    product.condition),
                                Number(product.quantity) <= 3 && (React.createElement("span", { className: "absolute right-3 top-3 rounded-full border border-neutral-200 bg-white/95 px-3 py-1.5 text-[10px] font-medium text-neutral-600" }, "Few left")))),
                        React.createElement("div", { className: "px-0.5 pt-4" },
                            React.createElement("div", { className: "flex items-center justify-between gap-3" },
                                React.createElement("span", { className: "truncate text-xs text-neutral-500" }, ((_e = product.category) === null || _e === void 0 ? void 0 : _e.name) || "Electronics"),
                                product.brand && (React.createElement("span", { className: "shrink-0 text-xs text-neutral-400" }, product.brand))),
                            React.createElement(link_1["default"], { href: "/marketplace/products/" + product.id, className: "mt-2 block" },
                                React.createElement("h3", { className: "line-clamp-2 min-h-12 text-[15px] font-medium leading-6 text-neutral-900 transition group-hover:text-neutral-500" }, product.title)),
                            product.model && (React.createElement("p", { className: "mt-1 truncate text-xs text-neutral-400" },
                                "Model: ",
                                product.model)),
                            React.createElement("div", { className: "mt-4 flex items-end justify-between gap-3 border-t border-neutral-100 pt-4" },
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-[11px] text-neutral-500" }, "Listed price"),
                                    React.createElement("p", { className: "mt-1 text-lg font-semibold tracking-tight text-neutral-950" }, formatPrice(product.estimatedPrice))),
                                React.createElement(link_1["default"], { href: "/marketplace/products/" + product.id, "aria-label": "View details for " + product.title, className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white" },
                                    React.createElement(lucide_react_1.ArrowRight, { size: 17 }))),
                            React.createElement("div", { className: "mt-4 flex items-center gap-2.5" },
                                React.createElement("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs font-medium text-neutral-700" }, vendorName.slice(0, 1).toUpperCase()),
                                React.createElement("div", { className: "min-w-0 flex-1" },
                                    React.createElement("p", { className: "truncate text-xs font-medium text-neutral-700" }, vendorName),
                                    React.createElement("p", { className: "mt-0.5 text-[10px] text-neutral-400" },
                                        product.quantity,
                                        " available")),
                                React.createElement("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-600", title: "Approved listing" },
                                    React.createElement(lucide_react_1.Check, { size: 12 }))))));
                })),
                React.createElement("div", { className: "mt-12 flex flex-col gap-5 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between" },
                    React.createElement("p", { className: "text-sm text-neutral-500" },
                        "Showing",
                        " ",
                        React.createElement("span", { className: "font-medium text-neutral-900" },
                            (currentPage - 1) * PAGE_SIZE + 1,
                            "\u2013",
                            Math.min(currentPage * PAGE_SIZE, filteredProducts.length)),
                        " ",
                        "of",
                        " ",
                        React.createElement("span", { className: "font-medium text-neutral-900" }, filteredProducts.length),
                        " ",
                        "products"),
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement("button", { type: "button", disabled: currentPage <= 1, onClick: function () {
                                return setPage(function (current) { return current - 1; });
                            }, "aria-label": "Previous page", className: "flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30" },
                            React.createElement(lucide_react_1.ChevronLeft, { size: 18 })),
                        Array.from({ length: totalPages }, function (_, index) { return index + 1; })
                            .filter(function (number) {
                            return number === 1 ||
                                number === totalPages ||
                                Math.abs(number - currentPage) <= 1;
                        })
                            .map(function (number, index, numbers) { return (React.createElement("span", { key: number, className: "contents" },
                            index > 0 &&
                                number - numbers[index - 1] > 1 && (React.createElement("span", { className: "px-1 text-sm text-neutral-400" }, "\u2026")),
                            React.createElement("button", { type: "button", onClick: function () { return setPage(number); }, "aria-current": currentPage === number
                                    ? "page"
                                    : undefined, className: "h-10 min-w-10 rounded-xl border px-3 text-sm font-medium transition " + (currentPage === number
                                    ? "border-neutral-950 bg-neutral-950 text-white"
                                    : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50") }, number))); }),
                        React.createElement("button", { type: "button", disabled: currentPage >= totalPages, onClick: function () {
                                return setPage(function (current) { return current + 1; });
                            }, "aria-label": "Next page", className: "flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30" },
                            React.createElement(lucide_react_1.ChevronRight, { size: 18 })))))) : (React.createElement("div", { className: "mt-8 rounded-2xl border border-neutral-200 bg-white px-6 py-20 text-center" },
                React.createElement("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-600" },
                    React.createElement(lucide_react_1.PackageSearch, { size: 25, strokeWidth: 1.5 })),
                React.createElement("h3", { className: "mt-5 text-xl font-semibold tracking-tight text-neutral-950" }, approvedProducts.length === 0
                    ? "No products available yet"
                    : "No matching products"),
                React.createElement("p", { className: "mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500" }, approvedProducts.length === 0
                    ? "Approved products with available stock will appear here when listings are ready."
                    : "Try a different search, change your filters, or explore all available listings."),
                hasFilters && (React.createElement("button", { type: "button", onClick: resetFilters, className: "mt-6 inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-700" }, "Clear filters"))))),
        React.createElement("section", { className: "border-t border-neutral-200 bg-white" },
            React.createElement("div", { className: "mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200" },
                        React.createElement(lucide_react_1.Leaf, { size: 19, strokeWidth: 1.5 })),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm font-medium text-neutral-900" }, "Give electronics another life."),
                        React.createElement("p", { className: "mt-1 text-xs text-neutral-500" }, "Thoughtful reuse starts with a better find."))),
                React.createElement(link_1["default"], { href: "/marketplace", className: "inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-950" },
                    "Back to marketplace",
                    React.createElement(lucide_react_1.ArrowRight, { size: 16 }))))));
}
exports["default"] = ProductsClient;
