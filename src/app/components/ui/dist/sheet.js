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
exports.SheetDescription = exports.SheetTitle = exports.SheetFooter = exports.SheetHeader = exports.SheetContent = exports.SheetClose = exports.SheetTrigger = exports.Sheet = void 0;
var React = require("react");
var dialog_1 = require("@base-ui/react/dialog");
var cn_1 = require("cn");
var button_1 = require("@/src/app/components/ui/button");
var lucide_react_1 = require("lucide-react");
function Sheet(_a) {
    var props = __rest(_a, []);
    return React.createElement(dialog_1.Dialog.Root, __assign({ "data-slot": "sheet" }, props));
}
exports.Sheet = Sheet;
function SheetTrigger(_a) {
    var props = __rest(_a, []);
    return React.createElement(dialog_1.Dialog.Trigger, __assign({ "data-slot": "sheet-trigger" }, props));
}
exports.SheetTrigger = SheetTrigger;
function SheetClose(_a) {
    var props = __rest(_a, []);
    return React.createElement(dialog_1.Dialog.Close, __assign({ "data-slot": "sheet-close" }, props));
}
exports.SheetClose = SheetClose;
function SheetPortal(_a) {
    var props = __rest(_a, []);
    return React.createElement(dialog_1.Dialog.Portal, __assign({ "data-slot": "sheet-portal" }, props));
}
function SheetOverlay(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(dialog_1.Dialog.Backdrop, __assign({ "data-slot": "sheet-overlay", className: cn_1.cn("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", className) }, props)));
}
function SheetContent(_a) {
    var className = _a.className, children = _a.children, _b = _a.side, side = _b === void 0 ? "right" : _b, _c = _a.showCloseButton, showCloseButton = _c === void 0 ? true : _c, props = __rest(_a, ["className", "children", "side", "showCloseButton"]);
    return (React.createElement(SheetPortal, null,
        React.createElement(SheetOverlay, null),
        React.createElement(dialog_1.Dialog.Popup, __assign({ "data-slot": "sheet-content", "data-side": side, className: cn_1.cn("fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", className) }, props),
            children,
            showCloseButton && (React.createElement(dialog_1.Dialog.Close, { "data-slot": "sheet-close", render: React.createElement(button_1.Button, { variant: "ghost", className: "absolute top-4 right-4", size: "icon-sm" }) },
                React.createElement(lucide_react_1.XIcon, null),
                React.createElement("span", { className: "sr-only" }, "Close"))))));
}
exports.SheetContent = SheetContent;
function SheetHeader(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "sheet-header", className: cn_1.cn("flex flex-col gap-1.5 p-4", className) }, props)));
}
exports.SheetHeader = SheetHeader;
function SheetFooter(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "sheet-footer", className: cn_1.cn("mt-auto flex flex-col gap-2 p-4", className) }, props)));
}
exports.SheetFooter = SheetFooter;
function SheetTitle(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(dialog_1.Dialog.Title, __assign({ "data-slot": "sheet-title", className: cn_1.cn("font-medium text-foreground", className) }, props)));
}
exports.SheetTitle = SheetTitle;
function SheetDescription(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(dialog_1.Dialog.Description, __assign({ "data-slot": "sheet-description", className: cn_1.cn("text-sm text-muted-foreground", className) }, props)));
}
exports.SheetDescription = SheetDescription;
