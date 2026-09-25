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
        badge: "AI"
    },
    {
        label: "Marketplace",
        href: "/marketplace",
        icon: lucide_react_1.ShoppingBag,
        dropdown: true
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
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("header", { className: "\n          fixed left-0 right-0 top-0 z-50\n          transition-all duration-500 ease-out\n          " + (scrolled
                ? "px-4 pt-3"
                : "px-4 pt-5") + "\n        " },
            React.createElement("nav", { className: "\n            mx-auto flex h-[72px] max-w-7xl items-center justify-between\n            rounded-2xl border\n            px-4 sm:px-6\n            transition-all duration-500\n            " + (scrolled
                    ? "border-emerald-200/60 bg-white/85 shadow-[0_12px_40px_rgba(16,185,129,0.12)] backdrop-blur-2xl"
                    : "border-white/60 bg-white/70 shadow-[0_8px_35px_rgba(15,23,42,0.06)] backdrop-blur-xl") + "\n          " },
                React.createElement(link_1["default"], { href: "/", onClick: closeMobileMenu, className: "group relative flex shrink-0 items-center gap-2.5" },
                    React.createElement("div", { className: "\r\n                absolute -inset-2 -z-10\r\n                rounded-full\r\n                bg-emerald-400/20\r\n                opacity-0 blur-xl\r\n                transition-all duration-500\r\n                group-hover:opacity-100\r\n              " }),
                    React.createElement("div", { className: "\r\n                relative flex h-11 w-11 items-center justify-center\r\n                overflow-hidden rounded-xl\r\n                border border-emerald-100\r\n                bg-gradient-to-br from-emerald-50 to-green-100\r\n                shadow-sm\r\n                transition-all duration-500\r\n                group-hover:-rotate-3\r\n                group-hover:scale-110\r\n                group-hover:shadow-lg\r\n              " },
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
                        if (item.dropdown) {
                            return (React.createElement("div", { key: item.label, className: "relative", onMouseEnter: function () { return setMarketplaceOpen(true); }, onMouseLeave: function () { return setMarketplaceOpen(false); } },
                                React.createElement(link_1["default"], { href: item.href, className: "\r\n                          group relative flex items-center gap-1.5\r\n                          rounded-lg px-3.5 py-2.5\r\n                          text-sm font-medium text-slate-600\r\n                          transition-all duration-300\r\n                          hover:bg-white hover:text-emerald-600\r\n                          hover:shadow-sm\r\n                        " },
                                    React.createElement(Icon, { className: "\r\n                            h-4 w-4\r\n                            transition-all duration-300\r\n                            group-hover:-translate-y-0.5\r\n                            group-hover:scale-110\r\n                          " }),
                                    React.createElement("span", null, item.label),
                                    React.createElement(lucide_react_1.ChevronDown, { className: "\n                            h-3.5 w-3.5\n                            transition-transform duration-300\n                            " + (marketplaceOpen
                                            ? "rotate-180"
                                            : "") + "\n                          " }),
                                    React.createElement("span", { className: "\r\n                            absolute bottom-1 left-1/2\r\n                            h-0.5 w-0\r\n                            -translate-x-1/2\r\n                            rounded-full\r\n                            bg-emerald-500\r\n                            transition-all duration-300\r\n                            group-hover:w-1/2\r\n                          " })),
                                React.createElement("div", { className: "\n                          absolute left-1/2 top-full\n                          w-56 -translate-x-1/2\n                          pt-3\n                          transition-all duration-300\n                          " + (marketplaceOpen
                                        ? "pointer-events-auto translate-y-0 opacity-100"
                                        : "pointer-events-none -translate-y-2 opacity-0") + "\n                        " },
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
                        return (React.createElement(link_1["default"], { key: item.label, href: item.href, className: "\r\n                      group relative flex items-center gap-1.5\r\n                      rounded-lg px-3.5 py-2.5\r\n                      text-sm font-medium text-slate-600\r\n                      transition-all duration-300\r\n                      hover:bg-white hover:text-emerald-600\r\n                      hover:shadow-sm\r\n                    " },
                            React.createElement(Icon, { className: "\r\n                        h-4 w-4\r\n                        transition-all duration-300\r\n                        group-hover:-translate-y-0.5\r\n                        group-hover:scale-110\r\n                      " }),
                            React.createElement("span", null, item.label),
                            item.badge && (React.createElement("span", { className: "ml-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm" }, item.badge)),
                            React.createElement("span", { className: "\r\n                        absolute bottom-1 left-1/2\r\n                        h-0.5 w-0\r\n                        -translate-x-1/2\r\n                        rounded-full\r\n                        bg-emerald-500\r\n                        transition-all duration-300\r\n                        group-hover:w-1/2\r\n                      " })));
                    }))),
                React.createElement("div", { className: "hidden items-center gap-2.5 lg:flex" },
                    React.createElement(link_1["default"], { href: "/login", className: "\r\n                group flex items-center gap-2\r\n                rounded-xl px-4 py-2.5\r\n                text-sm font-semibold text-slate-700\r\n                transition-all duration-300\r\n                hover:bg-emerald-50\r\n                hover:text-emerald-600\r\n              " },
                        React.createElement("span", null, "Login"),
                        React.createElement(lucide_react_1.ArrowRight, { className: "\r\n                  h-3.5 w-3.5\r\n                  -translate-x-1\r\n                  opacity-0\r\n                  transition-all duration-300\r\n                  group-hover:translate-x-0\r\n                  group-hover:opacity-100\r\n                " })),
                    React.createElement(link_1["default"], { href: "/register", className: "\r\n                group relative overflow-hidden\r\n                flex items-center gap-2\r\n                rounded-xl\r\n                bg-gradient-to-r from-emerald-500 to-green-600\r\n                px-5 py-2.5\r\n                text-sm font-bold text-white\r\n                shadow-lg shadow-emerald-500/20\r\n                transition-all duration-300\r\n                hover:-translate-y-0.5\r\n                hover:shadow-xl hover:shadow-emerald-500/30\r\n              " },
                        React.createElement("span", { className: "\r\n                  absolute inset-0\r\n                  -translate-x-full\r\n                  bg-gradient-to-r\r\n                  from-transparent\r\n                  via-white/25\r\n                  to-transparent\r\n                  transition-transform duration-700\r\n                  group-hover:translate-x-full\r\n                " }),
                        React.createElement(lucide_react_1.Leaf, { className: "relative h-4 w-4 transition-transform duration-300 group-hover:rotate-12" }),
                        React.createElement("span", { className: "relative" }, "Sign Up"),
                        React.createElement(lucide_react_1.ArrowRight, { className: "\r\n                  relative h-3.5 w-3.5\r\n                  transition-transform duration-300\r\n                  group-hover:translate-x-1\r\n                " }))),
                React.createElement("button", { type: "button", "aria-label": mobileOpen ? "Close menu" : "Open menu", onClick: function () { return setMobileOpen(function (prev) { return !prev; }); }, className: "\r\n              flex h-10 w-10 items-center justify-center\r\n              rounded-xl border border-slate-200\r\n              bg-white/80 text-slate-700\r\n              transition-all duration-300\r\n              hover:border-emerald-200\r\n              hover:bg-emerald-50\r\n              hover:text-emerald-600\r\n              lg:hidden\r\n            " }, mobileOpen ? (React.createElement(lucide_react_1.X, { className: "h-5 w-5" })) : (React.createElement(lucide_react_1.Menu, { className: "h-5 w-5" }))))),
        React.createElement("div", { className: "\n          fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm\n          transition-all duration-300\n          lg:hidden\n          " + (mobileOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0") + "\n        ", onClick: closeMobileMenu }),
        React.createElement("div", { className: "\n          fixed left-4 right-4 top-[100px] z-50\n          rounded-2xl border border-slate-100\n          bg-white/95 p-3\n          shadow-2xl shadow-slate-900/15\n          backdrop-blur-2xl\n          transition-all duration-500\n          lg:hidden\n          " + (mobileOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "-translate-y-5 scale-95 opacity-0") + "\n        " },
            React.createElement("div", { className: "space-y-1" }, navItems.map(function (item) {
                var Icon = item.icon;
                if (item.dropdown) {
                    return (React.createElement("div", { key: item.label },
                        React.createElement("button", { type: "button", onClick: function () {
                                return setMarketplaceOpen(function (prev) { return !prev; });
                            }, className: "\r\n                      flex w-full items-center justify-between\r\n                      rounded-xl px-4 py-3\r\n                      text-sm font-semibold text-slate-700\r\n                      transition-colors\r\n                      hover:bg-emerald-50\r\n                      hover:text-emerald-600\r\n                    " },
                            React.createElement("span", { className: "flex items-center gap-3" },
                                React.createElement(Icon, { className: "h-4 w-4" }),
                                "Marketplace"),
                            React.createElement(lucide_react_1.ChevronDown, { className: "\n                        h-4 w-4 transition-transform duration-300\n                        " + (marketplaceOpen
                                    ? "rotate-180"
                                    : "") + "\n                      " })),
                        React.createElement("div", { className: "\n                      overflow-hidden transition-all duration-300\n                      " + (marketplaceOpen
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0") + "\n                    " },
                            React.createElement("div", { className: "ml-5 space-y-1 border-l border-emerald-100 pl-3" },
                                React.createElement(link_1["default"], { href: "/marketplace", onClick: closeMobileMenu, className: "block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" }, "Marketplace"),
                                React.createElement(link_1["default"], { href: "/marketplace/products", onClick: closeMobileMenu, className: "block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" }, "Products"),
                                React.createElement(link_1["default"], { href: "/marketplace/vendors", onClick: closeMobileMenu, className: "block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" }, "Vendors")))));
                }
                return (React.createElement(link_1["default"], { key: item.label, href: item.href, onClick: closeMobileMenu, className: "\r\n                  flex items-center justify-between\r\n                  rounded-xl px-4 py-3\r\n                  text-sm font-semibold text-slate-700\r\n                  transition-all duration-300\r\n                  hover:bg-emerald-50\r\n                  hover:pl-5\r\n                  hover:text-emerald-600\r\n                " },
                    React.createElement("span", { className: "flex items-center gap-3" },
                        React.createElement(Icon, { className: "h-4 w-4" }),
                        item.label,
                        item.badge && (React.createElement("span", { className: "rounded-full bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold text-white" }, "AI"))),
                    React.createElement(lucide_react_1.ArrowRight, { className: "h-3.5 w-3.5 opacity-40" })));
            })),
            React.createElement("div", { className: "my-3 h-px bg-slate-100" }),
            React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                React.createElement(link_1["default"], { href: "/login", onClick: closeMobileMenu, className: "\r\n              flex items-center justify-center\r\n              rounded-xl border border-slate-200\r\n              px-4 py-3\r\n              text-sm font-bold text-slate-700\r\n              transition-all duration-300\r\n              hover:border-emerald-200\r\n              hover:bg-emerald-50\r\n              hover:text-emerald-600\r\n            " }, "Login"),
                React.createElement(link_1["default"], { href: "/register", onClick: closeMobileMenu, className: "\r\n              flex items-center justify-center gap-2\r\n              rounded-xl\r\n              bg-gradient-to-r from-emerald-500 to-green-600\r\n              px-4 py-3\r\n              text-sm font-bold text-white\r\n              shadow-lg shadow-emerald-500/20\r\n              transition-all duration-300\r\n              hover:-translate-y-0.5\r\n            " },
                    React.createElement(lucide_react_1.Leaf, { className: "h-4 w-4" }),
                    "Sign Up")))));
}
exports["default"] = Navbar;
