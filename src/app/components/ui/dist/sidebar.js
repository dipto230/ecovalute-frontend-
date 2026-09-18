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
exports.useSidebar = exports.SidebarTrigger = exports.SidebarSeparator = exports.SidebarRail = exports.SidebarProvider = exports.SidebarMenuSubItem = exports.SidebarMenuSubButton = exports.SidebarMenuSub = exports.SidebarMenuSkeleton = exports.SidebarMenuItem = exports.SidebarMenuButton = exports.SidebarMenuBadge = exports.SidebarMenuAction = exports.SidebarMenu = exports.SidebarInset = exports.SidebarInput = exports.SidebarHeader = exports.SidebarGroupLabel = exports.SidebarGroupContent = exports.SidebarGroupAction = exports.SidebarGroup = exports.SidebarFooter = exports.SidebarContent = exports.Sidebar = void 0;
var React = require("react");
var merge_props_1 = require("@base-ui/react/merge-props");
var use_render_1 = require("@base-ui/react/use-render");
var class_variance_authority_1 = require("class-variance-authority");
var cn_1 = require("cn");
var use_mobile_1 = require("@/hooks/use-mobile");
var button_1 = require("@/src/app/components/ui/button");
var input_1 = require("@/src/app/components/ui/input");
var separator_1 = require("@/src/app/components/ui/separator");
var sheet_1 = require("@/src/app/components/ui/sheet");
var skeleton_1 = require("@/src/app/components/ui/skeleton");
var tooltip_1 = require("@/src/app/components/ui/tooltip");
var lucide_react_1 = require("lucide-react");
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React.createContext(null);
function useSidebar() {
    var context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }
    return context;
}
exports.useSidebar = useSidebar;
function SidebarProvider(_a) {
    var _b = _a.defaultOpen, defaultOpen = _b === void 0 ? true : _b, openProp = _a.open, setOpenProp = _a.onOpenChange, className = _a.className, style = _a.style, children = _a.children, props = __rest(_a, ["defaultOpen", "open", "onOpenChange", "className", "style", "children"]);
    var isMobile = use_mobile_1.useIsMobile();
    var _c = React.useState(false), openMobile = _c[0], setOpenMobile = _c[1];
    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    var _d = React.useState(defaultOpen), _open = _d[0], _setOpen = _d[1];
    var open = openProp !== null && openProp !== void 0 ? openProp : _open;
    var setOpen = React.useCallback(function (value) {
        var openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
            setOpenProp(openState);
        }
        else {
            _setOpen(openState);
        }
        // This sets the cookie to keep the sidebar state.
        document.cookie = SIDEBAR_COOKIE_NAME + "=" + openState + "; path=/; max-age=" + SIDEBAR_COOKIE_MAX_AGE;
    }, [setOpenProp, open]);
    // Helper to toggle the sidebar.
    var toggleSidebar = React.useCallback(function () {
        return isMobile ? setOpenMobile(function (open) { return !open; }) : setOpen(function (open) { return !open; });
    }, [isMobile, setOpen, setOpenMobile]);
    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(function () {
        var handleKeyDown = function (event) {
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
                (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggleSidebar();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return function () { return window.removeEventListener("keydown", handleKeyDown); };
    }, [toggleSidebar]);
    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    var state = open ? "expanded" : "collapsed";
    var contextValue = React.useMemo(function () { return ({
        state: state,
        open: open,
        setOpen: setOpen,
        isMobile: isMobile,
        openMobile: openMobile,
        setOpenMobile: setOpenMobile,
        toggleSidebar: toggleSidebar
    }); }, [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);
    return (React.createElement(SidebarContext.Provider, { value: contextValue },
        React.createElement("div", __assign({ "data-slot": "sidebar-wrapper", style: __assign({ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON }, style), className: cn_1.cn("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className) }, props), children)));
}
exports.SidebarProvider = SidebarProvider;
function Sidebar(_a) {
    var _b = _a.side, side = _b === void 0 ? "left" : _b, _c = _a.variant, variant = _c === void 0 ? "sidebar" : _c, _d = _a.collapsible, collapsible = _d === void 0 ? "offcanvas" : _d, className = _a.className, children = _a.children, dir = _a.dir, props = __rest(_a, ["side", "variant", "collapsible", "className", "children", "dir"]);
    var _e = useSidebar(), isMobile = _e.isMobile, state = _e.state, openMobile = _e.openMobile, setOpenMobile = _e.setOpenMobile;
    if (collapsible === "none") {
        return (React.createElement("div", __assign({ "data-slot": "sidebar", className: cn_1.cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className) }, props), children));
    }
    if (isMobile) {
        return (React.createElement(sheet_1.Sheet, __assign({ open: openMobile, onOpenChange: setOpenMobile }, props),
            React.createElement(sheet_1.SheetContent, { dir: dir, "data-sidebar": "sidebar", "data-slot": "sidebar", "data-mobile": "true", className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden", style: {
                    "--sidebar-width": SIDEBAR_WIDTH_MOBILE
                }, side: side },
                React.createElement(sheet_1.SheetHeader, { className: "sr-only" },
                    React.createElement(sheet_1.SheetTitle, null, "Sidebar"),
                    React.createElement(sheet_1.SheetDescription, null, "Displays the mobile sidebar.")),
                React.createElement("div", { className: "flex h-full w-full flex-col" }, children))));
    }
    return (React.createElement("div", { className: "group peer hidden text-sidebar-foreground md:block", "data-state": state, "data-collapsible": state === "collapsed" ? collapsible : "", "data-variant": variant, "data-side": side, "data-slot": "sidebar" },
        React.createElement("div", { "data-slot": "sidebar-gap", className: cn_1.cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset"
                ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)") }),
        React.createElement("div", __assign({ "data-slot": "sidebar-container", "data-side": side, className: cn_1.cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", 
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
                ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className) }, props),
            React.createElement("div", { "data-sidebar": "sidebar", "data-slot": "sidebar-inner", className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border" }, children))));
}
exports.Sidebar = Sidebar;
function SidebarTrigger(_a) {
    var className = _a.className, onClick = _a.onClick, props = __rest(_a, ["className", "onClick"]);
    var toggleSidebar = useSidebar().toggleSidebar;
    return (React.createElement(button_1.Button, __assign({ "data-sidebar": "trigger", "data-slot": "sidebar-trigger", variant: "ghost", size: "icon-sm", className: cn_1.cn(className), onClick: function (event) {
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
            toggleSidebar();
        } }, props),
        React.createElement(lucide_react_1.PanelLeftIcon, null),
        React.createElement("span", { className: "sr-only" }, "Toggle Sidebar")));
}
exports.SidebarTrigger = SidebarTrigger;
function SidebarRail(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var toggleSidebar = useSidebar().toggleSidebar;
    return (React.createElement("button", __assign({ "data-sidebar": "rail", "data-slot": "sidebar-rail", "aria-label": "Toggle Sidebar", tabIndex: -1, onClick: toggleSidebar, title: "Toggle Sidebar", className: cn_1.cn("absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className) }, props)));
}
exports.SidebarRail = SidebarRail;
function SidebarInset(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("main", __assign({ "data-slot": "sidebar-inset", className: cn_1.cn("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", className) }, props)));
}
exports.SidebarInset = SidebarInset;
function SidebarInput(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(input_1.Input, __assign({ "data-slot": "sidebar-input", "data-sidebar": "input", className: cn_1.cn("h-8 w-full bg-background shadow-none", className) }, props)));
}
exports.SidebarInput = SidebarInput;
function SidebarHeader(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "sidebar-header", "data-sidebar": "header", className: cn_1.cn("flex flex-col gap-2 p-2", className) }, props)));
}
exports.SidebarHeader = SidebarHeader;
function SidebarFooter(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "sidebar-footer", "data-sidebar": "footer", className: cn_1.cn("flex flex-col gap-2 p-2", className) }, props)));
}
exports.SidebarFooter = SidebarFooter;
function SidebarSeparator(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(separator_1.Separator, __assign({ "data-slot": "sidebar-separator", "data-sidebar": "separator", className: cn_1.cn("mx-2 w-auto bg-sidebar-border", className) }, props)));
}
exports.SidebarSeparator = SidebarSeparator;
function SidebarContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "sidebar-content", "data-sidebar": "content", className: cn_1.cn("no-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className) }, props)));
}
exports.SidebarContent = SidebarContent;
function SidebarGroup(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "sidebar-group", "data-sidebar": "group", className: cn_1.cn("relative flex w-full min-w-0 flex-col p-2", className) }, props)));
}
exports.SidebarGroup = SidebarGroup;
function SidebarGroupLabel(_a) {
    var className = _a.className, render = _a.render, props = __rest(_a, ["className", "render"]);
    return use_render_1.useRender({
        defaultTagName: "div",
        props: merge_props_1.mergeProps({
            className: cn_1.cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", className)
        }, props),
        render: render,
        state: {
            slot: "sidebar-group-label",
            sidebar: "group-label"
        }
    });
}
exports.SidebarGroupLabel = SidebarGroupLabel;
function SidebarGroupAction(_a) {
    var className = _a.className, render = _a.render, props = __rest(_a, ["className", "render"]);
    return use_render_1.useRender({
        defaultTagName: "button",
        props: merge_props_1.mergeProps({
            className: cn_1.cn("absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0", className)
        }, props),
        render: render,
        state: {
            slot: "sidebar-group-action",
            sidebar: "group-action"
        }
    });
}
exports.SidebarGroupAction = SidebarGroupAction;
function SidebarGroupContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "sidebar-group-content", "data-sidebar": "group-content", className: cn_1.cn("w-full text-sm", className) }, props)));
}
exports.SidebarGroupContent = SidebarGroupContent;
function SidebarMenu(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("ul", __assign({ "data-slot": "sidebar-menu", "data-sidebar": "menu", className: cn_1.cn("flex w-full min-w-0 flex-col gap-1", className) }, props)));
}
exports.SidebarMenu = SidebarMenu;
function SidebarMenuItem(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("li", __assign({ "data-slot": "sidebar-menu-item", "data-sidebar": "menu-item", className: cn_1.cn("group/menu-item relative", className) }, props)));
}
exports.SidebarMenuItem = SidebarMenuItem;
var sidebarMenuButtonVariants = class_variance_authority_1.cva("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
    variants: {
        variant: {
            "default": "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
        },
        size: {
            "default": "h-8 text-sm",
            sm: "h-7 text-xs",
            lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function SidebarMenuButton(_a) {
    var render = _a.render, _b = _a.isActive, isActive = _b === void 0 ? false : _b, _c = _a.variant, variant = _c === void 0 ? "default" : _c, _d = _a.size, size = _d === void 0 ? "default" : _d, tooltip = _a.tooltip, className = _a.className, props = __rest(_a, ["render", "isActive", "variant", "size", "tooltip", "className"]);
    var _e = useSidebar(), isMobile = _e.isMobile, state = _e.state;
    var comp = use_render_1.useRender({
        defaultTagName: "button",
        props: merge_props_1.mergeProps({
            className: cn_1.cn(sidebarMenuButtonVariants({ variant: variant, size: size }), className)
        }, props),
        render: !tooltip ? render : React.createElement(tooltip_1.TooltipTrigger, { render: render }),
        state: {
            slot: "sidebar-menu-button",
            sidebar: "menu-button",
            size: size,
            active: isActive
        }
    });
    if (!tooltip) {
        return comp;
    }
    if (typeof tooltip === "string") {
        tooltip = {
            children: tooltip
        };
    }
    return (React.createElement(tooltip_1.Tooltip, null,
        comp,
        React.createElement(tooltip_1.TooltipContent, __assign({ side: "right", align: "center", hidden: state !== "collapsed" || isMobile }, tooltip))));
}
exports.SidebarMenuButton = SidebarMenuButton;
function SidebarMenuAction(_a) {
    var className = _a.className, render = _a.render, _b = _a.showOnHover, showOnHover = _b === void 0 ? false : _b, props = __rest(_a, ["className", "render", "showOnHover"]);
    return use_render_1.useRender({
        defaultTagName: "button",
        props: merge_props_1.mergeProps({
            className: cn_1.cn("absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0", showOnHover &&
                "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0", className)
        }, props),
        render: render,
        state: {
            slot: "sidebar-menu-action",
            sidebar: "menu-action"
        }
    });
}
exports.SidebarMenuAction = SidebarMenuAction;
function SidebarMenuBadge(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "sidebar-menu-badge", "data-sidebar": "menu-badge", className: cn_1.cn("pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground", className) }, props)));
}
exports.SidebarMenuBadge = SidebarMenuBadge;
function SidebarMenuSkeleton(_a) {
    var className = _a.className, _b = _a.showIcon, showIcon = _b === void 0 ? false : _b, props = __rest(_a, ["className", "showIcon"]);
    // Random width between 50 to 90%.
    var width = React.useState(function () {
        return Math.floor(Math.random() * 40) + 50 + "%";
    })[0];
    return (React.createElement("div", __assign({ "data-slot": "sidebar-menu-skeleton", "data-sidebar": "menu-skeleton", className: cn_1.cn("flex h-8 items-center gap-2 rounded-md px-2", className) }, props),
        showIcon && (React.createElement(skeleton_1.Skeleton, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" })),
        React.createElement(skeleton_1.Skeleton, { className: "h-4 max-w-(--skeleton-width) flex-1", "data-sidebar": "menu-skeleton-text", style: {
                "--skeleton-width": width
            } })));
}
exports.SidebarMenuSkeleton = SidebarMenuSkeleton;
function SidebarMenuSub(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("ul", __assign({ "data-slot": "sidebar-menu-sub", "data-sidebar": "menu-sub", className: cn_1.cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden", className) }, props)));
}
exports.SidebarMenuSub = SidebarMenuSub;
function SidebarMenuSubItem(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("li", __assign({ "data-slot": "sidebar-menu-sub-item", "data-sidebar": "menu-sub-item", className: cn_1.cn("group/menu-sub-item relative", className) }, props)));
}
exports.SidebarMenuSubItem = SidebarMenuSubItem;
function SidebarMenuSubButton(_a) {
    var render = _a.render, _b = _a.size, size = _b === void 0 ? "md" : _b, _c = _a.isActive, isActive = _c === void 0 ? false : _c, className = _a.className, props = __rest(_a, ["render", "size", "isActive", "className"]);
    return use_render_1.useRender({
        defaultTagName: "a",
        props: merge_props_1.mergeProps({
            className: cn_1.cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", className)
        }, props),
        render: render,
        state: {
            slot: "sidebar-menu-sub-button",
            sidebar: "menu-sub-button",
            size: size,
            active: isActive
        }
    });
}
exports.SidebarMenuSubButton = SidebarMenuSubButton;
