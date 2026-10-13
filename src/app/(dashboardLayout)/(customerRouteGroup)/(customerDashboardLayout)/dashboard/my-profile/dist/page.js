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
var image_1 = require("next/image");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var auth_service_1 = require("@/src/services/auth.service");
var formatDate = function (value) {
    if (!value)
        return "Not available";
    var date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return "Not available";
    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date);
};
var formatLabel = function (value) {
    if (!value)
        return "Not available";
    return value
        .toLowerCase()
        .split("_")
        .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
        .join(" ");
};
var getInitials = function (name) {
    var words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0)
        return "EV";
    return words
        .slice(0, 2)
        .map(function (word) { return word[0].toUpperCase(); })
        .join("");
};
function InfoField(_a) {
    var label = _a.label, value = _a.value, Icon = _a.icon;
    return (React.createElement("div", { className: "group rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-emerald-100 hover:bg-emerald-50/30" },
        React.createElement("div", { className: "flex items-start gap-3" },
            React.createElement("div", { className: "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm ring-1 ring-slate-100" },
                React.createElement(Icon, { size: 17, strokeWidth: 1.8 })),
            React.createElement("div", { className: "min-w-0 flex-1" },
                React.createElement("p", { className: "text-xs font-medium uppercase tracking-wider text-slate-500" }, label),
                React.createElement("p", { className: "mt-1.5 break-words text-sm font-semibold text-slate-800" }, (value === null || value === void 0 ? void 0 : value.trim()) || "Not provided")))));
}
function MyProfilePage() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var userData, user, displayName, email, role, status, photo, contactNumber, accountDate;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, auth_service_1.getUserInfo()["catch"](function () { return null; })];
                case 1:
                    userData = _d.sent();
                    user = userData;
                    displayName = ((_a = user === null || user === void 0 ? void 0 : user.name) === null || _a === void 0 ? void 0 : _a.trim()) || ((_b = user === null || user === void 0 ? void 0 : user.fullName) === null || _b === void 0 ? void 0 : _b.trim()) || ((_c = user === null || user === void 0 ? void 0 : user.email) === null || _c === void 0 ? void 0 : _c.split("@")[0]) ||
                        "EcoValuate Customer";
                    email = user === null || user === void 0 ? void 0 : user.email;
                    role = formatLabel(user === null || user === void 0 ? void 0 : user.role);
                    status = formatLabel(user === null || user === void 0 ? void 0 : user.status);
                    photo = (user === null || user === void 0 ? void 0 : user.profilePhoto) || (user === null || user === void 0 ? void 0 : user.image);
                    contactNumber = (user === null || user === void 0 ? void 0 : user.contactNumber) || (user === null || user === void 0 ? void 0 : user.phone);
                    accountDate = formatDate(user === null || user === void 0 ? void 0 : user.createdAt);
                    return [2 /*return*/, (React.createElement("main", { className: "min-h-screen bg-[#f5f8f6] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-9" },
                            React.createElement("div", { className: "mx-auto max-w-6xl space-y-7" },
                                React.createElement("header", { className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end" },
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700" },
                                            React.createElement(lucide_react_1.UserRound, { size: 15 }),
                                            "ACCOUNT MANAGEMENT"),
                                        React.createElement("h1", { className: "text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl" }, "My Profile"),
                                        React.createElement("p", { className: "mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base" }, "Manage your account information and keep your EcoValuate profile up to date.")),
                                    React.createElement(link_1["default"], { href: "/change-password", className: "inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-800" },
                                        React.createElement(lucide_react_1.KeyRound, { size: 16 }),
                                        "Change password")),
                                !user ? (React.createElement("section", { role: "alert", className: "rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-sm" },
                                    React.createElement("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600" },
                                        React.createElement(lucide_react_1.ShieldCheck, { size: 27 })),
                                    React.createElement("h2", { className: "mt-4 text-lg font-semibold text-slate-900" }, "Unable to load your profile"),
                                    React.createElement("p", { className: "mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500" }, "Your account information could not be retrieved. Please sign in again if your session has expired."),
                                    React.createElement(link_1["default"], { href: "/login", className: "mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800" },
                                        "Go to login ",
                                        React.createElement(lucide_react_1.ArrowRight, { size: 16 })))) : (React.createElement(React.Fragment, null,
                                    React.createElement("section", { className: "relative isolate overflow-hidden rounded-[26px] bg-gradient-to-br from-[#073f3c] via-[#075c50] to-[#07866d] p-6 text-white shadow-lg shadow-emerald-950/10 sm:p-8" },
                                        React.createElement("div", { className: "pointer-events-none absolute -right-12 -top-24 -z-10 h-64 w-64 rounded-full border border-white/10" }),
                                        React.createElement("div", { className: "pointer-events-none absolute -right-4 -top-16 -z-10 h-48 w-48 rounded-full border border-white/10" }),
                                        React.createElement("div", { className: "pointer-events-none absolute -bottom-20 left-1/3 -z-10 h-40 w-40 rounded-full bg-lime-300/10 blur-3xl" }),
                                        React.createElement("div", { className: "relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between" },
                                            React.createElement("div", { className: "flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center" },
                                                React.createElement("div", { className: "relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[25px] border border-white/20 bg-white/10 text-3xl font-semibold text-lime-200 shadow-inner" }, photo ? (React.createElement(image_1["default"], { src: photo, alt: displayName + " profile", fill: true, sizes: "96px", className: "object-cover" })) : (getInitials(displayName))),
                                                React.createElement("div", { className: "min-w-0" },
                                                    React.createElement("div", { className: "mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-emerald-50" },
                                                        React.createElement(lucide_react_1.BadgeCheck, { size: 14, className: "text-lime-300" }),
                                                        "ACCOUNT PROFILE"),
                                                    React.createElement("h2", { className: "break-words text-2xl font-semibold tracking-tight sm:text-3xl" }, displayName),
                                                    React.createElement("p", { className: "mt-2 break-all text-sm text-emerald-50/80" }, email || "Email not available"),
                                                    React.createElement("div", { className: "mt-4 flex flex-wrap gap-2" },
                                                        React.createElement("span", { className: "inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/10" },
                                                            React.createElement(lucide_react_1.UserRound, { size: 13 }),
                                                            role),
                                                        user.status && (React.createElement("span", { className: "inline-flex items-center gap-1.5 rounded-lg bg-lime-300/15 px-3 py-1.5 text-xs font-medium text-lime-200 ring-1 ring-lime-200/20" },
                                                            React.createElement("span", { className: "h-1.5 w-1.5 rounded-full bg-lime-300" }),
                                                            status))))),
                                            React.createElement("div", { className: "flex shrink-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4" },
                                                React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-lime-300/15 text-lime-200" },
                                                    React.createElement(lucide_react_1.ShieldCheck, { size: 22 })),
                                                React.createElement("div", null,
                                                    React.createElement("p", { className: "text-sm font-semibold" }, "Your account"),
                                                    React.createElement("p", { className: "mt-1 text-xs text-emerald-50/75" }, "Personal information"))))),
                                    React.createElement("div", { className: "grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]" },
                                        React.createElement("section", { className: "overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm" },
                                            React.createElement("div", { className: "flex items-center gap-3 border-b border-slate-100 p-5 sm:p-6" },
                                                React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800" },
                                                    React.createElement(lucide_react_1.UserRoundPen, { size: 21 })),
                                                React.createElement("div", null,
                                                    React.createElement("h2", { className: "text-lg font-semibold" }, "Personal information"),
                                                    React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Your currently saved account details."))),
                                            React.createElement("div", { className: "grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6" },
                                                React.createElement(InfoField, { label: "Full name", value: displayName, icon: lucide_react_1.UserRound }),
                                                React.createElement(InfoField, { label: "Email address", value: email, icon: lucide_react_1.Mail }),
                                                React.createElement(InfoField, { label: "Contact number", value: contactNumber, icon: lucide_react_1.Phone }),
                                                React.createElement(InfoField, { label: "Account role", value: role, icon: lucide_react_1.Fingerprint }),
                                                React.createElement(InfoField, { label: "Account status", value: user.status ? status : "Not available", icon: lucide_react_1.CheckCircle2 }),
                                                React.createElement(InfoField, { label: "Member since", value: accountDate, icon: lucide_react_1.CalendarDays })),
                                            React.createElement("div", { className: "border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6" },
                                                React.createElement("p", { className: "text-xs leading-5 text-slate-500" }, "Your profile details are displayed from your existing account information. Changes should be saved through the account update API."))),
                                        React.createElement("aside", { className: "space-y-5" },
                                            React.createElement("section", { className: "rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6" },
                                                React.createElement("div", { className: "flex items-center gap-3" },
                                                    React.createElement("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800" },
                                                        React.createElement(lucide_react_1.ShieldCheck, { size: 20 })),
                                                    React.createElement("div", null,
                                                        React.createElement("h2", { className: "font-semibold" }, "Account security"),
                                                        React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "Keep your account secure"))),
                                                React.createElement("div", { className: "mt-5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4" },
                                                    React.createElement("div", { className: "flex items-start gap-2.5" },
                                                        React.createElement(lucide_react_1.CheckCircle2, { size: 17, className: "mt-0.5 shrink-0 text-emerald-700" }),
                                                        React.createElement("div", null,
                                                            React.createElement("p", { className: "text-sm font-semibold text-emerald-950" }, "Profile information"),
                                                            React.createElement("p", { className: "mt-1 text-xs leading-5 text-emerald-900/70" }, "Review your saved contact and account details.")))),
                                                React.createElement(link_1["default"], { href: "/change-password", className: "mt-4 flex items-center justify-between rounded-xl border border-slate-200 p-3.5 transition hover:border-emerald-200 hover:bg-emerald-50/40" },
                                                    React.createElement("div", { className: "flex items-center gap-3" },
                                                        React.createElement(lucide_react_1.KeyRound, { size: 18, className: "text-slate-600" }),
                                                        React.createElement("span", { className: "text-sm font-medium text-slate-800" }, "Change password")),
                                                    React.createElement(lucide_react_1.ChevronRight, { size: 17, className: "text-slate-400" }))),
                                            React.createElement("section", { className: "overflow-hidden rounded-2xl bg-gradient-to-br from-[#e7f8ef] to-[#f4fce9] p-5 sm:p-6" },
                                                React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm" },
                                                    React.createElement(lucide_react_1.Clock3, { size: 21 })),
                                                React.createElement("h2", { className: "mt-4 text-lg font-semibold text-emerald-950" }, "Your EcoValuate journey"),
                                                React.createElement("p", { className: "mt-2 text-sm leading-6 text-emerald-900/75" }, "Keep track of your purchases and discover ways to give electronics a second life."),
                                                React.createElement(link_1["default"], { href: "/dashboard/orders", className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-950 transition hover:text-emerald-700" },
                                                    "View my orders ",
                                                    React.createElement(lucide_react_1.ArrowRight, { size: 16 }))))))),
                                React.createElement("footer", { className: "border-t border-slate-200 pt-5 text-xs text-slate-500" },
                                    "\u00A9 ",
                                    new Date().getFullYear(),
                                    " EcoValuate \u00B7 Give E-Waste a Second Life"))))];
            }
        });
    });
}
exports["default"] = MyProfilePage;
