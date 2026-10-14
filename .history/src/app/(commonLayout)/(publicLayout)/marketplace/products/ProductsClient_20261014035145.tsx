
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Leaf,
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
  USED: "Used",
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

  const categories = useMemo(() => {
    const map = new Map<string, string>();

    products.forEach((product) => {
      if (product.categoryId) {
        map.set(
          product.categoryId,
          product.category?.name || "Other"
        );
      }
    });

    return Array.from(map.entries()).map(
      ([id, name]) => ({ id, name })
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = products.filter((product) => {
      // Defensive frontend check; backend must enforce this too.
      if (
        product.status !== "AVAILABLE" ||
        product.quantity <= 0
      ) {
        return false;
      }

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
  }, [products, search, category, condition, sort]);

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
    <main className="min-h-screen bg-[#f7faf8] text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#063f42]">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
                <Leaf size={16} />
                A smarter way to reuse electronics
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Give electronics
                <span className="block text-lime-300">
                  a second life.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-emerald-50/80 sm:text-lg">
                Discover reusable electronics, compare
                products, and make a more sustainable
                choice with EcoValuate.
              </p>

              <a
                href="#product-list"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime-300 px-6 py-3.5 font-semibold text-[#063f42] transition hover:bg-lime-200"
              >
                Explore products
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur sm:p-7">
                <Leaf className="mb-5 text-lime-300" size={27} />
                <p className="text-3xl font-bold text-white">
                  Reuse
                </p>
                <p className="mt-2 text-sm leading-6 text-emerald-50/70">
                  Extend the life of useful electronics.
                </p>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur sm:p-7">
                <PackageSearch
                  className="mb-5 text-lime-300"
                  size={27}
                />
                <p className="text-3xl font-bold text-white">
                  Discover
                </p>
                <p className="mt-2 text-sm leading-6 text-emerald-50/70">
                  Find products for another use.
                </p>
              </div>

              <div className="col-span-2 rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lime-300/15 text-lime-300">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Browse available stock
                    </p>
                    <p className="mt-1 text-sm text-emerald-50/70">
                      Explore products currently listed
                      for sale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listing */}
      <section
        id="product-list"
        className="mx-auto max-w-7xl scroll-mt-8 px-5 py-12 sm:px-8 sm:py-16"
      >
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              EcoValuate marketplace
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Explore products
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Find your next useful electronic product
              from the available listings.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <PackageSearch size={18} className="text-emerald-700" />
            <span>
              {filteredProducts.length} product
              {filteredProducts.length === 1 ? "" : "s"} found
            </span>
          </div>
        </div>

        {/* Search and sort */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={19}
              />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search electronics, brand, model..."
                aria-label="Search products"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-200"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-semibold transition hover:bg-slate-50 lg:hidden"
            >
              <Filter size={17} />
              Filters
            </button>

            <div className="relative min-w-52">
              <ArrowDownWideNarrow
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                  setPage(1);
                }}
                aria-label="Sort products"
                className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium outline-none focus:border-emerald-600"
              >
                <option value="newest">Newest first</option>
                <option value="price-low">
                  Price: low to high
                </option>
                <option value="price-high">
                  Price: high to low
                </option>
              </select>
            </div>
          </div>

          <div
            className={`grid gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3 ${
              filtersOpen ? "" : "hidden lg:grid"
            }`}
          >
            <div>
              <label
                htmlFor="category-filter"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
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
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-600"
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
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
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
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-600"
              >
                <option value="ALL">All conditions</option>
                <option value="NEW">New</option>
                <option value="USED">Used</option>
                <option value="REFURBISHED">Refurbished</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
              >
                <SlidersHorizontal size={16} />
                Reset filters
              </button>
            </div>
          </div>
        </div>

        {/* Active filter summary */}
        {hasFilters && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-500">
              Active filters:
            </span>

            {search.trim() && (
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
                Search: {search}
              </span>
            )}

            {category !== "ALL" && (
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
                {categories.find((item) => item.id === category)?.name}
              </span>
            )}

            {condition !== "ALL" && (
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
                {conditionLabel[condition]}
              </span>
            )}

            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-slate-500 underline underline-offset-4 hover:text-slate-900"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product grid */}
        {visibleProducts.length > 0 ? (
          <>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => {
                const image =
                  product.productImages?.[0]?.imageUrl;

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5"
                  >
                    <Link
                      href={`/marketplace/products/${product.id}`}
                      className="block"
                    >
                      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-emerald-50">
                        {image ? (
                          <img
                            src={image}
                            alt={product.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-slate-400">
                            <PackageSearch size={42} strokeWidth={1.3} />
                            <span className="text-xs">
                              Product image unavailable
                            </span>
                          </div>
                        )}

                        <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
                          {conditionLabel[product.condition] ??
                            product.condition}
                        </span>

                        <span className="absolute right-3 top-3 rounded-full bg-[#063f42] px-3 py-1.5 text-xs font-medium text-white">
                          In stock: {product.quantity}
                        </span>
                      </div>
                    </Link>

                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                        <span className="truncate">
                          {product.category?.name || "Electronics"}
                        </span>
                        {product.brand && (
                          <>
                            <span>·</span>
                            <span className="truncate">
                              {product.brand}
                            </span>
                          </>
                        )}
                      </div>

                      <Link
                        href={`/marketplace/products/${product.id}`}
                        className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-slate-900 transition hover:text-emerald-800"
                      >
                        {product.title}
                      </Link>

                      {product.model && (
                        <p className="mt-1 truncate text-xs text-slate-400">
                          Model: {product.model}
                        </p>
                      )}

                      <div className="mt-4 border-t border-slate-100 pt-4">
                        <div className="flex items-end justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500">
                              Listed price
                            </p>
                            <p className="mt-1 text-xl font-bold tracking-tight text-[#063f42]">
                              {formatPrice(product.estimatedPrice)}
                            </p>
                          </div>

                          <Link
                            href={`/marketplace/products/${product.id}`}
                            aria-label={`View ${product.title}`}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 transition group-hover:bg-[#063f42] group-hover:text-white"
                          >
                            <ArrowRight size={18} />
                          </Link>
                        </div>

                        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-800">
                            {(product.vendor?.companyName ||
                              product.vendor?.name ||
                              "V"
                            )
                              .slice(0, 1)
                              .toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-wider text-slate-400">
                              Sold by
                            </p>
                            <p className="truncate text-xs font-medium text-slate-700">
                              {product.vendor?.companyName ||
                                product.vendor?.name ||
                                "Verified vendor"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
              <p className="text-sm text-slate-500">
                Showing{" "}
                {(currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(
                  currentPage * PAGE_SIZE,
                  filteredProducts.length
                )}{" "}
                of {filteredProducts.length} products
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() =>
                    setPage((current) => current - 1)
                  }
                  aria-label="Previous page"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                    <span
                      key={number}
                      className="contents"
                    >
                      {index > 0 &&
                        number - numbers[index - 1] > 1 && (
                          <span className="px-1 text-slate-400">
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
                        className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-semibold transition ${
                          currentPage === number
                            ? "border-[#063f42] bg-[#063f42] text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
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
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
              <PackageSearch size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              No products found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try another search term or clear the filters
              to explore other available electronics.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-[#063f42] px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Bottom sustainability section */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
              <Leaf size={23} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Better choices. Less e-waste.
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                Reusing electronics can help extend product
                life and reduce unnecessary waste.
              </p>
            </div>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
          >
            Back to marketplace
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
