
"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Package,
  RefreshCw,
  Search,
  ShoppingBag,
  Truck,
  XCircle,
  Leaf,
} from "lucide-react";

import { cancelOrder } from "@/src/services/order.service";
import type { IOrder, OrderStatus } from "@/src/types/order.types";

interface CustomerOrdersClientProps {
  initialOrders: IOrder[];
  errorMessage: string;
}

type FilterValue = "ALL" | OrderStatus;

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  PROCESSING: {
    label: "Processing",
    className: "bg-blue-50 text-blue-700 ring-blue-200",
  },
  SHIPPED: {
    label: "Shipped",
    className: "bg-violet-50 text-violet-700 ring-violet-200",
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-green-50 text-green-700 ring-green-200",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-rose-50 text-rose-700 ring-rose-200",
  },
};

const formatPrice = (price: number | string) => {
  const amount = Number(price);

  if (!Number.isFinite(amount)) return "—";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (date?: string | Date | null) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

const getProductName = (order: IOrder) =>
  order.offer?.product?.title ||
  [order.offer?.product?.brand, order.offer?.product?.model]
    .filter(Boolean)
    .join(" ") ||
  "E-waste product";

const getVendorName = (order: IOrder) =>
  order.vendor?.companyName ||
  order.vendor?.name ||
  order.vendor?.email ||
  "Vendor";

const canCancelOrder = (status: OrderStatus) =>
  !["CANCELLED", "COMPLETED", "DELIVERED", "SHIPPED"].includes(status);

export default function CustomerOrdersClient({
  initialOrders,
  errorMessage,
}: CustomerOrdersClientProps) {
  const router = useRouter();

  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("ALL");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const counts = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((order) => order.status === "PENDING").length,
      progress: orders.filter((order) =>
        ["CONFIRMED", "PROCESSING", "SHIPPED"].includes(order.status)
      ).length,
      completed: orders.filter((order) =>
        ["DELIVERED", "COMPLETED"].includes(order.status)
      ).length,
      cancelled: orders.filter((order) => order.status === "CANCELLED").length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        activeFilter === "ALL" || order.status === activeFilter;

      const searchableText = [
        order.id,
        getProductName(order),
        getVendorName(order),
        order.status,
      ]
        .join(" ")
        .toLowerCase();

      return matchesStatus && (!query || searchableText.includes(query));
    });
  }, [orders, search, activeFilter]);

  const handleCancel = (order: IOrder) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel the order for "${getProductName(order)}"?`
    );

    if (!confirmed) return;

    setActionError("");
    setActionSuccess("");
    setPendingOrderId(order.id);

    startTransition(async () => {
      try {
        await cancelOrder(order.id);

        setOrders((current) =>
          current.map((item) =>
            item.id === order.id
              ? { ...item, status: "CANCELLED" as OrderStatus }
              : item
          )
        );

        setActionSuccess("Your order has been cancelled successfully.");
        router.refresh();
      } catch (error) {
        console.error("Failed to cancel order:", error);
        setActionError(
          "Could not cancel this order. It may no longer be eligible for cancellation."
        );
      } finally {
        setPendingOrderId(null);
      }
    });
  };

  const statCards = [
    {
      label: "Total orders",
      value: counts.total,
      icon: ShoppingBag,
      iconClass: "bg-emerald-50 text-emerald-700",
      accent: "from-emerald-500 to-teal-600",
    },
    {
      label: "Pending",
      value: counts.pending,
      icon: Clock3,
      iconClass: "bg-amber-50 text-amber-700",
      accent: "from-amber-400 to-orange-500",
    },
    {
      label: "In progress",
      value: counts.progress,
      icon: Truck,
      iconClass: "bg-blue-50 text-blue-700",
      accent: "from-blue-500 to-indigo-500",
    },
    {
      label: "Completed",
      value: counts.completed,
      icon: CheckCircle2,
      iconClass: "bg-teal-50 text-teal-700",
      accent: "from-teal-500 to-emerald-600",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f8f6] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-7">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-700">
              <Leaf size={17} />
              <span>EcoValuate</span>
              <span className="text-gray-400">/</span>
              <span>Shopping</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Track your purchases, check order status, and manage your
              sustainable shopping journey.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#c4f64b] px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-[#b4eb35]"
          >
            Explore marketplace
            <ArrowUpRight size={18} />
          </Link>
        </section>

        {/* Hero banner */}
        <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#064e48] via-[#066b5b] to-[#078466] px-6 py-8 text-white shadow-lg sm:px-9 sm:py-10">
          <div className="pointer-events-none absolute -right-12 -top-24 -z-10 h-72 w-72 rounded-full border-[35px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-28 right-36 -z-10 h-60 w-60 rounded-full border-[30px] border-white/5" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-50">
                <Leaf size={14} />
                YOUR SUSTAINABLE SHOPPING
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                Every order makes
                <br className="hidden sm:block" /> a difference.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50/90 sm:text-base">
                Keep track of your orders and give electronics a second life
                through responsible reuse and recycling.
              </p>
            </div>

            <div className="flex h-24 w-24 shrink-0 items-center justify-center self-start rounded-3xl border border-white/20 bg-white/10 md:h-32 md:w-32 md:self-center">
              <Package className="h-12 w-12 text-[#c4f64b] md:h-16 md:w-16" />
            </div>
          </div>
        </section>

        {/* Fetch error */}
        {errorMessage && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-800 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <XCircle className="mt-0.5 shrink-0" size={21} />
              <div>
                <p className="font-semibold">Could not load your orders</p>
                <p className="mt-1 text-sm">{errorMessage}</p>
              </div>
            </div>

            <button
              onClick={() => router.refresh()}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-rose-100"
            >
              <RefreshCw size={15} />
              Try again
            </button>
          </div>
        )}

        {/* Action feedback */}
        {actionError && (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            {actionError}
          </div>
        )}

        {actionSuccess && (
          <div
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            {actionSuccess}
          </div>
        )}

        {/* Stats */}
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Your overview
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                Order summary
              </h2>
            </div>

            <span className="hidden items-center gap-1.5 text-xs text-slate-500 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Based on loaded orders
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.label}
                  className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6"
                >
                  <div
                    className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${card.accent}`}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-500">
                      {card.label}
                    </p>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconClass}`}
                    >
                      <Icon size={21} />
                    </div>
                  </div>

                  <p className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                    {card.value}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {card.label === "Total orders"
                      ? "Orders returned by the API"
                      : "Current order status"}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Orders table */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Order history
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  View and manage your recent purchases.
                </p>
              </div>

              <div className="relative w-full lg:max-w-sm">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search product, vendor, order ID..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            {/* Status filters */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
              {(
                [
                  "ALL",
                  "PENDING",
                  "CONFIRMED",
                  "PROCESSING",
                  "SHIPPED",
                  "DELIVERED",
                  "COMPLETED",
                  "CANCELLED",
                ] as FilterValue[]
              ).map((filter) => {
                const label =
                  filter === "ALL" ? "All orders" : statusConfig[filter].label;

                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                      activeFilter === filter
                        ? "bg-[#075e50] text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="px-5 py-16 text-center sm:px-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <ShoppingBag size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {orders.length === 0
                  ? "Your order history is empty"
                  : "No matching orders found"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {orders.length === 0
                  ? "Once you place an order from an accepted offer, it will appear here."
                  : "Try a different search term or change the status filter."}
              </p>

              {orders.length === 0 && (
                <Link
                  href="/marketplace"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#c4f64b] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#b4eb35]"
                >
                  Explore marketplace
                  <ArrowRight size={17} />
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[850px] text-left">
                  <thead>
                    <tr className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-4 font-semibold">Product</th>
                      <th className="px-5 py-4 font-semibold">Order date</th>
                      <th className="px-5 py-4 font-semibold">Vendor</th>
                      <th className="px-5 py-4 font-semibold">Amount</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((order) => {
                      const status = statusConfig[order.status];

                      return (
                        <tr
                          key={order.id}
                          className="transition hover:bg-emerald-50/30"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                <Package size={21} />
                              </div>

                              <div className="min-w-0">
                                <p className="max-w-[230px] truncate text-sm font-semibold text-slate-900">
                                  {getProductName(order)}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                  #{order.id.slice(0, 8)}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <CalendarDays
                                size={15}
                                className="text-slate-400"
                              />
                              {formatDate(order.createdAt)}
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <span className="text-sm text-slate-600">
                              {getVendorName(order)}
                            </span>
                          </td>

                          <td className="px-5 py-5">
                            <span className="whitespace-nowrap text-sm font-bold text-slate-900">
                              {formatPrice(order.finalPrice)}
                            </span>
                          </td>

                          <td className="px-5 py-5">
                            <span
                              className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${status.className}`}
                            >
                              {status.label}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() =>
                                  setExpandedOrder((current) =>
                                    current === order.id ? null : order.id
                                  )
                                }
                                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                              >
                                {expandedOrder === order.id
                                  ? "Hide details"
                                  : "Details"}
                              </button>

                              {canCancelOrder(order.status) && (
                                <button
                                  disabled={
                                    isPending && pendingOrderId === order.id
                                  }
                                  onClick={() => handleCancel(order)}
                                  className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {isPending && pendingOrderId === order.id
                                    ? "Cancelling..."
                                    : "Cancel"}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="space-y-3 p-4 md:hidden">
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status];

                  return (
                    <article
                      key={order.id}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                          <Package size={23} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="break-words text-sm font-bold text-slate-900">
                            {getProductName(order)}
                          </h3>
                          <p className="mt-1 text-xs text-slate-400">
                            #{order.id.slice(0, 8)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {getVendorName(order)}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div>
                          <p className="text-xs text-slate-500">
                            Total amount
                          </p>
                          <p className="mt-1 text-base font-bold text-slate-900">
                            {formatPrice(order.finalPrice)}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() =>
                              setExpandedOrder((current) =>
                                current === order.id ? null : order.id
                              )
                            }
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                          >
                            {expandedOrder === order.id
                              ? "Hide details"
                              : "Details"}
                          </button>

                          {canCancelOrder(order.status) && (
                            <button
                              disabled={
                                isPending && pendingOrderId === order.id
                              }
                              onClick={() => handleCancel(order)}
                              className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 disabled:opacity-50"
                            >
                              {isPending && pendingOrderId === order.id
                                ? "Cancelling..."
                                : "Cancel order"}
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Expandable order details */}
              {filteredOrders
                .filter((order) => order.id === expandedOrder)
                .map((order) => (
                  <div
                    key={order.id}
                    className="border-t border-emerald-100 bg-emerald-50/50 px-5 py-5 sm:px-7"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold text-slate-900">
                        Order details
                      </h3>
                      <button
                        onClick={() => setExpandedOrder(null)}
                        className="text-sm font-medium text-slate-500 hover:text-slate-900"
                      >
                        Close
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-xs text-slate-500">Full order ID</p>
                        <p className="mt-2 break-all text-sm font-semibold text-slate-800">
                          {order.id}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-xs text-slate-500">Offer ID</p>
                        <p className="mt-2 break-all text-sm font-semibold text-slate-800">
                          {order.offerId}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-xs text-slate-500">Order updated</p>
                        <p className="mt-2 text-sm font-semibold text-slate-800">
                          {formatDate(order.updatedAt)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-xs text-slate-500">Current status</p>
                        <p className="mt-2 text-sm font-semibold text-slate-800">
                          {statusConfig[order.status].label}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <p>
                  Showing {filteredOrders.length} of {orders.length} loaded
                  orders
                </p>

                <button
                  onClick={() => router.refresh()}
                  className="inline-flex w-fit items-center gap-2 font-semibold text-emerald-800 transition hover:text-emerald-600"
                >
                  <RefreshCw size={15} />
                  Refresh orders
                  <ArrowDownRight size={15} />
                </button>
              </div>
            </>
          )}
        </section>

        <p className="pb-2 text-center text-xs text-slate-400">
          EcoValuate · Give e-waste a second life.
        </p>
      </div>
    </main>
  );
}
