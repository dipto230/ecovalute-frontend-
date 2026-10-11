"use client";
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
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var react_query_1 = require("@tanstack/react-query");
var react_table_1 = require("@tanstack/react-table");
var lucide_react_1 = require("lucide-react");
var product_service_1 = require("@/src/services/product.service");
var table_1 = require("../../../ui/table");
var badge_1 = require("../../../ui/badge");
var statusStyle = {
    PENDING: "border-amber-200 bg-amber-50 text-amber-700",
    APPROVED: "border-emerald-200 bg-emerald-50 text-emerald-700",
    AVAILABLE: "border-blue-200 bg-blue-50 text-blue-700",
    REJECTED: "border-red-200 bg-red-50 text-red-700",
    SOLD: "border-slate-200 bg-slate-100 text-slate-700"
};
var display = function (value) {
    if (value === null || value === undefined || value === "") {
        return "N/A";
    }
    return String(value);
};
var formatPrice = function (value) {
    var amount = Number(value);
    return Number.isFinite(amount)
        ? amount.toLocaleString("en-IN", {
            maximumFractionDigits: 2
        })
        : "N/A";
};
var getProductStatus = function (value) {
    var statuses = [
        "PENDING",
        "APPROVED",
        "REJECTED",
        "SOLD",
        "AVAILABLE",
    ];
    return statuses.includes(value)
        ? value
        : null;
};
function ProductsTable() {
    var _this = this;
    var _a = react_1.useState(""), search = _a[0], setSearch = _a[1];
    var _b = react_1.useState("ALL"), statusFilter = _b[0], setStatusFilter = _b[1];
    var queryClient = react_query_1.useQueryClient();
    var _c = react_query_1.useQuery({
        queryKey: ["products"],
        queryFn: product_service_1.getProducts
    }), response = _c.data, isLoading = _c.isLoading, isError = _c.isError, isFetching = _c.isFetching, refetch = _c.refetch;
    var products = react_1.useMemo(function () {
        var _a;
        return ((_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : []);
    }, [response]);
    var updateMutation = react_query_1.useMutation({
        mutationFn: function (_a) {
            var id = _a.id, status = _a.status;
            return product_service_1.updateProduct(id, { status: status });
        },
        onSuccess: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: ["products"]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }
    });
    var deleteMutation = react_query_1.useMutation({
        mutationFn: product_service_1.deleteProduct,
        onSuccess: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: ["products"]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }
    });
    var filteredProducts = react_1.useMemo(function () {
        var term = search.trim().toLowerCase();
        return products.filter(function (product) {
            var _a, _b, _c;
            var matchesStatus = statusFilter === "ALL" ||
                product.status === statusFilter;
            var searchableText = [
                product.title,
                product.brand,
                product.model,
                (_a = product.vendor) === null || _a === void 0 ? void 0 : _a.name,
                (_b = product.vendor) === null || _b === void 0 ? void 0 : _b.companyName,
                (_c = product.category) === null || _c === void 0 ? void 0 : _c.name,
                product.condition,
                product.status,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            return matchesStatus &&
                (!term || searchableText.includes(term));
        });
    }, [products, search, statusFilter]);
    var columns = [
        {
            accessorKey: "title",
            header: "Product",
            cell: function (_a) {
                var row = _a.row;
                var product = row.original;
                return (React.createElement("div", { className: "flex min-w-0 items-center gap-3" },
                    React.createElement("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700" },
                        React.createElement(lucide_react_1.Package, { className: "size-5" })),
                    React.createElement("div", { className: "min-w-0" },
                        React.createElement("p", { className: "max-w-52 truncate font-semibold text-slate-800" }, product.title),
                        React.createElement("p", { className: "mt-1 text-xs text-slate-400" },
                            display(product.brand),
                            product.model ? " \u00B7 " + product.model : ""))));
            }
        },
        {
            accessorKey: "vendor",
            header: "Vendor",
            cell: function (_a) {
                var _b, _c, _d, _e;
                var row = _a.row;
                return (React.createElement("div", { className: "min-w-0" },
                    React.createElement("p", { className: "max-w-40 truncate text-sm font-medium text-slate-700" }, display((_c = (_b = row.original.vendor) === null || _b === void 0 ? void 0 : _b.companyName) !== null && _c !== void 0 ? _c : (_d = row.original.vendor) === null || _d === void 0 ? void 0 : _d.name)),
                    React.createElement("p", { className: "max-w-40 truncate text-xs text-slate-400" }, display((_e = row.original.vendor) === null || _e === void 0 ? void 0 : _e.email))));
            }
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: function (_a) {
                var _b;
                var row = _a.row;
                return (React.createElement("span", { className: "text-sm text-slate-600" }, display((_b = row.original.category) === null || _b === void 0 ? void 0 : _b.name)));
            }
        },
        {
            accessorKey: "condition",
            header: "Condition",
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement("span", { className: "inline-flex rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600" }, display(getValue()).replaceAll("_", " ")));
            }
        },
        {
            accessorKey: "estimatedPrice",
            header: "Est. Price",
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement("span", { className: "whitespace-nowrap text-sm font-semibold text-slate-800" }, formatPrice(getValue())));
            }
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement("span", { className: "text-sm text-slate-600" }, display(getValue())));
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: function (_a) {
                var getValue = _a.getValue;
                var value = String(getValue());
                var status = getProductStatus(value);
                return (React.createElement(badge_1.Badge, { variant: "outline", className: "whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold " + (status
                        ? statusStyle[status]
                        : "border-slate-200 bg-slate-50 text-slate-600") },
                    React.createElement("span", { className: "mr-1.5 size-1.5 rounded-full bg-current" }),
                    value.replaceAll("_", " ")));
            }
        },
        {
            accessorKey: "createdAt",
            header: "Created",
            cell: function (_a) {
                var getValue = _a.getValue;
                var value = getValue();
                if (!value) {
                    return React.createElement("span", { className: "text-sm text-slate-400" }, "N/A");
                }
                var date = new Date(value);
                return (React.createElement("span", { className: "whitespace-nowrap text-sm text-slate-600" }, Number.isNaN(date.getTime())
                    ? "N/A"
                    : date_fns_1.format(date, "dd MMM yyyy")));
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: function (_a) {
                var row = _a.row;
                var product = row.original;
                var busy = updateMutation.isPending ||
                    deleteMutation.isPending;
                return (React.createElement("div", { className: "flex items-center gap-2" },
                    product.status === "PENDING" && (React.createElement(React.Fragment, null,
                        React.createElement("button", { type: "button", title: "Approve product", "aria-label": "Approve " + product.title, disabled: busy, onClick: function () {
                                return updateMutation.mutate({
                                    id: product.id,
                                    status: "APPROVED"
                                });
                            }, className: "inline-flex size-9 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50" },
                            React.createElement(lucide_react_1.Check, { className: "size-4" })),
                        React.createElement("button", { type: "button", title: "Reject product", "aria-label": "Reject " + product.title, disabled: busy, onClick: function () {
                                return updateMutation.mutate({
                                    id: product.id,
                                    status: "REJECTED"
                                });
                            }, className: "inline-flex size-9 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700 transition hover:bg-amber-100 disabled:opacity-50" },
                            React.createElement(lucide_react_1.X, { className: "size-4" })))),
                    React.createElement("button", { type: "button", title: "Delete product", "aria-label": "Delete " + product.title, disabled: busy, onClick: function () {
                            if (window.confirm("Delete \"" + product.title + "\" permanently?")) {
                                deleteMutation.mutate(product.id);
                            }
                        }, className: "inline-flex size-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50" },
                        React.createElement(lucide_react_1.Trash2, { className: "size-4" }))));
            }
        },
    ];
    var table = react_table_1.useReactTable({
        data: filteredProducts,
        columns: columns,
        state: { globalFilter: search },
        onGlobalFilterChange: setSearch,
        globalFilterFn: "includesString",
        getCoreRowModel: react_table_1.getCoreRowModel(),
        getFilteredRowModel: react_table_1.getFilteredRowModel()
    });
    var rows = table.getRowModel().rows;
    var pendingCount = products.filter(function (product) { return product.status === "PENDING"; }).length;
    return (React.createElement("div", { className: "w-full space-y-6" },
        React.createElement("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700" },
                    React.createElement(lucide_react_1.Package, { className: "size-6" })),
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-slate-900" }, "Products Management"),
                    React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Review and manage marketplace products."))),
            React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                React.createElement("div", { className: "rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm" },
                    React.createElement("p", { className: "text-xs font-medium text-slate-500" }, "Total Products"),
                    React.createElement("p", { className: "mt-1 text-xl font-bold text-slate-900" }, products.length)),
                React.createElement("div", { className: "rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 shadow-sm" },
                    React.createElement("p", { className: "text-xs font-medium text-amber-700" }, "Pending Review"),
                    React.createElement("p", { className: "mt-1 text-xl font-bold text-amber-800" }, pendingCount)))),
        (updateMutation.isError || deleteMutation.isError) && (React.createElement("div", { role: "alert", className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" }, "The product action failed. Please try again.")),
        (updateMutation.isSuccess || deleteMutation.isSuccess) && (React.createElement("div", { className: "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" }, "Product action completed successfully.")),
        React.createElement("div", { className: "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" },
            React.createElement("div", { className: "flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "font-semibold text-slate-900" }, "All Products"),
                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "Search, filter and review product listings.")),
                React.createElement("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center" },
                    React.createElement("div", { className: "relative w-full sm:w-64" },
                        React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" }),
                        React.createElement("input", { type: "search", value: search, onChange: function (event) { return setSearch(event.target.value); }, placeholder: "Search products...", "aria-label": "Search products", className: "h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" })),
                    React.createElement("select", { value: statusFilter, onChange: function (event) { return setStatusFilter(event.target.value); }, "aria-label": "Filter products by status", className: "h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-emerald-400" },
                        React.createElement("option", { value: "ALL" }, "All statuses"),
                        React.createElement("option", { value: "PENDING" }, "Pending"),
                        React.createElement("option", { value: "APPROVED" }, "Approved"),
                        React.createElement("option", { value: "AVAILABLE" }, "Available"),
                        React.createElement("option", { value: "REJECTED" }, "Rejected"),
                        React.createElement("option", { value: "SOLD" }, "Sold")),
                    React.createElement("button", { type: "button", onClick: function () { return refetch(); }, disabled: isFetching, className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 disabled:opacity-50" },
                        React.createElement(lucide_react_1.RefreshCw, { className: "size-4 " + (isFetching ? "animate-spin" : "") }),
                        "Refresh"))),
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement(table_1.Table, { className: "w-full min-w-[1150px]" },
                    React.createElement(table_1.TableHeader, null, table.getHeaderGroups().map(function (headerGroup) { return (React.createElement(table_1.TableRow, { key: headerGroup.id, className: "border-b border-slate-200 bg-slate-50/80" }, headerGroup.headers.map(function (header) { return (React.createElement(table_1.TableHead, { key: header.id, className: "h-12 whitespace-nowrap px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500" }, header.isPlaceholder
                        ? null
                        : react_table_1.flexRender(header.column.columnDef.header, header.getContext()))); }))); })),
                    React.createElement(table_1.TableBody, null, isLoading ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: columns.length, className: "h-60 text-center" },
                            React.createElement("div", { className: "flex flex-col items-center gap-3" },
                                React.createElement(lucide_react_1.Loader2, { className: "size-7 animate-spin text-emerald-600" }),
                                React.createElement("p", { className: "text-sm text-slate-500" }, "Loading products..."))))) : isError ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: columns.length, className: "h-60 text-center" },
                            React.createElement("p", { className: "font-semibold text-red-600" }, "Unable to load products"),
                            React.createElement("p", { className: "mt-2 text-sm text-slate-500" }, "Check the API connection and try again."),
                            React.createElement("button", { type: "button", onClick: function () { return refetch(); }, className: "mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700" }, "Try Again")))) : rows.length ? (rows.map(function (row) { return (React.createElement(table_1.TableRow, { key: row.id, className: "border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40" }, row.getVisibleCells().map(function (cell) { return (React.createElement(table_1.TableCell, { key: cell.id, className: "px-4 py-4 align-middle" }, react_table_1.flexRender(cell.column.columnDef.cell, cell.getContext()))); }))); })) : (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: columns.length, className: "h-60 text-center" },
                            React.createElement(lucide_react_1.Package, { className: "mx-auto mb-3 size-8 text-slate-300" }),
                            React.createElement("p", { className: "font-semibold text-slate-800" }, "No products found"),
                            React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Try changing your search or status filter."))))))),
            !isLoading && !isError && (React.createElement("div", { className: "flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" },
                React.createElement("p", { className: "text-sm text-slate-500" },
                    "Showing",
                    " ",
                    React.createElement("span", { className: "font-semibold text-slate-800" }, rows.length),
                    " ",
                    "of",
                    " ",
                    React.createElement("span", { className: "font-semibold text-slate-800" }, products.length),
                    " ",
                    "products"),
                React.createElement("span", { className: "flex items-center gap-2 text-xs text-slate-400" },
                    React.createElement("span", { className: "size-2 rounded-full bg-emerald-500" }),
                    "EcoValuate Product Management"))))));
}
exports["default"] = ProductsTable;
