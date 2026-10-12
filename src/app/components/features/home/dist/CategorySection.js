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
var _a;
exports.__esModule = true;
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var API_URL = (_a = process.env.NEXT_PUBLIC_API_URL) !== null && _a !== void 0 ? _a : "http://localhost:5000/api/v1";
var categoryIcons = [
    lucide_react_1.BatteryCharging,
    lucide_react_1.Monitor,
    lucide_react_1.Plug,
    lucide_react_1.Volume2,
    lucide_react_1.Headphones,
    lucide_react_1.Smartphone,
    lucide_react_1.Camera,
    lucide_react_1.CircuitBoard,
    lucide_react_1.Cpu,
    lucide_react_1.Gamepad2,
    lucide_react_1.Package,
    lucide_react_1.Radio,
];
function getCategoryIcon(name) {
    var normalized = name.toLowerCase();
    if (normalized.includes("battery"))
        return lucide_react_1.BatteryCharging;
    if (normalized.includes("display") || normalized.includes("screen"))
        return lucide_react_1.Monitor;
    if (normalized.includes("charging"))
        return lucide_react_1.Plug;
    if (normalized.includes("speaker"))
        return lucide_react_1.Volume2;
    if (normalized.includes("microphone"))
        return lucide_react_1.Radio;
    if (normalized.includes("camera"))
        return lucide_react_1.Camera;
    if (normalized.includes("vibrator"))
        return lucide_react_1.Smartphone;
    if (normalized.includes("button"))
        return lucide_react_1.CircuitBoard;
    if (normalized.includes("laptop") || normalized.includes("computer"))
        return lucide_react_1.Cpu;
    if (normalized.includes("gaming") || normalized.includes("entertainment"))
        return lucide_react_1.Gamepad2;
    return categoryIcons[10];
}
function CategoryCard(_a) {
    var category = _a.category;
    var Icon = getCategoryIcon(category.name);
    return (React.createElement(link_1["default"], { href: "/marketplace/products?category=" + encodeURIComponent(category.id), className: "group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5" },
        React.createElement("div", { className: "relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-gray-50" },
            category.icon ? (React.createElement(image_1["default"], { src: category.icon, alt: category.name, fill: true, sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw", className: "object-contain p-5 transition-transform duration-500 group-hover:scale-110", unoptimized: true })) : (React.createElement("div", { className: "flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-700 shadow-sm transition-all duration-300 group-hover:bg-emerald-700 group-hover:text-white" },
                React.createElement(Icon, { size: 34, strokeWidth: 1.5 }))),
            React.createElement("span", { className: "absolute right-3 top-3 rounded-full border border-emerald-100 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-800" }, "E-Waste")),
        React.createElement("div", { className: "flex flex-1 flex-col p-5" },
            React.createElement("h3", { className: "text-base font-bold text-gray-900 transition-colors group-hover:text-emerald-800" }, category.name),
            React.createElement("p", { className: "mt-2 line-clamp-3 flex-1 text-sm leading-6 text-gray-500" }, category.description || "Explore reusable and recyclable electronic items."),
            React.createElement("div", { className: "mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-emerald-800" },
                React.createElement("span", null, "Explore category"),
                React.createElement(lucide_react_1.ArrowRight, { size: 16, className: "transition-transform group-hover:translate-x-1" })))));
}
function CategorySection(_a) {
    var _b = _a.showAll, showAll = _b === void 0 ? false : _b;
    var _c = react_1.useState([]), categories = _c[0], setCategories = _c[1];
    var _d = react_1.useState(true), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState(false), error = _e[0], setError = _e[1];
    react_1.useEffect(function () {
        var controller = new AbortController();
        function fetchCategories() {
            return __awaiter(this, void 0, void 0, function () {
                var response, result, uniqueCategories, _i, _a, category, key, existing, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, 4, 5]);
                            setLoading(true);
                            setError(false);
                            return [4 /*yield*/, fetch(API_URL + "/categories", {
                                    method: "GET",
                                    signal: controller.signal,
                                    cache: "no-store"
                                })];
                        case 1:
                            response = _b.sent();
                            if (!response.ok) {
                                throw new Error("Unable to fetch categories");
                            }
                            return [4 /*yield*/, response.json()];
                        case 2:
                            result = _b.sent();
                            if (!result.success || !Array.isArray(result.data)) {
                                throw new Error("Invalid categories response");
                            }
                            uniqueCategories = new Map();
                            for (_i = 0, _a = result.data; _i < _a.length; _i++) {
                                category = _a[_i];
                                key = category.name.trim().toLowerCase();
                                existing = uniqueCategories.get(key);
                                if (!existing || (!existing.icon && category.icon)) {
                                    uniqueCategories.set(key, category);
                                }
                            }
                            setCategories(Array.from(uniqueCategories.values()));
                            return [3 /*break*/, 5];
                        case 3:
                            err_1 = _b.sent();
                            if (err_1 instanceof Error && err_1.name === "AbortError")
                                return [2 /*return*/];
                            console.error("Category loading failed:", err_1);
                            setError(true);
                            return [3 /*break*/, 5];
                        case 4:
                            if (!controller.signal.aborted) {
                                setLoading(false);
                            }
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        void fetchCategories();
        return function () { return controller.abort(); };
    }, []);
    var displayedCategories = showAll
        ? categories
        : categories.slice(0, 6);
    return (React.createElement("section", { className: "relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8" },
        React.createElement("div", { className: "pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-50 blur-3xl" }),
        React.createElement("div", { className: "relative mx-auto max-w-7xl" },
            React.createElement("div", { className: "mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" },
                React.createElement("div", { className: "max-w-2xl" },
                    React.createElement("div", { className: "mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800" },
                        React.createElement("span", { className: "h-2 w-2 rounded-full bg-emerald-600" }),
                        "Discover & Reuse"),
                    React.createElement("h2", { className: "text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl" },
                        "Explore Our",
                        " ",
                        React.createElement("span", { className: "text-emerald-700" }, "Categories")),
                    React.createElement("p", { className: "mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base" }, "Find electronic components and devices ready for reuse, repair, resale, or responsible recycling.")),
                !showAll && (React.createElement(link_1["default"], { href: "/categories", className: "inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-900" },
                    "View All Categories",
                    React.createElement(lucide_react_1.ArrowRight, { size: 17 })))),
            loading ? (React.createElement("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" }, Array.from({ length: showAll ? 8 : 6 }).map(function (_, index) { return (React.createElement("div", { key: index, className: "overflow-hidden rounded-2xl border border-gray-100" },
                React.createElement("div", { className: "h-40 animate-pulse bg-gray-100" }),
                React.createElement("div", { className: "space-y-3 p-5" },
                    React.createElement("div", { className: "h-5 w-2/3 animate-pulse rounded bg-gray-100" }),
                    React.createElement("div", { className: "h-4 w-full animate-pulse rounded bg-gray-100" }),
                    React.createElement("div", { className: "h-4 w-4/5 animate-pulse rounded bg-gray-100" })))); }))) : error ? (React.createElement("div", { className: "rounded-2xl border border-red-100 bg-red-50 p-8 text-center" },
                React.createElement("p", { className: "font-semibold text-gray-900" }, "Categories could not be loaded."),
                React.createElement("p", { className: "mt-2 text-sm text-gray-600" }, "Please check your backend connection and try again."))) : categories.length === 0 ? (React.createElement("div", { className: "rounded-2xl border border-dashed border-gray-300 p-12 text-center" },
                React.createElement(lucide_react_1.Package, { className: "mx-auto text-gray-400", size: 36 }),
                React.createElement("p", { className: "mt-4 font-semibold text-gray-900" }, "No categories available yet."))) : (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" }, displayedCategories.map(function (category) { return (React.createElement(CategoryCard, { key: category.id, category: category })); })),
                !showAll && categories.length > 6 && (React.createElement("div", { className: "mt-8 text-center sm:hidden" },
                    React.createElement(link_1["default"], { href: "/categories", className: "inline-flex items-center gap-2 font-semibold text-emerald-800" },
                        "Browse all categories",
                        React.createElement(lucide_react_1.ChevronRight, { size: 18 })))),
                showAll && (React.createElement("p", { className: "mt-8 text-center text-sm text-gray-500" },
                    "Showing ",
                    categories.length,
                    " categories")))))));
}
exports["default"] = CategorySection;
