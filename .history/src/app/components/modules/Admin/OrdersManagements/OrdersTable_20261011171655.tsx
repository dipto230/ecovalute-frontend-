"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PackageCheck,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";

import {
  cancelOrder,
  getOrders,
  updateOrderStatus,
} from "@/src/services/order.service";

import type {
  IOrder,
  IOrderMeta,
  OrderStatus,
} from "@/src/types/order.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  CONFIRMED: "border-blue-200 bg-blue-50 text-blue-700",
  PROCESSING: "border-violet-200 bg-violet-50 text-violet-700",
  SHIPPED: "border-indigo-200 bg-indigo-50 text-indigo-700",
  DELIVERED: "border-cyan-200 bg-cyan-50 text-cyan-700",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  CANCELLED: "border-red-200 bg-red-50 text-red-700",
};

const transitions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const display = (value?: string | null) => value || "N/A";

const formatPrice = (value?: number | string | null) => {
  const amount = Number(value);

  return value !== null &&
    value !== undefined &&
    Number.isFinite(amount)
    ? amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "N/A";
};

export default function OrdersTable() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const limit = 10;

  const {
    data: response,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["orders", page, limit, statusFilter],
    queryFn: () =>
      getOrders({
        page,
        limit,
        sortBy: "createdAt",
        sortOrder: "desc",
        ...(statusFilter !== "ALL"
          ? { status: statusFilter as OrderStatus }
          : {}),
      }),
  });

  // httpClient returns the backend response object directly.
  const orders = useMemo<IOrder[]>(() => {
    return (response?.data ?? []) as IOrder[];
  }, [response]);

  const meta = response?.meta as IOrderMeta | undefined;

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: OrderStatus;
    }) => updateOrderStatus(id, status),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelOrder,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return orders;

    return orders.filter((order) =>
      [
        order.id,
        order.offer?.product?.title,
        order.offer?.product?.brand,
        order.customer?.name,
        order.customer?.email,
        order.vendor?.name,
        order.vendor?.companyName,
        order.vendor?.email,
        order.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [orders, search]);

  const total = meta?.total ?? orders.length;
  const totalPages = meta?.totalPage ?? 1;

  const busy = updateMutation.isPending || cancelMutation.isPending;

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
            <PackageCheck className="size-6" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Orders Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor orders and manage their delivery status.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium text-slate-500">
            Total Orders
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900">
            {total}
          </p>
        </div>
      </div>

      {(updateMutation.isError || cancelMutation.isError) && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Order action failed. The status may not be allowed by the
          backend, or the request may have failed. Please try again.
        </div>
      )}

      {(updateMutation.isSuccess || cancelMutation.isSuccess) && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Order action completed successfully.
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-semibold text-slate-900">
              All Orders
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Review orders and update their status.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search current page..."
                aria-label="Search orders on this page"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
              aria-label="Filter orders by status"
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-emerald-400"
            >
              <option value="ALL">All statuses</option>
              {Object.keys(statusLabels).map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status as OrderStatus]}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 disabled:opacity-50"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1250px]">
            <TableHeader>
              <TableRow className="border-b border-slate-200 bg-slate-50/80">
                {[
                  "Order / Product",
                  "Customer",
                  "Vendor",
                  "Final Price",
                  "Order Date",
                  "Status",
                  "Update Status",
                  "Actions",
                ].map((heading) => (
                  <TableHead
                    key={heading}
                    className="h-12 whitespace-nowrap px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-56 text-center">
                    <Loader2 className="mx-auto mb-3 size-7 animate-spin text-emerald-600" />
                    <p className="text-sm text-slate-500">
                      Loading orders...
                    </p>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-56 text-center">
                    <p className="font-semibold text-red-600">
                      Unable to load orders
                    </p>
                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      Try Again
                    </button>
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length ? (
                filteredOrders.map((order) => {
                  const allowed = transitions[order.status] ?? [];
                  const createdAt = order.createdAt
                    ? new Date(order.createdAt)
                    : null;

                  return (
                    <TableRow
                      key={order.id}
                      className="border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40"
                    >
                      <TableCell className="px-4 py-4">
                        <p className="max-w-48 truncate font-semibold text-slate-800">
                          {display(order.offer?.product?.title)}
                        </p>
                        <p className="mt-1 max-w-48 truncate text-xs text-slate-400">
                          #{order.id}
                        </p>
                      </TableCell>

                      <TableCell className="px-4 py-4">
                        <p className="max-w-40 truncate text-sm font-medium text-slate-700">
                          {display(order.customer?.name)}
                        </p>
                        <p className="max-w-40 truncate text-xs text-slate-400">
                          {display(order.customer?.email)}
                        </p>
                      </TableCell>

                      <TableCell className="px-4 py-4">
                        <p className="max-w-40 truncate text-sm font-medium text-slate-700">
                          {display(
                            order.vendor?.companyName ??
                              order.vendor?.name
                          )}
                        </p>
                        <p className="max-w-40 truncate text-xs text-slate-400">
                          {display(order.vendor?.email)}
                        </p>
                      </TableCell>

                      <TableCell className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-800">
                        ₹{formatPrice(order.finalPrice)}
                      </TableCell>

                      <TableCell className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                        {createdAt &&
                        !Number.isNaN(createdAt.getTime())
                          ? format(createdAt, "dd MMM yyyy")
                          : "N/A"}
                      </TableCell>

                      <TableCell className="px-4 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
                        >
                          {statusLabels[order.status]}
                        </span>
                      </TableCell>

                      <TableCell className="px-4 py-4">
                        {allowed.length ? (
                          <select
                            value=""
                            disabled={busy}
                            aria-label={`Update status for order ${order.id}`}
                            onChange={(event) => {
                              const nextStatus = event.target.value as OrderStatus;
                              if (!nextStatus) return;

                              updateMutation.mutate({
                                id: order.id,
                                status: nextStatus,
                              });
                            }}
                            className="h-9 max-w-40 rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 outline-none focus:border-emerald-400 disabled:opacity-50"
                          >
                            <option value="" disabled>
                              Change status
                            </option>
                            {allowed.map((status) => (
                              <option key={status} value={status}>
                                {statusLabels[status]}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-xs text-slate-400">
                            No further changes
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="px-4 py-4">
                        {order.status !== "CANCELLED" &&
                          order.status !== "COMPLETED" &&
                          order.status !== "DELIVERED" &&
                          order.status !== "SHIPPED" && (
                            <button
                              type="button"
                              title="Cancel order"
                              aria-label={`Cancel order ${order.id}`}
                              disabled={busy}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Cancel order ${order.id}?`
                                  )
                                ) {
                                  cancelMutation.mutate(order.id);
                                }
                              }}
                              className="inline-flex size-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                            >
                              <XCircle className="size-4" />
                            </button>
                          )}

                        {order.status === "COMPLETED" && (
                          <CheckCircle2 className="size-5 text-emerald-600" />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-56 text-center">
                    <PackageCheck className="mx-auto mb-3 size-8 text-slate-300" />
                    <p className="font-semibold text-slate-800">
                      No orders found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try another status or search term.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredOrders.length}
            </span>{" "}
            orders on this page ·{" "}
            <span className="font-semibold text-slate-800">
              {total}
            </span>{" "}
            total
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>

            <span className="text-sm text-slate-500">
              {page} / {Math.max(1, totalPages)}
            </span>

            <button
              type="button"
              disabled={page >= totalPages || isFetching}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}