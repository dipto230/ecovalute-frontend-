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
var formatPrice = function (price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    }).format(Number(price));
};
function PriceEstimationPage() {
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
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setResult(null);
        setError("");
    };
    var handleEstimate = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!image) {
                        setError("Please upload a product image first.");
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
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    if (err_1 instanceof Error) {
                        setError(err_1.message);
                    }
                    else {
                        setError("Price estimation failed. Please try again.");
                    }
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("main", { className: "min-h-screen bg-white px-4 py-10 text-slate-900 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "mx-auto max-w-7xl" },
            React.createElement("header", { className: "relative mb-10 overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50/80 px-5 py-12 text-center sm:px-10 sm:py-16" },
                React.createElement("div", { className: "pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" }),
                React.createElement("div", { className: "pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-teal-100/50 blur-3xl" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm" },
                        React.createElement("span", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100" }, "\u267B"),
                        "EcoValuate AI"),
                    React.createElement("h1", { className: "mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl" },
                        "AI Product",
                        " ",
                        React.createElement("span", { className: "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" }, "Price Estimation")),
                    React.createElement("p", { className: "mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base" }, "Upload an electronic product image. Our AI will identify the product and estimate its market price using available shopping sources."),
                    React.createElement("div", { className: "mt-7 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500 sm:text-sm" },
                        React.createElement("span", { className: "rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm" }, "\u2726 AI-powered analysis"),
                        React.createElement("span", { className: "rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm" }, "\u2197 Market price comparison"),
                        React.createElement("span", { className: "rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm" }, "\u267B Sustainable technology")))),
            React.createElement("div", { className: "grid items-start gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-8" },
                React.createElement("section", { className: "rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_40px_-18px_rgba(15,23,42,0.16)] sm:p-7" },
                    React.createElement("div", { className: "flex items-center gap-4" },
                        React.createElement("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-700" },
                            React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", className: "h-6 w-6" },
                                React.createElement("path", { d: "M12 16V4m0 0L7 9m5-5 5 5M5 15v4a1 1 0 001 1h12a1 1 0 001-1v-4", strokeLinecap: "round", strokeLinejoin: "round" }))),
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-lg font-bold text-slate-900" }, "Upload Product Image"),
                            React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "JPG, PNG, or WebP \u00B7 Maximum 10 MB"))),
                    React.createElement("button", { type: "button", onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: "group mt-7 flex min-h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50/70 to-emerald-50/40 p-5 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50/40 sm:min-h-[340px]" }, preview ? (React.createElement(image_1["default"], { src: preview, alt: "Selected product preview", width: 600, height: 400, unoptimized: true, className: "max-h-72 w-auto max-w-full rounded-xl object-contain" })) : (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-sm transition-transform duration-300 group-hover:-translate-y-1" },
                            React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", className: "h-8 w-8" },
                                React.createElement("path", { d: "M12 16V4m0 0L7 9m5-5 5 5M5 15v4a1 1 0 001 1h12a1 1 0 001-1v-4", strokeLinecap: "round", strokeLinejoin: "round" }))),
                        React.createElement("span", { className: "mt-5 text-base font-semibold text-slate-800" }, "Click to upload an image"),
                        React.createElement("span", { className: "mt-2 text-center text-sm text-slate-500" }, "Choose an electronic product photo"),
                        React.createElement("span", { className: "mt-5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500 shadow-sm" }, "Browse files")))),
                    React.createElement("input", { ref: fileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: function (event) { var _a; return handleImageChange((_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0]); } }),
                    image && (React.createElement("div", { className: "mt-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5" },
                        React.createElement("div", { className: "flex min-w-0 items-center gap-3" },
                            React.createElement("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" },
                                React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", className: "h-5 w-5" },
                                    React.createElement("path", { d: "M7 3h7l5 5v13H7a2 2 0 01-2-2V5a2 2 0 012-2z", strokeLinejoin: "round" }),
                                    React.createElement("path", { d: "M14 3v5h5M9 13h6m-6 4h6", strokeLinecap: "round" }))),
                            React.createElement("div", { className: "min-w-0" },
                                React.createElement("p", { className: "truncate text-sm font-semibold text-slate-800" }, image.name),
                                React.createElement("p", { className: "mt-1 text-xs text-slate-500" },
                                    (image.size / (1024 * 1024)).toFixed(2),
                                    " MB"))),
                        React.createElement("button", { type: "button", onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: "shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50" }, "Change"))),
                    error && (React.createElement("p", { role: "alert", className: "mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600" }, error)),
                    React.createElement("button", { type: "button", disabled: !image || loading, onClick: handleEstimate, className: "mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 font-semibold text-white shadow-lg shadow-emerald-600/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-600/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0" }, loading ? (React.createElement(React.Fragment, null,
                        React.createElement("span", { className: "h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" }),
                        "Analyzing Product...")) : (React.createElement(React.Fragment, null,
                        React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", className: "h-5 w-5" },
                            React.createElement("path", { d: "M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3zM19 15l1.1 2.9L23 19l-2.9 1.1L19 23l-1.1-2.9L15 19l2.9-1.1L19 15z", strokeLinejoin: "round" })),
                        "Estimate Product Price"))),
                    loading && (React.createElement("p", { className: "mt-4 text-center text-sm leading-6 text-slate-500" }, "AI is identifying your product and checking market prices. This may take a little time.")),
                    React.createElement("div", { className: "mt-5 flex items-start gap-2.5 rounded-xl bg-slate-50 px-4 py-3" },
                        React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", className: "mt-0.5 h-4 w-4 shrink-0 text-emerald-600" },
                            React.createElement("path", { d: "M12 3l8 4v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V7l8-4z", strokeLinejoin: "round" }),
                            React.createElement("path", { d: "M9 12l2 2 4-4", strokeLinecap: "round", strokeLinejoin: "round" })),
                        React.createElement("p", { className: "text-xs leading-5 text-slate-500" }, "Your estimate is based on AI analysis and available market pricing data."))),
                React.createElement("section", { className: "min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_40px_-18px_rgba(15,23,42,0.16)] sm:p-7" },
                    React.createElement("div", { className: "flex items-center gap-4" },
                        React.createElement("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700" },
                            React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", className: "h-6 w-6" },
                                React.createElement("path", { d: "M4 19v-5h4v5H4zm6 0V9h4v10h-4zm6 0V4h4v15h-4z", strokeLinejoin: "round" }))),
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-lg font-bold text-slate-900" }, "Estimation Results"),
                            React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "AI insights and market comparison"))),
                    !result && !loading && (React.createElement("div", { className: "mt-7 flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50/70 to-emerald-50/30 px-6 text-center" },
                        React.createElement("div", { className: "flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-100 bg-white text-emerald-600 shadow-sm" },
                            React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "h-10 w-10" },
                                React.createElement("path", { d: "M4 19v-5h4v5H4zm6 0V9h4v10h-4zm6 0V4h4v15h-4z", strokeLinejoin: "round" }))),
                        React.createElement("p", { className: "mt-6 text-base font-semibold text-slate-800" }, "Your results will appear here"),
                        React.createElement("p", { className: "mt-2 max-w-xs text-sm leading-6 text-slate-500" }, "Upload an image and click Estimate Product Price to see the AI prediction and market prices."))),
                    loading && (React.createElement("div", { className: "mt-7 flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50/30" },
                        React.createElement("div", { className: "relative flex h-16 w-16 items-center justify-center" },
                            React.createElement("span", { className: "absolute inset-0 animate-ping rounded-full bg-emerald-200/50" }),
                            React.createElement("span", { className: "relative h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" })),
                        React.createElement("p", { className: "mt-5 font-semibold text-slate-800" }, "Analyzing your image..."),
                        React.createElement("p", { className: "mt-2 max-w-xs px-5 text-center text-sm leading-6 text-slate-500" }, "Identifying product details and comparing available market prices."))),
                    result && (React.createElement("div", { className: "mt-7 space-y-5" },
                        React.createElement("div", { className: "relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 sm:p-6" },
                            React.createElement("div", { className: "pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-emerald-100/70 blur-2xl" }),
                            React.createElement("div", { className: "relative" },
                                React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3" },
                                    React.createElement("p", { className: "flex items-center gap-2 text-sm font-semibold text-emerald-800" },
                                        React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", className: "h-5 w-5" },
                                            React.createElement("path", { d: "M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3z", strokeLinejoin: "round" })),
                                        "AI Predicted Price"),
                                    React.createElement("span", { className: "rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-700" },
                                        result.confidenceScore,
                                        "% Confidence")),
                                React.createElement("p", { className: "mt-4 break-words text-3xl font-bold tracking-tight text-emerald-700 sm:text-4xl" }, formatPrice(result.aiPredictedPrice)),
                                React.createElement("div", { className: "mt-5 h-1.5 overflow-hidden rounded-full bg-emerald-100" },
                                    React.createElement("div", { className: "h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500", style: {
                                            width: Math.max(0, Math.min(100, Number(result.confidenceScore) || 0)) + "%"
                                        } })))),
                        React.createElement("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-3" },
                            React.createElement("div", { className: "rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:shadow-sm" },
                                React.createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" },
                                    React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", className: "h-5 w-5" },
                                        React.createElement("path", { d: "M20 13L11 22 2 13V4h9l9 9z", strokeLinejoin: "round" }),
                                        React.createElement("circle", { cx: "7", cy: "8", r: "1" }))),
                                React.createElement("p", { className: "mt-3 text-xs font-medium text-slate-500" }, "Lowest Price"),
                                React.createElement("p", { className: "mt-1 break-words text-base font-bold text-emerald-700" }, formatPrice(result.lowestPrice))),
                            React.createElement("div", { className: "rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm" },
                                React.createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700" },
                                    React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", className: "h-5 w-5" },
                                        React.createElement("path", { d: "M4 19v-5h4v5H4zm6 0V9h4v10h-4zm6 0V4h4v15h-4z", strokeLinejoin: "round" }))),
                                React.createElement("p", { className: "mt-3 text-xs font-medium text-slate-500" }, "Average Price"),
                                React.createElement("p", { className: "mt-1 break-words text-base font-bold text-slate-800" }, formatPrice(result.averagePrice))),
                            React.createElement("div", { className: "rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-amber-200 hover:shadow-sm" },
                                React.createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600" },
                                    React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", className: "h-5 w-5" },
                                        React.createElement("path", { d: "M8 21h8m-4-4v4M5 4l2 2 5-3 5 3 2-2 2 6H3l2-6zM5 10l2 7h10l2-7", strokeLinecap: "round", strokeLinejoin: "round" }))),
                                React.createElement("p", { className: "mt-3 text-xs font-medium text-slate-500" }, "Highest Price"),
                                React.createElement("p", { className: "mt-1 break-words text-base font-bold text-amber-600" }, formatPrice(result.highestPrice)))),
                        React.createElement("div", { className: "rounded-2xl border border-slate-200 bg-white p-4 sm:p-5" },
                            React.createElement("div", { className: "flex items-center gap-3 border-b border-slate-100 pb-4" },
                                React.createElement("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" },
                                    React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", className: "h-5 w-5" },
                                        React.createElement("rect", { x: "4", y: "10", width: "16", height: "11", rx: "2" }),
                                        React.createElement("path", { d: "M8 10V7a4 4 0 018 0v3m-4 4v3", strokeLinecap: "round" }))),
                                React.createElement("div", null,
                                    React.createElement("h3", { className: "font-bold text-slate-900" }, "Detected Product"),
                                    React.createElement("p", { className: "mt-0.5 text-xs text-slate-500" }, "AI-identified product information"))),
                            React.createElement("dl", { className: "mt-2 divide-y divide-slate-100 text-sm" },
                                React.createElement("div", { className: "flex items-start justify-between gap-4 py-3" },
                                    React.createElement("dt", { className: "shrink-0 text-slate-500" }, "Category"),
                                    React.createElement("dd", { className: "text-right font-medium text-slate-800" }, result.detectedCategory)),
                                React.createElement("div", { className: "flex items-start justify-between gap-4 py-3" },
                                    React.createElement("dt", { className: "shrink-0 text-slate-500" }, "Brand"),
                                    React.createElement("dd", { className: "text-right font-medium text-slate-800" }, result.detectedBrand || "Unknown")),
                                React.createElement("div", { className: "flex items-start justify-between gap-4 py-3" },
                                    React.createElement("dt", { className: "shrink-0 text-slate-500" }, "Model"),
                                    React.createElement("dd", { className: "max-w-[70%] break-words text-right font-medium text-slate-800" }, result.detectedModel || "Unknown")),
                                React.createElement("div", { className: "flex items-start justify-between gap-4 py-3" },
                                    React.createElement("dt", { className: "shrink-0 text-slate-500" }, "Condition"),
                                    React.createElement("dd", { className: "text-right font-medium text-slate-800" }, result.condition)))),
                        React.createElement("div", null,
                            React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-2" },
                                React.createElement("div", null,
                                    React.createElement("h3", { className: "font-bold text-slate-900" }, "Market Sources"),
                                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "Compare prices across available sellers")),
                                React.createElement("span", { className: "rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600" },
                                    result.sources.length,
                                    " sources")),
                            React.createElement("div", { className: "mt-4 space-y-3" }, result.sources.map(function (source, index) { return (React.createElement("div", { key: source.sourceUrl + "-" + index, className: "group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-900/5 sm:gap-4 sm:p-4" },
                                React.createElement("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-emerald-700" },
                                    React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", className: "h-5 w-5" },
                                        React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
                                        React.createElement("path", { d: "M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18", strokeLinecap: "round" }))),
                                React.createElement("div", { className: "min-w-0 flex-1" },
                                    React.createElement("p", { className: "truncate text-sm font-semibold text-slate-800" }, source.sourceName),
                                    React.createElement("p", { className: "mt-1 line-clamp-2 text-xs leading-5 text-slate-500" }, source.productName),
                                    React.createElement("p", { className: "mt-2 break-words text-sm font-bold text-slate-900 sm:hidden" }, formatPrice(source.price))),
                                React.createElement("div", { className: "hidden shrink-0 text-right sm:block" },
                                    React.createElement("p", { className: "text-sm font-bold text-slate-900" }, formatPrice(source.price))),
                                React.createElement("a", { href: source.sourceUrl, target: "_blank", rel: "noopener noreferrer", className: "shrink-0 rounded-xl border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white sm:px-4 sm:text-sm" }, "View"))); }))))))),
            React.createElement("footer", { className: "mt-8 flex items-start justify-center gap-2 px-3 text-center" },
                React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", className: "mt-0.5 h-4 w-4 shrink-0 text-slate-400" },
                    React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
                    React.createElement("path", { d: "M12 11v5m0-8h.01", strokeLinecap: "round" })),
                React.createElement("p", { className: "max-w-3xl text-xs leading-6 text-slate-500" }, "AI-generated estimates are indicative only. Actual prices may vary depending on product condition, specifications, seller, and location.")))));
}
exports["default"] = PriceEstimationPage;
