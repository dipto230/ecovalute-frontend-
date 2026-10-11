
"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  CalendarDays,
  Loader2,
  Mail,
  MapPin,
  RefreshCw,
  Search,
  Store,
  Users,
} from "lucide-react";

import { getVendors } from "@/src/services/vendor.service";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";

import { Badge } from "../../../ui/badge";

type VendorRow = {
  id: string;
  name?: string | null;
  email?: string | null;
  companyName?: string | null;
  contactNumber?: string | null;
  category?: string | null;
  businessType?: string | null;
  city?: string | null;
  country?: string | null;
  status?: string | null;
  createdAt?: string | Date | null;
};

const getStatusStyle = (status?: string | null) => {
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
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
};

const getInitials = (name?: string | null) => {
  if (!name?.trim()) return "V";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const getDisplayValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  return String(value);
};

const vendorColumns: ColumnDef<VendorRow>[] = [
  {
    accessorKey: "name",
    header: "Vendor",
    cell: ({ row }) => {
      const vendor = row.original;

      return (
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-sm font-bold text-emerald-700">
            {getInitials(vendor.name)}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-800">
              {getDisplayValue(vendor.name)}
            </p>

            <p className="mt-0.5 truncate text-xs text-slate-400">
              Vendor account
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email Address",
    cell: ({ getValue }) => (
      <div className="flex min-w-0 items-center gap-2">
        <Mail className="size-3.5 shrink-0 text-slate-400" />
        <span className="truncate text-sm text-slate-600">
          {getDisplayValue(getValue())}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ getValue }) => (
      <div className="flex min-w-0 items-center gap-2">
        <Building2 className="size-4 shrink-0 text-slate-400" />
        <span className="truncate text-sm font-medium text-slate-700">
          {getDisplayValue(getValue())}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "contactNumber",
    header: "Contact",
    cell: ({ getValue }) => (
      <span className="whitespace-nowrap text-sm text-slate-600">
        {getDisplayValue(getValue())}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => (
      <span className="text-sm text-slate-600">
        {getDisplayValue(getValue())}
      </span>
    ),
  },
  {
    accessorKey: "businessType",
    header: "Business Type",
    cell: ({ getValue }) => (
      <span className="inline-flex max-w-40 truncate rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
        {getDisplayValue(getValue())}
      </span>
    ),
  },
  {
    accessorKey: "city",
    header: "Location",
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-1.5">
        <MapPin className="size-3.5 shrink-0 text-slate-400" />
        <span className="truncate text-sm text-slate-600">
          {getDisplayValue(row.original.city)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ getValue }) => (
      <span className="text-sm text-slate-600">
        {getDisplayValue(getValue())}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<string | null>();

      return (
        <Badge
          variant="outline"
          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(status)}`}
        >
          <span className="mr-1.5 size-1.5 rounded-full bg-current" />
          {getDisplayValue(status).replaceAll("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Registered",
    cell: ({ getValue }) => {
      const value = getValue<string | Date | null>();

      if (!value) {
        return <span className="text-sm text-slate-400">N/A</span>;
      }

      const date = new Date(value);

      return (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <CalendarDays className="size-4 text-slate-400" />
          <span className="text-sm text-slate-600">
            {!Number.isNaN(date.getTime())
              ? format(date, "dd MMM yyyy")
              : "N/A"}
          </span>
        </div>
      );
    },
  },
];

const VendorsTable = () => {
  const [search, setSearch] = useState("");

  const {
    data: vendorDataResponse,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
  });

  const vendors = (
    vendorDataResponse?.data?.data ?? []
  ) as VendorRow[];

  const table = useReactTable({
    data: vendors,
    columns: vendorColumns,
    state: {
      globalFilter: search,
    },
    onGlobalFilterChange: setSearch,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const filteredRows = table.getRowModel().rows;

  return (
    <div className="w-full space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm">
            <Store className="size-6" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Vendors
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor your registered vendors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Users className="size-5" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Vendors
              </p>
              <p className="text-xl font-bold leading-tight text-slate-900">
                {vendors.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main table card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-semibold text-slate-900">
              All Vendors
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              View and search vendor information
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search vendors..."
                aria-label="Search vendors"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              aria-label="Refresh vendors"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1180px] table-fixed">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-slate-200 bg-slate-50/80 hover:bg-slate-50/80"
                >
                  {headerGroup.headers.map((header) => {
                    const widths: Record<string, string> = {
                      name: "w-[150px]",
                      email: "w-[190px]",
                      companyName: "w-[165px]",
                      contactNumber: "w-[135px]",
                      category: "w-[100px]",
                      businessType: "w-[130px]",
                      city: "w-[105px]",
                      country: "w-[90px]",
                      status: "w-[105px]",
                      createdAt: "w-[135px]",
                    };

                    return (
                      <TableHead
                        key={header.id}
                        className={`h-12 overflow-hidden px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 ${widths[header.column.id] ?? ""}`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={vendorColumns.length}
                    className="h-64 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50">
                        <Loader2 className="size-6 animate-spin text-emerald-600" />
                      </div>
                      <p className="text-sm font-medium text-slate-600">
                        Loading vendors...
                      </p>
                      <p className="text-xs text-slate-400">
                        Fetching the latest vendor information
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={vendorColumns.length}
                    className="h-56 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <p className="font-semibold text-red-600">
                        Unable to load vendors
                      </p>
                      <p className="text-sm text-slate-500">
                        Please check your connection and try again.
                      </p>
                      <button
                        type="button"
                        onClick={() => refetch()}
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Try Again
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="overflow-hidden px-3 py-4 align-middle"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={vendorColumns.length}
                    className="h-64 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Store className="size-7" />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {search.trim()
                            ? "No matching vendors"
                            : "No vendors found"}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {search.trim()
                            ? "Try another name, email or company."
                            : "Registered vendors will appear here."}
                        </p>
                      </div>

                      {search.trim() && (
                        <button
                          type="button"
                          onClick={() => setSearch("")}
                          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        {!isLoading && !isError && (
          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredRows.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {vendors.length}
              </span>{" "}
              vendors
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="size-2 rounded-full bg-emerald-500" />
              EcoValuate Vendor Management
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorsTable;
