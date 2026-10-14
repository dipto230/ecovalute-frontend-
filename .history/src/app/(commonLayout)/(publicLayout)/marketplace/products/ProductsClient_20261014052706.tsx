
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownUp,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Package,
  PackageSearch,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import type { IProduct } from "@/src/types/product.types";

interface ProductsClientProps {
  products: IProduct[];
}

const PAGE_SIZE = 12;

const formatPrice = (price: number | string) => {
  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return "Price unavailable";
  }

  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

const conditionLabel: Record<string, string> = {
  NEW: "New",
  USED: "Pre-owned",
  REFURBISHED: "Refurbished",
};

export default function ProductsClient({
  products,
}: ProductsClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [condition, setCondition] = useState("ALL");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Only approved products with available stock are displayed.
  const approvedProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.status === "APPROVED" &&
          Number(product.quantity) > 0
      ),
    [products]
  );

  const categories = useMemo(() => {
    const map = new Map<string, string>();

    approvedProducts.forEach((product) => {
      if (product.categoryId) {
        map.set(
          product.categoryId,
          product.category?.name || "Other"
        );
      }
    });

    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [approvedProducts]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = approvedProducts.filter((product) => {
      const searchableText = [
        product.title,
        product.description,
        product.brand,
        product.model,
        product.category?.name,
        product.vendor?.name,
        product.vendor?.companyName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (term && !searchableText.includes(term)) {
        return false;
      }

      if (
        category !== "ALL" &&
        product.categoryId !== category
      ) {
        return false;
      }

      if (
        condition !== "ALL" &&
        product.condition !== condition
      ) {
        return false;
      }

      return true;
    });

    result.sort((a, b) => {
      if (sort === "price-low") {
        return (
          Number(a.estimatedPrice) -
          Number(b.estimatedPrice)
        );
      }

      if (sort === "price-high") {
        return (
          Number(b.estimatedPrice) -
          Number(a.estimatedPrice)
        );
      }

      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });

    return result;
  }, [approvedProducts, search, category, condition, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("ALL");
    setCondition("ALL");
    setSort("newest");
    setPage(1);
  };

  const hasFilters =
    search.trim() !== "" ||
    category !== "ALL" ||
    condition !== "ALL";

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Premium white hero */}
      <section className="border-b border-neutral-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs font-medium tracking-wide text-neutral-600">
                <Leaf size={15} className="text-neutral-800" />
                A MORE CONSCIOUS MARKETPLACE
              </div>

              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
                Good electronics.
                <span className="mt-1 block font-normal text-neutral-400">
                  A second life.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-neutral-500 sm:text-lg">
                Discover pre-owned electronics worth keeping.
                Find useful products, compare prices, and make
                a more thoughtful choice.
              </p>

              <a
                href="#product-list"
                className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                Explore collection
                <ArrowRight size={17} />
              </a>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-500">
                <span className="inline-flex items-center gap-2">
                  <Check size={15} className="text-neutral-800" />
                  Approved listings
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check size={15} className="text-neutral-800" />
                  Stock available
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                      The EcoValuate edit
                    </p>
                    <h2 className="mt-3 max-w-xs text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                      Better finds. Less waste.
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white">
                    <Leaf size={23} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-50">
                      <PackageSearch size={23} strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-neutral-900">
                        Thoughtfully listed
                      </p>
                      <p className="mt-1 text-xs leading-5 text-neutral-500">
                        Explore approved products with stock.
                      </p>
                    </div>
                    <ArrowRight
                      size={17}
                      className="shrink-0 text-neutral-400"
                    />
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-50">
                      <ArrowDownUp size={22} strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-neutral-900">
                        Compare with ease
                      </p>
                      <p className="mt-1 text-xs leading-5 text-neutral-500">
                        Search, filter, and sort listings.
                      </p>
                    </div>
                    <ArrowRight
                      size={17}
                      className="shrink-0 text-neutral-400"
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-5">
                  <span className="text-sm text-neutral-500">
                    Products ready to discover
                  </span>
                  <span className="text-lg font-semibold tabular-nums text-neutral-950">
                    {approvedProducts.length.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-32 w-32 rounded-full bg-neutral-100 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace listing */}
      <section
        id="product-list"
        className="mx-auto max-w-7xl scroll-mt-8 px-5 py-12 sm:px-8 sm:py-16"
      >
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              The marketplace
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Find your next essential.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
              Browse electronics selected for another useful
              chapter, at prices worth comparing.
            </p>
          </div>

          <p className="text-sm text-neutral-500">
            <span className="font-semibold text-neutral-950">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Search and filters */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-3 sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search by product, brand or model..."
                aria-label="Search products"
                className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-10 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              aria-expanded={filtersOpen}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 lg:hidden"
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            <div className="relative lg:w-56 lg:shrink-0">
              <ArrowDownUp
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                size={17}
              />
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                  setPage(1);
                }}
                aria-label="Sort products"
                className="h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white pl-11 pr-4 text-sm font-medium text-neutral-800 outline-none transition focus:border-neutral-500"
              >
                <option value="newest">Newest first</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </div>
          </div>

          <div
            className={`grid gap-4 border-t border-neutral-100 pt-4 sm:grid-cols-2 lg:grid-cols-3 ${
              filtersOpen ? "" : "hidden lg:grid"
            }`}
          >
            <div>
              <label
                htmlFor="category-filter"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                Category
              </label>
              <select
                id="category-filter"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setPage(1);
                }}
                className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-800 outline-none focus:border-neutral-500"
              >
                <option value="ALL">All categories</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="condition-filter"
                className="mb-2 block text-xs font-medium text-neutral-500"
              >
                Condition
              </label>
              <select
                id="condition-filter"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                  setPage(1);
                }}
                className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-800 outline-none focus:border-neutral-500"
              >
                <option value="ALL">All conditions</option>
                <option value="NEW">New</option>
                <option value="USED">Pre-owned</option>
                <option value="REFURBISHED">Refurbished</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-950"
              >
                <X size={15} />
                Reset filters
              </button>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {hasFilters && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-neutral-500">
              Filters
            </span>

            {search.trim() && (
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-700">
                Search: {search}
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  aria-label="Remove search filter"
                >
                  <X size={13} />
                </button>
              </span>
            )}

            {category !== "ALL" && (
              <span className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-700">
                {categories.find((item) => item.id === category)?.name}
              </span>
            )}

            {condition !== "ALL" && (
              <span className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-700">
                {conditionLabel[condition] || condition}
              </span>
            )}

            <button
              type="button"
              onClick={resetFilters}
              className="ml-1 text-xs font-medium text-neutral-500 underline underline-offset-4 hover:text-neutral-950"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product cards */}
        {visibleProducts.length > 0 ? (
          <>
            <div className="mt-7 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => {
                const image =
                  product.productImages?.[0]?.imageUrl;

                const vendorName =
                  product.vendor?.companyName ||
                  product.vendor?.name ||
                  "Marketplace seller";

                return (
                  <article
                    key={product.id}
                    className="group min-w-0"
                  >
                    <Link
                      href={`/marketplace/products/${product.id}`}
                      className="block"
                      aria-label={`View ${product.title}`}
                    >
                      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50">
                        {image ? (
                          <img
                            src={image}
                            alt={product.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-3 text-neutral-400">
                            <Package size={39} strokeWidth={1.2} />
                            <span className="text-xs">
                              Image coming soon
                            </span>
                          </div>
                        )}

                        <span className="absolute left-3 top-3 rounded-full border border-neutral-200/80 bg-white/95 px-3 py-1.5 text-[11px] font-medium text-neutral-700 backdrop-blur">
                          {conditionLabel[product.condition] ||
                            product.condition}
                        </span>

                        {Number(product.quantity) <= 3 && (
                          <span className="absolute right-3 top-3 rounded-full border border-neutral-200 bg-white/95 px-3 py-1.5 text-[10px] font-medium text-neutral-600">
                            Few left
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className="px-0.5 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate text-xs text-neutral-500">
                          {product.category?.name || "Electronics"}
                        </span>
                        {product.brand && (
                          <span className="shrink-0 text-xs text-neutral-400">
                            {product.brand}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/marketplace/products/${product.id}`}
                        className="mt-2 block"
                      >
                        <h3 className="line-clamp-2 min-h-12 text-[15px] font-medium leading-6 text-neutral-900 transition group-hover:text-neutral-500">
                          {product.title}
                        </h3>
                      </Link>

                      {product.model && (
                        <p className="mt-1 truncate text-xs text-neutral-400">
                          Model: {product.model}
                        </p>
                      )}

                      <div className="mt-4 flex items-end justify-between gap-3 border-t border-neutral-100 pt-4">
                        <div>
                          <p className="text-[11px] text-neutral-500">
                            Listed price
                          </p>
                          <p className="mt-1 text-lg font-semibold tracking-tight text-neutral-950">
                            {formatPrice(product.estimatedPrice)}
                          </p>
                        </div>

                        <Link
                          href={`/marketplace/products/${product.id}`}
                          aria-label={`View details for ${product.title}`}
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                        >
                          <ArrowRight size={17} />
                        </Link>
                      </div>

                      <div className="mt-4 flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs font-medium text-neutral-700">
                          {vendorName.slice(0, 1).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-neutral-700">
                            {vendorName}
                          </p>
                          <p className="mt-0.5 text-[10px] text-neutral-400">
                            {product.quantity} available
                          </p>
                        </div>
                        <span
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-600"
                          title="Approved listing"
                        >
                          <Check size={12} />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex flex-col gap-5 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-neutral-500">
                Showing{" "}
                <span className="font-medium text-neutral-900">
                  {(currentPage - 1) * PAGE_SIZE + 1}–
                  {Math.min(
                    currentPage * PAGE_SIZE,
                    filteredProducts.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium text-neutral-900">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() =>
                    setPage((current) => current - 1)
                  }
                  aria-label="Previous page"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                )
                  .filter(
                    (number) =>
                      number === 1 ||
                      number === totalPages ||
                      Math.abs(number - currentPage) <= 1
                  )
                  .map((number, index, numbers) => (
                    <span key={number} className="contents">
                      {index > 0 &&
                        number - numbers[index - 1] > 1 && (
                          <span className="px-1 text-sm text-neutral-400">
                            …
                          </span>
                        )}

                      <button
                        type="button"
                        onClick={() => setPage(number)}
                        aria-current={
                          currentPage === number
                            ? "page"
                            : undefined
                        }
                        className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-medium transition ${
                          currentPage === number
                            ? "border-neutral-950 bg-neutral-950 text-white"
                            : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                        }`}
                      >
                        {number}
                      </button>
                    </span>
                  ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setPage((current) => current + 1)
                  }
                  aria-label="Next page"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-600">
              <PackageSearch size={25} strokeWidth={1.5} />
            </div>

            <h3 className="mt-5 text-xl font-semibold tracking-tight text-neutral-950">
              {approvedProducts.length === 0
                ? "No products available yet"
                : "No matching products"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
              {approvedProducts.length === 0
                ? "Approved products with available stock will appear here when listings are ready."
                : "Try a different search, change your filters, or explore all available listings."}
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </section>

      {/* Minimal sustainability footer */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200">
              <Leaf size={19} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Give electronics another life.
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Thoughtful reuse starts with a better find.
              </p>
            </div>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
          >
            Back to marketplace
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
