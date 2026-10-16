"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
require("./environmental-impact.css");
var impactStats = [
    {
        title: "E-Waste Recovered",
        value: "2,450+",
        unit: "kg",
        description: "Electronic waste redirected toward responsible recovery.",
        icon: lucide_react_1.Recycle
    },
    {
        title: "Carbon Emissions Avoided",
        value: "1,280+",
        unit: "kg CO₂",
        description: "Estimated emissions avoided through responsible recycling.",
        icon: lucide_react_1.Leaf
    },
    {
        title: "Trees Worth of Benefits",
        value: "85+",
        unit: "trees",
        description: "An illustrative equivalent of environmental benefits.",
        icon: lucide_react_1.TreePine
    },
    {
        title: "Resources Protected",
        value: "640+",
        unit: "kg",
        description: "Materials potentially recovered for reuse and recycling.",
        icon: lucide_react_1.Droplets
    },
];
var sustainabilityGoals = [
    {
        title: "Responsible Recycling",
        description: "Help keep discarded electronics away from unsafe disposal practices.",
        icon: lucide_react_1.Recycle
    },
    {
        title: "Resource Conservation",
        description: "Support the recovery of reusable materials from old electronic devices.",
        icon: lucide_react_1.Zap
    },
    {
        title: "A Greener Future",
        description: "Encourage more sustainable choices through responsible e-waste management.",
        icon: lucide_react_1.Globe2
    },
];
function EnvironmentalImpactSection() {
    return (React.createElement("section", { className: "environmental-impact" },
        React.createElement("div", { className: "environmental-impact__container" },
            React.createElement("div", { className: "environmental-impact__heading" },
                React.createElement("span", { className: "environmental-impact__eyebrow" },
                    React.createElement(lucide_react_1.Leaf, { size: 15 }),
                    "Sustainability Matters"),
                React.createElement("h2", null,
                    "Small Actions.",
                    React.createElement("span", null, " Lasting Impact.")),
                React.createElement("p", null, "Every responsibly handled electronic device is a step toward reducing waste, recovering valuable resources, and building a cleaner future.")),
            React.createElement("div", { className: "environmental-impact__banner" },
                React.createElement("div", { className: "environmental-impact__banner-content" },
                    React.createElement("span", { className: "environmental-impact__banner-label" }, "OUR ENVIRONMENTAL MISSION"),
                    React.createElement("h3", null,
                        "Give your old electronics",
                        React.createElement("br", null),
                        "a ",
                        React.createElement("span", null, "more sustainable future.")),
                    React.createElement("p", null, "Reuse what you can. Recycle what you cannot. Make every device count."),
                    React.createElement(link_1["default"], { href: "/price-estimation", className: "environmental-impact__button" },
                        "Estimate Your Device Value",
                        React.createElement(lucide_react_1.ArrowRight, { size: 17 }))),
                React.createElement("div", { className: "environmental-impact__visual", "aria-hidden": "true" },
                    React.createElement("div", { className: "environmental-impact__visual-circle" },
                        React.createElement("div", { className: "environmental-impact__visual-inner" },
                            React.createElement(lucide_react_1.Recycle, { size: 76, strokeWidth: 1.2 })),
                        React.createElement("span", { className: "environmental-impact__floating-icon impact-leaf" },
                            React.createElement(lucide_react_1.Leaf, { size: 23 })),
                        React.createElement("span", { className: "environmental-impact__floating-icon impact-tree" },
                            React.createElement(lucide_react_1.TreePine, { size: 24 })),
                        React.createElement("span", { className: "environmental-impact__floating-icon impact-globe" },
                            React.createElement(lucide_react_1.Globe2, { size: 22 }))))),
            React.createElement("div", { className: "environmental-impact__stats-heading" },
                React.createElement("div", null,
                    React.createElement("span", { className: "environmental-impact__eyebrow" },
                        React.createElement(lucide_react_1.Globe2, { size: 15 }),
                        "Measuring Our Impact"),
                    React.createElement("h3", null, "Better choices, better outcomes.")),
                React.createElement("p", null, "Environmental metrics should be calculated from verified platform activity and transparent estimation methods.")),
            React.createElement("div", { className: "environmental-impact__stats" }, impactStats.map(function (stat) {
                var Icon = stat.icon;
                return (React.createElement("article", { className: "environmental-impact__stat-card", key: stat.title },
                    React.createElement("div", { className: "environmental-impact__stat-icon" },
                        React.createElement(Icon, { size: 22, strokeWidth: 1.8 })),
                    React.createElement("p", { className: "environmental-impact__stat-title" }, stat.title),
                    React.createElement("div", { className: "environmental-impact__stat-value" },
                        React.createElement("strong", null, stat.value),
                        React.createElement("span", null, stat.unit)),
                    React.createElement("p", { className: "environmental-impact__stat-description" }, stat.description)));
            })),
            React.createElement("div", { className: "environmental-impact__goals" }, sustainabilityGoals.map(function (goal) {
                var Icon = goal.icon;
                return (React.createElement("article", { className: "environmental-impact__goal", key: goal.title },
                    React.createElement("span", { className: "environmental-impact__goal-icon" },
                        React.createElement(Icon, { size: 21 })),
                    React.createElement("div", null,
                        React.createElement("h4", null, goal.title),
                        React.createElement("p", null, goal.description))));
            })),
            React.createElement("div", { className: "environmental-impact__footer" },
                React.createElement("div", { className: "environmental-impact__footer-icon" },
                    React.createElement(lucide_react_1.Leaf, { size: 22 })),
                React.createElement("div", null,
                    React.createElement("h3", null, "Have an old device? Give it a second life."),
                    React.createElement("p", null, "Explore its estimated value and discover a more responsible next step.")),
                React.createElement(link_1["default"], { href: "/marketplace/products", className: "environmental-impact__footer-link" },
                    "Explore Marketplace",
                    React.createElement(lucide_react_1.ArrowRight, { size: 17 }))))));
}
exports["default"] = EnvironmentalImpactSection;
