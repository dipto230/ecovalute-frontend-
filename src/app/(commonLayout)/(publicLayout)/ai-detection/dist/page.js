"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var price_estimation_service_1 = require("@/src/services/price-estimation.service");
var formatPrice = function (value, currency) {
    if (currency === void 0) { currency = "INR"; }
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 2
    }).format(Number(value) || 0);
};
var formatWeight = function (min, max) {
    return Number(min).toLocaleString("en-IN") + "\u2013" + Number(max).toLocaleString("en-IN") + " g";
};
function RecoveryAnalysis(_a) {
    var _b;
    var report = _a.report;
    var currency = report.currency || "INR";
    return (React.createElement("section", { className: "mt-8 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm" },
        React.createElement("div", { className: "bg-gradient-to-r from-emerald-700 to-teal-700 p-6 text-white sm:p-8" },
            React.createElement("div", { className: "flex flex-wrap items-center gap-3" },
                React.createElement("span", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl" }, "\u267B"),
                React.createElement("div", null,
                    React.createElement("p", { className: "text-sm font-medium text-emerald-100" }, "EcoValuate AI"),
                    React.createElement("h2", { className: "text-2xl font-bold sm:text-3xl" }, "E-Waste Recovery Analysis"))),
            React.createElement("p", { className: "mt-4 max-w-3xl text-sm leading-7 text-emerald-50" }, "Understand the potential material value, processing costs, and recovery opportunities for your electronic device."),
            React.createElement("div", { className: "mt-6 rounded-2xl border border-white/20 bg-white/10 p-5" },
                React.createElement("p", { className: "text-sm text-emerald-100" }, "Estimated Net Recovery Value"),
                React.createElement("p", { className: "mt-2 text-3xl font-bold sm:text-4xl" },
                    formatPrice(report.estimatedNetValueMin, currency),
                    React.createElement("span", { className: "mx-2 text-xl font-normal text-emerald-100" }, "\u2013"),
                    formatPrice(report.estimatedNetValueMax, currency)),
                React.createElement("p", { className: "mt-3 text-sm text-emerald-100" }, "Estimated value after processing costs"))),
        React.createElement("div", { className: "space-y-7 p-5 sm:p-8" },
            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" },
                React.createElement("div", { className: "rounded-2xl border border-slate-200 p-5" },
                    React.createElement("p", { className: "text-sm text-slate-500" }, "Estimated Device Weight"),
                    React.createElement("p", { className: "mt-2 text-xl font-bold text-slate-900" }, formatWeight(report.estimatedWeightMinGrams, report.estimatedWeightMaxGrams))),
                React.createElement("div", { className: "rounded-2xl border border-slate-200 p-5" },
                    React.createElement("p", { className: "text-sm text-slate-500" }, "Gross Material Value"),
                    React.createElement("p", { className: "mt-2 text-xl font-bold text-emerald-700" },
                        formatPrice(report.estimatedGrossValueMin, currency),
                        React.createElement("span", { className: "mx-1 text-slate-400" }, "\u2013"),
                        formatPrice(report.estimatedGrossValueMax, currency))),
                React.createElement("div", { className: "rounded-2xl border border-slate-200 p-5 sm:col-span-2 lg:col-span-1" },
                    React.createElement("p", { className: "text-sm text-slate-500" }, "Processing Cost"),
                    React.createElement("p", { className: "mt-2 text-xl font-bold text-amber-600" },
                        formatPrice(report.processingCostMin, currency),
                        React.createElement("span", { className: "mx-1 text-slate-400" }, "\u2013"),
                        formatPrice(report.processingCostMax, currency)))),
            React.createElement("div", { className: "rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5" },
                React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3" },
                    React.createElement("h3", { className: "text-lg font-bold text-slate-900" }, "AI Recommendation"),
                    React.createElement("span", { className: "rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm font-semibold text-emerald-800" }, report.recommendation)),
                React.createElement("p", { className: "mt-3 text-sm leading-7 text-slate-700" }, report.recommendationReason),
                React.createElement("p", { className: "mt-3 text-xs text-slate-500" },
                    "Recovery analysis confidence: ",
                    report.confidenceScore,
                    "%")),
            React.createElement("div", null,
                React.createElement("div", { className: "mb-4" },
                    React.createElement("h3", { className: "text-xl font-bold text-slate-900" }, "Recoverable Materials"),
                    React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Estimated material quantities and potential recovery values.")),
                ((_b = report.materials) === null || _b === void 0 ? void 0 : _b.length) ? (React.createElement("div", { className: "grid gap-4 md:grid-cols-2" }, report.materials.map(function (material, index) {
                    var rate = Math.max(0, Math.min(100, Number(material.recoveryRate) || 0));
                    return (React.createElement("article", { key: material.id || material.materialName + "-" + index, className: "rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-300 hover:shadow-sm" },
                        React.createElement("div", { className: "flex items-start justify-between gap-3" },
                            React.createElement("div", null,
                                React.createElement("h4", { className: "font-bold text-slate-900" }, material.materialName),
                                React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Estimated material weight")),
                            React.createElement("span", { className: "rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700" },
                                rate.toFixed(1),
                                "%")),
                        React.createElement("p", { className: "mt-3 text-sm font-semibold text-slate-800" }, formatWeight(material.estimatedWeightMinGrams, material.estimatedWeightMaxGrams)),
                        React.createElement("div", { className: "mt-3 h-2 overflow-hidden rounded-full bg-slate-100" },
                            React.createElement("div", { className: "h-full rounded-full bg-emerald-500", style: { width: rate + "%" } })),
                        React.createElement("div", { className: "mt-4 rounded-xl bg-slate-50 p-3" },
                            React.createElement("p", { className: "text-xs text-slate-500" }, "Estimated Material Value"),
                            React.createElement("p", { className: "mt-1 break-words font-bold text-emerald-700" },
                                formatPrice(material.estimatedValueMin, currency),
                                React.createElement("span", { className: "mx-1 text-slate-400" }, "\u2013"),
                                formatPrice(material.estimatedValueMax, currency))),
                        React.createElement("p", { className: "mt-3 text-xs leading-5 text-slate-500" },
                            "Recovered weight:",
                            " ",
                            formatWeight(material.recoveredWeightMinGrams, material.recoveredWeightMaxGrams)),
                        material.notes && (React.createElement("p", { className: "mt-3 text-sm leading-6 text-slate-600" }, material.notes))));
                }))) : (React.createElement("p", { className: "rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500" }, "No material breakdown is available for this device."))),
            report.assumptions && (React.createElement("div", { className: "rounded-2xl border border-slate-200 p-5" },
                React.createElement("h3", { className: "font-bold text-slate-900" }, "Assumptions & Limitations"),
                React.createElement("p", { className: "mt-2 whitespace-pre-line text-sm leading-7 text-slate-600" }, report.assumptions))),
            React.createElement("p", { className: "text-xs leading-6 text-slate-500" }, "Recovery values are estimates, not guaranteed resale or recycling payments. Actual material quantities and prices depend on device condition, dismantling, local recycling rates, and market conditions."))));
}
function AIDetectionPage() {
    var _this = this;
    var fileInputRef = react_1.useRef(null);
    var _a = react_1.useState(null), image = _a[0], setImage = _a[1];
    var _b = react_1.useState(""), preview = _b[0], setPreview = _b[1];
    var _c = react_1.useState(null), result = _c[0], setResult = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState(""), error = _e[0], setError = _e[1];
    var handleImageChange = function (file) {
        if (!file)
            return;
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setError("Image size must be 10 MB or less.");
            return;
        }
        if (preview)
            URL.revokeObjectURL(preview);
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setResult(null);
        setError("");
    };
    var handleDetection = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!image) {
                        setError("Please upload an electronic device image first.");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setLoading(true);
                    setError("");
                    setResult(null);
                    return [4 /*yield*/, price_estimation_service_1.estimateImagePrice(image)];
                case 2:
                    data = _a.sent();
                    setResult(data);
                    if (!data.recoveryReport) {
                        setError("Device detection completed, but the API did not return a recovery report.");
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    setError(err_1 instanceof Error
                        ? err_1.message
                        : "AI detection failed. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("main", { className: "min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "mx-auto max-w-6xl" },
            React.createElement("header", { className: "overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50 p-6 text-center sm:p-12" },
                React.createElement("span", { className: "inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700" }, "\u267B EcoValuate AI Detection"),
                React.createElement("h1", { className: "mt-5 text-3xl font-bold tracking-tight sm:text-5xl" },
                    "E-Waste",
                    " ",
                    React.createElement("span", { className: "text-emerald-700" }, "AI Detection")),
                React.createElement("p", { className: "mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base" }, "Upload an electronic device image to identify its category, brand, model, and condition, then explore its potential material recovery value.")),
            React.createElement("section", { className: "mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8" },
                React.createElement("h2", { className: "text-xl font-bold" }, "Detect Your Electronic Device"),
                React.createElement("p", { className: "mt-2 text-sm text-slate-500" }, "JPG, PNG, or WebP \u00B7 Maximum 10 MB"),
                React.createElement("button", { type: "button", onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: "mt-5 flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-emerald-500 hover:bg-emerald-50/50" }, preview ? (React.createElement(image_1["default"], { src: preview, alt: "Selected electronic device", width: 700, height: 450, unoptimized: true, className: "max-h-72 w-auto max-w-full rounded-xl object-contain" })) : (React.createElement(React.Fragment, null,
                    React.createElement("span", { className: "text-4xl" }, "\uD83D\uDCF7"),
                    React.createElement("span", { className: "mt-4 font-semibold" }, "Upload device image"),
                    React.createElement("span", { className: "mt-2 text-sm text-slate-500" }, "Click here to browse your files")))),
                React.createElement("input", { ref: fileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: function (event) { var _a; return handleImageChange((_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0]); } }),
                image && (React.createElement("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-3 text-sm" },
                    React.createElement("span", { className: "break-all text-slate-600" }, image.name),
                    React.createElement("button", { type: "button", onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: "font-semibold text-emerald-700 hover:underline" }, "Change image"))),
                error && (React.createElement("p", { role: "alert", className: "mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800" }, error)),
                React.createElement("button", { type: "button", disabled: !image || loading, onClick: handleDetection, className: "mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-700 px-5 py-4 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50" },
                    loading && (React.createElement("span", { className: "h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" })),
                    loading ? "Detecting Device..." : "Detect Device & Analyze Recovery")),
            result && (React.createElement("section", { className: "mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8" },
                React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm font-semibold text-emerald-700" }, "DETECTION COMPLETED"),
                        React.createElement("h2", { className: "mt-1 text-2xl font-bold" }, "Detected Device Information")),
                    React.createElement("span", { className: "rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800" },
                        result.detectionConfidence,
                        "% Detection Confidence")),
                React.createElement("dl", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" }, [
                    ["Category", result.detectedCategory],
                    ["Brand", result.detectedBrand || "Unknown"],
                    ["Model", result.detectedModel || "Unknown"],
                    ["Condition", result.condition],
                ].map(function (_a) {
                    var label = _a[0], value = _a[1];
                    return (React.createElement("div", { key: label, className: "rounded-2xl border border-slate-200 bg-slate-50 p-4" },
                        React.createElement("dt", { className: "text-sm text-slate-500" }, label),
                        React.createElement("dd", { className: "mt-2 break-words font-bold text-slate-900" }, value)));
                })),
                result.recoveryReport ? (React.createElement(RecoveryAnalysis, { report: result.recoveryReport })) : (React.createElement("div", { className: "mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5" },
                    React.createElement("h3", { className: "font-bold text-amber-900" }, "Recovery report unavailable"),
                    React.createElement("p", { className: "mt-2 text-sm leading-6 text-amber-800" }, "Detection succeeded, but this response did not contain recoveryReport. Check that the backend includes the recovery report in the image estimation response."))))))));
}
exports["default"] = AIDetectionPage;
