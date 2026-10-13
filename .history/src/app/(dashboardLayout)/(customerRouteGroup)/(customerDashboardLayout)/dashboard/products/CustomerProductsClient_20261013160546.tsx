
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  CheckCircle2,
  ChevronDown,
  Filter,
  Leaf,
  PackageSearch,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import type {
  IProduct,
  ProductCondition,
  ProductStatus,
} from "@/src/types/product.types";

type Props = {
  products: IProduct[];
  initialError?: string;
};

const formatPrice = (price: number | string) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price || 0));

const conditionLabels: Record<ProductCondition, string> = {
  NEW: "New",
  USED: "Used",
  REFURBISHED: "Refurbished",
};

const statusLabels: Record<ProductStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  SOLD: "Sold",
  AVAILABLE: "Available",
};

function statusClass(status: ProductStatus) {
  switch (status) {
    case "AVAILABLE":
    case "APPROVED":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "SOLD":
      return "bg-slate-100 text-slate-600 ring-slate-200";
    case "REJECTED":
      return "bg-rose-50 text-rose-700 ring-rose-200";
    default:
      return "bg-amber-50 text-amber-700 ring-amber-200";
  }
}

function conditionClass(condition: ProductCondition) {
  switch (condition) {
    case "NEW":
      return "bg-blue-50 text-blue-700";
    case "REFURBISHED":
      return "bg-violet-50 text-violet-700";
    default:
      return "bg-orange-50 text-orange-700";
  }
}

