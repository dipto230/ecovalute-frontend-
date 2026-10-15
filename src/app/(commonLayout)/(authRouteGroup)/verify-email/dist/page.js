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
var axios_1 = require("axios");
var API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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
        if (!API_BASE_URL) {
            setMessage("API configuration is missing. Please try again later.");
            return;
        }
        startTransition(function () { return __awaiter(_this, void 0, void 0, function () {
            var response, error_1;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].post(API_BASE_URL + "/auth/verify-email", {
                                email: email.trim(),
                                otp: otp
                            }, {
                                withCredentials: true,
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                timeout: 30000
                            })];
                    case 1:
                        response = _d.sent();
                        setSuccess(true);
                        setMessage(((_a = response.data) === null || _a === void 0 ? void 0 : _a.message) || "Email verified successfully.");
                        setTimeout(function () {
                            router.push("/login");
                        }, 1500);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _d.sent();
                        if (axios_1["default"].isAxiosError(error_1)) {
                            setMessage(((_c = (_b = error_1.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) ||
                                error_1.message ||
                                "Verification failed. Check your OTP and try again.");
                        }
                        else {
                            setMessage(error_1 instanceof Error
                                ? error_1.message
                                : "Verification failed. Check your OTP and try again.");
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return (React.createElement("main", { className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f9f8] px-4 py-10 sm:px-6" },
        React.createElement("div", { className: "pointer-events-none absolute inset-0 overflow-hidden" },
            React.createElement("div", { className: "absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" }),
            React.createElement("div", { className: "absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" }),
            React.createElement("div", { className: "absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-300/50 to-transparent" })),
        React.createElement("div", { className: "relative z-10 w-full max-w-[460px]" },
            React.createElement("div", { className: "mb-7 flex flex-col items-center text-center" },
                React.createElement(link_1["default"], { href: "/", "aria-label": "EcoValuate home", className: "group mb-5 inline-flex items-center gap-3" },
                    React.createElement("span", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-[#063f42] text-white shadow-lg shadow-teal-900/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl" },
                        React.createElement(lucide_react_1.Leaf, { size: 25, strokeWidth: 1.8 })),
                    React.createElement("span", { className: "text-[25px] font-extrabold tracking-tight text-slate-900" },
                        "Eco",
                        React.createElement("span", { className: "text-teal-700" }, "Valuate"))),
                React.createElement("div", { className: "inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3.5 py-1.5 shadow-sm shadow-teal-900/[0.03]" },
                    React.createElement("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-700" },
                        React.createElement(lucide_react_1.ShieldCheck, { size: 12 })),
                    React.createElement("span", { className: "text-[11px] font-bold uppercase tracking-[0.15em] text-teal-800" }, "Secure account verification"))),
            React.createElement("section", { className: "overflow-hidden rounded-[30px] border border-white/90 bg-white/95 shadow-[0_24px_80px_-24px_rgba(6,63,66,0.18)] ring-1 ring-teal-900/[0.04] backdrop-blur-xl" },
                React.createElement("div", { className: "h-1.5 w-full bg-gradient-to-r from-teal-800 via-teal-500 to-emerald-400" }),
                React.createElement("div", { className: "p-6 sm:p-10" },
                    React.createElement("div", { className: "mb-7 flex h-[68px] w-[68px] items-center justify-center rounded-[22px] border border-teal-100 bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-700 shadow-sm shadow-teal-900/5" }, success ? (React.createElement(lucide_react_1.CheckCircle2, { size: 31, strokeWidth: 1.8 })) : (React.createElement(lucide_react_1.Mail, { size: 30, strokeWidth: 1.8 }))),
                    React.createElement("div", { className: "mb-8" },
                        React.createElement("p", { className: "mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700" }, success ? "Verification complete" : "One last step"),
                        React.createElement("h1", { className: "text-[30px] font-extrabold leading-tight tracking-[-0.04em] text-slate-900 sm:text-[34px]" }, success ? (React.createElement(React.Fragment, null,
                            "You're all",
                            " ",
                            React.createElement("span", { className: "text-teal-700" }, "verified."))) : (React.createElement(React.Fragment, null,
                            "Verify your",
                            " ",
                            React.createElement("span", { className: "text-teal-700" }, "email.")))),
                        React.createElement("p", { className: "mt-3 max-w-sm text-sm leading-7 text-slate-500" }, success
                            ? "Your email verification was successful. You can now continue to your account."
                            : "Enter the 6-digit verification code we sent to your email to activate your EcoValuate account.")),
                    !success && (React.createElement("form", { onSubmit: handleSubmit, className: "space-y-5" },
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("label", { htmlFor: "email", className: "block text-[13px] font-bold text-slate-700" }, "Email address"),
                            React.createElement("div", { className: "group relative" },
                                React.createElement(lucide_react_1.Mail, { size: 18, className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-teal-700" }),
                                React.createElement("input", { id: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: function (event) { return setEmail(event.target.value); }, placeholder: "you@example.com", className: "h-[54px] w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10" }))),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("div", { className: "flex items-center justify-between gap-3" },
                                React.createElement("label", { htmlFor: "otp", className: "text-[13px] font-bold text-slate-700" }, "Verification code"),
                                React.createElement("span", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400" },
                                    React.createElement(lucide_react_1.LockKeyhole, { size: 12 }),
                                    "6-digit OTP")),
                            React.createElement("input", { id: "otp", type: "text", inputMode: "numeric", autoComplete: "one-time-code", maxLength: 6, required: true, value: otp, onChange: function (event) {
                                    return setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
                                }, placeholder: "000000", "aria-label": "6-digit verification code", className: "h-[68px] w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-center text-[27px] font-extrabold tracking-[0.48em] text-teal-900 outline-none transition duration-200 placeholder:font-semibold placeholder:text-slate-300 placeholder:tracking-[0.48em] hover:border-slate-300 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10" }),
                            React.createElement("p", { className: "flex items-start gap-1.5 pt-1 text-xs leading-5 text-slate-400" },
                                React.createElement(lucide_react_1.ShieldCheck, { size: 14, className: "mt-0.5 shrink-0 text-teal-600" }),
                                "Keep your verification code private. Never share it with anyone.")),
                        message && (React.createElement("div", { role: "status", "aria-live": "polite", className: "flex items-start gap-2.5 rounded-2xl border p-3.5 text-sm leading-6 " + (success
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : "border-rose-200 bg-rose-50 text-rose-700") },
                            success ? (React.createElement(lucide_react_1.CheckCircle2, { size: 18, className: "mt-0.5 shrink-0" })) : (React.createElement(lucide_react_1.ShieldCheck, { size: 18, className: "mt-0.5 shrink-0" })),
                            React.createElement("span", null, message))),
                        React.createElement("button", { type: "submit", disabled: isPending || success, className: "group relative flex h-[56px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-800 to-[#075b55] px-5 text-sm font-bold text-white shadow-lg shadow-teal-900/15 transition duration-300 hover:-translate-y-0.5 hover:from-teal-700 hover:to-teal-800 hover:shadow-xl hover:shadow-teal-900/20 focus:outline-none focus:ring-4 focus:ring-teal-600/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0" }, isPending ? (React.createElement(React.Fragment, null,
                            React.createElement(lucide_react_1.LoaderCircle, { size: 19, className: "animate-spin" }),
                            "Verifying your email...")) : (React.createElement(React.Fragment, null,
                            React.createElement(lucide_react_1.ShieldCheck, { size: 19, strokeWidth: 2 }),
                            "Verify email address",
                            React.createElement("span", { className: "ml-1 transition-transform duration-200 group-hover:translate-x-1" }, "\u2192")))))),
                    success && (React.createElement("div", { className: "space-y-4" },
                        message && (React.createElement("div", { role: "status", "aria-live": "polite", className: "flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm leading-6 text-emerald-800" },
                            React.createElement(lucide_react_1.CheckCircle2, { size: 18, className: "mt-0.5 shrink-0" }),
                            React.createElement("span", null, message))),
                        React.createElement("button", { type: "button", onClick: function () { return router.push("/login"); }, className: "flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-800 to-[#075b55] px-5 text-sm font-bold text-white shadow-lg shadow-teal-900/15 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-600/20" },
                            "Continue to sign in",
                            React.createElement("span", null, "\u2192")))),
                    React.createElement("div", { className: "my-7 flex items-center gap-4" },
                        React.createElement("div", { className: "h-px flex-1 bg-slate-100" }),
                        React.createElement(lucide_react_1.Sparkles, { size: 15, className: "text-teal-400" }),
                        React.createElement("div", { className: "h-px flex-1 bg-slate-100" })),
                    React.createElement("p", { className: "text-center text-sm text-slate-500" },
                        "Already verified?",
                        " ",
                        React.createElement(link_1["default"], { href: "/login", className: "font-bold text-teal-700 underline decoration-teal-200 underline-offset-4 transition hover:text-teal-900 hover:decoration-teal-600" }, "Sign in"))),
                React.createElement("div", { className: "border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-10" },
                    React.createElement("div", { className: "flex items-center justify-center gap-2 text-[11px] font-medium tracking-wide text-slate-400" },
                        React.createElement(lucide_react_1.ShieldCheck, { size: 14, className: "text-teal-600" }),
                        React.createElement("span", null, "SECURE VERIFICATION"),
                        React.createElement("span", { className: "text-slate-300" }, "\u2022"),
                        React.createElement("span", null, "ECOVALUATE")))),
            React.createElement("div", { className: "mt-6 flex items-center justify-center" },
                React.createElement(link_1["default"], { href: "/", className: "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-slate-500 transition hover:bg-white/70 hover:text-teal-800" },
                    React.createElement(lucide_react_1.ArrowLeft, { size: 14 }),
                    "Back to homepage")),
            React.createElement("p", { className: "mt-2 text-center text-[11px] tracking-wide text-slate-400" }, "Give E-Waste a Second Life."))));
}
function VerifyEmailPage() {
    return (React.createElement(react_1.Suspense, { fallback: React.createElement("div", { className: "flex min-h-screen items-center justify-center bg-[#f4f9f8]" },
            React.createElement("div", { className: "flex items-center gap-3 rounded-2xl border border-teal-100 bg-white px-5 py-4 text-sm font-medium text-slate-500 shadow-lg shadow-teal-900/5" },
                React.createElement(lucide_react_1.LoaderCircle, { size: 19, className: "animate-spin text-teal-700" }),
                "Loading verification...")) },
        React.createElement(VerifyEmailForm, null)));
}
exports["default"] = VerifyEmailPage;
