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
exports.DropdownMenuSubContent = exports.DropdownMenuSubTrigger = exports.DropdownMenuSub = exports.DropdownMenuShortcut = exports.DropdownMenuSeparator = exports.DropdownMenuRadioItem = exports.DropdownMenuRadioGroup = exports.DropdownMenuCheckboxItem = exports.DropdownMenuItem = exports.DropdownMenuLabel = exports.DropdownMenuGroup = exports.DropdownMenuContent = exports.DropdownMenuTrigger = exports.DropdownMenuPortal = exports.DropdownMenu = void 0;
var React = require("react");
var lucide_react_1 = require("lucide-react");
var radix_ui_1 = require("radix-ui");
var utils_1 = require("@/lib/utils");
function DropdownMenu(_a) {
    var props = __rest(_a, []);
    return React.createElement(radix_ui_1.DropdownMenu.Root, __assign({ "data-slot": "dropdown-menu" }, props));
}
exports.DropdownMenu = DropdownMenu;
function DropdownMenuPortal(_a) {
    var props = __rest(_a, []);
    return (React.createElement(radix_ui_1.DropdownMenu.Portal, __assign({ "data-slot": "dropdown-menu-portal" }, props)));
}
exports.DropdownMenuPortal = DropdownMenuPortal;
function DropdownMenuTrigger(_a) {
    var props = __rest(_a, []);
    return (React.createElement(radix_ui_1.DropdownMenu.Trigger, __assign({ "data-slot": "dropdown-menu-trigger" }, props)));
}
exports.DropdownMenuTrigger = DropdownMenuTrigger;
function DropdownMenuContent(_a) {
    var className = _a.className, _b = _a.sideOffset, sideOffset = _b === void 0 ? 4 : _b, props = __rest(_a, ["className", "sideOffset"]);
    return (React.createElement(radix_ui_1.DropdownMenu.Portal, null,
        React.createElement(radix_ui_1.DropdownMenu.Content, __assign({ "data-slot": "dropdown-menu-content", sideOffset: sideOffset, className: utils_1.cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", className) }, props))));
}
exports.DropdownMenuContent = DropdownMenuContent;
function DropdownMenuGroup(_a) {
    var props = __rest(_a, []);
    return (React.createElement(radix_ui_1.DropdownMenu.Group, __assign({ "data-slot": "dropdown-menu-group" }, props)));
}
exports.DropdownMenuGroup = DropdownMenuGroup;
function DropdownMenuItem(_a) {
    var className = _a.className, inset = _a.inset, _b = _a.variant, variant = _b === void 0 ? "default" : _b, props = __rest(_a, ["className", "inset", "variant"]);
    return (React.createElement(radix_ui_1.DropdownMenu.Item, __assign({ "data-slot": "dropdown-menu-item", "data-inset": inset, "data-variant": variant, className: utils_1.cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className) }, props)));
}
exports.DropdownMenuItem = DropdownMenuItem;
function DropdownMenuCheckboxItem(_a) {
    var className = _a.className, children = _a.children, checked = _a.checked, props = __rest(_a, ["className", "children", "checked"]);
    return (React.createElement(radix_ui_1.DropdownMenu.CheckboxItem, __assign({ "data-slot": "dropdown-menu-checkbox-item", className: utils_1.cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className), checked: checked }, props),
        React.createElement("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center" },
            React.createElement(radix_ui_1.DropdownMenu.ItemIndicator, null,
                React.createElement(lucide_react_1.CheckIcon, { className: "size-4" }))),
        children));
}
exports.DropdownMenuCheckboxItem = DropdownMenuCheckboxItem;
function DropdownMenuRadioGroup(_a) {
    var props = __rest(_a, []);
    return (React.createElement(radix_ui_1.DropdownMenu.RadioGroup, __assign({ "data-slot": "dropdown-menu-radio-group" }, props)));
}
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
function DropdownMenuRadioItem(_a) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return (React.createElement(radix_ui_1.DropdownMenu.RadioItem, __assign({ "data-slot": "dropdown-menu-radio-item", className: utils_1.cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className) }, props),
        React.createElement("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center" },
            React.createElement(radix_ui_1.DropdownMenu.ItemIndicator, null,
                React.createElement(lucide_react_1.CircleIcon, { className: "size-2 fill-current" }))),
        children));
}
exports.DropdownMenuRadioItem = DropdownMenuRadioItem;
function DropdownMenuLabel(_a) {
    var className = _a.className, inset = _a.inset, props = __rest(_a, ["className", "inset"]);
    return (React.createElement(radix_ui_1.DropdownMenu.Label, __assign({ "data-slot": "dropdown-menu-label", "data-inset": inset, className: utils_1.cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className) }, props)));
}
exports.DropdownMenuLabel = DropdownMenuLabel;
function DropdownMenuSeparator(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(radix_ui_1.DropdownMenu.Separator, __assign({ "data-slot": "dropdown-menu-separator", className: utils_1.cn("bg-border -mx-1 my-1 h-px", className) }, props)));
}
exports.DropdownMenuSeparator = DropdownMenuSeparator;
function DropdownMenuShortcut(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("span", __assign({ "data-slot": "dropdown-menu-shortcut", className: utils_1.cn("text-muted-foreground ml-auto text-xs tracking-widest", className) }, props)));
}
exports.DropdownMenuShortcut = DropdownMenuShortcut;
function DropdownMenuSub(_a) {
    var props = __rest(_a, []);
    return React.createElement(radix_ui_1.DropdownMenu.Sub, __assign({ "data-slot": "dropdown-menu-sub" }, props));
}
exports.DropdownMenuSub = DropdownMenuSub;
function DropdownMenuSubTrigger(_a) {
    var className = _a.className, inset = _a.inset, children = _a.children, props = __rest(_a, ["className", "inset", "children"]);
    return (React.createElement(radix_ui_1.DropdownMenu.SubTrigger, __assign({ "data-slot": "dropdown-menu-sub-trigger", "data-inset": inset, className: utils_1.cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className) }, props),
        children,
        React.createElement(lucide_react_1.ChevronRightIcon, { className: "ml-auto size-4" })));
}
exports.DropdownMenuSubTrigger = DropdownMenuSubTrigger;
function DropdownMenuSubContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(radix_ui_1.DropdownMenu.SubContent, __assign({ "data-slot": "dropdown-menu-sub-content", className: utils_1.cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg", className) }, props)));
}
exports.DropdownMenuSubContent = DropdownMenuSubContent;
