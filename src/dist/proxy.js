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
exports.config = exports.proxy = void 0;
var server_1 = require("next/server");
var auth_service_1 = require("./services/auth.service");
var jwtUtils_1 = require("@/lib/jwtUtils");
var authUtils_1 = require("@/lib/authUtils");
var tokenUtils_1 = require("@/lib/tokenUtils");
function refreshTokenMiddleware(refreshToken) {
    return __awaiter(this, void 0, Promise, function () {
        var refresh, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_service_1.getNewTokensWithRefreshToken(refreshToken)];
                case 1:
                    refresh = _a.sent();
                    if (!refresh) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error refreshing token in middleware:", error_1);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function proxy(request) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var pathname, accessToken, refreshToken, decodedAccessToken, isValidAccessToken, userRole, routerOwner, unifySuperAdminAndAdminRole, isAuth, _c, requestHeaders, response, refreshed, error_2, email, userInfo, loginUrl, loginUrl, userInfo, verifyEmailUrl, resetPasswordUrl, error_3;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 13, , 14]);
                    pathname = request.nextUrl.pathname;
                    accessToken = (_a = request.cookies.get("accessToken")) === null || _a === void 0 ? void 0 : _a.value;
                    refreshToken = (_b = request.cookies.get("refreshToken")) === null || _b === void 0 ? void 0 : _b.value;
                    decodedAccessToken = accessToken && jwtUtils_1.jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET).data;
                    isValidAccessToken = accessToken && jwtUtils_1.jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET).success;
                    userRole = null;
                    if (decodedAccessToken) {
                        userRole = decodedAccessToken.role;
                    }
                    routerOwner = authUtils_1.getRouteOwner(pathname);
                    unifySuperAdminAndAdminRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;
                    userRole = unifySuperAdminAndAdminRole;
                    isAuth = authUtils_1.isAuthRoute(pathname);
                    _c = isValidAccessToken && refreshToken;
                    if (!_c) return [3 /*break*/, 2];
                    return [4 /*yield*/, tokenUtils_1.isTokenExpiringSoon(accessToken)];
                case 1:
                    _c = (_d.sent());
                    _d.label = 2;
                case 2:
                    if (!_c) return [3 /*break*/, 7];
                    requestHeaders = new Headers(request.headers);
                    response = server_1.NextResponse.next({
                        request: {
                            headers: requestHeaders
                        }
                    });
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, refreshTokenMiddleware(refreshToken)];
                case 4:
                    refreshed = _d.sent();
                    if (refreshed) {
                        requestHeaders.set("x-token-refreshed", "1");
                    }
                    return [2 /*return*/, server_1.NextResponse.next({
                            request: {
                                headers: requestHeaders
                            },
                            headers: response.headers
                        })];
                case 5:
                    error_2 = _d.sent();
                    console.error("Error refreshing token:", error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, response];
                case 7:
                    // Rule - 1 : User is logged in (has access token) and trying to access auth route -> allow
                    if (isAuth && isValidAccessToken) {
                        return [2 /*return*/, server_1.NextResponse.redirect(new URL(authUtils_1.getDefaultDashboardRoute(userRole), request.url))];
                    }
                    if (!(pathname === "/reset-password")) return [3 /*break*/, 10];
                    email = request.nextUrl.searchParams.get("email");
                    if (!(accessToken && email)) return [3 /*break*/, 9];
                    return [4 /*yield*/, auth_service_1.getUserInfo()];
                case 8:
                    userInfo = _d.sent();
                    if (userInfo.needPasswordChange) {
                        return [2 /*return*/, server_1.NextResponse.next()];
                    }
                    else {
                        return [2 /*return*/, server_1.NextResponse.redirect(new URL(authUtils_1.getDefaultDashboardRoute(userRole), request.url))];
                    }
                    _d.label = 9;
                case 9:
                    // Case-2 user coming from forgot password
                    if (email) {
                        return [2 /*return*/, server_1.NextResponse.next()];
                    }
                    loginUrl = new URL("/login", request.url);
                    loginUrl.searchParams.set("redirect", pathname);
                    return [2 /*return*/, server_1.NextResponse.redirect(loginUrl)];
                case 10:
                    // Rule-3 User trying to access Public route -> allow
                    if (routerOwner === null) {
                        return [2 /*return*/, server_1.NextResponse.next()];
                    }
                    // Rule - 4 User is Not logged in but trying to access protected route -> redirect to login
                    if (!accessToken || !isValidAccessToken) {
                        loginUrl = new URL("/login", request.url);
                        loginUrl.searchParams.set("redirect", pathname);
                        return [2 /*return*/, server_1.NextResponse.redirect(loginUrl)];
                    }
                    if (!accessToken) return [3 /*break*/, 12];
                    return [4 /*yield*/, auth_service_1.getUserInfo()];
                case 11:
                    userInfo = _d.sent();
                    if (userInfo) {
                        // need email verification scenario
                        if (userInfo.emailVerified === false) {
                            if (pathname !== "/verify-email") {
                                verifyEmailUrl = new URL("/verify-email", request.url);
                                verifyEmailUrl.searchParams.set("email", userInfo.email);
                                return [2 /*return*/, server_1.NextResponse.redirect(verifyEmailUrl)];
                            }
                            return [2 /*return*/, server_1.NextResponse.next()];
                        }
                        if (userInfo.emailVerified && pathname === "/verify-email") {
                            return [2 /*return*/, server_1.NextResponse.redirect(new URL(authUtils_1.getDefaultDashboardRoute(userRole), request.url))];
                        }
                        // need password change scenario
                        if (userInfo.needPasswordChange) {
                            if (pathname !== "/reset-password") {
                                resetPasswordUrl = new URL("/reset-password", request.url);
                                resetPasswordUrl.searchParams.set("email", userInfo.email);
                                return [2 /*return*/, server_1.NextResponse.redirect(resetPasswordUrl)];
                            }
                            return [2 /*return*/, server_1.NextResponse.next()];
                        }
                        if (!userInfo.needPasswordChange && pathname === "/reset-password") {
                            return [2 /*return*/, server_1.NextResponse.redirect(new URL(authUtils_1.getDefaultDashboardRoute(userRole), request.url))];
                        }
                    }
                    _d.label = 12;
                case 12:
                    // Rule - 5 User trying to access Common protected route -> allow
                    if (routerOwner === "COMMON") {
                        return [2 /*return*/, server_1.NextResponse.next()];
                    }
                    //Rule-6 User trying to visit role based protected but doesn't have required role -> redirect to their default dashboard
                    if (routerOwner === "ADMIN" || routerOwner === "VENDOR" || routerOwner === "CUSTOMER") {
                        if (routerOwner !== userRole) {
                            return [2 /*return*/, server_1.NextResponse.redirect(new URL(authUtils_1.getDefaultDashboardRoute(userRole), request.url))];
                        }
                    }
                    return [2 /*return*/, server_1.NextResponse.next()];
                case 13:
                    error_3 = _d.sent();
                    console.error("Error in proxy middleware:", error_3);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.proxy = proxy;
exports.config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ]
};
