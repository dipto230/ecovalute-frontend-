"use client";
"use strict";
exports.__esModule = true;
var utils_1 = require("@/lib/utils");
var image_1 = require("next/image");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var separator_1 = require("../../ui/separator");
var scroll_area_1 = require("@/components/ui/scroll-area");
var DashboardSidebarContent = function (_a) {
    var dashboardHome = _a.dashboardHome, navItems = _a.navItems, userInfo = _a.userInfo;
    var pathname = navigation_1.usePathname();
    return (React.createElement("div", { className: "hidden md:flex h-full w-64 flex-col border-r border-emerald-100/80 bg-white text-slate-900 shadow-[4px_0_24px_-20px_rgba(15,23,42,0.25)]" },
        React.createElement("div", { className: "relative flex h-16 shrink-0 items-center border-b border-slate-100 px-5" },
            React.createElement(link_1["default"], { href: dashboardHome, className: "group flex items-center gap-3 transition-all duration-300" },
                React.createElement("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white transition-all duration-300 group-hover:scale-105" },
                    React.createElement(image_1["default"], { src: "/logo.png", alt: "EcoValuate", width: 40, height: 40, className: "h-full w-full object-contain" })),
                React.createElement("div", { className: "flex flex-col leading-none" },
                    React.createElement("span", { className: "text-[17px] font-bold tracking-tight text-slate-900" },
                        "Eco",
                        React.createElement("span", { className: "text-emerald-600" }, "Valuate")),
                    React.createElement("span", { className: "mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-slate-400" }, "E-Waste Management")))),
        React.createElement(scroll_area_1.ScrollArea, { className: "flex-1 px-3 py-5" },
            React.createElement("nav", { className: "space-y-5" }, navItems.map(function (section, sectionId) { return (React.createElement("div", { key: sectionId },
                section.title && (React.createElement("h4", { className: "mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400" }, section.title)),
                React.createElement("div", { className: "space-y-1" }, section.items.map(function (item, id) {
                    var isActive = pathname === item.href;
                    // Icon Mapper Function
                    var Icon = getIconComponent(item.icon);
                    return (React.createElement(link_1["default"], { href: item.href, key: id, className: utils_1.cn("group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200", isActive
                            ? "bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100/70"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900") },
                        isActive && (React.createElement("span", { className: "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-emerald-600" })),
                        React.createElement("span", { className: utils_1.cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200", isActive
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-emerald-600 group-hover:shadow-sm") },
                            React.createElement(Icon, { className: "h-[17px] w-[17px]" })),
                        React.createElement("span", { className: "truncate" }, item.title),
                        isActive && (React.createElement("span", { className: "ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.08)]" }))));
                })),
                sectionId < navItems.length - 1 && (React.createElement(separator_1.Separator, { className: "my-5 bg-slate-100" })))); }))),
        React.createElement("div", { className: "shrink-0 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/80 px-3 py-4" },
            React.createElement("div", { className: "group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm transition-all duration-200 hover:border-emerald-100 hover:shadow-md hover:shadow-slate-200/50" },
                React.createElement("div", { className: "relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm shadow-emerald-600/20" },
                    React.createElement("span", { className: "text-sm font-bold text-white" }, userInfo.name.charAt(0).toUpperCase()),
                    React.createElement("span", { className: "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" })),
                React.createElement("div", { className: "min-w-0 flex-1" },
                    React.createElement("p", { className: "truncate text-sm font-semibold text-slate-800" }, userInfo.name),
                    React.createElement("p", { className: "mt-0.5 truncate text-[10px] font-medium uppercase tracking-wider text-slate-400" }, userInfo.role.toLocaleLowerCase().replace("_", " ")))),
            React.createElement("div", { className: "mt-3 flex items-center justify-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-emerald-600/70" },
                React.createElement("span", { className: "h-1 w-1 rounded-full bg-emerald-500" }),
                "Building a greener future",
                React.createElement("span", { className: "h-1 w-1 rounded-full bg-emerald-500" })))));
};
exports["default"] = DashboardSidebarContent;
