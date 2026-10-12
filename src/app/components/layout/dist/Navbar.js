"use client";
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var navItems = [
    {
        label: "Home",
        href: "/",
        icon: lucide_react_1.Home
    },
    {
        label: "AI Detection",
        href: "/ai-detection",
        icon: lucide_react_1.Bot,
        badge: "AI",
        dropdown: "ai"
    },
    {
        label: "Marketplace",
        href: "/marketplace",
        icon: lucide_react_1.ShoppingBag,
        dropdown: "marketplace"
    },
    {
        label: "About Us",
        href: "/about",
        icon: lucide_react_1.Building2
    },
    {
        label: "Contact",
        href: "#contact",
        icon: lucide_react_1.Sparkles
    },
];
function Navbar() {
    var _a = react_1.useState(false), scrolled = _a[0], setScrolled = _a[1];
    var _b = react_1.useState(false), mobileOpen = _b[0], setMobileOpen = _b[1];
    var _c = react_1.useState(false), marketplaceOpen = _c[0], setMarketplaceOpen = _c[1];
    var _d = react_1.useState(false), aiDropdownOpen = _d[0], setAiDropdownOpen = _d[1];
    react_1.useEffect(function () {
        var handleScroll = function () {
            setScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return function () {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    react_1.useEffect(function () {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return function () {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);
    var closeMobileMenu = function () {
        setMobileOpen(false);
        setMarketplaceOpen(false);
        setAiDropdownOpen(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("header", { className: "\n          fixed left-0 right-0 top-0 z-50\n          transition-all duration-500 ease-out\n          " + (scrolled ? "px-4 pt-3" : "px-4 pt-5") + "\n        " },
            React.createElement("nav", { className: "\n            mx-auto flex h-[72px] max-w-7xl items-center justify-between\n            rounded-2xl border px-4 sm:px-6\n            transition-all duration-500\n            " + (scrolled
                    ? "border-emerald-200/60 bg-white/85 shadow-[0_12px_40px_rgba(16,185,129,0.12)] backdrop-blur-2xl"
                    : "border-white/60 bg-white/70 shadow-[0_8px_35px_rgba(15,23,42,0.06)] backdrop-blur-xl") + "\n          " },
                React.createElement(link_1["default"], { href: "/", onClick: closeMobileMenu, className: "group relative flex shrink-0 items-center gap-2.5" },
                    React.createElement("div", { className: "absolute -inset-2 -z-10 rounded-full bg-emerald-400/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" }),
                    React.createElement("div", { className: "relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-100 shadow-sm transition-all duration-500 group-hover:-rotate-3 group-hover:scale-110 group-hover:shadow-lg" },
                        React.createElement(image_1["default"], { src: "/logo.png", alt: "EcoValuate Logo", width: 42, height: 42, className: "h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-110", priority: true })),
                    React.createElement("div", { className: "hidden sm:block" },
                        React.createElement("div", { className: "flex items-center gap-1" },
                            React.createElement("span", { className: "text-xl font-extrabold tracking-tight text-slate-900" }, "Eco"),
                            React.createElement("span", { className: "text-xl font-extrabold tracking-tight text-emerald-600" }, "Valuate")),
                        React.createElement("div", { className: "-mt-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400" },
                            React.createElement(lucide_react_1.Recycle, { className: "h-2.5 w-2.5 text-emerald-500" }),
                            "Smart E-Waste"))),
                React.createElement("div", { className: "hidden items-center lg:flex" },
                    React.createElement("div", { className: "flex items-center gap-1 rounded-xl bg-slate-50/70 p-1" }, navItems.map(function (item) {
                        var Icon = item.icon;
                        // AI DETECTION DROPDOWN
                        if (item.dropdown === "ai") {
                            return (React.createElement("div", { key: item.label, className: "relative", onMouseEnter: function () { return setAiDropdownOpen(true); }, onMouseLeave: function () { return setAiDropdownOpen(false); } },
                                React.createElement(link_1["default"], { href: item.href, className: "group relative flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-emerald-600 hover:shadow-sm" },
                                    React.createElement(Icon, { className: "h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" }),
                                    React.createElement("span", null, item.label),
                                    item.badge && (React.createElement("span", { className: "ml-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm" }, item.badge)),
                                    React.createElement(lucide_react_1.ChevronDown, { className: "h-3.5 w-3.5 transition-transform duration-300 " + (aiDropdownOpen ? "rotate-180" : "") }),
                                    React.createElement("span", { className: "absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-1/2" })),
                                React.createElement("div", { className: "absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 transition-all duration-300 " + (aiDropdownOpen
                                        ? "pointer-events-auto translate-y-0 opacity-100"
                                        : "pointer-events-none -translate-y-2 opacity-0") },
                                    React.createElement("div", { className: "overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-900/10" },
                                        React.createElement(link_1["default"], { href: "/ai-detection", className: "group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50" },
                                            React.createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 transition-transform duration-300 group-hover:scale-110" },
                                                React.createElement(lucide_react_1.Bot, { className: "h-4 w-4" })),
                                            React.createElement("div", null,
                                                React.createElement("p", { className: "text-sm font-semibold text-slate-800" }, "AI Detection"),
                                                React.createElement("p", { className: "text-xs text-slate-400" }, "Detect electronic waste"))),
                                        React.createElement(link_1["default"], { href: "/price-estimation", className: "group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50" },
                                            React.createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110" },
                                                React.createElement(lucide_react_1.Sparkles, { className: "h-4 w-4" })),
                                            React.createElement("div", null,
                                                React.createElement("p", { className: "text-sm font-semibold text-slate-800" }, "Price Estimation"),
                                                React.createElement("p", { className: "text-xs text-slate-400" }, "Estimate your e-waste value")))))));
                        }
                        // MARKETPLACE DROPDOWN
                        if (item.dropdown === "marketplace") {
                            return (React.createElement("div", { key: item.label, className: "relative", onMouseEnter: function () { return setMarketplaceOpen(true); }, onMouseLeave: function () { return setMarketplaceOpen(false); } },
                                React.createElement(link_1["default"], { href: item.href, className: "group relative flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-emerald-600 hover:shadow-sm" },
                                    React.createElement(Icon, { className: "h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" }),
                                    React.createElement("span", null, item.label),
                                    React.createElement(lucide_react_1.ChevronDown, { className: "h-3.5 w-3.5 transition-transform duration-300 " + (marketplaceOpen ? "rotate-180" : "") }),
                                    React.createElement("span", { className: "absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-1/2" })),
                                React.createElement("div", { className: "absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 transition-all duration-300 " + (marketplaceOpen
                                        ? "pointer-events-auto translate-y-0 opacity-100"
                                        : "pointer-events-none -translate-y-2 opacity-0") },
                                    React.createElement("div", { className: "overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-900/10" },
                                        React.createElement(link_1["default"], { href: "/marketplace", className: "group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50" },
                                            React.createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 transition-transform duration-300 group-hover:scale-110" },
                                                React.createElement(lucide_react_1.ShoppingBag, { className: "h-4 w-4" })),
                                            React.createElement("div", null,
                                                React.createElement("p", { className: "text-sm font-semibold text-slate-800" }, "Marketplace"),
                                                React.createElement("p", { className: "text-xs text-slate-400" }, "Browse e-waste products"))),
                                        React.createElement(link_1["default"], { href: "/marketplace/products", className: "group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50" },
                                            React.createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110" },
                                                React.createElement(lucide_react_1.Recycle, { className: "h-4 w-4" })),
                                            React.createElement("div", null,
                                                React.createElement("p", { className: "text-sm font-semibold text-slate-800" }, "Products"),
                                                React.createElement("p", { className: "text-xs text-slate-400" }, "Explore recycled items"))),
                                        React.createElement(link_1["default"], { href: "/marketplace/vendors", className: "group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50" },
                                            React.createElement("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-transform duration-300 group-hover:scale-110" },
                                                React.createElement(lucide_react_1.Building2, { className: "h-4 w-4" })),
                                            React.createElement("div", null,
                                                React.createElement("p", { className: "text-sm font-semibold text-slate-800" }, "Vendors"),
                                                React.createElement("p", { className: "text-xs text-slate-400" }, "Find trusted vendors")))))));
                        }
                        // REGULAR NAV LINKS
                        return (React.createElement(link_1["default"], { key: item.label, href: item.href, className: "group relative flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-emerald-600 hover:shadow-sm" },
                            React.createElement(Icon, { className: "h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" }),
                            React.createElement("span", null, item.label),
                            item.badge && (React.createElement("span", { className: "ml-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm" }, item.badge)),
                            React.createElement("span", { className: "absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-1/2" })));
                    }))),
                React.createElement("div", { className: "hidden items-center gap-2.5 lg:flex" },
                    React.createElement(link_1["default"], { href: "/login", className: "group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600" },
                        React.createElement("span", null, "Login"),
                        React.createElement(lucide_react_1.ArrowRight, { className: "h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" })),
                    React.createElement(link_1["default"], { href: "/register", className: "group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30" },
                        React.createElement("span", { className: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" }),
                        React.createElement(lucide_react_1.Leaf, { className: "relative h-4 w-4 transition-transform duration-300 group-hover:rotate-12" }),
                        React.createElement("span", { className: "relative" }, "Sign Up"),
                        React.createElement(lucide_react_1.ArrowRight, { className: "relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" }))),
                React.createElement("button", { type: "button", "aria-label": mobileOpen ? "Close menu" : "Open menu", onClick: function () { return setMobileOpen(function (prev) { return !prev; }); }, className: "flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 lg:hidden" }, mobileOpen ? (React.createElement(lucide_react_1.X, { className: "h-5 w-5" })) : (React.createElement(lucide_react_1.Menu, { className: "h-5 w-5" }))))),
        React.createElement("div", { className: "fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm transition-all duration-300 lg:hidden " + (mobileOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"), onClick: closeMobileMenu }),
        React.createElement("div", { className: "fixed left-4 right-4 top-[100px] z-50 rounded-2xl border border-slate-100 bg-white/95 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur-2xl transition-all duration-500 lg:hidden " + (mobileOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-5 scale-95 opacity-0") },
            React.createElement("div", { className: "space-y-1" }, navItems.map(function (item) {
                var Icon = item.icon;
                // MOBILE AI DETECTION SUBMENU
                if (item.dropdown === "ai") {
                    return (React.createElement("div", { key: item.label },
                        React.createElement("button", { type: "button", "aria-expanded": aiDropdownOpen, onClick: function () { return setAiDropdownOpen(function (prev) { return !prev; }); }, className: "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600" },
                            React.createElement("span", { className: "flex items-center gap-3" },
                                React.createElement(Icon, { className: "h-4 w-4" }),
                                item.label,
                                React.createElement("span", { className: "rounded-full bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold text-white" }, "AI")),
                            React.createElement(lucide_react_1.ChevronDown, { className: "h-4 w-4 transition-transform duration-300 " + (aiDropdownOpen ? "rotate-180" : "") })),
                        React.createElement("div", { className: "overflow-hidden transition-all duration-300 " + (aiDropdownOpen
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0") },
                            React.createElement("div", { className: "ml-5 space-y-1 border-l border-emerald-100 pl-3" },
                                React.createElement(link_1["default"], { href: "/ai-detection", onClick: closeMobileMenu, className: "block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" }, "AI Detection"),
                                React.createElement(link_1["default"], { href: "/price-estimation", onClick: closeMobileMenu, className: "block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" }, "Price Estimation")))));
                }
                // MOBILE MARKETPLACE SUBMENU
                if (item.dropdown === "marketplace") {
                    return (React.createElement("div", { key: item.label },
                        React.createElement("button", { type: "button", "aria-expanded": marketplaceOpen, onClick: function () { return setMarketplaceOpen(function (prev) { return !prev; }); }, className: "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600" },
                            React.createElement("span", { className: "flex items-center gap-3" },
                                React.createElement(Icon, { className: "h-4 w-4" }),
                                item.label),
                            React.createElement(lucide_react_1.ChevronDown, { className: "h-4 w-4 transition-transform duration-300 " + (marketplaceOpen ? "rotate-180" : "") })),
                        React.createElement("div", { className: "overflow-hidden transition-all duration-300 " + (marketplaceOpen
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0") },
                            React.createElement("div", { className: "ml-5 space-y-1 border-l border-emerald-100 pl-3" },
                                React.createElement(link_1["default"], { href: "/marketplace", onClick: closeMobileMenu, className: "block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" }, "Marketplace"),
                                React.createElement(link_1["default"], { href: "/marketplace/products", onClick: closeMobileMenu, className: "block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" }, "Products"),
                                React.createElement(link_1["default"], { href: "/marketplace/vendors", onClick: closeMobileMenu, className: "block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" }, "Vendors")))));
                }
                // REGULAR MOBILE LINKS
                return (React.createElement(link_1["default"], { key: item.label, href: item.href, onClick: closeMobileMenu, className: "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:pl-5 hover:text-emerald-600" },
                    React.createElement("span", { className: "flex items-center gap-3" },
                        React.createElement(Icon, { className: "h-4 w-4" }),
                        item.label),
                    React.createElement(lucide_react_1.ArrowRight, { className: "h-3.5 w-3.5 opacity-40" })));
            })),
            React.createElement("div", { className: "my-3 h-px bg-slate-100" }),
            React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                React.createElement(link_1["default"], { href: "/login", onClick: closeMobileMenu, className: "flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600" }, "Login"),
                React.createElement(link_1["default"], { href: "/register", onClick: closeMobileMenu, className: "flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5" },
                    React.createElement(lucide_react_1.Leaf, { className: "h-4 w-4" }),
                    "Sign Up")))));
}
exports["default"] = Navbar;
