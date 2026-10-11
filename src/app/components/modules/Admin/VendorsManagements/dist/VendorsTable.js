"use client";
"use strict";
exports.__esModule = true;
var vendor_service_1 = require("@/src/services/vendor.service");
var react_query_1 = require("@tanstack/react-query");
var react_table_1 = require("@tanstack/react-table");
var table_1 = require("../../../ui/table");
var badge_1 = require("../../../ui/badge");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
var vendorColumns = [
    { accessorKey: "name", header: "Vendor Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "companyName", header: "Company" },
    { accessorKey: "contactNumber", header: "Contact Number" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "businessType", header: "Business Type" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "country", header: "Country" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "createdAt", header: "Registered At" },
];
var VendorsTable = function () {
    var _a, _b;
    var _c = react_query_1.useQuery({
        queryKey: ["vendors"],
        queryFn: vendor_service_1.getVendors
    }), vendorDataResponse = _c.data, isLoading = _c.isLoading, isError = _c.isError;
    console.log("Vendor API Response:", vendorDataResponse);
    var vendors = (_b = (_a = vendorDataResponse === null || vendorDataResponse === void 0 ? void 0 : vendorDataResponse.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : [];
    var table = react_table_1.useReactTable({
        data: vendors,
        columns: vendorColumns,
        getCoreRowModel: react_table_1.getCoreRowModel()
    });
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
                return "border-gray-200 bg-gray-50 text-gray-700";
        }
    };
    return (React.createElement("div", { className: "w-full space-y-5" },
        React.createElement("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" },
                    React.createElement(lucide_react_1.Store, { className: "h-5 w-5" })),
                React.createElement("div", null,
                    React.createElement("h2", { className: "text-xl font-bold tracking-tight text-gray-900" }, "Vendors"),
                    React.createElement("p", { className: "text-sm text-gray-500" }, "Manage and monitor registered vendors."))),
            React.createElement("div", { className: "w-fit rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm" },
                React.createElement("p", { className: "text-xs font-medium text-gray-500" }, "Total Vendors"),
                React.createElement("p", { className: "text-xl font-bold text-gray-900" }, vendors.length))),
        React.createElement("div", { className: "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm" },
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement(table_1.Table, null,
                    React.createElement(table_1.TableHeader, null, table.getHeaderGroups().map(function (headerGroup) { return (React.createElement(table_1.TableRow, { key: headerGroup.id, className: "border-b border-gray-200 bg-gray-50/80 hover:bg-gray-50/80" }, headerGroup.headers.map(function (header) { return (React.createElement(table_1.TableHead, { key: header.id, className: "whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500" }, header.isPlaceholder
                        ? null
                        : react_table_1.flexRender(header.column.columnDef.header, header.getContext()))); }))); })),
                    React.createElement(table_1.TableBody, null, isLoading ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: vendorColumns.length, className: "h-48 text-center" },
                            React.createElement("div", { className: "flex flex-col items-center justify-center gap-3" },
                                React.createElement(lucide_react_1.Loader2, { className: "h-7 w-7 animate-spin text-emerald-600" }),
                                React.createElement("p", { className: "text-sm text-gray-500" }, "Loading vendors..."))))) : isError ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: vendorColumns.length, className: "h-40 text-center text-sm text-red-600" }, "Failed to load vendors. Please try again."))) : table.getRowModel().rows.length ? (table.getRowModel().rows.map(function (row) { return (React.createElement(table_1.TableRow, { key: row.id, className: "border-b border-gray-100 transition-colors hover:bg-emerald-50/40" }, row.getVisibleCells().map(function (cell) {
                        var value = cell.getValue();
                        if (cell.column.id === "status") {
                            return (React.createElement(table_1.TableCell, { key: cell.id, className: "whitespace-nowrap px-5 py-4" },
                                React.createElement(badge_1.Badge, { variant: "outline", className: "rounded-full px-3 py-1 text-xs font-semibold " + getStatusStyle(String(value !== null && value !== void 0 ? value : "")) }, String(value !== null && value !== void 0 ? value : "N/A").replaceAll("_", " "))));
                        }
                        if (cell.column.id === "createdAt") {
                            var date = value ? new Date(String(value)) : null;
                            return (React.createElement(table_1.TableCell, { key: cell.id, className: "whitespace-nowrap px-5 py-4 text-sm text-gray-600" }, date && !Number.isNaN(date.getTime())
                                ? date_fns_1.format(date, "dd MMM yyyy")
                                : "N/A"));
                        }
                        return (React.createElement(table_1.TableCell, { key: cell.id, className: "whitespace-nowrap px-5 py-4 text-sm text-gray-600" }, value === null || value === undefined || value === ""
                            ? "N/A"
                            : String(value)));
                    }))); })) : (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: vendorColumns.length, className: "h-48 text-center" },
                            React.createElement("div", { className: "flex flex-col items-center justify-center gap-2" },
                                React.createElement(lucide_react_1.Store, { className: "h-9 w-9 text-gray-300" }),
                                React.createElement("p", { className: "font-medium text-gray-700" }, "No vendors found"),
                                React.createElement("p", { className: "text-sm text-gray-500" }, "Registered vendors will appear here.")))))))),
            !isLoading && !isError && (React.createElement("div", { className: "flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-3" },
                React.createElement("p", { className: "text-sm text-gray-500" },
                    "Showing",
                    " ",
                    React.createElement("span", { className: "font-semibold text-gray-800" }, table.getRowModel().rows.length),
                    " ",
                    "of",
                    " ",
                    React.createElement("span", { className: "font-semibold text-gray-800" }, vendors.length),
                    " ",
                    "vendors"))))));
};
exports["default"] = VendorsTable;
