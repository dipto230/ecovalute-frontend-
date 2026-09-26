"use client";
"use strict";
exports.__esModule = true;
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var sheet_1 = require("../../ui/sheet");
var button_1 = require("../../ui/button");
var DashboardMobileSidebar_1 = require("./DashboardMobileSidebar");
var input_1 = require("../../ui/input");
var NotificationDropdown_1 = require("./NotificationDropdown");
var UserDropdown_1 = require("./UserDropdown");
var DashboardNavbarContent = function (_a) {
    var dashboardHome = _a.dashboardHome, navItems = _a.navItems, userInfo = _a.userInfo;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = react_1.useState(false), isMobile = _c[0], setIsMobile = _c[1];
    react_1.useEffect(function () {
        var checkSmallerScreen = function () {
            setIsMobile(window.innerWidth < 768);
        };
        checkSmallerScreen();
        window.addEventListener("resize", checkSmallerScreen);
        return function () {
            window.removeEventListener("resize", checkSmallerScreen);
        };
    }, []);
    return (React.createElement("div", { className: "sticky top-0 z-40 flex h-[72px] w-full items-center border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-xl md:px-6" },
        React.createElement("div", { className: "flex items-center gap-3" },
            React.createElement(sheet_1.Sheet, { open: isOpen && isMobile, onOpenChange: setIsOpen },
                React.createElement(sheet_1.SheetTrigger, { render: React.createElement(button_1.Button, { variant: "outline", size: "icon", className: "h-10 w-10 rounded-xl border-slate-200 bg-white shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 md:hidden" },
                        React.createElement(lucide_react_1.Menu, { className: "h-5 w-5" })) }),
                React.createElement(sheet_1.SheetContent, { side: "left", className: "w-64 border-r border-slate-200 p-0" },
                    React.createElement(DashboardMobileSidebar_1["default"], { userInfo: userInfo, dashboardHome: dashboardHome, navItems: navItems }))),
            React.createElement("div", { className: "hidden items-center gap-2.5 md:flex" },
                React.createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600" },
                    React.createElement(lucide_react_1.Sparkles, { className: "h-4 w-4" })),
                React.createElement("div", { className: "leading-none" },
                    React.createElement("p", { className: "text-sm font-semibold text-slate-800" }, "EcoValuate"),
                    React.createElement("p", { className: "mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400" }, "E-Waste Management")))),
        React.createElement("div", { className: "mx-4 flex flex-1 justify-center md:mx-8" },
            React.createElement("div", { className: "relative hidden w-full max-w-xl sm:block" },
                React.createElement(lucide_react_1.Search, { className: "absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-slate-400" }),
                React.createElement(input_1.Input, { type: "text", placeholder: "Search anything...", className: "\r\n              h-11\r\n              rounded-xl\r\n              border-slate-200\r\n              bg-slate-50/70\r\n              pl-10\r\n              pr-16\r\n              text-sm\r\n              text-slate-700\r\n              shadow-none\r\n              placeholder:text-slate-400\r\n              transition-all\r\n              duration-200\r\n              focus:border-emerald-300\r\n              focus:bg-white\r\n              focus:ring-4\r\n              focus:ring-emerald-500/10\r\n            " }),
                React.createElement("div", { className: "pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] font-medium text-slate-400 shadow-sm lg:flex" },
                    React.createElement("span", null, "\u2318"),
                    React.createElement("span", null, "K")))),
        React.createElement("div", { className: "flex items-center gap-2" },
            React.createElement("div", { className: "rounded-xl transition-all duration-200 hover:bg-slate-50" },
                React.createElement(NotificationDropdown_1["default"], null)),
            React.createElement("div", { className: "mx-1 hidden h-7 w-px bg-slate-200 sm:block" }),
            React.createElement(UserDropdown_1["default"], { userInfo: userInfo }))));
};
exports["default"] = DashboardNavbarContent;
