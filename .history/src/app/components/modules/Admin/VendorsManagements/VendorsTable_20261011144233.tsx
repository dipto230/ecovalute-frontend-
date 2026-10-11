
"use client";

import { getVendors } from "@/src/services/vendor.service";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";

import { Badge } from "../../../ui/badge";
import { format } from "date-fns";
import { Loader2, Store } from "lucide-react";

const vendorColumns = [
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

const VendorsTable = () => {
  const {
    data: vendorDataResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
  });

  console.log("Vendor API Response:", vendorDataResponse);
console.log("Vendor API Error:", error);
  const vendors = vendorDataResponse?.data ?? [];

  const table = useReactTable({
    data: vendors,
    columns: vendorColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
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

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Store className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Vendors
            </h2>
            <p className="text-sm text-gray-500">
              Manage and monitor registered vendors.
            </p>
          </div>
        </div>

        <div className="w-fit rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            Total Vendors
          </p>
          <p className="text-xl font-bold text-gray-900">
            {vendors.length}
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-gray-200 bg-gray-50/80 hover:bg-gray-50/80"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={vendorColumns.length}
                    className="h-48 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader2 className="h-7 w-7 animate-spin text-emerald-600" />
                      <p className="text-sm text-gray-500">
                        Loading vendors...
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={vendorColumns.length}
                    className="h-40 text-center text-sm text-red-600"
                  >
                    Failed to load vendors. Please try again.
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-gray-100 transition-colors hover:bg-emerald-50/40"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const value = cell.getValue();

                      if (cell.column.id === "status") {
                        return (
                          <TableCell
                            key={cell.id}
                            className="whitespace-nowrap px-5 py-4"
                          >
                            <Badge
                              variant="outline"
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                String(value ?? "")
                              )}`}
                            >
                              {String(value ?? "N/A").replaceAll("_", " ")}
                            </Badge>
                          </TableCell>
                        );
                      }

                      if (cell.column.id === "createdAt") {
                        const date = value ? new Date(String(value)) : null;

                        return (
                          <TableCell
                            key={cell.id}
                            className="whitespace-nowrap px-5 py-4 text-sm text-gray-600"
                          >
                            {date && !Number.isNaN(date.getTime())
                              ? format(date, "dd MMM yyyy")
                              : "N/A"}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell
                          key={cell.id}
                          className="whitespace-nowrap px-5 py-4 text-sm text-gray-600"
                        >
                          {value === null || value === undefined || value === ""
                            ? "N/A"
                            : String(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={vendorColumns.length}
                    className="h-48 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Store className="h-9 w-9 text-gray-300" />
                      <p className="font-medium text-gray-700">
                        No vendors found
                      </p>
                      <p className="text-sm text-gray-500">
                        Registered vendors will appear here.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        {!isLoading && !isError && (
          <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-3">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {table.getRowModel().rows.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {vendors.length}
              </span>{" "}
              vendors
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorsTable;
