"use client";
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
var react_1 = require("react");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var _action_1 = require("./_action");
var navigation_1 = require("next/navigation");
function RegisterPage() {
    var _this = this;
    var _a = react_1.useState("CUSTOMER"), role = _a[0], setRole = _a[1];
    var _b = react_1.useState(false), showPassword = _b[0], setShowPassword = _b[1];
    var _c = react_1.useState(false), showConfirmPassword = _c[0], setShowConfirmPassword = _c[1];
    var _d = react_1.useTransition(), isPending = _d[0], startTransition = _d[1];
    var _e = react_1.useState(""), message = _e[0], setMessage = _e[1];
    var _f = react_1.useState(false), isSuccess = _f[0], setIsSuccess = _f[1];
    var router = navigation_1.useRouter();
    var _g = react_1.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        tradeLicenseNumber: "",
        nidNumber: ""
    }), form = _g[0], setForm = _g[1];
    var updateField = function (field, value) {
        setForm(function (previous) {
            var _a;
            return (__assign(__assign({}, previous), (_a = {}, _a[field] = value, _a)));
        });
        setMessage("");
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        setMessage("");
        setIsSuccess(false);
        var payload = role === "CUSTOMER"
            ? {
                role: "CUSTOMER",
                name: form.name,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword
            }
            : {
                role: "VENDOR",
                name: form.name,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword,
                companyName: form.companyName,
                tradeLicenseNumber: form.tradeLicenseNumber,
                nidNumber: form.nidNumber
            };
        startTransition(function () { return __awaiter(_this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _action_1.registerAction(payload)];
                    case 1:
                        result = _b.sent();
                        setMessage(result.message);
                        setIsSuccess(result.success);
                        if (result.success) {
                            setForm(function (previous) { return (__assign(__assign({}, previous), { password: "", confirmPassword: "" })); });
                            router.push("/verify-email?email=" + encodeURIComponent(form.email.trim()));
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        setIsSuccess(false);
                        setMessage("Something went wrong. Please try again.");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    var inputClass = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";
    var labelClass = "block text-sm font-semibold text-slate-700";
    return (React.createElement("main", { className: "min-h-screen bg-[#f4f9f8] px-4 py-6 sm:px-6 lg:px-8 lg:py-10" },
        React.createElement("div", { className: "mx-auto grid min-h-[700px] max-w-6xl overflow-hidden rounded-3xl border border-white bg-white shadow-[0_24px_80px_-30px_rgba(15,118,110,0.22)] lg:grid-cols-[0.88fr_1.12fr]" },
            React.createElement("aside", { className: "relative overflow-hidden bg-gradient-to-br from-[#e7f8f5] via-[#f0fbf9] to-[#d7f4ee] px-7 py-9 sm:px-10 lg:px-12 lg:py-12" },
                React.createElement("div", { className: "absolute -right-24 -top-20 h-72 w-72 rounded-full bg-white/50 blur-2xl" }),
                React.createElement("div", { className: "absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-teal-200/40 blur-2xl" }),
                React.createElement("div", { className: "relative z-10" },
                    React.createElement(link_1["default"], { href: "/", className: "inline-flex items-center gap-3" },
                        React.createElement("span", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg shadow-teal-700/20" },
                            React.createElement(lucide_react_1.Leaf, { size: 26 })),
                        React.createElement("span", null,
                            React.createElement("span", { className: "block text-2xl font-extrabold tracking-tight text-slate-900" },
                                "Eco",
                                React.createElement("span", { className: "text-teal-700" }, "Valuate")),
                            React.createElement("span", { className: "text-xs font-medium tracking-wide text-slate-500" }, "Give E-Waste a Second Life"))),
                    React.createElement("div", { className: "mt-12" },
                        React.createElement("p", { className: "mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-700" }, "Connect \u00B7 Trade \u00B7 Recycle"),
                        React.createElement("h1", { className: "max-w-md text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl" },
                            "Join a more",
                            React.createElement("span", { className: "block text-teal-700" }, "sustainable future.")),
                        React.createElement("p", { className: "mt-5 max-w-md text-sm leading-7 text-slate-600 sm:text-base" }, "Buy, sell and give old electronics a new purpose. Join a community making electronic waste more valuable.")),
                    React.createElement("div", { className: "relative my-9 flex min-h-44 items-center justify-center sm:min-h-52" },
                        React.createElement("div", { className: "absolute h-48 w-48 rounded-full bg-white/70 sm:h-56 sm:w-56" }),
                        React.createElement("div", { className: "absolute h-36 w-36 rounded-full border border-dashed border-teal-300 sm:h-44 sm:w-44" }),
                        React.createElement("div", { className: "relative flex items-end gap-4 sm:gap-6" },
                            React.createElement("div", { className: "flex h-28 w-24 flex-col items-center justify-center rounded-2xl border border-white bg-white/90 shadow-xl shadow-teal-900/5 sm:h-32 sm:w-28" },
                                React.createElement(lucide_react_1.ShoppingBag, { size: 38, className: "text-teal-700" }),
                                React.createElement("span", { className: "mt-3 text-xs font-bold text-slate-600" }, "Reuse")),
                            React.createElement("div", { className: "mb-5 flex h-36 w-28 flex-col items-center justify-center rounded-2xl bg-teal-700 text-white shadow-xl shadow-teal-900/20 sm:h-40 sm:w-32" },
                                React.createElement(lucide_react_1.Leaf, { size: 46 }),
                                React.createElement("span", { className: "mt-3 text-sm font-bold" }, "Renew")),
                            React.createElement("div", { className: "flex h-28 w-24 flex-col items-center justify-center rounded-2xl border border-white bg-white/90 shadow-xl shadow-teal-900/5 sm:h-32 sm:w-28" },
                                React.createElement(lucide_react_1.Store, { size: 38, className: "text-teal-700" }),
                                React.createElement("span", { className: "mt-3 text-xs font-bold text-slate-600" }, "Resell")))),
                    React.createElement("div", { className: "space-y-3" }, [
                        {
                            icon: lucide_react_1.ShieldCheck,
                            title: "Secure & Trusted",
                            description: "Your account and data matter."
                        },
                        {
                            icon: lucide_react_1.Truck,
                            title: "A Circular Marketplace",
                            description: "Give electronics another life."
                        },
                        {
                            icon: lucide_react_1.UsersRound,
                            title: "Grow Together",
                            description: "Connect with a greener community."
                        },
                    ].map(function (item) {
                        var Icon = item.icon;
                        return (React.createElement("div", { key: item.title, className: "flex items-center gap-4 rounded-2xl border border-white/80 bg-white/60 p-4 backdrop-blur-sm" },
                            React.createElement("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700" },
                                React.createElement(Icon, { size: 21 })),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-sm font-bold text-slate-800" }, item.title),
                                React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, item.description))));
                    })))),
            React.createElement("section", { className: "px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14" },
                React.createElement("div", { className: "mx-auto max-w-lg" },
                    React.createElement("div", { className: "mb-8" },
                        React.createElement("p", { className: "mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700" }, "Create your account"),
                        React.createElement("h2", { className: "text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl" }, "Get started today."),
                        React.createElement("p", { className: "mt-3 text-sm leading-6 text-slate-500" }, "Choose your account type and enter your details below.")),
                    React.createElement("div", { className: "mb-7 grid grid-cols-2 gap-3" },
                        React.createElement("button", { type: "button", onClick: function () {
                                setRole("CUSTOMER");
                                setMessage("");
                                setIsSuccess(false);
                            }, className: "rounded-2xl border p-4 text-left transition " + (role === "CUSTOMER"
                                ? "border-teal-700 bg-teal-700 text-white shadow-lg shadow-teal-700/15"
                                : "border-slate-200 bg-white text-slate-700 hover:border-teal-300") },
                            React.createElement(lucide_react_1.UserRound, { size: 23, className: role === "CUSTOMER"
                                    ? "text-white"
                                    : "text-teal-700" }),
                            React.createElement("span", { className: "mt-3 block text-sm font-bold" }, "Customer"),
                            React.createElement("span", { className: "mt-1 block text-xs leading-5 " + (role === "CUSTOMER"
                                    ? "text-teal-50"
                                    : "text-slate-500") }, "Buy and explore")),
                        React.createElement("button", { type: "button", onClick: function () {
                                setRole("VENDOR");
                                setMessage("");
                                setIsSuccess(false);
                            }, className: "rounded-2xl border p-4 text-left transition " + (role === "VENDOR"
                                ? "border-teal-700 bg-teal-700 text-white shadow-lg shadow-teal-700/15"
                                : "border-slate-200 bg-white text-slate-700 hover:border-teal-300") },
                            React.createElement(lucide_react_1.Store, { size: 23, className: role === "VENDOR"
                                    ? "text-white"
                                    : "text-teal-700" }),
                            React.createElement("span", { className: "mt-3 block text-sm font-bold" }, "Vendor"),
                            React.createElement("span", { className: "mt-1 block text-xs leading-5 " + (role === "VENDOR"
                                    ? "text-teal-50"
                                    : "text-slate-500") }, "Sell your products"))),
                    React.createElement("form", { onSubmit: handleSubmit, className: "space-y-5" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "name", className: labelClass },
                                "Full name ",
                                React.createElement("span", { className: "text-rose-500" }, "*")),
                            React.createElement("div", { className: "relative" },
                                React.createElement(lucide_react_1.UserRound, { size: 18, className: "absolute left-4 top-[26px] -translate-y-1/2 text-slate-400" }),
                                React.createElement("input", { id: "name", name: "name", autoComplete: "name", required: true, minLength: 2, value: form.name, onChange: function (e) { return updateField("name", e.target.value); }, placeholder: "Enter your full name", className: inputClass + " pl-11" }))),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "email", className: labelClass },
                                "Email address ",
                                React.createElement("span", { className: "text-rose-500" }, "*")),
                            React.createElement("div", { className: "relative" },
                                React.createElement(lucide_react_1.Mail, { size: 18, className: "absolute left-4 top-[26px] -translate-y-1/2 text-slate-400" }),
                                React.createElement("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true, value: form.email, onChange: function (e) { return updateField("email", e.target.value); }, placeholder: "you@example.com", className: inputClass + " pl-11" }))),
                        role === "VENDOR" && (React.createElement("div", { className: "space-y-5 rounded-2xl border border-teal-100 bg-teal-50/60 p-4 sm:p-5" },
                            React.createElement("div", null,
                                React.createElement("h3", { className: "text-sm font-bold text-slate-800" }, "Business information"),
                                React.createElement("p", { className: "mt-1 text-xs leading-5 text-slate-500" }, "Provide your business details to register as a vendor.")),
                            React.createElement("div", null,
                                React.createElement("label", { htmlFor: "companyName", className: labelClass },
                                    "Company name ",
                                    React.createElement("span", { className: "text-rose-500" }, "*")),
                                React.createElement("input", { id: "companyName", name: "companyName", required: true, minLength: 2, value: form.companyName, onChange: function (e) {
                                        return updateField("companyName", e.target.value);
                                    }, placeholder: "Your registered business name", className: inputClass })),
                            React.createElement("div", null,
                                React.createElement("label", { htmlFor: "tradeLicenseNumber", className: labelClass },
                                    "Trade license number",
                                    " ",
                                    React.createElement("span", { className: "text-rose-500" }, "*")),
                                React.createElement("input", { id: "tradeLicenseNumber", name: "tradeLicenseNumber", required: true, value: form.tradeLicenseNumber, onChange: function (e) {
                                        return updateField("tradeLicenseNumber", e.target.value);
                                    }, placeholder: "Enter trade license number", className: inputClass })),
                            React.createElement("div", null,
                                React.createElement("label", { htmlFor: "nidNumber", className: labelClass },
                                    "NID number ",
                                    React.createElement("span", { className: "text-rose-500" }, "*")),
                                React.createElement("input", { id: "nidNumber", name: "nidNumber", required: true, value: form.nidNumber, onChange: function (e) {
                                        return updateField("nidNumber", e.target.value);
                                    }, placeholder: "Enter national ID number", className: inputClass }),
                                React.createElement("p", { className: "mt-2 text-xs leading-5 text-slate-500" }, "Your information should be accurate and valid.")))),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "password", className: labelClass },
                                "Password ",
                                React.createElement("span", { className: "text-rose-500" }, "*")),
                            React.createElement("div", { className: "relative" },
                                React.createElement(lucide_react_1.LockKeyhole, { size: 18, className: "absolute left-4 top-[26px] -translate-y-1/2 text-slate-400" }),
                                React.createElement("input", { id: "password", name: "password", type: showPassword ? "text" : "password", autoComplete: "new-password", required: true, minLength: 8, value: form.password, onChange: function (e) {
                                        return updateField("password", e.target.value);
                                    }, placeholder: "At least 8 characters", className: inputClass + " pl-11 pr-12" }),
                                React.createElement("button", { type: "button", "aria-label": showPassword ? "Hide password" : "Show password", onClick: function () { return setShowPassword(function (value) { return !value; }); }, className: "absolute right-4 top-[26px] -translate-y-1/2 text-slate-400 hover:text-teal-700" }, showPassword ? React.createElement(lucide_react_1.EyeOff, { size: 19 }) : React.createElement(lucide_react_1.Eye, { size: 19 })))),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "confirmPassword", className: labelClass },
                                "Confirm password",
                                " ",
                                React.createElement("span", { className: "text-rose-500" }, "*")),
                            React.createElement("div", { className: "relative" },
                                React.createElement(lucide_react_1.LockKeyhole, { size: 18, className: "absolute left-4 top-[26px] -translate-y-1/2 text-slate-400" }),
                                React.createElement("input", { id: "confirmPassword", name: "confirmPassword", type: showConfirmPassword ? "text" : "password", autoComplete: "new-password", required: true, value: form.confirmPassword, onChange: function (e) {
                                        return updateField("confirmPassword", e.target.value);
                                    }, placeholder: "Enter your password again", className: inputClass + " pl-11 pr-12" }),
                                React.createElement("button", { type: "button", "aria-label": showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password", onClick: function () {
                                        return setShowConfirmPassword(function (value) { return !value; });
                                    }, className: "absolute right-4 top-[26px] -translate-y-1/2 text-slate-400 hover:text-teal-700" }, showConfirmPassword ? (React.createElement(lucide_react_1.EyeOff, { size: 19 })) : (React.createElement(lucide_react_1.Eye, { size: 19 }))))),
                        message && (React.createElement("div", { role: "status", "aria-live": "polite", className: "flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 " + (isSuccess
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : "border-rose-200 bg-rose-50 text-rose-700") },
                            isSuccess ? (React.createElement(lucide_react_1.CheckCircle2, { className: "mt-0.5 shrink-0", size: 19 })) : (React.createElement(lucide_react_1.AlertCircle, { className: "mt-0.5 shrink-0", size: 19 })),
                            React.createElement("p", null, message))),
                        isSuccess && (React.createElement("div", { className: "rounded-xl bg-teal-50 p-4 text-sm leading-6 text-teal-900" }, "Check your inbox and spam folder for the verification email. Please verify your email before logging in.")),
                        React.createElement("button", { type: "submit", disabled: isPending || isSuccess, className: "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:from-teal-800 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-60" }, isPending ? (React.createElement(React.Fragment, null,
                            React.createElement(lucide_react_1.LoaderCircle, { size: 19, className: "animate-spin" }),
                            "Creating account...")) : isSuccess ? (React.createElement(React.Fragment, null,
                            "Registration submitted",
                            React.createElement(lucide_react_1.CheckCircle2, { size: 19 }))) : (React.createElement(React.Fragment, null,
                            "Create account",
                            React.createElement(lucide_react_1.ArrowRight, { size: 19 }))))),
                    React.createElement("div", { className: "my-7 flex items-center gap-4" },
                        React.createElement("div", { className: "h-px flex-1 bg-slate-200" }),
                        React.createElement("span", { className: "text-xs font-medium text-slate-400" }, "SECURE REGISTRATION"),
                        React.createElement("div", { className: "h-px flex-1 bg-slate-200" })),
                    React.createElement("div", { className: "flex items-center justify-center gap-2 text-center text-sm text-slate-500" },
                        React.createElement(lucide_react_1.ShieldCheck, { size: 18, className: "shrink-0 text-teal-700" }),
                        "Your account details are sent securely."),
                    React.createElement("p", { className: "mt-6 text-center text-sm text-slate-600" },
                        "Already have an account?",
                        " ",
                        React.createElement(link_1["default"], { href: "/login", className: "font-bold text-teal-700 transition hover:text-teal-900" }, "Sign in")),
                    React.createElement("p", { className: "mt-5 text-center text-xs leading-5 text-slate-400" }, "By creating an account, you agree to our applicable terms and privacy policy."))))));
}
exports["default"] = RegisterPage;
