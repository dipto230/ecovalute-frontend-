/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.loginAction = void 0;
var authUtils_1 = require("@/lib/authUtils");
var httpClient_1 = require("@/lib/axios/httpClient");
var tokenUtils_1 = require("@/lib/tokenUtils");
var auth_validation_1 = require("@/src/zod/auth.validation");
var navigation_1 = require("next/navigation");
exports.loginAction = function (payload, redirectPath) { return __awaiter(void 0, void 0, Promise, function () {
    var parsedPayload, firstError, response, _a, accessToken, refreshToken, token, user, role, emailVerified, needPasswordChange, email, targetPath, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                parsedPayload = auth_validation_1.loginZodSchema.safeParse(payload);
                if (!parsedPayload.success) {
                    firstError = parsedPayload.error.issues[0].message || "Invalid input";
                    return [2 /*return*/, {
                            success: false,
                            message: firstError
                        }];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, httpClient_1.httpClient.post("/auth/login", parsedPayload.data)];
            case 2:
                response = _b.sent();
                _a = response.data, accessToken = _a.accessToken, refreshToken = _a.refreshToken, token = _a.token, user = _a.user;
                role = user.role, emailVerified = user.emailVerified, needPasswordChange = user.needPasswordChange, email = user.email;
                return [4 /*yield*/, tokenUtils_1.setTokenInCookies("accessToken", accessToken)];
            case 3:
                _b.sent();
                return [4 /*yield*/, tokenUtils_1.setTokenInCookies("refreshToken", refreshToken)];
            case 4:
                _b.sent();
                return [4 /*yield*/, tokenUtils_1.setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60)];
            case 5:
                _b.sent(); // 1 day in seconds
                // if(!emailVerified){
                //     redirect("/verify-email");
                // }else // in the catch block
                if (needPasswordChange) {
                    //TODO : refactoring
                    navigation_1.redirect("/reset-password?email=" + email);
                }
                else {
                    targetPath = redirectPath && authUtils_1.isValidRedirectForRole(redirectPath, role) ? redirectPath : getDefaultDashboardRoute(role);
                    navigation_1.redirect(targetPath);
                }
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.log(error_1, "error");
                if (error_1 && typeof error_1 === "object" && "digest" in error_1 && typeof error_1.digest === "string" && error_1.digest.startsWith("NEXT_REDIRECT")) {
                    throw error_1;
                }
                if (error_1 && error_1.response && error_1.response.data.message === "Email not verified") {
                    navigation_1.redirect("/verify-email?email=" + payload.email);
                }
                return [2 /*return*/, {
                        success: false,
                        message: "Login failed: " + error_1.message
                    }];
            case 7: return [2 /*return*/];
        }
    });
}); };
