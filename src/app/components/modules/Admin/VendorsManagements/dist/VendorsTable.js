"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var react_table_1 = require("@tanstack/react-table");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var vendor_service_1 = require("@/src/services/vendor.service");
var table_1 = require("../../../ui/table");
var badge_1 = require("../../../ui/badge");
var getStatusStyle = function (status) {
    switch (status === null || status === void 0 ? void 0 : status.toUpperCase()) {
        case "ACTIVE":
            return "border-emerald-200 bg-emerald-50 text-emerald-700";
        case "PENDING":
            return "border-amber-200 bg-amber-50 text-amber-700";
        case "BLOCKED":
            return "border-red-200 bg-red-50 text-red-700";
        case "REJECTED":
            return "border-rose-200 bg-rose-50 text-rose-700";
        case "SUSPENDED":
            return "border-orange-200 bg-orange-50 text-orange-700";
        default:
            return "border-slate-200 bg-slate-50 text-slate-600";
    }
};
var getInitials = function (name) {
    if (!(name === null || name === void 0 ? void 0 : name.trim()))
        return "V";
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(function (part) { return part[0]; })
        .join("")
        .toUpperCase();
};
var getDisplayValue = function (value) {
    if (value === null || value === undefined || value === "") {
        return "N/A";
    }
    return String(value);
};
var vendorColumns = [
    {
        accessorKey: "name",
        header: "Vendor",
        cell: function (_a) {
            var row = _a.row;
            var vendor = row.original;
            return (React.createElement("div", { className: "flex min-w-0 items-center gap-3" },
                React.createElement("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-sm font-bold text-emerald-700" }, getInitials(vendor.name)),
                React.createElement("div", { className: "min-w-0" },
                    React.createElement("p", { className: "truncate font-semibold text-slate-800" }, getDisplayValue(vendor.name)),
                    React.createElement("p", { className: "mt-0.5 truncate text-xs text-slate-400" }, "Vendor account"))));
        }
    },
    {
        accessorKey: "email",
        header: "Email Address",
        cell: function (_a) {
            var getValue = _a.getValue;
            return (React.createElement("div", { className: "flex min-w-0 items-center gap-2" },
                React.createElement(lucide_react_1.Mail, { className: "size-3.5 shrink-0 text-slate-400" }),
                React.createElement("span", { className: "truncate text-sm text-slate-600" }, getDisplayValue(getValue()))));
        }
    },
    {
        accessorKey: "companyName",
        header: "Company",
        cell: function (_a) {
            var getValue = _a.getValue;
            return (React.createElement("div", { className: "flex min-w-0 items-center gap-2" },
                React.createElement(lucide_react_1.Building2, { className: "size-4 shrink-0 text-slate-400" }),
                React.createElement("span", { className: "truncate text-sm font-medium text-slate-700" }, getDisplayValue(getValue()))));
        }
    },
    {
        accessorKey: "contactNumber",
        header: "Contact",
        cell: function (_a) {
            var getValue = _a.getValue;
            return (React.createElement("span", { className: "whitespace-nowrap text-sm text-slate-600" }, getDisplayValue(getValue())));
        }
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: function (_a) {
            var getValue = _a.getValue;
            return (React.createElement("span", { className: "text-sm text-slate-600" }, getDisplayValue(getValue())));
        }
    },
    {
        accessorKey: "businessType",
        header: "Business Type",
        cell: function (_a) {
            var getValue = _a.getValue;
            return (React.createElement("span", { className: "inline-flex max-w-40 truncate rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600" }, getDisplayValue(getValue())));
        }
    },
    {
        accessorKey: "city",
        header: "Location",
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "flex min-w-0 items-center gap-1.5" },
                React.createElement(lucide_react_1.MapPin, { className: "size-3.5 shrink-0 text-slate-400" }),
                React.createElement("span", { className: "truncate text-sm text-slate-600" }, getDisplayValue(row.original.city))));
        }
    },
    {
        accessorKey: "country",
        header: "Country",
        cell: function (_a) {
            var getValue = _a.getValue;
            return (React.createElement("span", { className: "text-sm text-slate-600" }, getDisplayValue(getValue())));
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: function (_a) {
            var getValue = _a.getValue;
            var status = getValue();
            return (React.createElement(badge_1.Badge, { variant: "outline", className: "whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold " + getStatusStyle(status) },
                React.createElement("span", { className: "mr-1.5 size-1.5 rounded-full bg-current" }),
                getDisplayValue(status).replaceAll("_", " ")));
        }
    },
    {
        accessorKey: "createdAt",
        header: "Registered",
        cell: function (_a) {
            var getValue = _a.getValue;
            var value = getValue();
            if (!value) {
                return React.createElement("span", { className: "text-sm text-slate-400" }, "N/A");
            }
            var date = new Date(value);
            return (React.createElement("div", { className: "flex items-center gap-2 whitespace-nowrap" },
                React.createElement(lucide_react_1.CalendarDays, { className: "size-4 text-slate-400" }),
                React.createElement("span", { className: "text-sm text-slate-600" }, !Number.isNaN(date.getTime())
                    ? date_fns_1.format(date, "dd MMM yyyy")
                    : "N/A")));
        }
    },
];
var VendorsTable = function () {
    var _a, _b;
    var _c = react_1.useState(""), search = _c[0], setSearch = _c[1];
    var _d = react_query_1.useQuery({
        queryKey: ["vendors"],
        queryFn: vendor_service_1.getVendors
    }), vendorDataResponse = _d.data, isLoading = _d.isLoading, isError = _d.isError, refetch = _d.refetch, isFetching = _d.isFetching;
    var vendors = ((_b = (_a = vendorDataResponse === null || vendorDataResponse === void 0 ? void 0 : vendorDataResponse.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : []);
    var table = react_table_1.useReactTable({
        data: vendors,
        columns: vendorColumns,
        state: {
            globalFilter: search
        },
        onGlobalFilterChange: setSearch,
        globalFilterFn: "includesString",
        getCoreRowModel: react_table_1.getCoreRowModel(),
        getFilteredRowModel: react_table_1.getFilteredRowModel()
    });
    var filteredRows = table.getRowModel().rows;
    return (React.createElement("div", { className: "w-full space-y-6" },
        React.createElement("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm" },
                    React.createElement(lucide_react_1.Store, { className: "size-6" })),
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-slate-900" }, "Vendors"),
                    React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Manage and monitor your registered vendors."))),
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm" },
                    React.createElement("div", { className: "flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" },
                        React.createElement(lucide_react_1.Users, { className: "size-5" })),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs font-medium text-slate-500" }, "Total Vendors"),
                        React.createElement("p", { className: "text-xl font-bold leading-tight text-slate-900" }, vendors.length))))),
        React.createElement("div", { className: "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" },
            React.createElement("div", { className: "flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "font-semibold text-slate-900" }, "All Vendors"),
                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "View and search vendor information")),
                React.createElement("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center" },
                    React.createElement("div", { className: "relative w-full sm:w-72" },
                        React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" }),
                        React.createElement("input", { type: "search", value: search, onChange: function (event) { return setSearch(event.target.value); }, placeholder: "Search vendors...", "aria-label": "Search vendors", className: "h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" })),
                    React.createElement("button", { type: "button", onClick: function () { return refetch(); }, disabled: isFetching, "aria-label": "Refresh vendors", className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60" },
                        React.createElement(lucide_react_1.RefreshCw, { className: "size-4 " + (isFetching ? "animate-spin" : "") }),
                        "Refresh"))),
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement(table_1.Table, { className: "w-full min-w-[1180px] table-fixed" },
                    React.createElement(table_1.TableHeader, null, table.getHeaderGroups().map(function (headerGroup) { return (React.createElement(table_1.TableRow, { key: headerGroup.id, className: "border-b border-slate-200 bg-slate-50/80 hover:bg-slate-50/80" }, headerGroup.headers.map(function (header) {
                        var _a;
                        var widths = {
                            name: "w-[150px]",
                            email: "w-[190px]",
                            companyName: "w-[165px]",
                            contactNumber: "w-[135px]",
                            category: "w-[100px]",
                            businessType: "w-[130px]",
                            city: "w-[105px]",
                            country: "w-[90px]",
                            status: "w-[105px]",
                            createdAt: "w-[135px]"
                        };
                        return (React.createElement(table_1.TableHead, { key: header.id, className: "h-12 overflow-hidden px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 " + ((_a = widths[header.column.id]) !== null && _a !== void 0 ? _a : "") }, header.isPlaceholder
                            ? null
                            : react_table_1.flexRender(header.column.columnDef.header, header.getContext())));
                    }))); })),
                    React.createElement(table_1.TableBody, null, isLoading ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: vendorColumns.length, className: "h-64 text-center" },
                            React.createElement("div", { className: "flex flex-col items-center justify-center gap-3" },
                                React.createElement("div", { className: "flex size-12 items-center justify-center rounded-2xl bg-emerald-50" },
                                    React.createElement(lucide_react_1.Loader2, { className: "size-6 animate-spin text-emerald-600" })),
                                React.createElement("p", { className: "text-sm font-medium text-slate-600" }, "Loading vendors..."),
                                React.createElement("p", { className: "text-xs text-slate-400" }, "Fetching the latest vendor information"))))) : isError ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: vendorColumns.length, className: "h-56 text-center" },
                            React.createElement("div", { className: "flex flex-col items-center gap-3" },
                                React.createElement("p", { className: "font-semibold text-red-600" }, "Unable to load vendors"),
                                React.createElement("p", { className: "text-sm text-slate-500" }, "Please check your connection and try again."),
                                React.createElement("button", { type: "button", onClick: function () { return refetch(); }, className: "rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700" }, "Try Again"))))) : filteredRows.length > 0 ? (filteredRows.map(function (row) { return (React.createElement(table_1.TableRow, { key: row.id, className: "border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40" }, row.getVisibleCells().map(function (cell) { return (React.createElement(table_1.TableCell, { key: cell.id, className: "overflow-hidden px-3 py-4 align-middle" }, react_table_1.flexRender(cell.column.columnDef.cell, cell.getContext()))); }))); })) : (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: vendorColumns.length, className: "h-64 text-center" },
                            React.createElement("div", { className: "flex flex-col items-center justify-center gap-3" },
                                React.createElement("div", { className: "flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400" },
                                    React.createElement(lucide_react_1.Store, { className: "size-7" })),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "font-semibold text-slate-800" }, search.trim()
                                        ? "No matching vendors"
                                        : "No vendors found"),
                                    React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, search.trim()
                                        ? "Try another name, email or company."
                                        : "Registered vendors will appear here.")),
                                search.trim() && (React.createElement("button", { type: "button", onClick: function () { return setSearch(""); }, className: "text-sm font-semibold text-emerald-700 hover:text-emerald-800" }, "Clear search"))))))))),
            !isLoading && !isError && (React.createElement("div", { className: "flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" },
                React.createElement("p", { className: "text-sm text-slate-500" },
                    "Showing",
                    " ",
                    React.createElement("span", { className: "font-semibold text-slate-800" }, filteredRows.length),
                    " ",
                    "of",
                    " ",
                    React.createElement("span", { className: "font-semibold text-slate-800" }, vendors.length),
                    " ",
                    "vendors"),
                React.createElement("div", { className: "flex items-center gap-2 text-xs text-slate-400" },
                    React.createElement("span", { className: "size-2 rounded-full bg-emerald-500" }),
                    "EcoValuate Vendor Management"))))));
};
exports["default"] = VendorsTable;
