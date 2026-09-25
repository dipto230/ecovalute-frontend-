"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.httpClient = void 0;
var axios_1 = require("axios");
var headers_1 = require("next/headers");
var tokenUtils_1 = require("../tokenUtils");
var auth_service_1 = require("@/src/services/auth.service");
var API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in environment variables');
}
function tryRefreshToken(accessToken, refreshToken) {
    return __awaiter(this, void 0, Promise, function () {
        var requestHeader, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!tokenUtils_1.isTokenExpiringSoon(accessToken)) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, headers_1.headers()];
                case 1:
                    requestHeader = _a.sent();
                    if (requestHeader.get("x-token-refreshed") === "1") {
                        return [2 /*return*/]; // avoid multiple refresh attempts in the same request lifecycle
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, auth_service_1.getNewTokensWithRefreshToken(refreshToken)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error refreshing token in http client:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
var axiosInstance = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookieStore, accessToken, refreshToken, cookieHeader, instance;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, headers_1.cookies()];
            case 1:
                cookieStore = _c.sent();
                accessToken = (_a = cookieStore.get("accessToken")) === null || _a === void 0 ? void 0 : _a.value;
                refreshToken = (_b = cookieStore.get("refreshToken")) === null || _b === void 0 ? void 0 : _b.value;
                if (!(accessToken && refreshToken)) return [3 /*break*/, 3];
                return [4 /*yield*/, tryRefreshToken(accessToken, refreshToken)];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3:
                cookieHeader = cookieStore
                    .getAll()
                    .map(function (cookie) { return cookie.name + "=" + cookie.value; })
                    .join("; ");
                instance = axios_1["default"].create({
                    baseURL: API_BASE_URL,
                    timeout: 30000,
                    headers: {
                        'Content-Type': 'application/json',
                        Cookie: cookieHeader
                    }
                });
                return [2 /*return*/, instance];
        }
    });
}); };
var httpGet = function (endpoint, options) { return __awaiter(void 0, void 0, Promise, function () {
    var instance, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, axiosInstance()];
            case 1:
                instance = _a.sent();
                return [4 /*yield*/, instance.get(endpoint, {
                        params: options === null || options === void 0 ? void 0 : options.params,
                        headers: options === null || options === void 0 ? void 0 : options.headers
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 3:
                error_2 = _a.sent();
                console.error("GET request to " + endpoint + " failed:", error_2);
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
var httpPost = function (endpoint, data, options) { return __awaiter(void 0, void 0, Promise, function () {
    var instance, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, axiosInstance()];
            case 1:
                instance = _a.sent();
                return [4 /*yield*/, instance.post(endpoint, data, {
                        params: options === null || options === void 0 ? void 0 : options.params,
                        headers: options === null || options === void 0 ? void 0 : options.headers
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 3:
                error_3 = _a.sent();
                console.error("POST request to " + endpoint + " failed:", error_3);
                throw error_3;
            case 4: return [2 /*return*/];
        }
    });
}); };
var httpPut = function (endpoint, data, options) { return __awaiter(void 0, void 0, Promise, function () {
    var instance, response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, axiosInstance()];
            case 1:
                instance = _a.sent();
                return [4 /*yield*/, instance.put(endpoint, data, {
                        params: options === null || options === void 0 ? void 0 : options.params,
                        headers: options === null || options === void 0 ? void 0 : options.headers
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 3:
                error_4 = _a.sent();
                console.error("PUT request to " + endpoint + " failed:", error_4);
                throw error_4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var httpPatch = function (endpoint, data, options) { return __awaiter(void 0, void 0, Promise, function () {
    var instance, response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, axiosInstance()];
            case 1:
                instance = _a.sent();
                return [4 /*yield*/, instance.patch(endpoint, data, {
                        params: options === null || options === void 0 ? void 0 : options.params,
                        headers: options === null || options === void 0 ? void 0 : options.headers
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 3:
                error_5 = _a.sent();
                console.error("PATCH request to " + endpoint + " failed:", error_5);
                throw error_5;
            case 4: return [2 /*return*/];
        }
    });
}); };
var httpDelete = function (endpoint, options) { return __awaiter(void 0, void 0, Promise, function () {
    var instance, response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, axiosInstance()];
            case 1:
                instance = _a.sent();
                return [4 /*yield*/, instance["delete"](endpoint, {
                        params: options === null || options === void 0 ? void 0 : options.params,
                        headers: options === null || options === void 0 ? void 0 : options.headers
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 3:
                error_6 = _a.sent();
                console.error("DELETE request to " + endpoint + " failed:", error_6);
                throw error_6;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    patch: httpPatch,
    "delete": httpDelete
};
