
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Leaf,
  Mail,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import type { IProduct } from "@/src/types/product.types";

interface ProductDetailsClientProps {
  product: IProduct;
  relatedProducts: IProduct[];
}

const formatPrice = (price: number | string) => {
  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return "Price unavailable";
  }

  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

const conditionLabels: Record<string, string> = {
  NEW: "New",
  USED: "Pre-owned",
  REFURBISHED: "Refurbished",
};

const statusLabels: Record<string, string> = {
  APPROVED: "Verified listing",
  AVAILABLE: "Available",
  SOLD: "Sold",
  PENDING: "Pending approval",
  REJECTED: "Unavailable",
};

const formatDate = (date?: string | Date | null) => {
  if (!date) return "Recently listed";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Recently listed";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function ProductImage({
  src,
  alt,
  className = "",
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-50 text-neutral-300 ${className}`}
      >
        <Package size={64} strokeWidth={1.1} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`object-contain ${className}`}
    />
  );
}

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const images = (product.productImages ?? [])
    .filter((image) => Boolean(image.imageUrl))
    .map((image) => image.imageUrl);

  const [activeImage, setActiveImage] = useState(0);

  const currentImage = images[activeImage];

  const vendorName =
    product.vendor?.companyName ||
    product.vendor?.name ||
    "Marketplace seller";

  const isAvailable =
    product.status === "APPROVED" &&
    Number(product.quantity) > 0;

  const canContactSeller = Boolean(product.vendor?.email);

  const moveImage = (direction: number) => {
    if (images.length < 2) return;

    setActiveImage(
      (current) =>
        (current + direction + images.length) % images.length
    );
  };

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <Link
            href="/marketplace/products"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-950"
          >
            <ArrowLeft size={16} />
            Back to products
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-neutral-800">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/marketplace"
              className="hover:text-neutral-800"
            >
              Marketplace
            </Link>
            <span>/</span>
            <span className="text-neutral-700">
              {product.category?.name || "Electronics"}
            </span>
          </div>
        </div>
      </div>

      {/* Main product */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
        <div className="grid gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* Gallery */}
          <div className="min-w-0">
            <div className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 sm:aspect-[5/4]">
              <ProductImage
                src={currentImage}
                alt={product.title}
                className="h-full w-full p-5 sm:p-10"
              />

              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 px-3.5 py-2 text-xs font-medium text-neutral-700 backdrop-blur">
                <Leaf size={14} />
                Second-life electronics
              </span>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => moveImage(-1)}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition hover:bg-neutral-100 sm:left-5"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveImage(1)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition hover:bg-neutral-100 sm:right-5"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <span className="absolute bottom-4 right-4 rounded-full border border-neutral-200 bg-white/95 px-3 py-1.5 text-xs text-neutral-600">
                    {activeImage + 1} / {images.length}
                  </span>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`aspect-square overflow-hidden rounded-xl border bg-neutral-50 transition ${
                      activeImage === index
                        ? "border-neutral-950 ring-1 ring-neutral-950"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <ProductImage
                      src={image}
                      alt={`${product.title} image ${index + 1}`}
                      className="h-full w-full p-2"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 p-4">
                <ShieldCheck
                  size={20}
                  strokeWidth={1.5}
                  className="shrink-0 text-neutral-700"
                />
                <div>
                  <p className="text-sm font-medium">
                    Listing status
                  </p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    {statusLabels[product.status] || product.status}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 p-4">
                <Leaf
                  size={20}
                  strokeWidth={1.5}
                  className="shrink-0 text-neutral-700"
                />
                <div>
                  <p className="text-sm font-medium">
                    Better reuse
                  </p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Give useful electronics another life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product information */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700">
                {product.category?.name || "Electronics"}
              </span>

              <span className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700">
                {conditionLabels[product.condition] ||
                  product.condition}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl lg:text-[42px]">
              {product.title}
            </h1>

            {(product.brand || product.model) && (
              <p className="mt-3 text-sm text-neutral-500">
                {[product.brand, product.model]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}

            <div className="mt-7 border-y border-neutral-200 py-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                Listed price
              </p>

              <div className="mt-2 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                  {formatPrice(product.estimatedPrice)}
                </span>

                {isAvailable ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600">
                    <Check size={14} />
                    In stock
                  </span>
                ) : (
                  <span className="text-xs font-medium text-neutral-500">
                    Currently unavailable
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Product pricing is provided by the seller. Confirm
                the final price and item condition before purchase.
              </p>
            </div>

            {/* Stock information */}
            <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50">
                  <Package size={19} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Stock availability
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {Number(product.quantity) > 0
                      ? `${product.quantity} unit${
                          Number(product.quantity) === 1 ? "" : "s"
                        } listed`
                      : "No units currently available"}
                  </p>
                </div>
              </div>

              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  isAvailable ? "bg-neutral-900" : "bg-neutral-300"
                }`}
              />
            </div>

            {/* Seller card */}
            <div className="mt-6 rounded-2xl border border-neutral-200 p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                Seller information
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-base font-semibold text-neutral-800">
                  {vendorName.slice(0, 1).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {vendorName}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Marketplace seller
                  </p>
                </div>

                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200"
                  title="Seller information"
                >
                  <Check size={15} />
                </div>
              </div>

              {product.vendor?.email && (
                <p className="mt-4 break-all border-t border-neutral-100 pt-4 text-sm text-neutral-600">
                  {product.vendor.email}
                </p>
              )}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {canContactSeller ? (
                  <a
                    href={`mailto:${product.vendor?.email}?subject=${encodeURIComponent(
                      `Product enquiry: ${product.title}`
                    )}`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
                  >
                    <Mail size={16} />
                    Contact seller
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-neutral-100 px-4 text-sm font-medium text-neutral-400"
                    title="Seller email is not available"
                  >
                    <Mail size={16} />
                    Contact unavailable
                  </button>
                )}

                <Link
                  href="/marketplace/products"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
                >
                  <ShoppingBag size={16} />
                  More products
                </Link>
              </div>

              <p className="mt-4 text-xs leading-5 text-neutral-500">
                Contact the seller to confirm product details,
                availability, delivery and payment arrangements.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs text-neutral-500">
              <span className="inline-flex items-center gap-2">
                <Clock3 size={15} />
                Listed {formatDate(product.createdAt)}
              </span>

              <span className="inline-flex items-center gap-2">
                <Truck size={15} />
                Confirm delivery with seller
              </span>
            </div>
          </div>
        </div>

        {/* Description and specifications */}
        <div className="mt-16 grid gap-10 border-t border-neutral-200 pt-10 lg:grid-cols-[1fr_0.7fr] lg:gap-16 lg:pt-14">
          <section>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              About this product
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Product description
            </h2>

            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-neutral-600 sm:text-base">
              {product.description?.trim() ||
                "The seller has not provided a detailed description for this product yet. Contact the seller for more information about its features, condition and usage history."}
            </p>
          </section>

          <section>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              Product details
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Specifications
            </h2>

            <div className="mt-5 divide-y divide-neutral-200 border-y border-neutral-200">
              {[
                ["Product name", product.title],
                ["Category", product.category?.name || "Electronics"],
                ["Brand", product.brand || "Not specified"],
                ["Model", product.model || "Not specified"],
                [
                  "Condition",
                  conditionLabels[product.condition] ||
                    product.condition,
                ],
                ["Availability", statusLabels[product.status] || product.status],
                ["Quantity", String(product.quantity)],
                ["Listed on", formatDate(product.createdAt)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 py-4 text-sm"
                >
                  <span className="text-neutral-500">{label}</span>
                  <span className="break-words text-right font-medium text-neutral-800">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-neutral-200 pt-10 sm:mt-20 sm:pt-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Continue exploring
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  More to discover
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  Other available products in this category.
                </p>
              </div>

              <Link
                href="/marketplace/products"
                className="hidden shrink-0 items-center gap-2 text-sm font-medium text-neutral-700 transition hover:text-neutral-950 sm:inline-flex"
              >
                View all
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/marketplace/products/${item.id}`}
                  className="group min-w-0"
                >
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
                    <ProductImage
                      src={item.productImages?.[0]?.imageUrl}
                      alt={item.title}
                      className="h-full w-full p-4 transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <p className="mt-3 truncate text-xs text-neutral-500">
                    {item.category?.name || "Electronics"}
                  </p>

                  <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-5 text-neutral-900 transition group-hover:text-neutral-500">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-base font-semibold">
                    {formatPrice(item.estimatedPrice)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200">
              <Leaf size={19} strokeWidth={1.5} />
            </div>

            <div>
              <p className="text-sm font-medium">
                EcoValuate
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Give e-waste a second life.
              </p>
            </div>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 transition hover:text-neutral-950"
          >
            Return to marketplace
            <ArrowRight size={16} />
          </Link>
        </div>
      </footer>
    </main>
  );
}
