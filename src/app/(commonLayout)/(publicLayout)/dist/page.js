"use strict";
exports.__esModule = true;
var AIValuationSection_1 = require("../../components/features/home/AIValuationSection");
var CategorySection_1 = require("../../components/features/home/CategorySection");
var EnvironmentalImpactSection_1 = require("../../components/features/home/EnvironmentalImpactSection");
var EWasteStorySection_1 = require("../../components/features/home/EWasteStorySection");
var FAQSection_1 = require("../../components/features/home/FAQSection");
var HeroSection_1 = require("../../components/features/home/HeroSection");
var LiveMarketSection_1 = require("../../components/features/home/LiveMarketSection");
var SecureEWasteDisposalSection_1 = require("../../components/features/home/SecureEWasteDisposalSection");
function HomePage() {
    return (React.createElement("main", null,
        React.createElement(HeroSection_1["default"], null),
        React.createElement(EWasteStorySection_1["default"], null),
        React.createElement(AIValuationSection_1["default"], null),
        React.createElement(CategorySection_1["default"], null),
        React.createElement(LiveMarketSection_1["default"], null),
        React.createElement(FAQSection_1["default"], null),
        React.createElement(EnvironmentalImpactSection_1["default"], null),
        React.createElement(SecureEWasteDisposalSection_1["default"], null)));
}
exports["default"] = HomePage;
