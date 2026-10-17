"use client";
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
require("./secure-ewaste-disposal.css");
var disposalSteps = [
    {
        number: "01",
        title: "Assess Your Device",
        description: "Identify the device type, its condition, and whether it can be reused, repaired, or recycled.",
        icon: lucide_react_1.Smartphone
    },
    {
        number: "02",
        title: "Protect Your Data",
        description: "Back up important files, sign out of accounts, remove linked devices, and securely erase personal data.",
        icon: lucide_react_1.LockKeyhole
    },
    {
        number: "03",
        title: "Choose Responsible Disposal",
        description: "Find a suitable reuse or recycling option and check the provider's credentials and handling process.",
        icon: lucide_react_1.Recycle
    },
    {
        number: "04",
        title: "Keep Batteries Safe",
        description: "Separate batteries only when designed to be removable. Never puncture, crush, or place lithium batteries in household waste.",
        icon: lucide_react_1.BatteryWarning
    },
];
var safetyFeatures = [
    {
        title: "Data Privacy First",
        description: "Protect personal information before selling, donating, or recycling a device.",
        icon: lucide_react_1.ShieldCheck
    },
    {
        title: "Responsible Recycling",
        description: "Prefer verified recycling facilities that follow applicable environmental and safety requirements.",
        icon: lucide_react_1.Recycle
    },
    {
        title: "Safer Battery Handling",
        description: "Keep damaged, swollen, or leaking batteries away from heat and follow local hazardous-waste guidance.",
        icon: lucide_react_1.BatteryWarning
    },
];
function SecureEWasteDisposalSection() {
    return (React.createElement("section", { className: "secure-disposal" },
        React.createElement("div", { className: "secure-disposal__container" },
            React.createElement("div", { className: "secure-disposal__intro" },
                React.createElement("span", { className: "secure-disposal__eyebrow" },
                    React.createElement(lucide_react_1.ShieldCheck, { size: 16 }),
                    "Secure & Responsible Disposal"),
                React.createElement("h2", null,
                    "Your Data Matters.",
                    React.createElement("br", null),
                    React.createElement("span", null, "Our Planet Does Too.")),
                React.createElement("p", null, "Disposing of old electronics should protect both your personal information and the environment. Make informed choices before your next device gets a second life.")),
            React.createElement("div", { className: "secure-disposal__hero" },
                React.createElement("div", { className: "secure-disposal__hero-content" },
                    React.createElement("div", { className: "secure-disposal__hero-badge" },
                        React.createElement(lucide_react_1.LockKeyhole, { size: 15 }),
                        "Think Before You Dispose"),
                    React.createElement("h3", null,
                        "Dispose smarter.",
                        React.createElement("br", null),
                        React.createElement("span", null, "Protect what matters.")),
                    React.createElement("p", null, "A few careful steps can help reduce data exposure, prevent unsafe handling, and support responsible electronics recovery."),
                    React.createElement("div", { className: "secure-disposal__hero-checks" },
                        React.createElement("span", null,
                            React.createElement(lucide_react_1.CheckCircle2, { size: 17 }),
                            "Personal data protection"),
                        React.createElement("span", null,
                            React.createElement(lucide_react_1.CheckCircle2, { size: 17 }),
                            "Responsible disposal choices"),
                        React.createElement("span", null,
                            React.createElement(lucide_react_1.CheckCircle2, { size: 17 }),
                            "Safer battery handling")),
                    React.createElement(link_1["default"], { href: "/price-estimation", className: "secure-disposal__primary-button" },
                        "Assess Your Device",
                        React.createElement(lucide_react_1.ArrowRight, { size: 17 }))),
                React.createElement("div", { className: "secure-disposal__hero-art" },
                    React.createElement("div", { className: "secure-disposal__image-glow" }),
                    React.createElement("div", { className: "secure-disposal__image-frame" },
                        React.createElement(image_1["default"], { src: "/Secure%20E-Waste%20Recycling%20Hub.png", alt: "Secure e-waste recycling hub for responsible electronics recycling and data protection", fill: true, priority: true, sizes: "(max-width: 720px) 100vw, 45vw", className: "secure-disposal__hero-image" }),
                        React.createElement("div", { className: "secure-disposal__image-shade" }),
                        React.createElement("div", { className: "secure-disposal__image-top-badge" },
                            React.createElement(lucide_react_1.ShieldCheck, { size: 18 }),
                            React.createElement("span", null,
                                React.createElement("strong", null, "Security First"),
                                React.createElement("small", null, "Responsible e-waste care"))),
                        React.createElement("div", { className: "secure-disposal__image-bottom" },
                            React.createElement("div", { className: "secure-disposal__image-bottom-icon" },
                                React.createElement(lucide_react_1.LockKeyhole, { size: 21 })),
                            React.createElement("div", null,
                                React.createElement("h4", null, "Protect Data. Preserve Earth."),
                                React.createElement("p", null, "Every device deserves a responsible next step.")))),
                    React.createElement("div", { className: "secure-disposal__floating-badge" },
                        React.createElement("span", { className: "secure-disposal__floating-icon" },
                            React.createElement(lucide_react_1.Recycle, { size: 19 })),
                        React.createElement("span", null,
                            React.createElement("strong", null, "Recycle Responsibly"),
                            React.createElement("small", null, "A better electronic future")),
                        React.createElement(lucide_react_1.CheckCircle2, { className: "secure-disposal__floating-check", size: 19 })))),
            React.createElement("div", { className: "secure-disposal__features" }, safetyFeatures.map(function (feature) {
                var Icon = feature.icon;
                return (React.createElement("article", { className: "secure-disposal__feature-card", key: feature.title },
                    React.createElement("div", { className: "secure-disposal__feature-icon" },
                        React.createElement(Icon, { size: 23, strokeWidth: 1.7 })),
                    React.createElement("h3", null, feature.title),
                    React.createElement("p", null, feature.description)));
            })),
            React.createElement("div", { className: "secure-disposal__process" },
                React.createElement("div", { className: "secure-disposal__process-heading" },
                    React.createElement("span", { className: "secure-disposal__eyebrow" },
                        React.createElement(lucide_react_1.Recycle, { size: 15 }),
                        "Your Safe Disposal Checklist"),
                    React.createElement("h3", null, "Four steps to dispose responsibly."),
                    React.createElement("p", null, "Follow these practical precautions before passing on an old electronic device.")),
                React.createElement("div", { className: "secure-disposal__steps" }, disposalSteps.map(function (step) {
                    var Icon = step.icon;
                    return (React.createElement("article", { className: "secure-disposal__step", key: step.number },
                        React.createElement("div", { className: "secure-disposal__step-top" },
                            React.createElement("span", { className: "secure-disposal__step-number" }, step.number),
                            React.createElement("span", { className: "secure-disposal__step-icon" },
                                React.createElement(Icon, { size: 22, strokeWidth: 1.7 }))),
                        React.createElement("h4", null, step.title),
                        React.createElement("p", null, step.description)));
                }))),
            React.createElement("div", { className: "secure-disposal__warning" },
                React.createElement("div", { className: "secure-disposal__warning-icon" },
                    React.createElement(lucide_react_1.BatteryWarning, { size: 23 })),
                React.createElement("div", { className: "secure-disposal__warning-copy" },
                    React.createElement("h4", null, "Important: damaged batteries need extra care."),
                    React.createElement("p", null, "If a battery is swollen, hot, leaking, or damaged, stop using the device. Do not charge, puncture, or dismantle it. Keep it away from flammable materials if safe to do so, and contact an appropriate battery recycling or hazardous-waste service for instructions."))),
            React.createElement("div", { className: "secure-disposal__bottom-cta" },
                React.createElement("div", { className: "secure-disposal__bottom-icon" },
                    React.createElement(lucide_react_1.HardDrive, { size: 25 })),
                React.createElement("div", { className: "secure-disposal__bottom-copy" },
                    React.createElement("h3", null, "Give your old electronics a better next step."),
                    React.createElement("p", null, "Explore device valuation or browse available products on EcoValuate.")),
                React.createElement("div", { className: "secure-disposal__bottom-actions" },
                    React.createElement(link_1["default"], { href: "/marketplace/products", className: "secure-disposal__secondary-button" },
                        "Explore Marketplace",
                        React.createElement(lucide_react_1.ArrowRight, { size: 16 })))))));
}
exports["default"] = SecureEWasteDisposalSection;
