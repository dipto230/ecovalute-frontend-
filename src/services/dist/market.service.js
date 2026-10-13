"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getMarketHistory = exports.getMarketQuotes = void 0;
var API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1").replace(/\/+$/, "");
function requestMarket(path) {
    return __awaiter(this, void 0, Promise, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(API_BASE_URL + "/market" + path, {
                        method: "GET",
                        cache: "no-store",
                        headers: { Accept: "application/json" }
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Market API failed (" + response.status + ")");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    if ((result === null || result === void 0 ? void 0 : result.success) === false) {
                        throw new Error(result.message || "Market request failed");
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
function unwrapQuotes(result) {
    var body = result;
    var data = body === null || body === void 0 ? void 0 : body.data;
    var quotes = Array.isArray(body === null || body === void 0 ? void 0 : body.quotes)
        ? body.quotes
        : Array.isArray(data === null || data === void 0 ? void 0 : data.quotes)
            ? data.quotes
            : Array.isArray(body === null || body === void 0 ? void 0 : body.data)
                ? body.data
                : [];
    return quotes.filter(function (item) {
        return !!item &&
            typeof item === "object" &&
            typeof item.symbol === "string" &&
            Number.isFinite(Number(item.price));
    }).map(function (item) { return (__assign(__assign({}, item), { price: Number(item.price), change: item.change == null ? null : Number(item.change), changePercent: item.changePercent == null
            ? null
            : Number(item.changePercent) })); });
}
function getMarketQuotes() {
    return __awaiter(this, void 0, Promise, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestMarket("/quotes")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, unwrapQuotes(result)];
            }
        });
    });
}
exports.getMarketQuotes = getMarketQuotes;
function getMarketHistory(symbol, limit) {
    if (limit === void 0) { limit = 100; }
    return __awaiter(this, void 0, Promise, function () {
        var result, body, data, points;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestMarket("/history/" + encodeURIComponent(symbol) + "?limit=" + limit)];
                case 1:
                    result = _a.sent();
                    body = result;
                    data = body === null || body === void 0 ? void 0 : body.data;
                    points = Array.isArray(body === null || body === void 0 ? void 0 : body.history)
                        ? body.history
                        : Array.isArray(data === null || data === void 0 ? void 0 : data.history)
                            ? data.history
                            : Array.isArray(data === null || data === void 0 ? void 0 : data.points)
                                ? data.points
                                : Array.isArray(body === null || body === void 0 ? void 0 : body.data)
                                    ? body.data
                                    : [];
                    return [2 /*return*/, points.filter(function (item) {
                            return !!item &&
                                typeof item === "object" &&
                                Number.isFinite(Number(item.price)) &&
                                typeof item.timestamp === "string";
                        }).map(function (item) { return (__assign(__assign({}, item), { price: Number(item.price) })); })];
            }
        });
    });
}
exports.getMarketHistory = getMarketHistory;
