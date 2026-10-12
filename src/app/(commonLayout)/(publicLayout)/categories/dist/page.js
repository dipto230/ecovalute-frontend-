"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var CategorySection_1 = require("@/src/app/components/features/home/CategorySection");
exports.metadata = {
    title: "All Categories | EcoValuate",
    description: "Explore electronic devices and components for reuse, repair, resale, and responsible recycling."
};
function CategoriesPage() {
    return (React.createElement("main", { className: "min-h-screen bg-white" },
        React.createElement("div", { className: "border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white px-4 py-12 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "mx-auto max-w-7xl" },
                React.createElement("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800" }, "EcoValuate Marketplace"),
                React.createElement("h1", { className: "mt-4 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl" }, "All Categories"),
                React.createElement("p", { className: "mt-4 max-w-2xl text-base leading-7 text-gray-600" }, "Explore every category, discover reusable electronic components, and give old electronics a second life."))),
        React.createElement(CategorySection_1["default"], { showAll: true })));
}
exports["default"] = CategoriesPage;
