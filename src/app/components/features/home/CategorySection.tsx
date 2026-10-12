"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  Camera,
  ChevronRight,
  CircuitBoard,
  Cpu,
  Gamepad2,
  Headphones,
  Monitor,
  Package,
  Plug,
  Radio,
  Smartphone,
  Volume2,
} from "lucide-react";

import type { ICategory } from "@/src/types/category.types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

const categoryIcons = [
  BatteryCharging,
  Monitor,
  Plug,
  Volume2,
  Headphones,
  Smartphone,
  Camera,
  CircuitBoard,
  Cpu,
  Gamepad2,
  Package,
  Radio,
];

function getCategoryIcon(name: string) {
  const normalized = name.toLowerCase();

  if (normalized.includes("battery")) return BatteryCharging;
  if (normalized.includes("display") || normalized.includes("screen"))
    return Monitor;
  if (normalized.includes("charging")) return Plug;
  if (normalized.includes("speaker")) return Volume2;
  if (normalized.includes("microphone")) return Radio;
  if (normalized.includes("camera")) return Camera;
  if (normalized.includes("vibrator")) return Smartphone;
  if (normalized.includes("button")) return CircuitBoard;
  if (normalized.includes("laptop") || normalized.includes("computer"))
    return Cpu;
  if (normalized.includes("gaming") || normalized.includes("entertainment"))
    return Gamepad2;

  return categoryIcons[10];
}

function CategoryCard({ category }: { category: ICategory }) {
  const Icon = getCategoryIcon(category.name);

  return (
    <Link
      href={`/marketplace/products?category=${encodeURIComponent(category.id)}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-gray-50">
        {category.icon ? (
          <Image
            src={category.icon}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-700 shadow-sm transition-all duration-300 group-hover:bg-emerald-700 group-hover:text-white">
            <Icon size={34} strokeWidth={1.5} />
          </div>
        )}

        <span className="absolute right-3 top-3 rounded-full border border-emerald-100 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
          E-Waste
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-gray-900 transition-colors group-hover:text-emerald-800">
          {category.name}
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-gray-500">
          {category.description || "Explore reusable and recyclable electronic items."}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-emerald-800">
          <span>Explore category</span>
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}

export default function CategorySection({
  showAll = false,
}: {
  showAll?: boolean;
}) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`${API_URL}/categories`, {
          method: "GET",
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to fetch categories");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid categories response");
        }

        // Keep one category per name, preferring the entry with an image.
        const uniqueCategories = new Map<string, ICategory>();

        for (const category of result.data as ICategory[]) {
          const key = category.name.trim().toLowerCase();
          const existing = uniqueCategories.get(key);

          if (!existing || (!existing.icon && category.icon)) {
            uniqueCategories.set(key, category);
          }
        }

        setCategories(Array.from(uniqueCategories.values()));
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        console.error("Category loading failed:", err);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchCategories();

    return () => controller.abort();
  }, []);

  const displayedCategories = showAll
    ? categories
    : categories.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              Discover & Reuse
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Explore Our{" "}
              <span className="text-emerald-700">Categories</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              Find electronic components and devices ready for reuse, repair,
              resale, or responsible recycling.
            </p>
          </div>

          {!showAll && (
            <Link
              href="/categories"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-900"
            >
              View All Categories
              <ArrowRight size={17} />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {Array.from({ length: showAll ? 8 : 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-100"
              >
                <div className="h-40 animate-pulse bg-gray-100" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
            <p className="font-semibold text-gray-900">
              Categories could not be loaded.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Please check your backend connection and try again.
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center">
            <Package className="mx-auto text-gray-400" size={36} />
            <p className="mt-4 font-semibold text-gray-900">
              No categories available yet.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {displayedCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>

            {!showAll && categories.length > 6 && (
              <div className="mt-8 text-center sm:hidden">
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 font-semibold text-emerald-800"
                >
                  Browse all categories
                  <ChevronRight size={18} />
                </Link>
              </div>
            )}

            {showAll && (
              <p className="mt-8 text-center text-sm text-gray-500">
                Showing {categories.length} categories
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}