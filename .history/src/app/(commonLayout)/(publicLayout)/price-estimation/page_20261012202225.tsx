
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
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
            EcoValuate AI
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            AI Product Price Estimation
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Upload an electronic product image. Our AI will identify the
            product and estimate its market price using available shopping
            sources.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-8">
            <h2 className="text-xl font-semibold">Upload Product Image</h2>

            <p className="mt-2 text-sm text-slate-400">
              JPG, PNG, or WebP. Maximum size: 10 MB.
            </p>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-6 flex min-h-72 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 p-4 transition hover:border-emerald-400"
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
                  <span className="text-5xl">♻️</span>
                  <span className="mt-4 font-medium">
                    Click to upload an image
                  </span>
                  <span className="mt-2 text-sm text-slate-500">
                    Choose an electronic product photo
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

            {image && (
              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-slate-800 p-3">
                <span className="truncate text-sm text-slate-300">
                  {image.name}
                </span>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="shrink-0 text-sm font-medium text-emerald-400 hover:text-emerald-300"
                >
                  Change
                </button>
              </div>
            )}

            {error && (
              <p role="alert" className="mt-4 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="button"
              disabled={!image || loading}
              onClick={handleEstimate}
              className="mt-6 w-full rounded-xl bg-emerald-500 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Analyzing Product..." : "Estimate Product Price"}
            </button>

            {loading && (
              <p className="mt-3 text-center text-sm text-slate-400">
                AI is identifying your product and checking market prices.
                This may take a little time.
              </p>
            )}
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-8">
            <h2 className="text-xl font-semibold">Estimation Results</h2>

            {!result && !loading && (
              <div className="mt-6 flex min-h-72 flex-col items-center justify-center rounded-2xl bg-slate-950 px-6 text-center">
                <span className="text-4xl">📊</span>
                <p className="mt-4 font-medium">Your results will appear here</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Upload an image and click Estimate Product Price to see the
                  AI prediction and market prices.
                </p>
              </div>
            )}

            {loading && (
              <div className="mt-6 flex min-h-72 flex-col items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-400" />
                <p className="mt-4 text-slate-300">Analyzing your image...</p>
              </div>
            )}

            {result && (
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <p className="text-sm text-emerald-300">
                    AI Predicted Price
                  </p>
                  <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                    {formatPrice(result.aiPredictedPrice)}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">
                    Confidence: {result.confidenceScore}%
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="rounded-xl bg-slate-950 p-3 sm:p-4">
                    <p className="text-xs text-slate-400">Lowest Price</p>
                    <p className="mt-2 break-words text-sm font-semibold text-emerald-400 sm:text-base">
                      {formatPrice(result.lowestPrice)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-3 sm:p-4">
                    <p className="text-xs text-slate-400">Average Price</p>
                    <p className="mt-2 break-words text-sm font-semibold sm:text-base">
                      {formatPrice(result.averagePrice)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-3 sm:p-4">
                    <p className="text-xs text-slate-400">Highest Price</p>
                    <p className="mt-2 break-words text-sm font-semibold text-amber-400 sm:text-base">
                      {formatPrice(result.highestPrice)}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <h3 className="font-semibold">Detected Product</h3>

                  <dl className="mt-3 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-400">Category</dt>
                      <dd className="text-right">{result.detectedCategory}</dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-400">Brand</dt>
                      <dd className="text-right">
                        {result.detectedBrand || "Unknown"}
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-400">Model</dt>
                      <dd className="text-right">
                        {result.detectedModel || "Unknown"}
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-400">Condition</dt>
                      <dd className="text-right">{result.condition}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Market Sources ({result.sources.length})
                  </h3>

                  <div className="mt-3 space-y-3">
                    {result.sources.map((source, index) => (
                      <div
                        key={`${source.sourceUrl}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 p-3"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-emerald-300">
                            {source.sourceName}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                            {source.productName}
                          </p>
                          <p className="mt-1 text-sm font-semibold">
                            {formatPrice(source.price)}
                          </p>
                        </div>

                        <a
                          href={source.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 rounded-lg border border-slate-700 px-3 py-2 text-sm hover:border-emerald-400 hover:text-emerald-300"
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

        <p className="mt-8 text-center text-xs leading-6 text-slate-500">
          AI-generated estimates are indicative only. Actual prices may vary
          depending on product condition, specifications, seller, and location.
        </p>
      </div>
    </main>
  );
}
