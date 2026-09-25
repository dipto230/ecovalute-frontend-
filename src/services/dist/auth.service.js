"use server";
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
exports.getUserInfo = exports.getNewTokensWithRefreshToken = void 0;
var tokenUtils_1 = require("@/lib/tokenUtils");
var headers_1 = require("next/headers");
var BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}
function getNewTokensWithRefreshToken(refreshToken) {
    return __awaiter(this, void 0, Promise, function () {
        var res, data, accessToken, newRefreshToken, token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, fetch(BASE_API_URL + "/auth/refresh-token", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Cookie: "refreshToken=" + refreshToken
                            }
                        })];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = (_a.sent()).data;
                    accessToken = data.accessToken, newRefreshToken = data.refreshToken, token = data.token;
                    if (!accessToken) return [3 /*break*/, 4];
                    return [4 /*yield*/, tokenUtils_1.setTokenInCookies("accessToken", accessToken)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!newRefreshToken) return [3 /*break*/, 6];
                    return [4 /*yield*/, tokenUtils_1.setTokenInCookies("refreshToken", newRefreshToken)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (!token) return [3 /*break*/, 8];
                    return [4 /*yield*/, tokenUtils_1.setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60)];
                case 7:
                    _a.sent(); // 1 day in seconds
                    _a.label = 8;
                case 8: return [2 /*return*/, true];
                case 9:
                    error_1 = _a.sent();
                    console.error("Error refreshing token:", error_1);
                    return [2 /*return*/, false];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.getNewTokensWithRefreshToken = getNewTokensWithRefreshToken;
function getUserInfo() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var cookieStore, accessToken, res, data, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, headers_1.cookies()];
                case 1:
                    cookieStore = _b.sent();
                    accessToken = (_a = cookieStore.get("accessToken")) === null || _a === void 0 ? void 0 : _a.value;
                    if (!accessToken) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, fetch(BASE_API_URL + "/auth/me", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Cookie: "accessToken=" + accessToken
                            }
                        })];
                case 2:
                    res = _b.sent();
                    if (!res.ok) {
                        console.error("Failed to fetch user info:", res.status, res.statusText);
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = (_b.sent()).data;
                    return [2 /*return*/, data];
                case 4:
                    error_2 = _b.sent();
                    console.error("Error fetching user info:", error_2);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getUserInfo = getUserInfo;
