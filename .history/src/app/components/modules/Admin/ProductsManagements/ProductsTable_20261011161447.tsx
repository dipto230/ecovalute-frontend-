"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Check,
  Loader2,
  Package,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/src/services/product.service";
import type {
  IProduct,
  ProductStatus,
} from "@/src/types/product.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { Badge } from "../../../ui/badge";

const statusStyle: Record<ProductStatus, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  APPROVED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  AVAILABLE: "border-blue-200 bg-blue-50 text-blue-700",
  REJECTED: "border-red-200 bg-red-50 text-red-700",
  SOLD: "border-slate-200 bg-slate-100 text-slate-700",
};

const display = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  return String(value);
};

const formatPrice = (value: number | string) => {
  const amount = Number(value);

  return Number.isFinite(amount)
    ? amount.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })
    : "N/A";
};

const getProductStatus = (value: string): ProductStatus | null => {
  const statuses: ProductStatus[] = [
    "PENDING",
    "APPROVED",
    "REJECTED",
    "SOLD",
    "AVAILABLE",
  ];

  return statuses.includes(value as ProductStatus)
    ? (value as ProductStatus)
    : null;
};

export default function ProductsTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const products = (
    response?.data?.data ?? []
  ) as IProduct[];

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: ProductStatus;
    }) => updateProduct(id, { status }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesStatus =
        statusFilter === "ALL" ||
        product.status === statusFilter;

      const searchableText = [
        product.title,
        product.brand,
        product.model,
        product.vendor?.name,
        product.vendor?.companyName,
        product.category?.name,
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

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "title",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700">
              <Package className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="max-w-52 truncate font-semibold text-slate-800">
                {product.title}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {display(product.brand)}
                {product.model ? ` · ${product.model}` : ""}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="max-w-40 truncate text-sm font-medium text-slate-700">
            {display(
              row.original.vendor?.companyName ??
                row.original.vendor?.name
            )}
          </p>
          <p className="max-w-40 truncate text-xs text-slate-400">
            {display(row.original.vendor?.email)}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600">
          {display(row.original.category?.name)}
        </span>
      ),
    },
    {
      accessorKey: "condition",
      header: "Condition",
      cell: ({ getValue }) => (
        <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
          {display(getValue()).replaceAll("_", " ")}
        </span>
      ),
    },
    {
      accessorKey: "estimatedPrice",
      header: "Est. Price",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap text-sm font-semibold text-slate-800">
          {formatPrice(getValue() as number | string)}
        </span>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ getValue }) => (
        <span className="text-sm text-slate-600">
          {display(getValue())}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const value = String(getValue());
        const status = getProductStatus(value);

        return (
          <Badge
            variant="outline"
            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
              status
                ? statusStyle[status]
                : "border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            <span className="mr-1.5 size-1.5 rounded-full bg-current" />
            {value.replaceAll("_", " ")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ getValue }) => {
        const value = getValue<string | Date | null>();

        if (!value) {
          return <span className="text-sm text-slate-400">N/A</span>;
        }

        const date = new Date(value);

        return (
          <span className="whitespace-nowrap text-sm text-slate-600">
            {Number.isNaN(date.getTime())
              ? "N/A"
              : format(date, "dd MMM yyyy")}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;
        const busy =
          updateMutation.isPending ||
          deleteMutation.isPending;

        return (
          <div className="flex items-center gap-2">
            {product.status === "PENDING" && (
              <>
                <button
                  type="button"
                  title="Approve product"
                  aria-label={`Approve ${product.title}`}
                  disabled={busy}
                  onClick={() =>
                    updateMutation.mutate({
                      id: product.id,
                      status: "APPROVED",
                    })
                  }
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                >
                  <Check className="size-4" />
                </button>

                <button
                  type="button"
                  title="Reject product"
                  aria-label={`Reject ${product.title}`}
                  disabled={busy}
                  onClick={() =>
                    updateMutation.mutate({
                      id: product.id,
                      status: "REJECTED",
                    })
                  }
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
                >
                  <X className="size-4" />
                </button>
              </>
            )}

            <button
              type="button"
              title="Delete product"
              aria-label={`Delete ${product.title}`}
              disabled={busy}
              onClick={() => {
                if (
                  window.confirm(
                    `Delete "${product.title}" permanently?`
                  )
                ) {
                  deleteMutation.mutate(product.id);
                }
              }}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredProducts,
    columns,
    state: { globalFilter: search },
    onGlobalFilterChange: setSearch,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const rows = table.getRowModel().rows;

  const pendingCount = products.filter(
    (product) => product.status === "PENDING"
  ).length;

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
            <Package className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Products Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review and manage marketplace products.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Total Products
            </p>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {products.length}
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 shadow-sm">
            <p className="text-xs font-medium text-amber-700">
              Pending Review
            </p>
            <p className="mt-1 text-xl font-bold text-amber-800">
              {pendingCount}
            </p>
          </div>
        </div>
      </div>

      {(updateMutation.isError || deleteMutation.isError) && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          The product action failed. Please try again.
        </div>
      )}

      {(updateMutation.isSuccess || deleteMutation.isSuccess) && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Product action completed successfully.
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-semibold text-slate-900">
              All Products
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Search, filter and review product listings.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter products by status"
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-emerald-400"
            >
              <option value="ALL">All statuses</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="AVAILABLE">Available</option>
              <option value="REJECTED">Rejected</option>
              <option value="SOLD">Sold</option>
            </select>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 disabled:opacity-50"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1150px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-slate-200 bg-slate-50/80"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 whitespace-nowrap px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500"
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
                    colSpan={columns.length}
                    className="h-60 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="size-7 animate-spin text-emerald-600" />
                      <p className="text-sm text-slate-500">
                        Loading products...
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-60 text-center"
                  >
                    <p className="font-semibold text-red-600">
                      Unable to load products
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Check the API connection and try again.
                    </p>
                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      Try Again
                    </button>
                  </TableCell>
                </TableRow>
              ) : rows.length ? (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-4 py-4 align-middle"
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
                    colSpan={columns.length}
                    className="h-60 text-center"
                  >
                    <Package className="mx-auto mb-3 size-8 text-slate-300" />
                    <p className="font-semibold text-slate-800">
                      No products found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your search or status filter.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && !isError && (
          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {rows.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {products.length}
              </span>{" "}
              products
            </p>
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <span className="size-2 rounded-full bg-emerald-500" />
              EcoValuate Product Management
            </span>
          </div>
        )}
      </div>
    </div>
  );
}