export default function CustomerProductsClient({
  products,
  initialError,
}: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [conditionFilter, setConditionFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesSearch =
          !query ||
          [
            product.title,
            product.brand,
            product.model,
            product.description,
            product.category?.name,
            product.vendor?.name,
            product.vendor?.companyName,
          ].some((value) => value?.toLowerCase().includes(query));

        const matchesStatus =
          statusFilter === "ALL" || product.status === statusFilter;

        const matchesCondition =
          conditionFilter === "ALL" ||
          product.condition === conditionFilter;

        return matchesSearch && matchesStatus && matchesCondition;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") {
          return Number(a.estimatedPrice) - Number(b.estimatedPrice);
        }

        if (sortBy === "price-high") {
          return Number(b.estimatedPrice) - Number(a.estimatedPrice);
        }

        if (sortBy === "name") {
          return a.title.localeCompare(b.title);
        }

        return (
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
        );
      });
  }, [products, search, statusFilter, conditionFilter, sortBy]);

  const availableCount = products.filter(
    (product) =>
      product.status === "AVAILABLE" || product.status === "APPROVED"
  ).length;

  const soldCount = products.filter(
    (product) => product.status === "SOLD"
  ).length;

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setConditionFilter("ALL");
    setSortBy("newest");
  };

  return (
    <main className="min-h-screen bg-[#f5f8f6] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Heading */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              <Leaf size={15} />
              ECOVALUATE MARKETPLACE
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Products
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Explore electronics, compare prices, and discover products
              ready for a second life.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            Explore marketplace
            <ArrowRight size={16} />
          </Link>
        </header>

        {/* Intro banner */}
        <section className="relative isolate overflow-hidden rounded-[25px] bg-gradient-to-br from-[#073f3c] via-[#075c50] to-[#07866d] p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-20 -z-10 h-60 w-60 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-20 right-32 -z-10 h-44 w-44 rounded-full bg-lime-300/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium">
                <Sparkles size={14} className="text-lime-300" />
                SMARTER ELECTRONICS, LESS WASTE
              </span>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Find value in every device.
              </h2>

              <p className="mt-3 text-sm leading-6 text-emerald-50/80">
                Discover electronics and support a more sustainable way to
                reuse technology.
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-2xl font-semibold">{products.length}</p>
                <p className="mt-1 text-xs text-emerald-50/75">
                  Listed products
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-2xl font-semibold">{availableCount}</p>
                <p className="mt-1 text-xs text-emerald-50/75">
                  Available / approved
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Error */}
        {initialError && (
          <section
            role="alert"
            className="rounded-2xl border border-rose-200 bg-rose-50 p-5"
          >
            <h2 className="font-semibold text-rose-800">
              Unable to load products
            </h2>
            <p className="mt-1 text-sm text-rose-700">{initialError}</p>
          </section>
        )}

        {/* Search and filter */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by product, brand, model or category..."
                aria-label="Search products"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                showFilters
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={17} />
              Filters
              <ChevronDown
                size={15}
                className={`transition ${showFilters ? "rotate-180" : ""}`}
              />
            </button>

            <label className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
              <span className="text-xs text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort products"
                className="min-w-0 bg-transparent text-sm font-medium outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </label>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Product status
                </span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400"
                >
                  <option value="ALL">All statuses</option>
                  <option value="AVAILABLE">Available</option>
                  <option value="APPROVED">Approved</option>
                  <option value="PENDING">Pending</option>
                  <option value="SOLD">Sold</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Condition
                </span>
                <select
                  value={conditionFilter}
                  onChange={(event) => setConditionFilter(event.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400"
                >
                  <option value="ALL">All conditions</option>
                  <option value="NEW">New</option>
                  <option value="USED">Used</option>
                  <option value="REFURBISHED">Refurbished</option>
                </select>
              </label>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <p>
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredProducts.length}
              </span>{" "}
              of {products.length} products
            </p>

            {(search || statusFilter !== "ALL" || conditionFilter !== "ALL") && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-600"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>
        </section>

        {/* Products grid */}
        {filteredProducts.length === 0 ? (
          <section className="rounded-2xl border border-slate-200/80 bg-white px-5 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <PackageSearch size={30} />
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              {products.length === 0
                ? "No products available"
                : "No matching products"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {products.length === 0
                ? "Products returned by the current API will appear here when available."
                : "Try another search term or clear your filters to see more products."}
            </p>

            {products.length > 0 ? (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Clear filters
              </button>
            ) : (
              <Link
                href="/marketplace"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Browse marketplace <ArrowRight size={16} />
              </Link>
            )}
          </section>
        ) : (
          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Explore products</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Browse the products returned by your API.
                </p>
              </div>

              <span className="hidden items-center gap-1.5 text-xs text-slate-500 sm:inline-flex">
                <Filter size={14} />
                Filtered results
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        <footer className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EcoValuate</p>
          <p>Give E-Waste a Second Life.</p>
        </footer>
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: IProduct }) {
  const condition = conditionLabels[product.condition] ?? product.condition;
  const status = statusLabels[product.status] ?? product.status;
  const productIsAvailable =
    product.status === "AVAILABLE" || product.status === "APPROVED";

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5">
      {/* Product visual */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[#e8f8ef] via-[#f4faf6] to-[#e7f4ed]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(16,185,129,0.12),transparent_60%)]" />

        <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white bg-white/80 text-emerald-800 shadow-sm transition duration-300 group-hover:scale-105">
          <Box size={43} strokeWidth={1.25} />
        </div>

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${conditionClass(product.condition)}`}
        >
          {condition}
        </span>

        <span
          className={`absolute right-4 top-4 rounded-full px-2.5 py-1.5 text-[11px] font-semibold ring-1 ring-inset ${statusClass(product.status)}`}
        >
          {status}
        </span>
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium uppercase tracking-wider text-emerald-700">
              {product.category?.name || "Electronics"}
            </p>

            <h3 className="mt-2 line-clamp-2 min-h-12 text-base font-semibold leading-6 text-slate-900">
              {product.title}
            </h3>
          </div>

          <div className="shrink-0 rounded-lg bg-slate-50 p-2 text-slate-500">
            <Box size={17} />
          </div>
        </div>

        {(product.brand || product.model) && (
          <p className="mt-2 truncate text-sm text-slate-500">
            {[product.brand, product.model].filter(Boolean).join(" · ")}
          </p>
        )}

        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
          {product.description?.trim() || "Product details available on the marketplace."}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-500">Estimated price</p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-emerald-800">
              {formatPrice(product.estimatedPrice)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">Quantity</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {product.quantity}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400">Seller</p>
            <p className="mt-1 truncate text-xs font-medium text-slate-600">
              {product.vendor?.companyName ||
                product.vendor?.name ||
                "Marketplace seller"}
            </p>
          </div>

          {productIsAvailable ? (
            <Link
              href={`/marketplace/products`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800"
            >
              View products <ArrowRight size={14} />
            </Link>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2.5 text-xs font-medium text-slate-500">
              <CheckCircle2 size={14} />
              {status}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
