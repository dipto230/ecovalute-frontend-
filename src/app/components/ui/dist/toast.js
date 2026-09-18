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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.useToastManager = exports.toast = exports.createToastManager = exports.ToastViewport = exports.ToastTitle = exports.ToastProvider = exports.ToastPortal = exports.ToastDescription = exports.ToastContent = exports.ToastClose = exports.ToastAction = exports.Toast = exports.Toaster = void 0;
var React = require("react");
var toast_1 = require("@base-ui/react/toast");
var cn_1 = require("cn");
var button_1 = require("@/src/app/components/ui/button");
var lucide_react_1 = require("lucide-react");
var toast = toast_1.Toast.createToastManager();
exports.toast = toast;
function ToastProvider(_a) {
    var props = __rest(_a, []);
    return React.createElement(toast_1.Toast.Provider, __assign({}, props));
}
exports.ToastProvider = ToastProvider;
function ToastPortal(_a) {
    var props = __rest(_a, []);
    return React.createElement(toast_1.Toast.Portal, __assign({ "data-slot": "toast-portal" }, props));
}
exports.ToastPortal = ToastPortal;
function ToastViewport(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(toast_1.Toast.Viewport, __assign({ "data-slot": "toast-viewport", className: cn_1.cn("pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full", className) }, props)));
}
exports.ToastViewport = ToastViewport;
function Toast(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(toast_1.Toast.Root, __assign({ "data-slot": "toast", className: cn_1.cn("group/toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-2xl border bg-popover text-popover-foreground shadow-lg will-change-transform outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]", "h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]", "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']", "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]", "data-limited:opacity-0 data-starting-style:[transform:translateY(150%)]", "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]", "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]", "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]", "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]", "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]", "data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]", "data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]", "data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]", "data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]", className) }, props)));
}
exports.Toast = Toast;
function ToastContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(toast_1.Toast.Content, __assign({ "data-slot": "toast-content", className: cn_1.cn("flex h-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100", className) }, props)));
}
exports.ToastContent = ToastContent;
function ToastTitle(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(toast_1.Toast.Title, __assign({ "data-slot": "toast-title", className: cn_1.cn("text-sm font-medium", className) }, props)));
}
exports.ToastTitle = ToastTitle;
function ToastDescription(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(toast_1.Toast.Description, __assign({ "data-slot": "toast-description", className: cn_1.cn("text-sm text-muted-foreground", className) }, props)));
}
exports.ToastDescription = ToastDescription;
function ToastAction(_a) {
    var className = _a.className, _b = _a.render, render = _b === void 0 ? React.createElement(button_1.Button, { variant: "outline", size: "sm" }) : _b, props = __rest(_a, ["className", "render"]);
    return (React.createElement(toast_1.Toast.Action, __assign({ "data-slot": "toast-action", render: render, className: cn_1.cn("shrink-0", className) }, props)));
}
exports.ToastAction = ToastAction;
function ToastClose(_a) {
    var className = _a.className, children = _a.children, _b = _a.render, render = _b === void 0 ? React.createElement(button_1.Button, { variant: "ghost", size: "icon-sm" }) : _b, props = __rest(_a, ["className", "children", "render"]);
    return (React.createElement(toast_1.Toast.Close, __assign({ "data-slot": "toast-close", "aria-label": "Close toast", render: render, className: cn_1.cn("relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground", className) }, props), children !== null && children !== void 0 ? children : (React.createElement(lucide_react_1.XIcon, { "aria-hidden": "true" }))));
}
exports.ToastClose = ToastClose;
function ToastIcon(_a) {
    var type = _a.type;
    var icon = null;
    if (type === "success") {
        icon = (React.createElement(lucide_react_1.CircleCheckIcon, { "aria-hidden": "true" }));
    }
    if (type === "info") {
        icon = (React.createElement(lucide_react_1.InfoIcon, { "aria-hidden": "true" }));
    }
    if (type === "warning") {
        icon = (React.createElement(lucide_react_1.TriangleAlertIcon, { "aria-hidden": "true" }));
    }
    if (type === "error") {
        icon = (React.createElement(lucide_react_1.OctagonXIcon, { className: "text-destructive", "aria-hidden": "true" }));
    }
    if (type === "loading") {
        icon = (React.createElement(lucide_react_1.Loader2Icon, { className: "animate-spin", "aria-hidden": "true" }));
    }
    if (!icon) {
        return null;
    }
    return (React.createElement("span", { "data-slot": "toast-icon", className: "shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4" }, icon));
}
function ToastList() {
    var toasts = toast_1.Toast.useToastManager().toasts;
    return toasts.map(function (toastItem) { return (React.createElement(Toast, { key: toastItem.id, toast: toastItem },
        React.createElement(ToastContent, null,
            React.createElement(ToastIcon, { type: toastItem.type }),
            React.createElement("div", { className: "flex min-w-0 flex-1 flex-col gap-1" },
                React.createElement(ToastTitle, null),
                React.createElement(ToastDescription, null)),
            React.createElement(ToastAction, null),
            React.createElement(ToastClose, null)))); });
}
function Toaster(_a) {
    var children = _a.children, _b = _a.toastManager, toastManager = _b === void 0 ? toast : _b, props = __rest(_a, ["children", "toastManager"]);
    return (React.createElement(ToastProvider, __assign({ toastManager: toastManager }, props),
        children,
        React.createElement(ToastPortal, null,
            React.createElement(ToastViewport, null,
                React.createElement(ToastList, null)))));
}
exports.Toaster = Toaster;
var createToastManager = toast_1.Toast.createToastManager;
exports.createToastManager = createToastManager;
var useToastManager = toast_1.Toast.useToastManager;
exports.useToastManager = useToastManager;
