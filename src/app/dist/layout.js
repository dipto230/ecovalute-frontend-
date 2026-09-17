"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var google_1 = require("next/font/google");
require("./globals.css");
var utils_1 = require("@/lib/utils");
var QueryProvider_1 = require("../providers/QueryProvider");
var inter = google_1.Inter({ subsets: ['latin'], variable: '--font-sans' });
var geistSans = google_1.Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});
var geistMono = google_1.Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});
exports.metadata = {
    title: "EcoValuate | E-Waste Management & Marketplace",
    description: "EcoValuate is a smart e-waste management platform where users can sell, value, reuse, and responsibly recycle old or damaged electronic devices."
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", className: utils_1.cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable) },
        React.createElement("body", { className: "min-h-full flex flex-col" },
            React.createElement(QueryProvider_1["default"], null, children))));
}
exports["default"] = RootLayout;
