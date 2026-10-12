"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  estimateImagePrice,
  type IImagePriceEstimate,
} from "@/src/services/price-estimation.service";

const formatPrice = (price: string | number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(price));

export default function PriceEstimationPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState<IImagePriceEstimate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be 10 MB or less.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError("");
  };

  const handleEstimate = async () => {
    if (!image) {
      setError("Please upload a product image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const data = await estimateImagePrice(image);
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Price estimation failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50/80 px-5 py-12 text-center sm:px-10 sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-teal-100/50 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                ♻
              </span>
              EcoValuate AI
            </span>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              AI Product{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Price Estimation
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Upload an electronic product image. Our AI will identify the
              product and estimate its market price using available shopping
              sources.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500 sm:text-sm">
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                ✦ AI-powered analysis
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                ↗ Market price comparison
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                ♻ Sustainable technology
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid items-start gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-8">
          {/* Upload Card */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_40px_-18px_rgba(15,23,42,0.16)] sm:p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path
                    d="M12 16V4m0 0L7 9m5-5 5 5M5 15v4a1 1 0 001 1h12a1 1 0 001-1v-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Upload Product Image
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  JPG, PNG, or WebP · Maximum 10 MB
                </p>
              </div>
            </div>

            {/* Upload Area */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group mt-7 flex min-h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50/70 to-emerald-50/40 p-5 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50/40 sm:min-h-[340px]"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Selected product preview"
                  width={600}
                  height={400}
                  unoptimized
                  className="max-h-72 w-auto max-w-full rounded-xl object-contain"
                />
              ) : (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-8 w-8"
                    >
                      <path
                        d="M12 16V4m0 0L7 9m5-5 5 5M5 15v4a1 1 0 001 1h12a1 1 0 001-1v-4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <span className="mt-5 text-base font-semibold text-slate-800">
                    Click to upload an image
                  </span>

                  <span className="mt-2 text-center text-sm text-slate-500">
                    Choose an electronic product photo
                  </span>

                  <span className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500 shadow-sm">
                    Browse files
                  </span>
                </>
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) =>
                handleImageChange(event.target.files?.[0])
              }
            />

            {/* Selected File */}
            {image && (
              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                    >
                      <path
                        d="M7 3h7l5 5v13H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 3v5h5M9 13h6m-6 4h6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {image.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {(image.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  Change
                </button>
              </div>
            )}

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Estimate Button */}
            <button
              type="button"
              disabled={!image || loading}
              onClick={handleEstimate}
              className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 font-semibold text-white shadow-lg shadow-emerald-600/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-600/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Analyzing Product...
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3zM19 15l1.1 2.9L23 19l-2.9 1.1L19 23l-1.1-2.9L15 19l2.9-1.1L19 15z"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Estimate Product Price
                </>
              )}
            </button>

            {loading && (
              <p className="mt-4 text-center text-sm leading-6 text-slate-500">
                AI is identifying your product and checking market prices.
                This may take a little time.
              </p>
            )}

            <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-slate-50 px-4 py-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
              >
                <path
                  d="M12 3l8 4v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V7l8-4z"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12l2 2 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs leading-5 text-slate-500">
                Your estimate is based on AI analysis and available market
                pricing data.
              </p>
            </div>
          </section>

          {/* Results Card */}
          <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_40px_-18px_rgba(15,23,42,0.16)] sm:p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path
                    d="M4 19v-5h4v5H4zm6 0V9h4v10h-4zm6 0V4h4v15h-4z"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Estimation Results
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  AI insights and market comparison
                </p>
              </div>
            </div>

            {/* Empty State */}
            {!result && !loading && (
              <div className="mt-7 flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50/70 to-emerald-50/30 px-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-100 bg-white text-emerald-600 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-10 w-10"
                  >
                    <path
                      d="M4 19v-5h4v5H4zm6 0V9h4v10h-4zm6 0V4h4v15h-4z"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="mt-6 text-base font-semibold text-slate-800">
                  Your results will appear here
                </p>

                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Upload an image and click Estimate Product Price to see the
                  AI prediction and market prices.
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="mt-7 flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50/30">
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-200/50" />
                  <span className="relative h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
                </div>
                <p className="mt-5 font-semibold text-slate-800">
                  Analyzing your image...
                </p>
                <p className="mt-2 max-w-xs px-5 text-center text-sm leading-6 text-slate-500">
                  Identifying product details and comparing available market
                  prices.
                </p>
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="mt-7 space-y-5">
                {/* Predicted Price */}
                <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 sm:p-6">
                  <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-emerald-100/70 blur-2xl" />

                  <div className="relative">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-5 w-5"
                        >
                          <path
                            d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3z"
                            strokeLinejoin="round"
                          />
                        </svg>
                        AI Predicted Price
                      </p>

                      <span className="rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        {result.confidenceScore}% Confidence
                      </span>
                    </div>

                    <p className="mt-4 break-words text-3xl font-bold tracking-tight text-emerald-700 sm:text-4xl">
                      {formatPrice(result.aiPredictedPrice)}
                    </p>

                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-emerald-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(100, Number(result.confidenceScore) || 0),
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Price Comparison */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <path
                          d="M20 13L11 22 2 13V4h9l9 9z"
                          strokeLinejoin="round"
                        />
                        <circle cx="7" cy="8" r="1" />
                      </svg>
                    </div>
                    <p className="mt-3 text-xs font-medium text-slate-500">
                      Lowest Price
                    </p>
                    <p className="mt-1 break-words text-base font-bold text-emerald-700">
                      {formatPrice(result.lowestPrice)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <path
                          d="M4 19v-5h4v5H4zm6 0V9h4v10h-4zm6 0V4h4v15h-4z"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="mt-3 text-xs font-medium text-slate-500">
                      Average Price
                    </p>
                    <p className="mt-1 break-words text-base font-bold text-slate-800">
                      {formatPrice(result.averagePrice)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-amber-200 hover:shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <path
                          d="M8 21h8m-4-4v4M5 4l2 2 5-3 5 3 2-2 2 6H3l2-6zM5 10l2 7h10l2-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="mt-3 text-xs font-medium text-slate-500">
                      Highest Price
                    </p>
                    <p className="mt-1 break-words text-base font-bold text-amber-600">
                      {formatPrice(result.highestPrice)}
                    </p>
                  </div>
                </div>

                {/* Detected Product */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <rect
                          x="4"
                          y="10"
                          width="16"
                          height="11"
                          rx="2"
                        />
                        <path
                          d="M8 10V7a4 4 0 018 0v3m-4 4v3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Detected Product
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        AI-identified product information
                      </p>
                    </div>
                  </div>

                  <dl className="mt-2 divide-y divide-slate-100 text-sm">
                    <div className="flex items-start justify-between gap-4 py-3">
                      <dt className="shrink-0 text-slate-500">Category</dt>
                      <dd className="text-right font-medium text-slate-800">
                        {result.detectedCategory}
                      </dd>
                    </div>

                    <div className="flex items-start justify-between gap-4 py-3">
                      <dt className="shrink-0 text-slate-500">Brand</dt>
                      <dd className="text-right font-medium text-slate-800">
                        {result.detectedBrand || "Unknown"}
                      </dd>
                    </div>

                    <div className="flex items-start justify-between gap-4 py-3">
                      <dt className="shrink-0 text-slate-500">Model</dt>
                      <dd className="max-w-[70%] break-words text-right font-medium text-slate-800">
                        {result.detectedModel || "Unknown"}
                      </dd>
                    </div>

                    <div className="flex items-start justify-between gap-4 py-3">
                      <dt className="shrink-0 text-slate-500">Condition</dt>
                      <dd className="text-right font-medium text-slate-800">
                        {result.condition}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Market Sources */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Market Sources
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Compare prices across available sellers
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {result.sources.length} sources
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {result.sources.map((source, index) => (
                      <div
                        key={`${source.sourceUrl}-${index}`}
                        className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-900/5 sm:gap-4 sm:p-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-emerald-700">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-5 w-5"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path
                              d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {source.sourceName}
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                            {source.productName}
                          </p>

                          <p className="mt-2 break-words text-sm font-bold text-slate-900 sm:hidden">
                            {formatPrice(source.price)}
                          </p>
                        </div>

                        <div className="hidden shrink-0 text-right sm:block">
                          <p className="text-sm font-bold text-slate-900">
                            {formatPrice(source.price)}
                          </p>
                        </div>

                        <a
                          href={source.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 rounded-xl border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white sm:px-4 sm:text-sm"
                        >
                          View
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Footer Disclaimer */}
        <footer className="mt-8 flex items-start justify-center gap-2 px-3 text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              d="M12 11v5m0-8h.01"
              strokeLinecap="round"
            />
          </svg>

          <p className="max-w-3xl text-xs leading-6 text-slate-500">
            AI-generated estimates are indicative only. Actual prices may vary
            depending on product condition, specifications, seller, and
            location.
          </p>
        </footer>
      </div>
    </main>
  );
}