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
var audit_log_service_1 = require("@/services/audit-log.service");
function getActionDetails(action) {
    var _a;
    var actions = {
        LOGIN: {
            label: "Logged in",
            description: "You signed in to your account.",
            icon: lucide_react_1.LogIn,
            color: "text-blue-600",
            background: "bg-blue-50"
        },
        LOGOUT: {
            label: "Logged out",
            description: "You signed out of your account.",
            icon: lucide_react_1.LogOut,
            color: "text-slate-600",
            background: "bg-slate-100"
        },
        CREATE_ORDER: {
            label: "Order created",
            description: "A new order was created.",
            icon: lucide_react_1.ShoppingBag,
            color: "text-emerald-700",
            background: "bg-emerald-50"
        },
        CANCEL_ORDER: {
            label: "Order cancelled",
            description: "An order was cancelled.",
            icon: lucide_react_1.Package,
            color: "text-rose-600",
            background: "bg-rose-50"
        },
        PAYMENT_SUCCESS: {
            label: "Payment successful",
            description: "Your payment was completed.",
            icon: lucide_react_1.CheckCircle2,
            color: "text-emerald-700",
            background: "bg-emerald-50"
        },
        PAYMENT_FAILED: {
            label: "Payment failed",
            description: "Your payment could not be completed.",
            icon: lucide_react_1.XCircle,
            color: "text-rose-600",
            background: "bg-rose-50"
        },
        UPDATE_PROFILE: {
            label: "Profile updated",
            description: "Your account information was updated.",
            icon: lucide_react_1.UserRound,
            color: "text-violet-600",
            background: "bg-violet-50"
        },
        CREATE_OFFER: {
            label: "Offer created",
            description: "A new offer was created.",
            icon: lucide_react_1.FileText,
            color: "text-amber-700",
            background: "bg-amber-50"
        },
        ACCEPT_OFFER: {
            label: "Offer accepted",
            description: "An offer was accepted.",
            icon: lucide_react_1.CheckCircle2,
            color: "text-emerald-700",
            background: "bg-emerald-50"
        },
        REJECT_OFFER: {
            label: "Offer rejected",
            description: "An offer was rejected.",
            icon: lucide_react_1.XCircle,
            color: "text-rose-600",
            background: "bg-rose-50"
        },
        CREATE: {
            label: "Item created",
            description: "A new item was created.",
            icon: lucide_react_1.ArrowUpRight,
            color: "text-emerald-700",
            background: "bg-emerald-50"
        },
        UPDATE: {
            label: "Item updated",
            description: "An item was updated.",
            icon: lucide_react_1.RefreshCw,
            color: "text-blue-600",
            background: "bg-blue-50"
        },
        DELETE: {
            label: "Item deleted",
            description: "An item was deleted.",
            icon: lucide_react_1.ArrowDownRight,
            color: "text-rose-600",
            background: "bg-rose-50"
        }
    };
    return ((_a = actions[action]) !== null && _a !== void 0 ? _a : {
        label: action
            .toLowerCase()
            .split("_")
            .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
            .join(" "),
        description: "An activity was recorded on your account.",
        icon: lucide_react_1.Activity,
        color: "text-teal-700",
        background: "bg-teal-50"
    });
}
function formatDate(date) {
    var parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) {
        return "Date unavailable";
    }
    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    }).format(parsed);
}
function RecentActivity() {
    var _this = this;
    var _a = react_1.useState([]), logs = _a[0], setLogs = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(""), error = _c[0], setError = _c[1];
    react_1.useEffect(function () {
        var mounted = true;
        var loadLogs = function () { return __awaiter(_this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        setLoading(true);
                        setError("");
                        return [4 /*yield*/, audit_log_service_1.getMyAuditLogs(1, 5)];
                    case 1:
                        result = _b.sent();
                        if (mounted) {
                            setLogs(result.data);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        _a = _b.sent();
                        if (mounted) {
                            setError("Unable to load activity. Please try again.");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (mounted) {
                            setLoading(false);
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        void loadLogs();
        return function () {
            mounted = false;
        };
    }, []);
    return (React.createElement("section", { className: "overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm" },
        React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50" },
                    React.createElement(lucide_react_1.Activity, { className: "h-5 w-5 text-emerald-700" })),
                React.createElement("div", null,
                    React.createElement("h2", { className: "text-lg font-bold tracking-tight text-slate-900" }, "Recent Activity"),
                    React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Your latest account activities"))),
            React.createElement("span", { className: "rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700" }, "Latest 5")),
        React.createElement("div", { className: "px-5 sm:px-6" }, loading ? (React.createElement("div", { className: "space-y-5 py-6" }, [1, 2, 3].map(function (item) { return (React.createElement("div", { key: item, className: "flex animate-pulse gap-4" },
            React.createElement("div", { className: "h-11 w-11 rounded-xl bg-slate-100" }),
            React.createElement("div", { className: "flex-1 space-y-2 py-1" },
                React.createElement("div", { className: "h-4 w-36 rounded bg-slate-100" }),
                React.createElement("div", { className: "h-3 w-56 max-w-full rounded bg-slate-100" }),
                React.createElement("div", { className: "h-3 w-28 rounded bg-slate-100" })))); }))) : error ? (React.createElement("div", { className: "py-10 text-center" },
            React.createElement("p", { className: "text-sm text-rose-600" }, error),
            React.createElement("button", { type: "button", onClick: function () { return window.location.reload(); }, className: "mt-3 text-sm font-semibold text-emerald-700 hover:underline" }, "Reload page"))) : logs.length === 0 ? (React.createElement("div", { className: "py-12 text-center" },
            React.createElement("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50" },
                React.createElement(lucide_react_1.Clock3, { className: "h-7 w-7 text-slate-400" })),
            React.createElement("h3", { className: "font-semibold text-slate-800" }, "No activity yet"),
            React.createElement("p", { className: "mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500" }, "Your recent orders, profile updates and other account activities will appear here when logged."))) : (React.createElement("div", { className: "divide-y divide-slate-100" }, logs.map(function (log) {
            var details = getActionDetails(log.action);
            var Icon = details.icon;
            return (React.createElement("div", { key: log.id, className: "group flex items-start gap-4 py-5 transition-colors" },
                React.createElement("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl " + details.background },
                    React.createElement(Icon, { className: "h-5 w-5 " + details.color })),
                React.createElement("div", { className: "min-w-0 flex-1" },
                    React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-2" },
                        React.createElement("h3", { className: "font-semibold text-slate-800" }, details.label),
                        React.createElement("span", { className: "text-xs text-slate-400" }, formatDate(log.createdAt))),
                    React.createElement("p", { className: "mt-1 text-sm leading-6 text-slate-500" }, details.description),
                    React.createElement("div", { className: "mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400" },
                        React.createElement("span", { className: "rounded-md bg-slate-50 px-2 py-1 font-medium text-slate-600" }, log.entityType),
                        log.entityId && (React.createElement("span", { className: "max-w-full truncate", title: log.entityId },
                            "ID: ",
                            log.entityId))))));
        })))),
        React.createElement("div", { className: "border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6" },
            React.createElement("p", { className: "text-xs text-slate-500" }, "Activity is displayed from your account audit history."))));
}
exports["default"] = RecentActivity;
