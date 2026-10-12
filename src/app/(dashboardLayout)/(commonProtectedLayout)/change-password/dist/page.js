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
var lucide_react_1 = require("lucide-react");
var auth_service_1 = require("@/src/services/auth.service");
var ChangePasswordPage = function () {
    var _a = react_1.useState(""), currentPassword = _a[0], setCurrentPassword = _a[1];
    var _b = react_1.useState(""), newPassword = _b[0], setNewPassword = _b[1];
    var _c = react_1.useState(""), confirmPassword = _c[0], setConfirmPassword = _c[1];
    var _d = react_1.useState(false), showCurrent = _d[0], setShowCurrent = _d[1];
    var _e = react_1.useState(false), showNew = _e[0], setShowNew = _e[1];
    var _f = react_1.useState(false), showConfirm = _f[0], setShowConfirm = _f[1];
    var _g = react_1.useState(false), loading = _g[0], setLoading = _g[1];
    var _h = react_1.useState(""), successMessage = _h[0], setSuccessMessage = _h[1];
    var _j = react_1.useState(""), errorMessage = _j[0], setErrorMessage = _j[1];
    var passwordRules = [
        {
            label: "At least 8 characters",
            valid: newPassword.length >= 8
        },
        {
            label: "Contains an uppercase letter",
            valid: /[A-Z]/.test(newPassword)
        },
        {
            label: "Contains a lowercase letter",
            valid: /[a-z]/.test(newPassword)
        },
        {
            label: "Contains a number",
            valid: /[0-9]/.test(newPassword)
        },
    ];
    var strength = passwordRules.filter(function (rule) { return rule.valid; }).length;
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1, err;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    setSuccessMessage("");
                    setErrorMessage("");
                    if (!currentPassword || !newPassword || !confirmPassword) {
                        setErrorMessage("Please fill in all password fields.");
                        return [2 /*return*/];
                    }
                    if (newPassword.length < 8) {
                        setErrorMessage("New password must contain at least 8 characters.");
                        return [2 /*return*/];
                    }
                    if (newPassword === currentPassword) {
                        setErrorMessage("Your new password must be different from your current password.");
                        return [2 /*return*/];
                    }
                    if (strength !== 4) {
                        setErrorMessage("Please use uppercase, lowercase, and numeric characters.");
                        return [2 /*return*/];
                    }
                    if (newPassword !== confirmPassword) {
                        setErrorMessage("New password and confirmation do not match.");
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, auth_service_1.changePassword({
                            currentPassword: currentPassword,
                            newPassword: newPassword
                        })];
                case 2:
                    result = _c.sent();
                    if (!result.success) {
                        throw new Error(result.message || "Unable to change your password.");
                    }
                    setSuccessMessage(result.message || "Your password has been changed successfully.");
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _c.sent();
                    err = error_1;
                    setErrorMessage(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) ||
                        err.message ||
                        "Something went wrong. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";
    var renderPasswordInput = function (label, value, setValue, visible, setVisible, placeholder, id) { return (React.createElement("div", { className: "space-y-2" },
        React.createElement("label", { htmlFor: id, className: "block text-sm font-semibold text-slate-700" }, label),
        React.createElement("div", { className: "relative" },
            React.createElement("input", { id: id, type: visible ? "text" : "password", value: value, onChange: function (e) { return setValue(e.target.value); }, placeholder: placeholder, autoComplete: id === "current-password"
                    ? "current-password"
                    : "new-password", disabled: loading, className: inputClass }),
            React.createElement("button", { type: "button", onClick: function () { return setVisible(!visible); }, "aria-label": visible ? "Hide password" : "Show password", className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-emerald-700" }, visible ? (React.createElement(lucide_react_1.EyeOff, { className: "h-4 w-4" })) : (React.createElement(lucide_react_1.Eye, { className: "h-4 w-4" })))))); };
    return (React.createElement("div", { className: "min-h-full bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8 lg:py-10" },
        React.createElement("div", { className: "mx-auto max-w-5xl" },
            React.createElement("div", { className: "mb-8" },
                React.createElement("div", { className: "mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700" },
                    React.createElement(lucide_react_1.LockKeyhole, { className: "h-6 w-6" })),
                React.createElement("p", { className: "mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700" }, "Account Security"),
                React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl" }, "Change Password"),
                React.createElement("p", { className: "mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base" }, "Update your password to keep your EcoValuate administrator account safe and secure.")),
            React.createElement("div", { className: "grid items-start gap-6 lg:grid-cols-[1fr_300px]" },
                React.createElement("section", { className: "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" },
                    React.createElement("div", { className: "flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-7" },
                        React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" },
                            React.createElement(lucide_react_1.KeyRound, { className: "h-5 w-5" })),
                        React.createElement("div", null,
                            React.createElement("h2", { className: "font-semibold text-slate-900" }, "Update your credentials"),
                            React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "Verify your current password first."))),
                    React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6 p-5 sm:p-7" },
                        successMessage && (React.createElement("div", { role: "status", className: "flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800" },
                            React.createElement(lucide_react_1.CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0" }),
                            React.createElement("p", null, successMessage))),
                        errorMessage && (React.createElement("div", { role: "alert", className: "flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" },
                            React.createElement(lucide_react_1.AlertCircle, { className: "mt-0.5 h-5 w-5 shrink-0" }),
                            React.createElement("p", null, errorMessage))),
                        renderPasswordInput("Current Password", currentPassword, setCurrentPassword, showCurrent, setShowCurrent, "Enter your current password", "current-password"),
                        React.createElement("div", { className: "space-y-2" },
                            renderPasswordInput("New Password", newPassword, setNewPassword, showNew, setShowNew, "Enter your new password", "new-password"),
                            newPassword && (React.createElement("div", { className: "space-y-2 pt-2" },
                                React.createElement("div", { className: "flex gap-1.5" }, [1, 2, 3, 4].map(function (level) { return (React.createElement("div", { key: level, className: "h-1.5 flex-1 rounded-full " + (strength >= level
                                        ? strength === 4
                                            ? "bg-emerald-500"
                                            : strength >= 3
                                                ? "bg-amber-400"
                                                : "bg-red-400"
                                        : "bg-slate-100") })); })),
                                React.createElement("div", { className: "grid gap-2 sm:grid-cols-2" }, passwordRules.map(function (rule) { return (React.createElement("p", { key: rule.label, className: "flex items-center gap-2 text-xs " + (rule.valid
                                        ? "text-emerald-700"
                                        : "text-slate-400") },
                                    React.createElement(lucide_react_1.CheckCircle2, { className: "h-3.5 w-3.5 shrink-0" }),
                                    rule.label)); }))))),
                        renderPasswordInput("Confirm New Password", confirmPassword, setConfirmPassword, showConfirm, setShowConfirm, "Re-enter your new password", "confirm-password"),
                        confirmPassword && (React.createElement("p", { className: "text-xs " + (confirmPassword === newPassword
                                ? "text-emerald-700"
                                : "text-red-500") }, confirmPassword === newPassword
                            ? "Passwords match."
                            : "Passwords do not match.")),
                        React.createElement("div", { className: "border-t border-slate-100 pt-5" },
                            React.createElement("button", { type: "submit", disabled: loading, className: "flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48" }, loading ? (React.createElement(React.Fragment, null,
                                React.createElement(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin" }),
                                "Updating Password...")) : (React.createElement(React.Fragment, null,
                                "Update Password",
                                React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" }))))))),
                React.createElement("aside", { className: "space-y-4" },
                    React.createElement("div", { className: "rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5" },
                        React.createElement("div", { className: "mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm" },
                            React.createElement(lucide_react_1.ShieldCheck, { className: "h-6 w-6" })),
                        React.createElement("h3", { className: "font-semibold text-slate-900" }, "Keep your account secure"),
                        React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-600" }, "A strong password helps protect your EcoValuate admin dashboard and sensitive management operations.")),
                    React.createElement("div", { className: "rounded-2xl border border-slate-200 bg-white p-5" },
                        React.createElement("h3", { className: "mb-4 text-sm font-semibold text-slate-900" }, "Security checklist"),
                        React.createElement("ul", { className: "space-y-3 text-sm text-slate-600" },
                            React.createElement("li", { className: "flex items-start gap-2" },
                                React.createElement(lucide_react_1.CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-emerald-600" }),
                                "Use a unique password."),
                            React.createElement("li", { className: "flex items-start gap-2" },
                                React.createElement(lucide_react_1.CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-emerald-600" }),
                                "Never share your credentials."),
                            React.createElement("li", { className: "flex items-start gap-2" },
                                React.createElement(lucide_react_1.CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-emerald-600" }),
                                "Avoid reusing old passwords."),
                            React.createElement("li", { className: "flex items-start gap-2" },
                                React.createElement(lucide_react_1.CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-emerald-600" }),
                                "Sign out on shared devices."))))))));
};
exports["default"] = ChangePasswordPage;
