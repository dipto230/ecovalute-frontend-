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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var recharts_1 = require("recharts");
var API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1").replace(/\/+$/, "");
var METALS = [
    {
        symbol: "COPPER",
        name: "Copper",
        short: "CU",
        color: "#c87543"
    },
    {
        symbol: "ALUMINUM",
        name: "Aluminium",
        short: "AL",
        color: "#64748b"
    },
    {
        symbol: "NICKEL",
        name: "Nickel",
        short: "NI",
        color: "#0d9488"
    },
    {
        symbol: "ZINC",
        name: "Zinc",
        short: "ZN",
        color: "#7c6ee6"
    },
    {
        symbol: "GOLD",
        name: "Gold",
        short: "AU",
        color: "#d6a62c"
    },
    {
        symbol: "SILVER",
        name: "Silver",
        short: "AG",
        color: "#647f91"
    },
];
var TIME_RANGES = [
    { label: "All", value: "ALL" },
    { label: "1H", value: "1H" },
    { label: "1D", value: "1D" },
    { label: "1W", value: "1W" },
    { label: "1M", value: "1M" },
];
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function requestJson(url) {
    return __awaiter(this, void 0, Promise, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: "GET",
                        cache: "no-store",
                        headers: { Accept: "application/json" }
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Request failed (" + response.status + "): " + url);
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}
function parseQuotes(payload) {
    if (!isObject(payload))
        return [];
    var rawData = payload.data;
    var rows = [];
    if (Array.isArray(rawData)) {
        rows = rawData;
    }
    else if (isObject(rawData) && Array.isArray(rawData.quotes)) {
        rows = rawData.quotes;
    }
    else if (Array.isArray(payload.quotes)) {
        rows = payload.quotes;
    }
    return rows.filter(function (item) {
        if (!isObject(item))
            return false;
        return (typeof item.symbol === "string" &&
            typeof item.name === "string" &&
            Number.isFinite(Number(item.price)));
    }).map(function (item) { return ({
        symbol: item.symbol,
        name: item.name,
        price: Number(item.price),
        currency: typeof item.currency === "string" ? item.currency : "USD",
        unit: typeof item.unit === "string" ? item.unit : "metric tonne",
        category: typeof item.category === "string" ? item.category : "industrial-metal",
        source: typeof item.source === "string" ? item.source : "Market provider",
        sourceTimestamp: typeof item.sourceTimestamp === "string" ? item.sourceTimestamp : "",
        fetchedAt: typeof item.fetchedAt === "string" ? item.fetchedAt : "",
        change: item.change == null ? null : Number(item.change),
        changePercent: item.changePercent == null ? null : Number(item.changePercent),
        high: item.high == null ? null : Number(item.high),
        low: item.low == null ? null : Number(item.low),
        bid: item.bid == null ? null : Number(item.bid),
        ask: item.ask == null ? null : Number(item.ask)
    }); });
}
function parseHistory(payload) {
    if (!isObject(payload))
        return [];
    var rawData = payload.data;
    var rows = [];
    if (Array.isArray(rawData)) {
        rows = rawData;
    }
    else if (isObject(rawData) && Array.isArray(rawData.history)) {
        rows = rawData.history;
    }
    else if (isObject(rawData) && Array.isArray(rawData.points)) {
        rows = rawData.points;
    }
    else if (Array.isArray(payload.history)) {
        rows = payload.history;
    }
    return rows.filter(function (item) {
        if (!isObject(item))
            return false;
        return (typeof item.symbol === "string" &&
            Number.isFinite(Number(item.price)) &&
            typeof item.timestamp === "string" &&
            Number.isFinite(new Date(item.timestamp).getTime()));
    }).map(function (item) { return ({
        symbol: item.symbol,
        price: Number(item.price),
        timestamp: item.timestamp,
        source: typeof item.source === "string" ? item.source : undefined
    }); });
}
function formatPrice(price, currency) {
    if (currency === void 0) { currency = "USD"; }
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
    }).format(price);
}
function formatCompactPrice(price) {
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2
    }).format(price);
}
function formatTimestamp(timestamp) {
    if (!timestamp)
        return "Waiting for update";
    var date = new Date(timestamp);
    if (Number.isNaN(date.getTime()))
        return "Waiting for update";
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}
function filterByRange(points, range) {
    if (range === "ALL" || points.length === 0)
        return points;
    var durations = {
        "1H": 60 * 60 * 1000,
        "1D": 24 * 60 * 60 * 1000,
        "1W": 7 * 24 * 60 * 60 * 1000,
        "1M": 30 * 24 * 60 * 60 * 1000
    };
    var newestTimestamp = Math.max.apply(Math, points.map(function (point) { return new Date(point.timestamp).getTime(); }));
    var cutoff = newestTimestamp - durations[range];
    return points.filter(function (point) { return new Date(point.timestamp).getTime() >= cutoff; });
}
function MarketPriceChart(_a) {
    var points = _a.points, color = _a.color, currency = _a.currency;
    var chartData = react_1.useMemo(function () {
        return __spreadArrays(points).sort(function (a, b) {
            return new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime();
        });
    }, [points]);
    if (chartData.length < 2) {
        return (React.createElement("div", { className: "lm-empty-chart" },
            React.createElement("div", { className: "lm-empty-icon" },
                React.createElement(lucide_react_1.TrendingUp, { size: 25 })),
            React.createElement("strong", null, chartData.length === 1
                ? "One price point recorded"
                : "Building your market timeline"),
            React.createElement("p", null, chartData.length === 1
                ? "Another price snapshot is needed to draw a trend. The chart will update as real market history is collected."
                : "Historical points will appear as the backend collects snapshots. At least two real price points are needed to draw a trend.")));
    }
    var prices = chartData.map(function (point) { return point.price; });
    var minPrice = Math.min.apply(Math, prices);
    var maxPrice = Math.max.apply(Math, prices);
    var padding = (maxPrice - minPrice) * 0.15 || maxPrice * 0.002 || 1;
    var isRising = chartData[chartData.length - 1].price >= chartData[0].price;
    var trendColor = isRising ? "#079669" : "#e05260";
    return (React.createElement("div", { className: "lm-chart-canvas" },
        React.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: "100%" },
            React.createElement(recharts_1.AreaChart, { data: chartData, margin: { top: 12, right: 8, left: 0, bottom: 0 } },
                React.createElement("defs", null,
                    React.createElement("linearGradient", { id: "lmPriceGradient", x1: "0", y1: "0", x2: "0", y2: "1" },
                        React.createElement("stop", { offset: "0%", stopColor: trendColor, stopOpacity: 0.23 }),
                        React.createElement("stop", { offset: "95%", stopColor: trendColor, stopOpacity: 0.015 }))),
                React.createElement(recharts_1.CartesianGrid, { stroke: "#e8efeb", strokeDasharray: "4 5", vertical: false }),
                React.createElement(recharts_1.XAxis, { dataKey: "timestamp", tickFormatter: function (value) {
                        return new Date(value).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        });
                    }, tick: { fill: "#87958d", fontSize: 11 }, tickLine: false, axisLine: false, minTickGap: 35 }),
                React.createElement(recharts_1.YAxis, { orientation: "right", domain: [minPrice - padding, maxPrice + padding], tickFormatter: formatCompactPrice, tick: { fill: "#87958d", fontSize: 11 }, tickLine: false, axisLine: false, width: 55 }),
                React.createElement(recharts_1.Tooltip, { labelFormatter: function (value) { return new Date(String(value)).toLocaleString(); }, formatter: function (value) { return [
                        formatPrice(Number(value), currency),
                        "Market price",
                    ]; }, contentStyle: {
                        borderRadius: 12,
                        border: "1px solid #e0eae4",
                        boxShadow: "0 8px 24px rgba(16, 42, 32, 0.09)",
                        fontSize: 12
                    } }),
                React.createElement(recharts_1.ReferenceLine, { y: chartData[chartData.length - 1].price, stroke: trendColor, strokeDasharray: "5 5", strokeOpacity: 0.65 }),
                React.createElement(recharts_1.Area, { type: "monotone", dataKey: "price", stroke: trendColor, strokeWidth: 2.5, fill: "url(#lmPriceGradient)", dot: chartData.length <= 12
                        ? {
                            r: 3,
                            fill: trendColor,
                            stroke: "#fff",
                            strokeWidth: 1.5
                        }
                        : false, activeDot: {
                        r: 5,
                        fill: trendColor,
                        stroke: "#fff",
                        strokeWidth: 2
                    }, isAnimationActive: true, animationDuration: 500 })))));
}
function LiveMarketSection() {
    var _this = this;
    var _a;
    var _b = react_1.useState([]), quotes = _b[0], setQuotes = _b[1];
    var _c = react_1.useState([]), history = _c[0], setHistory = _c[1];
    var _d = react_1.useState("COPPER"), selectedSymbol = _d[0], setSelectedSymbol = _d[1];
    var _e = react_1.useState("ALL"), timeRange = _e[0], setTimeRange = _e[1];
    var _f = react_1.useState(true), loading = _f[0], setLoading = _f[1];
    var _g = react_1.useState(false), refreshing = _g[0], setRefreshing = _g[1];
    var _h = react_1.useState(""), error = _h[0], setError = _h[1];
    var _j = react_1.useState(""), lastUpdated = _j[0], setLastUpdated = _j[1];
    var loadQuotes = react_1.useCallback(function (manual) {
        if (manual === void 0) { manual = false; }
        return __awaiter(_this, void 0, void 0, function () {
            var response, nextQuotes, err_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (manual)
                            setRefreshing(true);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, requestJson(API_BASE_URL + "/market/quotes")];
                    case 2:
                        response = _c.sent();
                        nextQuotes = parseQuotes(response);
                        if (nextQuotes.length === 0) {
                            throw new Error("The market API returned no valid quotes.");
                        }
                        setQuotes(nextQuotes);
                        setLastUpdated(((_a = response.meta) === null || _a === void 0 ? void 0 : _a.lastUpdated) || ((_b = nextQuotes[0]) === null || _b === void 0 ? void 0 : _b.fetchedAt) ||
                            new Date().toISOString());
                        setError("");
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _c.sent();
                        console.error("[EcoValuate Market] Quote request failed:", err_1);
                        setError(err_1 instanceof Error
                            ? err_1.message
                            : "Unable to load market quotes.");
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        setRefreshing(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }, []);
    var loadHistory = react_1.useCallback(function (symbol) { return __awaiter(_this, void 0, void 0, function () {
        var response, points_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, requestJson(API_BASE_URL + "/market/history/" + encodeURIComponent(symbol) + "?limit=100")];
                case 1:
                    response = _a.sent();
                    points_1 = parseHistory(response);
                    setHistory(function (previous) { return __spreadArrays(previous.filter(function (point) { return point.symbol.toUpperCase() !== symbol.toUpperCase(); }), points_1); });
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.error("[EcoValuate Market] History request failed for " + symbol + ":", err_2);
                    setHistory(function (previous) {
                        return previous.filter(function (point) { return point.symbol.toUpperCase() !== symbol.toUpperCase(); });
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, []);
    react_1.useEffect(function () {
        void loadQuotes();
        var interval = window.setInterval(function () {
            void loadQuotes();
        }, 60000);
        return function () { return window.clearInterval(interval); };
    }, [loadQuotes]);
    react_1.useEffect(function () {
        void loadHistory(selectedSymbol);
    }, [selectedSymbol, loadHistory]);
    var selectedQuote = react_1.useMemo(function () { var _a; return (_a = quotes.find(function (quote) {
        return quote.symbol.trim().toUpperCase() ===
            selectedSymbol.trim().toUpperCase();
    })) !== null && _a !== void 0 ? _a : null; }, [quotes, selectedSymbol]);
    var selectedMetal = METALS.find(function (metal) { return metal.symbol === selectedSymbol; });
    var filteredHistory = react_1.useMemo(function () {
        return filterByRange(history.filter(function (point) {
            return point.symbol.toUpperCase() === selectedSymbol.toUpperCase();
        }), timeRange);
    }, [history, selectedSymbol, timeRange]);
    var isPositive = ((_a = selectedQuote === null || selectedQuote === void 0 ? void 0 : selectedQuote.changePercent) !== null && _a !== void 0 ? _a : 0) >= 0;
    var TrendIcon = isPositive ? lucide_react_1.ArrowUpRight : lucide_react_1.ArrowDownRight;
    return (React.createElement("section", { className: "lm-section" },
        React.createElement("div", { className: "lm-container" },
            React.createElement("div", { className: "lm-heading-row" },
                React.createElement("div", null,
                    React.createElement("div", { className: "lm-eyebrow" },
                        React.createElement("span", { className: "lm-live-dot" }),
                        "REAL-TIME COMMODITY TRACKER"),
                    React.createElement("h2", { className: "lm-main-heading" },
                        "E-waste ",
                        React.createElement("span", null, "recovery market")),
                    React.createElement("p", { className: "lm-subtitle" }, "Track metal prices to understand the value behind electronic waste.")),
                React.createElement("button", { type: "button", className: "lm-refresh-button", onClick: function () { return void loadQuotes(true); }, disabled: refreshing },
                    React.createElement(lucide_react_1.RefreshCw, { size: 15, className: refreshing ? "lm-spin" : "" }),
                    refreshing ? "Updating..." : "Refresh prices")),
            error && quotes.length === 0 && (React.createElement("div", { className: "lm-error" },
                React.createElement("strong", null, "Market data unavailable"),
                React.createElement("p", null, error),
                React.createElement("button", { type: "button", onClick: function () { return void loadQuotes(true); } }, "Try again"))),
            React.createElement("div", { className: "lm-metal-grid" }, METALS.map(function (metal) {
                var _a;
                var quote = quotes.find(function (item) { return item.symbol === metal.symbol; });
                var positive = ((_a = quote === null || quote === void 0 ? void 0 : quote.changePercent) !== null && _a !== void 0 ? _a : 0) >= 0;
                var ChangeIcon = positive ? lucide_react_1.ArrowUpRight : lucide_react_1.ArrowDownRight;
                var selected = selectedSymbol === metal.symbol;
                return (React.createElement("button", { type: "button", key: metal.symbol, className: "lm-metal-card " + (selected ? "lm-metal-card-selected" : ""), onClick: function () { return setSelectedSymbol(metal.symbol); }, style: { "--metal-color": metal.color } },
                    React.createElement("div", { className: "lm-metal-top" },
                        React.createElement("div", { className: "lm-metal-identity" },
                            React.createElement("span", { className: "lm-metal-symbol" }, metal.short),
                            React.createElement("span", { className: "lm-metal-name" }, metal.name)),
                        (quote === null || quote === void 0 ? void 0 : quote.changePercent) != null && (React.createElement("span", { className: "lm-change-pill " + (positive ? "lm-positive" : "lm-negative") },
                            React.createElement(ChangeIcon, { size: 13 }),
                            Math.abs(quote.changePercent).toFixed(2),
                            "%"))),
                    React.createElement("div", { className: "lm-metal-price" }, loading && !quote
                        ? "Loading..."
                        : quote
                            ? formatPrice(quote.price, quote.currency)
                            : "Unavailable"),
                    React.createElement("div", { className: "lm-metal-bottom" },
                        React.createElement("span", null,
                            "Per ",
                            (quote === null || quote === void 0 ? void 0 : quote.unit) || "unit"),
                        React.createElement("span", { className: "lm-view-chart" },
                            "View chart ",
                            React.createElement(lucide_react_1.ArrowRight, { size: 14 })))));
            })),
            React.createElement("div", { className: "lm-chart-card" },
                React.createElement("div", { className: "lm-chart-header" },
                    React.createElement("div", { className: "lm-chart-title-block" },
                        React.createElement("div", { className: "lm-eyebrow" }, "PRICE TRACKER"),
                        React.createElement("h3", null,
                            (selectedMetal === null || selectedMetal === void 0 ? void 0 : selectedMetal.name) || selectedSymbol,
                            " ",
                            React.createElement("span", null, "price history")),
                        React.createElement("p", null,
                            filteredHistory.length,
                            " recorded price",
                            " ",
                            filteredHistory.length === 1 ? "point" : "points")),
                    React.createElement("div", { className: "lm-current-price" },
                        React.createElement("span", { className: "lm-current-label" }, "Latest quote"),
                        React.createElement("strong", null, selectedQuote
                            ? formatPrice(selectedQuote.price, selectedQuote.currency)
                            : "—"),
                        (selectedQuote === null || selectedQuote === void 0 ? void 0 : selectedQuote.changePercent) != null && (React.createElement("span", { className: "lm-current-change " + (isPositive ? "lm-positive-text" : "lm-negative-text") },
                            React.createElement(TrendIcon, { size: 15 }),
                            isPositive ? "+" : "",
                            selectedQuote.changePercent.toFixed(2),
                            "%")))),
                React.createElement("div", { className: "lm-chart-toolbar" },
                    React.createElement("div", { className: "lm-chart-legend" },
                        React.createElement("span", { className: "lm-legend-dot", style: {
                                backgroundColor: (selectedMetal === null || selectedMetal === void 0 ? void 0 : selectedMetal.color) || "#0d9488"
                            } }),
                        React.createElement("span", null, (selectedMetal === null || selectedMetal === void 0 ? void 0 : selectedMetal.name) || selectedSymbol),
                        React.createElement("span", { className: "lm-legend-divider" }, "\u00B7"),
                        React.createElement("span", null, (selectedQuote === null || selectedQuote === void 0 ? void 0 : selectedQuote.currency) || "USD")),
                    React.createElement("div", { className: "lm-time-filters" }, TIME_RANGES.map(function (range) { return (React.createElement("button", { type: "button", key: range.value, className: timeRange === range.value ? "lm-range-active" : "", onClick: function () { return setTimeRange(range.value); } }, range.label)); }))),
                React.createElement("div", { className: "lm-chart-area" },
                    React.createElement(MarketPriceChart, { points: filteredHistory, color: (selectedMetal === null || selectedMetal === void 0 ? void 0 : selectedMetal.color) || "#0d9488", currency: (selectedQuote === null || selectedQuote === void 0 ? void 0 : selectedQuote.currency) || "USD" })),
                React.createElement("div", { className: "lm-chart-footer" },
                    React.createElement("span", null,
                        React.createElement("span", { className: "lm-live-dot" }),
                        "Source: ",
                        (selectedQuote === null || selectedQuote === void 0 ? void 0 : selectedQuote.source) || "Metals.Dev"),
                    React.createElement("span", null,
                        React.createElement(lucide_react_1.Clock3, { size: 13 }),
                        "Updated: ",
                        formatTimestamp((selectedQuote === null || selectedQuote === void 0 ? void 0 : selectedQuote.fetchedAt) || lastUpdated)))),
            React.createElement("div", { className: "lm-disclaimer" },
                React.createElement("div", { className: "lm-disclaimer-icon" },
                    React.createElement(lucide_react_1.Activity, { size: 19 })),
                React.createElement("div", null,
                    React.createElement("strong", null, "Market reference prices"),
                    React.createElement("p", null, "These are commodity reference prices, not guaranteed resale prices for e-waste. Actual recovery value depends on material composition, purity, recovery yield, processing costs, and local market conditions.")),
                React.createElement("a", { href: "/price-estimation" },
                    "Estimate material value ",
                    React.createElement(lucide_react_1.ArrowRight, { size: 15 })))),
        React.createElement("style", { jsx: true }, "\n        .lm-section {\n          padding: 64px 24px;\n          background:\n            radial-gradient(ellipse at 0% 0%, rgba(16, 185, 129, 0.055), transparent 36%),\n            #f8fbf9;\n          color: #123b2d;\n        }\n\n        .lm-container {\n          width: 100%;\n          max-width: 1280px;\n          margin: 0 auto;\n        }\n\n        .lm-heading-row {\n          display: flex;\n          justify-content: space-between;\n          align-items: flex-end;\n          gap: 24px;\n          margin-bottom: 28px;\n        }\n\n        .lm-eyebrow {\n          display: flex;\n          align-items: center;\n          gap: 8px;\n          color: #07835c;\n          font-size: 10px;\n          font-weight: 800;\n          letter-spacing: 1.7px;\n        }\n\n        .lm-live-dot {\n          display: inline-block;\n          width: 7px;\n          height: 7px;\n          flex: 0 0 7px;\n          border-radius: 50%;\n          background: #10b981;\n          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.11);\n        }\n\n        .lm-main-heading {\n          margin: 13px 0 8px;\n          color: #123b2d;\n          font-size: clamp(26px, 3vw, 38px);\n          line-height: 1.2;\n          font-weight: 800;\n          letter-spacing: -1.3px;\n        }\n\n        .lm-main-heading span,\n        .lm-chart-title-block h3 span {\n          color: #809188;\n          font-weight: 500;\n        }\n\n        .lm-subtitle {\n          margin: 0;\n          color: #819087;\n          font-size: 14px;\n          line-height: 1.7;\n        }\n\n        .lm-refresh-button {\n          display: inline-flex;\n          align-items: center;\n          justify-content: center;\n          gap: 9px;\n          padding: 12px 16px;\n          border: 1px solid #dceae2;\n          border-radius: 12px;\n          background: #fff;\n          color: #087a56;\n          font-size: 12px;\n          font-weight: 700;\n          cursor: pointer;\n          transition: background 0.2s, border-color 0.2s;\n          white-space: nowrap;\n        }\n\n        .lm-refresh-button:hover {\n          background: #f0faf4;\n          border-color: #a6dbc0;\n        }\n\n        .lm-refresh-button:disabled {\n          cursor: wait;\n          opacity: 0.7;\n        }\n\n        .lm-spin {\n          animation: lm-spin 0.8s linear infinite;\n        }\n\n        @keyframes lm-spin {\n          to {\n            transform: rotate(360deg);\n          }\n        }\n\n        .lm-metal-grid {\n          display: grid;\n          grid-template-columns: repeat(3, minmax(0, 1fr));\n          gap: 16px;\n          margin-bottom: 28px;\n        }\n\n        .lm-metal-card {\n          min-width: 0;\n          padding: 22px;\n          text-align: left;\n          border: 1px solid #e0ebe4;\n          border-radius: 20px;\n          background: rgba(255, 255, 255, 0.96);\n          cursor: pointer;\n          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;\n          color: inherit;\n        }\n\n        .lm-metal-card:hover {\n          transform: translateY(-3px);\n          border-color: var(--metal-color);\n          box-shadow: 0 12px 28px rgba(15, 58, 39, 0.06);\n        }\n\n        .lm-metal-card-selected {\n          border-color: var(--metal-color);\n          box-shadow: 0 0 0 2px color-mix(in srgb, var(--metal-color) 12%, transparent);\n        }\n\n        .lm-metal-top,\n        .lm-metal-identity,\n        .lm-metal-bottom,\n        .lm-change-pill {\n          display: flex;\n          align-items: center;\n        }\n\n        .lm-metal-top,\n        .lm-metal-bottom {\n          justify-content: space-between;\n          gap: 10px;\n        }\n\n        .lm-metal-identity {\n          gap: 10px;\n          min-width: 0;\n        }\n\n        .lm-metal-symbol {\n          display: grid;\n          place-items: center;\n          width: 36px;\n          height: 36px;\n          flex: 0 0 36px;\n          border-radius: 11px;\n          background: color-mix(in srgb, var(--metal-color) 11%, white);\n          color: var(--metal-color);\n          font-size: 11px;\n          font-weight: 800;\n        }\n\n        .lm-metal-name {\n          color: #566b60;\n          font-size: 13px;\n          font-weight: 700;\n        }\n\n        .lm-change-pill {\n          gap: 2px;\n          padding: 5px 7px;\n          border-radius: 8px;\n          font-size: 10px;\n          font-weight: 800;\n          white-space: nowrap;\n        }\n\n        .lm-positive {\n          background: #e9f8f0;\n          color: #07835c;\n        }\n\n        .lm-negative {\n          background: #fff0f0;\n          color: #d74754;\n        }\n\n        .lm-metal-price {\n          overflow-wrap: anywhere;\n          margin: 23px 0 20px;\n          color: #123b2d;\n          font-size: clamp(21px, 2.1vw, 29px);\n          font-weight: 800;\n          letter-spacing: -0.8px;\n          font-variant-numeric: tabular-nums;\n        }\n\n        .lm-metal-bottom {\n          padding-top: 14px;\n          border-top: 1px solid #edf2ee;\n          color: #8b9a91;\n          font-size: 10px;\n        }\n\n        .lm-view-chart {\n          display: inline-flex;\n          align-items: center;\n          gap: 5px;\n          color: #087a56;\n          font-size: 10px;\n          font-weight: 800;\n        }\n\n        .lm-chart-card {\n          overflow: hidden;\n          padding: 28px 30px 0;\n          border: 1px solid #e0ebe4;\n          border-radius: 24px;\n          background: #fff;\n          box-shadow: 0 15px 40px rgba(15, 58, 39, 0.035);\n        }\n\n        .lm-chart-header {\n          display: flex;\n          align-items: flex-start;\n          justify-content: space-between;\n          gap: 20px;\n        }\n\n        .lm-chart-title-block h3 {\n          margin: 12px 0 7px;\n          color: #123b2d;\n          font-size: clamp(21px, 2.5vw, 28px);\n          font-weight: 800;\n          letter-spacing: -0.9px;\n        }\n\n        .lm-chart-title-block p {\n          margin: 0;\n          color: #8b9a91;\n          font-size: 12px;\n        }\n\n        .lm-current-price {\n          display: flex;\n          flex-direction: column;\n          align-items: flex-end;\n          gap: 7px;\n          text-align: right;\n        }\n\n        .lm-current-label {\n          color: #8b9a91;\n          font-size: 11px;\n        }\n\n        .lm-current-price strong {\n          color: #123b2d;\n          font-size: clamp(21px, 2.4vw, 29px);\n          font-weight: 800;\n          letter-spacing: -0.8px;\n          font-variant-numeric: tabular-nums;\n        }\n\n        .lm-current-change {\n          display: inline-flex;\n          align-items: center;\n          gap: 3px;\n          font-size: 12px;\n          font-weight: 800;\n        }\n\n        .lm-positive-text {\n          color: #079669;\n        }\n\n        .lm-negative-text {\n          color: #e05260;\n        }\n\n        .lm-chart-toolbar {\n          display: flex;\n          align-items: center;\n          justify-content: space-between;\n          flex-wrap: wrap;\n          gap: 16px;\n          margin-top: 24px;\n          padding: 15px 0;\n          border-top: 1px solid #edf2ee;\n          border-bottom: 1px solid #edf2ee;\n        }\n\n        .lm-chart-legend {\n          display: flex;\n          align-items: center;\n          gap: 8px;\n          color: #718178;\n          font-size: 11px;\n          font-weight: 600;\n        }\n\n        .lm-legend-dot {\n          width: 8px;\n          height: 8px;\n          border-radius: 50%;\n        }\n\n        .lm-legend-divider {\n          color: #c4d0c8;\n        }\n\n        .lm-time-filters {\n          display: flex;\n          align-items: center;\n          gap: 4px;\n          padding: 4px;\n          border: 1px solid #eaf0eb;\n          border-radius: 10px;\n          background: #f8faf8;\n        }\n\n        .lm-time-filters button {\n          padding: 7px 11px;\n          border: 0;\n          border-radius: 7px;\n          background: transparent;\n          color: #819087;\n          font-size: 10px;\n          font-weight: 800;\n          cursor: pointer;\n        }\n\n        .lm-time-filters button:hover {\n          color: #087a56;\n        }\n\n        .lm-time-filters button.lm-range-active {\n          background: #fff;\n          color: #087a56;\n          box-shadow: 0 1px 5px rgba(15, 58, 39, 0.09);\n        }\n\n        .lm-chart-area {\n          height: 300px;\n          padding: 18px 0 8px;\n        }\n\n        .lm-chart-canvas {\n          width: 100%;\n          height: 100%;\n          min-width: 0;\n        }\n\n        .lm-empty-chart {\n          display: flex;\n          width: 100%;\n          height: 100%;\n          min-height: 210px;\n          flex-direction: column;\n          align-items: center;\n          justify-content: center;\n          padding: 20px;\n          text-align: center;\n        }\n\n        .lm-empty-icon {\n          display: grid;\n          place-items: center;\n          width: 52px;\n          height: 52px;\n          margin-bottom: 15px;\n          border: 1px solid #d9efe2;\n          border-radius: 16px;\n          background: #f0faf4;\n          color: #079669;\n        }\n\n        .lm-empty-chart strong {\n          color: #234b39;\n          font-size: 13px;\n        }\n\n        .lm-empty-chart p {\n          max-width: 420px;\n          margin: 10px 0 0;\n          color: #89988f;\n          font-size: 12px;\n          line-height: 1.8;\n        }\n\n        .lm-chart-footer {\n          display: flex;\n          align-items: center;\n          justify-content: space-between;\n          flex-wrap: wrap;\n          gap: 12px;\n          min-height: 48px;\n          border-top: 1px solid #edf2ee;\n          color: #8b9a91;\n          font-size: 10px;\n        }\n\n        .lm-chart-footer > span {\n          display: inline-flex;\n          align-items: center;\n          gap: 8px;\n        }\n\n        .lm-disclaimer {\n          display: flex;\n          align-items: center;\n          gap: 15px;\n          margin-top: 24px;\n          padding: 22px 24px;\n          border: 1px solid #dceee3;\n          border-radius: 18px;\n          background: linear-gradient(115deg, #effaf3, #fbfdfb);\n        }\n\n        .lm-disclaimer-icon {\n          display: grid;\n          place-items: center;\n          width: 42px;\n          height: 42px;\n          flex: 0 0 42px;\n          border: 1px solid #dceee3;\n          border-radius: 13px;\n          background: white;\n          color: #07835c;\n        }\n\n        .lm-disclaimer > div:nth-child(2) {\n          flex: 1;\n          min-width: 0;\n        }\n\n        .lm-disclaimer strong {\n          color: #234b39;\n          font-size: 12px;\n        }\n\n        .lm-disclaimer p {\n          margin: 5px 0 0;\n          color: #71877a;\n          font-size: 11px;\n          line-height: 1.7;\n        }\n\n        .lm-disclaimer a {\n          display: inline-flex;\n          align-items: center;\n          gap: 8px;\n          color: #087a56;\n          font-size: 11px;\n          font-weight: 800;\n          text-decoration: none;\n          white-space: nowrap;\n        }\n\n        .lm-disclaimer a:hover {\n          color: #045c40;\n        }\n\n        .lm-error {\n          margin-bottom: 20px;\n          padding: 18px;\n          border: 1px solid #f5caca;\n          border-radius: 14px;\n          background: #fff6f6;\n          color: #9f303b;\n        }\n\n        .lm-error p {\n          margin: 8px 0;\n          font-size: 12px;\n        }\n\n        .lm-error button {\n          padding: 8px 12px;\n          border: 1px solid #efb8bd;\n          border-radius: 8px;\n          background: white;\n          color: #9f303b;\n          cursor: pointer;\n        }\n\n        @media (max-width: 900px) {\n          .lm-metal-grid {\n            grid-template-columns: repeat(2, minmax(0, 1fr));\n          }\n\n          .lm-chart-card {\n            padding: 23px 22px 0;\n          }\n\n          .lm-disclaimer {\n            flex-wrap: wrap;\n          }\n\n          .lm-disclaimer > div:nth-child(2) {\n            flex-basis: calc(100% - 60px);\n          }\n\n          .lm-disclaimer a {\n            margin-left: 57px;\n          }\n        }\n\n        @media (max-width: 600px) {\n          .lm-section {\n            padding: 42px 15px;\n          }\n\n          .lm-heading-row {\n            align-items: flex-start;\n            flex-direction: column;\n            gap: 16px;\n          }\n\n          .lm-main-heading {\n            font-size: 27px;\n          }\n\n          .lm-metal-grid {\n            gap: 10px;\n          }\n\n          .lm-metal-card {\n            padding: 14px;\n            border-radius: 15px;\n          }\n\n          .lm-metal-symbol {\n            width: 30px;\n            height: 30px;\n            flex-basis: 30px;\n          }\n\n          .lm-metal-identity {\n            gap: 7px;\n          }\n\n          .lm-metal-name {\n            font-size: 11px;\n          }\n\n          .lm-change-pill {\n            padding: 4px;\n            font-size: 9px;\n          }\n\n          .lm-metal-price {\n            margin: 19px 0 15px;\n            font-size: 19px;\n          }\n\n          .lm-metal-bottom {\n            align-items: flex-start;\n            flex-direction: column;\n            gap: 8px;\n          }\n\n          .lm-chart-card {\n            padding: 20px 14px 0;\n            border-radius: 18px;\n          }\n\n          .lm-chart-header {\n            flex-direction: column;\n            gap: 17px;\n          }\n\n          .lm-current-price {\n            align-items: flex-start;\n            text-align: left;\n          }\n\n          .lm-chart-toolbar {\n            align-items: flex-start;\n            flex-direction: column;\n          }\n\n          .lm-time-filters {\n            width: 100%;\n            justify-content: space-between;\n          }\n\n          .lm-time-filters button {\n            padding: 7px 9px;\n          }\n\n          .lm-chart-area {\n            height: 245px;\n          }\n\n          .lm-chart-footer {\n            padding: 12px 0;\n          }\n\n          .lm-disclaimer {\n            padding: 17px;\n          }\n\n          .lm-disclaimer a {\n            margin-left: 0;\n          }\n        }\n      ")));
}
exports["default"] = LiveMarketSection;
