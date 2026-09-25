"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
require("./hero.css");
var image_1 = require("next/image");
function HeroSection() {
    var heroRef = react_1.useRef(null);
    var _a = react_1.useState({
        x: 0,
        y: 0
    }), mouse = _a[0], setMouse = _a[1];
    react_1.useEffect(function () {
        var handleMouseMove = function (event) {
            if (!heroRef.current)
                return;
            var rect = heroRef.current.getBoundingClientRect();
            var x = (event.clientX - rect.left) / rect.width - 0.5;
            var y = (event.clientY - rect.top) / rect.height - 0.5;
            setMouse({
                x: x,
                y: y
            });
        };
        var handleMouseLeave = function () {
            setMouse({
                x: 0,
                y: 0
            });
        };
        var hero = heroRef.current;
        hero === null || hero === void 0 ? void 0 : hero.addEventListener("mousemove", handleMouseMove);
        hero === null || hero === void 0 ? void 0 : hero.addEventListener("mouseleave", handleMouseLeave);
        return function () {
            hero === null || hero === void 0 ? void 0 : hero.removeEventListener("mousemove", handleMouseMove);
            hero === null || hero === void 0 ? void 0 : hero.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);
    var phoneTransform = {
        transform: "\n      perspective(1200px)\n      rotateX(" + mouse.y * -8 + "deg)\n      rotateY(" + mouse.x * 10 + "deg)\n      translate3d(" + mouse.x * 18 + "px, " + mouse.y * 18 + "px, 0)\n    "
    };
    var cardTransform = {
        transform: "\n      translate3d(" + mouse.x * -25 + "px, " + mouse.y * -20 + "px, 0)\n    "
    };
    var laptopTransform = {
        transform: "\n      translate3d(" + mouse.x * 30 + "px, " + mouse.y * 25 + "px, 0)\n      rotate(" + mouse.x * 4 + "deg)\n    "
    };
    return (React.createElement("section", { ref: heroRef, className: "ev-hero" },
        React.createElement("div", { className: "ev-hero-background" },
            React.createElement("div", { className: "ev-grid" }),
            React.createElement("div", { className: "ev-glow ev-glow-one" }),
            React.createElement("div", { className: "ev-glow ev-glow-two" }),
            React.createElement(image_1["default"], { src: "/HERO-1.jpg", width: 1200, height: 800, alt: "", className: "ev-bg-image ev-bg-image-one" }),
            React.createElement(image_1["default"], { src: "/HERO-2.jpg", width: 1200, height: 800, alt: "", className: "ev-bg-image ev-bg-image-two" }),
            React.createElement("div", { className: "ev-noise" })),
        React.createElement("div", { className: "ev-particles", "aria-hidden": "true" },
            React.createElement("span", { className: "ev-particle particle-1" }),
            React.createElement("span", { className: "ev-particle particle-2" }),
            React.createElement("span", { className: "ev-particle particle-3" }),
            React.createElement("span", { className: "ev-particle particle-4" }),
            React.createElement("span", { className: "ev-particle particle-5" }),
            React.createElement("span", { className: "ev-particle particle-6" }),
            React.createElement("span", { className: "ev-particle particle-7" }),
            React.createElement("span", { className: "ev-particle particle-8" })),
        React.createElement("div", { className: "ev-hero-container" },
            React.createElement("div", { className: "ev-hero-content" },
                React.createElement("div", { className: "ev-eyebrow" },
                    React.createElement("span", { className: "ev-eyebrow-icon" },
                        React.createElement(lucide_react_1.Recycle, { size: 15 })),
                    React.createElement("span", null, "E-WASTE MANAGEMENT SYSTEM"),
                    React.createElement("span", { className: "ev-live-dot" }),
                    React.createElement("span", { className: "ev-live-text" }, "AI POWERED")),
                React.createElement("h1", { className: "ev-hero-title" },
                    "Give Your",
                    React.createElement("span", { className: "ev-title-green" }, " E-Waste"),
                    React.createElement("br", null),
                    "A ",
                    React.createElement("span", { className: "ev-title-outline" }, "New Value.")),
                React.createElement("p", { className: "ev-hero-description" }, "Turn unwanted electronics into real value with AI-powered valuation, smart pricing, and a sustainable marketplace built for the future."),
                React.createElement("div", { className: "ev-hero-actions" },
                    React.createElement(link_1["default"], { href: "/marketplace", className: "ev-primary-button" },
                        React.createElement("span", null, "Sell Your E-Waste"),
                        React.createElement("span", { className: "ev-button-icon" },
                            React.createElement(lucide_react_1.ArrowRight, { size: 18 }))),
                    React.createElement(link_1["default"], { href: "/marketplace", className: "ev-secondary-button" },
                        React.createElement("span", { className: "ev-secondary-play" },
                            React.createElement(lucide_react_1.ScanSearch, { size: 17 })),
                        React.createElement("span", null, "Explore Marketplace"))),
                React.createElement("div", { className: "ev-trust-row" },
                    React.createElement("div", { className: "ev-trust-item" },
                        React.createElement("span", { className: "ev-trust-icon" },
                            React.createElement(lucide_react_1.CheckCircle2, { size: 15 })),
                        React.createElement("span", null, "AI Valuation")),
                    React.createElement("div", { className: "ev-trust-item" },
                        React.createElement("span", { className: "ev-trust-icon" },
                            React.createElement(lucide_react_1.CheckCircle2, { size: 15 })),
                        React.createElement("span", null, "Smart Pricing")),
                    React.createElement("div", { className: "ev-trust-item" },
                        React.createElement("span", { className: "ev-trust-icon" },
                            React.createElement(lucide_react_1.CheckCircle2, { size: 15 })),
                        React.createElement("span", null, "Eco Friendly"))),
                React.createElement("div", { className: "ev-mini-stats" },
                    React.createElement("div", { className: "ev-stat" },
                        React.createElement("strong", null, "AI"),
                        React.createElement("span", null, "Detection")),
                    React.createElement("div", { className: "ev-stat-divider" }),
                    React.createElement("div", { className: "ev-stat" },
                        React.createElement("strong", null, "24/7"),
                        React.createElement("span", null, "Marketplace")),
                    React.createElement("div", { className: "ev-stat-divider" }),
                    React.createElement("div", { className: "ev-stat" },
                        React.createElement("strong", null, "100%"),
                        React.createElement("span", null, "Digital")))),
            React.createElement("div", { className: "ev-visual" },
                React.createElement("div", { className: "ev-orbit orbit-one" }),
                React.createElement("div", { className: "ev-orbit orbit-two" }),
                React.createElement("div", { className: "ev-orbit orbit-three" }),
                React.createElement("div", { className: "ev-recycle-core" },
                    React.createElement("div", { className: "ev-core-ring" },
                        React.createElement(lucide_react_1.Recycle, { size: 52, strokeWidth: 1.4 })),
                    React.createElement("div", { className: "ev-core-pulse" })),
                React.createElement("div", { className: "ev-phone-wrapper", style: phoneTransform },
                    React.createElement("div", { className: "ev-phone-shadow" }),
                    React.createElement("div", { className: "ev-phone" },
                        React.createElement("div", { className: "ev-phone-frame" },
                            React.createElement("div", { className: "ev-phone-screen" },
                                React.createElement("div", { className: "ev-phone-notch" }),
                                React.createElement("div", { className: "ev-phone-header" },
                                    React.createElement("span", null, "EcoValuate"),
                                    React.createElement("span", { className: "ev-phone-status" },
                                        React.createElement("span", null),
                                        "AI")),
                                React.createElement("div", { className: "ev-phone-image-wrap" },
                                    React.createElement(image_1["default"], { src: "/HERO-3.jpg", width: 1200, height: 800, alt: "Electronic device", className: "ev-phone-image" }),
                                    React.createElement("div", { className: "ev-scan-line" }),
                                    React.createElement("div", { className: "ev-detected-badge" },
                                        React.createElement(lucide_react_1.CheckCircle2, { size: 13 }),
                                        "DETECTED")),
                                React.createElement("div", { className: "ev-phone-info" },
                                    React.createElement("span", null, "DEVICE"),
                                    React.createElement("strong", null, "Smartphone")),
                                React.createElement("div", { className: "ev-phone-value" },
                                    React.createElement("div", null,
                                        React.createElement("span", null, "ESTIMATED VALUE"),
                                        React.createElement("strong", null, "\u20B942,500")),
                                    React.createElement("div", { className: "ev-confidence" },
                                        React.createElement("span", null, "98%"),
                                        React.createElement("small", null, "CONFIDENCE"))),
                                React.createElement("div", { className: "ev-phone-bottom" },
                                    React.createElement("span", null,
                                        React.createElement(lucide_react_1.Sparkles, { size: 12 }),
                                        "AI ANALYSIS"),
                                    React.createElement("span", null, "READY")))))),
                React.createElement("div", { className: "ev-ai-card", style: cardTransform },
                    React.createElement("div", { className: "ev-ai-card-top" },
                        React.createElement("div", { className: "ev-ai-icon" },
                            React.createElement(lucide_react_1.Sparkles, { size: 17 })),
                        React.createElement("div", null,
                            React.createElement("span", null, "AI VALUATION"),
                            React.createElement("strong", null, "Live Estimate")),
                        React.createElement("span", { className: "ev-ai-live" },
                            React.createElement("span", null),
                            "LIVE")),
                    React.createElement("div", { className: "ev-ai-price" },
                        React.createElement("span", null, "\u20B9"),
                        React.createElement("strong", null, "42,500"),
                        React.createElement("small", null, "+12.8%")),
                    React.createElement("div", { className: "ev-ai-progress" },
                        React.createElement("span", null)),
                    React.createElement("div", { className: "ev-ai-bottom" },
                        React.createElement("span", null, "Market match"),
                        React.createElement("strong", null, "98%"))),
                React.createElement("div", { className: "ev-device-card ev-laptop-card", style: laptopTransform },
                    React.createElement("div", { className: "ev-device-icon" },
                        React.createElement(lucide_react_1.Laptop, { size: 22 })),
                    React.createElement("div", null,
                        React.createElement("strong", null, "Laptop"),
                        React.createElement("span", null, "Ready to recycle")),
                    React.createElement("div", { className: "ev-device-check" },
                        React.createElement(lucide_react_1.CheckCircle2, { size: 15 }))),
                React.createElement("div", { className: "ev-floating-battery" },
                    React.createElement("div", { className: "ev-battery-icon" },
                        React.createElement(lucide_react_1.BatteryCharging, { size: 22 })),
                    React.createElement("div", null,
                        React.createElement("strong", null, "Battery"),
                        React.createElement("span", null, "Recyclable"))),
                React.createElement("div", { className: "ev-floating-phone" },
                    React.createElement(lucide_react_1.Smartphone, { size: 22 })),
                React.createElement("div", { className: "ev-floating-chip" },
                    React.createElement(lucide_react_1.Cpu, { size: 21 })),
                React.createElement("div", { className: "ev-energy" },
                    React.createElement(lucide_react_1.Zap, { size: 19 })),
                React.createElement("div", { className: "ev-video-card" },
                    React.createElement("video", { autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata", className: "ev-video" },
                        React.createElement("source", { src: "/HERO-7.mp4", type: "video/mp4" })),
                    React.createElement("div", { className: "ev-video-overlay" }),
                    React.createElement("div", { className: "ev-video-content" },
                        React.createElement("span", { className: "ev-video-label" },
                            React.createElement("span", null),
                            "RECYCLING IN MOTION"),
                        React.createElement("strong", null, "Waste \u2192 Value"))),
                React.createElement("div", { className: "ev-image-card" },
                    React.createElement(image_1["default"], { src: "/HERO-4.jpg", width: 1200, height: 800, alt: "Electronic recycling" }),
                    React.createElement("div", { className: "ev-image-card-overlay" },
                        React.createElement(lucide_react_1.Recycle, { size: 15 }),
                        React.createElement("span", null, "RECYCLE"))))),
        React.createElement("div", { className: "ev-bottom-strip" },
            React.createElement("div", { className: "ev-bottom-content" },
                React.createElement("div", { className: "ev-bottom-item" },
                    React.createElement("span", { className: "ev-bottom-icon" },
                        React.createElement(lucide_react_1.Recycle, { size: 17 })),
                    React.createElement("div", null,
                        React.createElement("strong", null, "Responsible Recycling"),
                        React.createElement("span", null, "Better for our planet"))),
                React.createElement("div", { className: "ev-bottom-line" }),
                React.createElement("div", { className: "ev-bottom-item" },
                    React.createElement("span", { className: "ev-bottom-icon" },
                        React.createElement(lucide_react_1.Sparkles, { size: 17 })),
                    React.createElement("div", null,
                        React.createElement("strong", null, "AI Powered Valuation"),
                        React.createElement("span", null, "Know what it is worth"))),
                React.createElement("div", { className: "ev-bottom-line" }),
                React.createElement("div", { className: "ev-bottom-item" },
                    React.createElement("span", { className: "ev-bottom-icon" },
                        React.createElement(lucide_react_1.Zap, { size: 17 })),
                    React.createElement("div", null,
                        React.createElement("strong", null, "Smart Marketplace"),
                        React.createElement("span", null, "Sell with confidence"))))),
        React.createElement("video", { autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata", className: "ev-hidden-video", "aria-hidden": "true" },
            React.createElement("source", { src: "/HERO-8.mp4", type: "video/mp4" })),
        React.createElement("div", { className: "ev-preload-assets", "aria-hidden": "true" },
            React.createElement(image_1["default"], { src: "/HERO-5.jpg", width: 1200, height: 800, alt: "EcoValuate electronic waste recycling", className: "object-cover" }),
            React.createElement(image_1["default"], { src: "/HERO-6.jpg", width: 1200, height: 800, alt: "EcoValuate e-waste management", className: "object-cover" }))));
}
exports["default"] = HeroSection;
