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
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var httpClient_1 = require("@/lib/axios/httpClient");
function VerifyEmailForm() {
    var _this = this;
    var _a;
    var searchParams = navigation_1.useSearchParams();
    var router = navigation_1.useRouter();
    var _b = react_1.useState((_a = searchParams.get("email")) !== null && _a !== void 0 ? _a : ""), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(""), otp = _c[0], setOtp = _c[1];
    var _d = react_1.useState(""), message = _d[0], setMessage = _d[1];
    var _e = react_1.useState(false), success = _e[0], setSuccess = _e[1];
    var _f = react_1.useTransition(), isPending = _f[0], startTransition = _f[1];
    var handleSubmit = function (event) {
        event.preventDefault();
        setMessage("");
        setSuccess(false);
        if (!email.trim() || !/^\d{6}$/.test(otp)) {
            setMessage("Enter a valid email and 6-digit OTP.");
            return;
        }
        startTransition(function () { return __awaiter(_this, void 0, void 0, function () {
            var response, error_1, err;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, httpClient_1.httpClient.post("/auth/verify-email", {
                                email: email.trim(),
                                otp: otp
                            })];
                    case 1:
                        response = _c.sent();
                        setSuccess(true);
                        setMessage(response.message || "Email verified successfully.");
                        setTimeout(function () {
                            router.push("/login");
                        }, 1500);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _c.sent();
                        err = error_1;
                        setMessage(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) ||
                            err.message ||
                            "Verification failed. Check your OTP and try again.");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return (React.createElement("main", { className: "flex min-h-screen items-center justify-center bg-[#f4f9f8] px-4 py-10" },
        React.createElement("section", { className: "w-full max-w-md rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-teal-900/5 sm:p-10" },
            React.createElement(link_1["default"], { href: "/", className: "mb-9 inline-flex items-center gap-2" },
                React.createElement("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white" },
                    React.createElement(lucide_react_1.Leaf, { size: 22 })),
                React.createElement("span", { className: "text-xl font-extrabold text-slate-900" },
                    "Eco",
                    React.createElement("span", { className: "text-teal-700" }, "Valuate"))),
            React.createElement("div", { className: "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700" }, success ? React.createElement(lucide_react_1.CheckCircle2, { size: 28 }) : React.createElement(lucide_react_1.Mail, { size: 28 })),
            React.createElement("h1", { className: "text-3xl font-extrabold tracking-tight text-slate-900" }, "Verify your email"),
            React.createElement("p", { className: "mt-3 text-sm leading-6 text-slate-500" }, "Enter the verification code sent to your email address to activate your account."),
            React.createElement("form", { onSubmit: handleSubmit, className: "mt-8 space-y-5" },
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "email", className: "text-sm font-semibold text-slate-700" }, "Email address"),
                    React.createElement("input", { id: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: function (event) { return setEmail(event.target.value); }, placeholder: "you@example.com", className: "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" })),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "otp", className: "text-sm font-semibold text-slate-700" }, "6-digit OTP"),
                    React.createElement("input", { id: "otp", type: "text", inputMode: "numeric", autoComplete: "one-time-code", maxLength: 6, required: true, value: otp, onChange: function (event) {
                            return setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
                        }, placeholder: "Enter your OTP", className: "mt-2 w-full rounded-xl border border-slate-200 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" })),
                message && (React.createElement("div", { role: "status", className: "rounded-xl p-3 text-sm " + (success
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-rose-50 text-rose-700") }, message)),
                React.createElement("button", { type: "submit", disabled: isPending || success, className: "flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-4 text-sm font-bold text-white transition hover:bg-teal-800 disabled:opacity-60" }, isPending ? (React.createElement(React.Fragment, null,
                    React.createElement(lucide_react_1.LoaderCircle, { size: 18, className: "animate-spin" }),
                    "Verifying...")) : (React.createElement(React.Fragment, null,
                    React.createElement(lucide_react_1.ShieldCheck, { size: 18 }),
                    "Verify email")))),
            React.createElement("p", { className: "mt-6 text-center text-sm text-slate-500" },
                "Already verified?",
                " ",
                React.createElement(link_1["default"], { href: "/login", className: "font-bold text-teal-700 hover:text-teal-900" }, "Sign in")))));
}
function VerifyEmailPage() {
    return (React.createElement(react_1.Suspense, { fallback: React.createElement("div", { className: "flex min-h-screen items-center justify-center bg-[#f4f9f8] text-sm text-slate-500" }, "Loading verification...") },
        React.createElement(VerifyEmailForm, null)));
}
exports["default"] = VerifyEmailPage;
