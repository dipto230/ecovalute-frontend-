```tsx
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock3,
  Leaf,
  Package,
  Recycle,
  ShoppingBag,
  Sparkles,
  Truck,
  Wallet,
} from "lucide-react";

import { getUserInfo } from "@/src/services/auth.service";
import { getMyOrders } from "@/src/services/order.service";
import type { IOrder, OrderStatus } from "@/src/types/order.types";

const money = (value: number | string | undefined) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value ?? 0));

const dateFormat = (value?: string | Date | null) => {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case "COMPLETED":
    case "DELIVERED":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "SHIPPED":
      return "bg-blue-50 text-blue-700 ring-blue-200";
    case "PROCESSING":
    case "CONFIRMED":
      return "bg-violet-50 text-violet-700 ring-violet-200";
    case "CANCELLED":
      return "bg-rose-50 text-rose-700 ring-rose-200";
    default:
      return "bg-amber-50 text-amber-700 ring-amber-200";
  }
};

const getProductName = (order: IOrder) =>
  order.offer?.product?.title ||
  order.offer?.product?.brand ||
  order.offer?.product?.model ||
  "E-waste product";

const getCustomerName = (user: any) =>
  user?.name ||
  user?.fullName ||
  user?.user?.name ||
  user?.email?.split("@")[0] ||
  user?.user?.email?.split("@")[0] ||
  "there";

export default async function CustomerDashboardPage() {
  const [userResult, ordersResult] = await Promise.allSettled([
    getUserInfo(),
    getMyOrders({ page: 1, limit: 100, sortBy: "createdAt", sortOrder: "desc" }),
  ]);

  const user =
    userResult.status === "fulfilled" ? userResult.value : null;

  const orderResponse =
    ordersResult.status === "fulfilled"
      ? ordersResult.value
      : null;

  const responseData = orderResponse?.data as
    | { data?: IOrder[]; meta?: { total?: number } }
    | IOrder[]
    | undefined;

  const orders: IOrder[] = Array.isArray(responseData)
    ? responseData
    : Array.isArray(responseData?.data)
      ? responseData.data
      : [];

  const meta = !Array.isArray(responseData)
    ? responseData?.meta
    : undefined;

  const totalOrders = meta?.total ?? orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;
  const inProgressOrders = orders.filter((order) =>
    ["CONFIRMED", "PROCESSING", "SHIPPED"].includes(order.status)
  ).length;
  const completedOrders = orders.filter((order) =>
    ["DELIVERED", "COMPLETED"].includes(order.status)
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status === "CANCELLED"
  ).length;

  const recentOrders = orders.slice(0, 5);

  return (
    <main className="min-h-screen bg-[#f5f8f6] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Welcome */}
        <section className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-[#073f3c] via-[#075b50] to-[#07866d] p-6 text-white shadow-xl shadow-emerald-950/10 sm:p-9 lg:p-10">
          <div className="pointer-events-none absolute -right-10 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-16 -z-10 h-56 w-56 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-28 -z-10 h-52 w-52 rounded-full bg-lime-300/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-50">
                <Sparkles className="h-3.5 w-3.5 text-lime-300" />
                YOUR SUSTAINABLE LIVING SPACE
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Welcome back, {getCustomerName(user)}!
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50/85 sm:text-base">
                Manage your orders, explore reusable electronics, and make
                every sustainable choice count.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/marketplace"
                  className="inline-flex items-center gap-2 rounded-xl bg-lime-300 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-lime-200"
                >
                  Explore marketplace
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/price-estimation"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <Bot className="h-4 w-4" />
                  AI price estimation
                </Link>
              </div>
            </div>

            <div className="hidden shrink-0 items-center justify-center md:flex">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-inner">
                <Recycle className="h-20 w-20 text-lime-200" strokeWidth={1.25} />
              </div>
            </div>
          </div>
        </section>

        {/* Orders error */}
        {ordersResult.status === "rejected" && (
          <section
            role="alert"
            className="rounded-2xl border border-rose-200 bg-rose-50 p-5"
          >
            <h2 className="font-semibold text-rose-800">
              Could not load your orders
            </h2>
            <p className="mt-1 text-sm text-rose-700">
              Please check your login session and API connection, then refresh
              this page.
            </p>
          </section>
        )}

        {/* Stats */}
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                YOUR OVERVIEW
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Dashboard overview
              </h2>
            </div>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-600"
            >
              View all orders <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Total orders",
                value: totalOrders,
                description: "Orders placed",
                icon: ShoppingBag,
                iconClass: "bg-emerald-50 text-emerald-700",
                trendIcon: ArrowUpRight,
              },
              {
                title: "Pending orders",
                value: pendingOrders,
                description: "Awaiting confirmation",
                icon: Clock3,
                iconClass: "bg-amber-50 text-amber-700",
                trendIcon: Clock3,
              },
              {
                title: "In progress",
                value: inProgressOrders,
                description: "Being processed or shipped",
                icon: Truck,
                iconClass: "bg-blue-50 text-blue-700",
                trendIcon: ArrowUpRight,
              },
              {
                title: "Completed",
                value: completedOrders,
                description: "Delivered or completed",
                icon: CheckCircle2,
                iconClass: "bg-teal-50 text-teal-700",
                trendIcon: ArrowDownRight,
              },
            ].map((stat) => {
              const Icon = stat.icon;
              const TrendIcon = stat.trendIcon;

              return (
                <article
                  key={stat.title}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>
                      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`rounded-xl p-3 ${stat.iconClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                    <TrendIcon className="h-3.5 w-3.5" />
                    {stat.description}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Main content */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5 sm:p-6">
              <div>
                <h2 className="text-lg font-semibold">Recent orders</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep track of your latest purchases.
                </p>
              </div>
              <Link
                href="/dashboard/orders"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800"
              >
                See all
              </Link>
            </div>

            {ordersResult.status === "fulfilled" &&
            recentOrders.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-14 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Package className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-semibold">No orders yet</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Your orders will appear here once you complete your first
                  purchase.
                </p>
                <Link
                  href="/marketplace"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Browse marketplace <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-3 p-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                        <Package className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {getProductName(order)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {dateFormat(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(order.status)}`}
                      >
                        {order.status.replaceAll("_", " ")}
                      </span>
                      <span className="min-w-24 text-left font-semibold tabular-nums sm:text-right">
                        {money(order.finalPrice)}
                      </span>
                      <Link
                        href={`/dashboard/orders`}
                        aria-label={`View orders`}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-800"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {ordersResult.status === "fulfilled" &&
              recentOrders.length > 0 && (
                <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
                  <p className="text-xs text-slate-500">
                    Showing {recentOrders.length} recent orders
                    {totalOrders > recentOrders.length
                      ? ` out of ${totalOrders}`
                      : ""}
                  </p>
                </div>
              )}
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold">Order summary</h2>
                  <p className="text-xs text-slate-500">
                    Current order status
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {[
                  {
                    label: "Pending",
                    value: pendingOrders,
                    color: "bg-amber-400",
                  },
                  {
                    label: "In progress",
                    value: inProgressOrders,
                    color: "bg-blue-500",
                  },
                  {
                    label: "Completed",
                    value: completedOrders,
                    color: "bg-emerald-500",
                  },
                  {
                    label: "Cancelled",
                    value: cancelledOrders,
                    color: "bg-rose-400",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="font-semibold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{
                          width: `${
                            totalOrders > 0
                              ? Math.min(
                                  (item.value / totalOrders) * 100,
                                  100
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#e7f8ef] to-[#f4fce9] p-5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm">
                <Leaf className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-emerald-950">
                Give electronics a second life.
              </h2>
              <p className="mt-2 text-sm leading-6 text-emerald-900/75">
                Explore reusable electronics and discover smarter ways to
                manage e-waste.
              </p>
              <Link
                href="/marketplace"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-700"
              >
                Explore products <ArrowRight className="h-4 w-4" />
              </Link>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold">AI price estimation</h2>
                  <p className="text-xs text-slate-500">
                    Estimate your device value
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Upload an electronics image to explore an AI-powered price
                estimate and market price comparisons.
              </p>
              <Link
                href="/price-estimation"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
              >
                Estimate a price <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </aside>
        </div>

        <footer className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EcoValuate. Give e-waste a second life.</p>
          <Link
            href="/my-profile"
            className="font-medium text-emerald-800 hover:text-emerald-600"
          >
            Manage your profile
          </Link>
        </footer>
      </div>
    </main>
  );
}
```