import CategorySection from "@/src/app/components/features/home/CategorySection";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "All Categories | EcoValuate",
  description:
    "Explore electronic devices and components for reuse, repair, resale, and responsible recycling.",
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
            EcoValuate Marketplace
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
            All Categories
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Explore every category, discover reusable electronic components,
            and give old electronics a second life.
          </p>
        </div>
      </div>

      <CategorySection showAll />
    </main>
  );
}