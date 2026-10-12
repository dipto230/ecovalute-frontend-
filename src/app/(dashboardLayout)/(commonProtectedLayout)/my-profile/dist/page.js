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
var lucide_react_1 = require("lucide-react");
var auth_service_1 = require("@/src/services/auth.service");
function MyProfilePage() {
    var _this = this;
    var _a, _b, _c;
    var _d = react_1.useState(null), user = _d[0], setUser = _d[1];
    var _e = react_1.useState(true), loading = _e[0], setLoading = _e[1];
    var _f = react_1.useState(""), error = _f[0], setError = _f[1];
    react_1.useEffect(function () {
        var active = true;
        var loadProfile = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, profile, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, 3, 4]);
                        setLoading(true);
                        setError("");
                        return [4 /*yield*/, auth_service_1.getUserInfo()];
                    case 1:
                        data = _c.sent();
                        if (!active)
                            return [2 /*return*/];
                        if (!data) {
                            setError("Unable to load your profile. Please sign in again.");
                            return [2 /*return*/];
                        }
                        profile = ((_b = data.user) !== null && _b !== void 0 ? _b : data);
                        setUser(profile);
                        return [3 /*break*/, 4];
                    case 2:
                        _a = _c.sent();
                        if (active) {
                            setError("Something went wrong while loading your profile.");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (active)
                            setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        loadProfile();
        return function () {
            active = false;
        };
    }, []);
    var role = (_a = user === null || user === void 0 ? void 0 : user.role) !== null && _a !== void 0 ? _a : "USER";
    var roleProfile = role === "SUPER_ADMIN" || role === "ADMIN"
        ? user === null || user === void 0 ? void 0 : user.admin : role === "VENDOR"
        ? user === null || user === void 0 ? void 0 : user.vendor : user === null || user === void 0 ? void 0 : user.customer;
    var name = (roleProfile === null || roleProfile === void 0 ? void 0 : roleProfile.name) || (user === null || user === void 0 ? void 0 : user.name) ||
        "User";
    var email = (roleProfile === null || roleProfile === void 0 ? void 0 : roleProfile.email) || (user === null || user === void 0 ? void 0 : user.email) ||
        "Not provided";
    var phone = (roleProfile === null || roleProfile === void 0 ? void 0 : roleProfile.contactNumber) || (user === null || user === void 0 ? void 0 : user.contactNumber) ||
        "Not provided";
    var photo = (roleProfile === null || roleProfile === void 0 ? void 0 : roleProfile.profilePhoto) || (user === null || user === void 0 ? void 0 : user.profilePhoto) || (user === null || user === void 0 ? void 0 : user.image);
    var initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(function (part) { return part[0]; })
        .join("")
        .toUpperCase();
    var status = (_b = user === null || user === void 0 ? void 0 : user.status) !== null && _b !== void 0 ? _b : "UNKNOWN";
    if (loading) {
        return (React.createElement("div", { className: "flex min-h-[60vh] items-center justify-center" },
            React.createElement("div", { className: "flex flex-col items-center gap-3" },
                React.createElement(lucide_react_1.RefreshCw, { className: "h-8 w-8 animate-spin text-emerald-600" }),
                React.createElement("p", { className: "text-sm text-slate-500" }, "Loading your profile..."))));
    }
    if (error || !user) {
        return (React.createElement("div", { className: "mx-auto mt-10 max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center" },
            React.createElement(lucide_react_1.CircleUserRound, { className: "mx-auto mb-3 h-10 w-10 text-red-500" }),
            React.createElement("h2", { className: "text-lg font-semibold text-slate-900" }, "Profile unavailable"),
            React.createElement("p", { className: "mt-2 text-sm text-red-600" }, error || "Your profile information could not be loaded."),
            React.createElement("button", { onClick: function () { return window.location.reload(); }, className: "mt-5 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800" }, "Try again")));
    }
    return (React.createElement("main", { className: "min-h-screen bg-slate-50/80 p-4 sm:p-6 lg:p-8" },
        React.createElement("div", { className: "mx-auto max-w-6xl space-y-6" },
            React.createElement("div", null,
                React.createElement("div", { className: "mb-2 flex items-center gap-2 text-sm font-medium text-emerald-700" },
                    React.createElement(lucide_react_1.Leaf, { className: "h-4 w-4" }),
                    "EcoValuate / Account"),
                React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl" }, "My Profile"),
                React.createElement("p", { className: "mt-2 text-sm text-slate-500 sm:text-base" }, "View your personal information and account details.")),
            React.createElement("section", { className: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063f42] via-[#075b50] to-emerald-700 p-6 text-white shadow-lg sm:p-9" },
                React.createElement("div", { className: "pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5" }),
                React.createElement("div", { className: "pointer-events-none absolute -bottom-24 right-36 h-52 w-52 rounded-full bg-lime-300/10 blur-2xl" }),
                React.createElement("div", { className: "relative flex flex-col items-center gap-6 sm:flex-row" },
                    React.createElement("div", { className: "flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/25 bg-white/10 text-3xl font-bold shadow-xl" }, photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    React.createElement("img", { src: photo, alt: name, className: "h-full w-full object-cover" })) : (initials || React.createElement(lucide_react_1.UserRound, { className: "h-12 w-12" }))),
                    React.createElement("div", { className: "min-w-0 flex-1 text-center sm:text-left" },
                        React.createElement("div", { className: "mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start" },
                            React.createElement("span", { className: "rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide" }, role.replaceAll("_", " ")),
                            user.emailVerified && (React.createElement("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-semibold text-emerald-100" },
                                React.createElement(lucide_react_1.BadgeCheck, { className: "h-3.5 w-3.5" }),
                                "Verified email"))),
                        React.createElement("h2", { className: "break-words text-2xl font-bold sm:text-3xl" }, name),
                        React.createElement("p", { className: "mt-2 break-all text-sm text-emerald-50/80" }, email),
                        React.createElement("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start" },
                            React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium" },
                                React.createElement(lucide_react_1.ShieldCheck, { className: "h-4 w-4" }),
                                "Account: ",
                                status.replaceAll("_", " ")))),
                    React.createElement("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10" },
                        React.createElement(lucide_react_1.Leaf, { className: "h-7 w-7 text-lime-300" })))),
            React.createElement("div", { className: "grid gap-6 lg:grid-cols-[1.5fr_1fr]" },
                React.createElement("section", { className: "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" },
                    React.createElement("div", { className: "mb-6 flex items-center gap-3" },
                        React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" },
                            React.createElement(lucide_react_1.UserRound, { className: "h-5 w-5" })),
                        React.createElement("div", null,
                            React.createElement("h3", { className: "font-bold text-slate-900" }, "Personal Information"),
                            React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Your registered contact details"))),
                    React.createElement("div", { className: "space-y-5" },
                        React.createElement(InfoRow, { icon: React.createElement(lucide_react_1.UserRound, { className: "h-5 w-5" }), label: "Full Name", value: name }),
                        React.createElement(InfoRow, { icon: React.createElement(lucide_react_1.Mail, { className: "h-5 w-5" }), label: "Email Address", value: email }),
                        React.createElement(InfoRow, { icon: React.createElement(lucide_react_1.Phone, { className: "h-5 w-5" }), label: "Contact Number", value: phone }),
                        ((_c = user.vendor) === null || _c === void 0 ? void 0 : _c.companyName) && (React.createElement(InfoRow, { icon: React.createElement(lucide_react_1.ShieldCheck, { className: "h-5 w-5" }), label: "Company", value: user.vendor.companyName }))),
                    React.createElement("p", { className: "mt-6 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800" }, "Profile details are currently displayed in read-only mode. Editing requires a profile update API.")),
                React.createElement("div", { className: "space-y-6" },
                    React.createElement("section", { className: "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" },
                        React.createElement("div", { className: "mb-5 flex items-center gap-3" },
                            React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700" },
                                React.createElement(lucide_react_1.ShieldCheck, { className: "h-5 w-5" })),
                            React.createElement("div", null,
                                React.createElement("h3", { className: "font-bold text-slate-900" }, "Account Details"),
                                React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Your account status"))),
                        React.createElement("div", { className: "space-y-4" },
                            React.createElement("div", { className: "flex items-center justify-between gap-3" },
                                React.createElement("span", { className: "text-sm text-slate-500" }, "Role"),
                                React.createElement("span", { className: "rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800" }, role.replaceAll("_", " "))),
                            React.createElement("div", { className: "flex items-center justify-between gap-3" },
                                React.createElement("span", { className: "text-sm text-slate-500" }, "Status"),
                                React.createElement("span", { className: "text-sm font-semibold text-slate-800" }, status.replaceAll("_", " "))),
                            React.createElement("div", { className: "flex items-center justify-between gap-3" },
                                React.createElement("span", { className: "text-sm text-slate-500" }, "Email verified"),
                                React.createElement("span", { className: "text-sm font-semibold " + (user.emailVerified ? "text-emerald-700" : "text-amber-600") }, user.emailVerified ? "Yes" : "No")),
                            user.createdAt && (React.createElement("div", { className: "flex items-start justify-between gap-3" },
                                React.createElement("span", { className: "flex items-center gap-2 text-sm text-slate-500" },
                                    React.createElement(lucide_react_1.CalendarDays, { className: "h-4 w-4" }),
                                    "Joined"),
                                React.createElement("span", { className: "text-right text-sm font-medium text-slate-800" }, new Date(user.createdAt).toLocaleDateString()))))),
                    React.createElement("section", { className: "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" },
                        React.createElement("div", { className: "mb-4 flex items-center gap-3" },
                            React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700" },
                                React.createElement(lucide_react_1.LockKeyhole, { className: "h-5 w-5" })),
                            React.createElement("div", null,
                                React.createElement("h3", { className: "font-bold text-slate-900" }, "Security"),
                                React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Keep your account secure"))),
                        React.createElement("p", { className: "mb-5 text-sm leading-6 text-slate-500" }, "Update your password regularly to help protect your account."),
                        React.createElement(link_1["default"], { href: "/change-password", className: "flex w-full items-center justify-center gap-2 rounded-xl bg-[#063f42] px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800" },
                            React.createElement(lucide_react_1.LockKeyhole, { className: "h-4 w-4" }),
                            "Change Password")))))));
}
exports["default"] = MyProfilePage;
function InfoRow(_a) {
    var icon = _a.icon, label = _a.label, value = _a.value;
    return (React.createElement("div", { className: "flex min-w-0 items-start gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0" },
        React.createElement("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500" }, icon),
        React.createElement("div", { className: "min-w-0 flex-1" },
            React.createElement("p", { className: "text-xs font-medium uppercase tracking-wider text-slate-400" }, label),
            React.createElement("p", { className: "mt-1 break-words text-sm font-semibold text-slate-800" }, value))));
}
