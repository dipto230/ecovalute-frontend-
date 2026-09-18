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
exports.AlertDialogTrigger = exports.AlertDialogTitle = exports.AlertDialogPortal = exports.AlertDialogOverlay = exports.AlertDialogMedia = exports.AlertDialogHeader = exports.AlertDialogFooter = exports.AlertDialogDescription = exports.AlertDialogContent = exports.AlertDialogCancel = exports.AlertDialogAction = exports.AlertDialog = void 0;
var React = require("react");
var alert_dialog_1 = require("@base-ui/react/alert-dialog");
var cn_1 = require("cn");
var button_1 = require("@/src/app/components/ui/button");
function AlertDialog(_a) {
    var props = __rest(_a, []);
    return React.createElement(alert_dialog_1.AlertDialog.Root, __assign({ "data-slot": "alert-dialog" }, props));
}
exports.AlertDialog = AlertDialog;
function AlertDialogTrigger(_a) {
    var props = __rest(_a, []);
    return (React.createElement(alert_dialog_1.AlertDialog.Trigger, __assign({ "data-slot": "alert-dialog-trigger" }, props)));
}
exports.AlertDialogTrigger = AlertDialogTrigger;
function AlertDialogPortal(_a) {
    var props = __rest(_a, []);
    return (React.createElement(alert_dialog_1.AlertDialog.Portal, __assign({ "data-slot": "alert-dialog-portal" }, props)));
}
exports.AlertDialogPortal = AlertDialogPortal;
function AlertDialogOverlay(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(alert_dialog_1.AlertDialog.Backdrop, __assign({ "data-slot": "alert-dialog-overlay", className: cn_1.cn("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className) }, props)));
}
exports.AlertDialogOverlay = AlertDialogOverlay;
function AlertDialogContent(_a) {
    var className = _a.className, _b = _a.size, size = _b === void 0 ? "default" : _b, props = __rest(_a, ["className", "size"]);
    return (React.createElement(AlertDialogPortal, null,
        React.createElement(AlertDialogOverlay, null),
        React.createElement(alert_dialog_1.AlertDialog.Popup, __assign({ "data-slot": "alert-dialog-content", "data-size": size, className: cn_1.cn("group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-popover p-6 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className) }, props))));
}
exports.AlertDialogContent = AlertDialogContent;
function AlertDialogHeader(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "alert-dialog-header", className: cn_1.cn("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className) }, props)));
}
exports.AlertDialogHeader = AlertDialogHeader;
function AlertDialogFooter(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "alert-dialog-footer", className: cn_1.cn("flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className) }, props)));
}
exports.AlertDialogFooter = AlertDialogFooter;
function AlertDialogMedia(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "alert-dialog-media", className: cn_1.cn("mb-2 inline-flex size-16 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8", className) }, props)));
}
exports.AlertDialogMedia = AlertDialogMedia;
function AlertDialogTitle(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(alert_dialog_1.AlertDialog.Title, __assign({ "data-slot": "alert-dialog-title", className: cn_1.cn("text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className) }, props)));
}
exports.AlertDialogTitle = AlertDialogTitle;
function AlertDialogDescription(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(alert_dialog_1.AlertDialog.Description, __assign({ "data-slot": "alert-dialog-description", className: cn_1.cn("text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className) }, props)));
}
exports.AlertDialogDescription = AlertDialogDescription;
function AlertDialogAction(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(button_1.Button, __assign({ "data-slot": "alert-dialog-action", className: cn_1.cn(className) }, props)));
}
exports.AlertDialogAction = AlertDialogAction;
function AlertDialogCancel(_a) {
    var className = _a.className, _b = _a.variant, variant = _b === void 0 ? "outline" : _b, _c = _a.size, size = _c === void 0 ? "default" : _c, props = __rest(_a, ["className", "variant", "size"]);
    return (React.createElement(alert_dialog_1.AlertDialog.Close, __assign({ "data-slot": "alert-dialog-cancel", className: cn_1.cn(className), render: React.createElement(button_1.Button, { variant: variant, size: size }) }, props)));
}
exports.AlertDialogCancel = AlertDialogCancel;
