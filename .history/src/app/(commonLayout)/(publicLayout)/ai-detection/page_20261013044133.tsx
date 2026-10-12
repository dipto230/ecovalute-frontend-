
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  estimateImagePrice,
  type IImagePriceEstimate,
  type IEWasteRecoveryReport,
} from "@/src/services/price-estimation.service";

const formatPrice = (value: string | number, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const formatWeight = (min: number, max: number) =>
  `${Number(min).toLocaleString("en-IN")}–${Number(max).toLocaleString("en-IN")} g`;

function RecoveryAnalysis({
  report,
}: {
  report: IEWasteRecoveryReport;
}) {
  const currency = report.currency || "INR";

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
            ♻
          </span>
          <div>
            <p className="text-sm font-medium text-emerald-100">
              EcoValuate AI
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              E-Waste Recovery Analysis
            </h2>
          </div>
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-50">
          Understand the potential material value, processing costs, and
          recovery opportunities for your electronic device.
        </p>

        <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5">
          <p className="text-sm text-emerald-100">
            Estimated Net Recovery Value
          </p>
          <p className="mt-2 text-3xl font-bold sm:text-4xl">
            {formatPrice(report.estimatedNetValueMin, currency)}
            <span className="mx-2 text-xl font-normal text-emerald-100">
              –
            </span>
            {formatPrice(report.estimatedNetValueMax, currency)}
          </p>
          <p className="mt-3 text-sm text-emerald-100">
            Estimated value after processing costs
          </p>
        </div>
      </div>

      <div className="space-y-7 p-5 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Estimated Device Weight</p>
            <p className="mt-2 text-xl font-bold text-slate-900">
              {formatWeight(
                report.estimatedWeightMinGrams,
                report.estimatedWeightMaxGrams
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Gross Material Value</p>
            <p className="mt-2 text-xl font-bold text-emerald-700">
              {formatPrice(report.estimatedGrossValueMin, currency)}
              <span className="mx-1 text-slate-400">–</span>
              {formatPrice(report.estimatedGrossValueMax, currency)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5 sm:col-span-2 lg:col-span-1">
            <p className="text-sm text-slate-500">Processing Cost</p>
            <p className="mt-2 text-xl font-bold text-amber-600">
              {formatPrice(report.processingCostMin, currency)}
              <span className="mx-1 text-slate-400">–</span>
              {formatPrice(report.processingCostMax, currency)}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900">
              AI Recommendation
            </h3>
            <span className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm font-semibold text-emerald-800">
              {report.recommendation}
            </span>
          </div>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            {report.recommendationReason}
          </p>

          <p className="mt-3 text-xs text-slate-500">
            Recovery analysis confidence: {report.confidenceScore}%
          </p>
        </div>

        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900">
              Recoverable Materials
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Estimated material quantities and potential recovery values.
            </p>
          </div>

          {report.materials?.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {report.materials.map((material, index) => {
                const rate = Math.max(
                  0,
                  Math.min(100, Number(material.recoveryRate) || 0)
                );

                return (
                  <article
                    key={material.id || `${material.materialName}-${index}`}
                    className="rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-300 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900">
                          {material.materialName}
                        </h4>
                        <p className="mt-1 text-sm text-slate-500">
                          Estimated material weight
                        </p>
                      </div>

                      <span className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
                        {rate.toFixed(1)}%
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-800">
                      {formatWeight(
                        material.estimatedWeightMinGrams,
                        material.estimatedWeightMaxGrams
                      )}
                    </p>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${rate}%` }}
                      />
                    </div>

                    <div className="mt-4 rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">
                        Estimated Material Value
                      </p>
                      <p className="mt-1 break-words font-bold text-emerald-700">
                        {formatPrice(material.estimatedValueMin, currency)}
                        <span className="mx-1 text-slate-400">–</span>
                        {formatPrice(material.estimatedValueMax, currency)}
                      </p>
                    </div>

                    <p className="mt-3 text-xs leading-5 text-slate-500">
                      Recovered weight:{" "}
                      {formatWeight(
                        material.recoveredWeightMinGrams,
                        material.recoveredWeightMaxGrams
                      )}
                    </p>

                    {material.notes && (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {material.notes}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500">
              No material breakdown is available for this device.
            </p>
          )}
        </div>

        {report.assumptions && (
          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900">
              Assumptions & Limitations
            </h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
              {report.assumptions}
            </p>
          </div>
        )}

        <p className="text-xs leading-6 text-slate-500">
          Recovery values are estimates, not guaranteed resale or recycling
          payments. Actual material quantities and prices depend on device
          condition, dismantling, local recycling rates, and market conditions.
        </p>
      </div>
    </section>
  );
}

export default function AIDetectionPage() {
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

    if (preview) URL.revokeObjectURL(preview);

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError("");
  };

  const handleDetection = async () => {
    if (!image) {
      setError("Please upload an electronic device image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const data = await estimateImagePrice(image);
      setResult(data);

      if (!data.recoveryReport) {
        setError(
          "Device detection completed, but the API did not return a recovery report."
        );
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "AI detection failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50 p-6 text-center sm:p-12">
          <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700">
            ♻ EcoValuate AI Detection
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            E-Waste{" "}
            <span className="text-emerald-700">AI Detection</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Upload an electronic device image to identify its category, brand,
            model, and condition, then explore its potential material recovery
            value.
          </p>
        </header>

        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">Detect Your Electronic Device</h2>
          <p className="mt-2 text-sm text-slate-500">
            JPG, PNG, or WebP · Maximum 10 MB
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-emerald-500 hover:bg-emerald-50/50"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Selected electronic device"
                width={700}
                height={450}
                unoptimized
                className="max-h-72 w-auto max-w-full rounded-xl object-contain"
              />
            ) : (
              <>
                <span className="text-4xl">📷</span>
                <span className="mt-4 font-semibold">
                  Upload device image
                </span>
                <span className="mt-2 text-sm text-slate-500">
                  Click here to browse your files
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
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="break-all text-slate-600">{image.name}</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-semibold text-emerald-700 hover:underline"
              >
                Change image
              </button>
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
            >
              {error}
            </p>
          )}

          <button
            type="button"
            disabled={!image || loading}
            onClick={handleDetection}
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-700 px-5 py-4 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {loading ? "Detecting Device..." : "Detect Device & Analyze Recovery"}
          </button>
        </section>

        {result && (
          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  DETECTION COMPLETED
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  Detected Device Information
                </h2>
              </div>

              <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                {result.detectionConfidence}% Detection Confidence
              </span>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Category", result.detectedCategory],
                ["Brand", result.detectedBrand || "Unknown"],
                ["Model", result.detectedModel || "Unknown"],
                ["Condition", result.condition],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <dt className="text-sm text-slate-500">{label}</dt>
                  <dd className="mt-2 break-words font-bold text-slate-900">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {result.recoveryReport ? (
              <RecoveryAnalysis report={result.recoveryReport} />
            ) : (
              <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="font-bold text-amber-900">
                  Recovery report unavailable
                </h3>
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  Detection succeeded, but this response did not contain
                  recoveryReport. Check that the backend includes the recovery
                  report in the image estimation response.
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
