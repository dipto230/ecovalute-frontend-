"use client";
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
require("./ewaste-story.css");
var stories = [
    {
        id: "01",
        label: "THE PROBLEM",
        title: "It was once useful.",
        description: "A motherboard. An old television. A forgotten electronic device. When technology reaches the end of its first life, we often see waste — but there can still be value inside.",
        visual: "image",
        src: "/HERO-5.jpg",
        icon: lucide_react_1.Cpu,
        accent: "old"
    },
    {
        id: "02",
        label: "DISCOVER",
        title: "Don't throw it away.",
        description: "Bring your unused electronics to EcoValuate. Upload a photo and tell us what you have. Your device gets a digital identity before it becomes another piece of waste.",
        visual: "image",
        src: "/HERO-6.jpg",
        icon: lucide_react_1.Upload,
        accent: "discover"
    },
    {
        id: "03",
        label: "AI DETECTION",
        title: "Let AI see what's inside.",
        description: "EcoValuate can analyze the uploaded device and help identify its type, condition and potential value — turning a physical object into useful digital information.",
        visual: "video",
        src: "/HERO-7.mp4",
        icon: lucide_react_1.BrainCircuit,
        accent: "ai"
    },
    {
        id: "04",
        label: "NEW LIFE",
        title: "From waste to a new path.",
        description: "Once the device is understood, it can move toward the right next step — reuse, marketplace value or responsible recycling and material recovery.",
        visual: "video",
        src: "/HERO-8.mp4",
        icon: lucide_react_1.Recycle,
        accent: "recycle"
    },
];
function EWasteStorySection() {
    var _a = react_1.useState(0), activeStory = _a[0], setActiveStory = _a[1];
    var storyRefs = react_1.useRef([]);
    var sectionRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var observers = [];
        storyRefs.current.forEach(function (element, index) {
            if (!element)
                return;
            var observer = new IntersectionObserver(function (_a) {
                var entry = _a[0];
                if (entry.isIntersecting) {
                    setActiveStory(index);
                }
            }, {
                threshold: 0.45,
                rootMargin: "-10% 0px -10% 0px"
            });
            observer.observe(element);
            observers.push(observer);
        });
        return function () {
            observers.forEach(function (observer) { return observer.disconnect(); });
        };
    }, []);
    var active = stories[activeStory];
    var ActiveIcon = active.icon;
    return (React.createElement("section", { ref: sectionRef, className: "ewaste-story", "aria-label": "How EcoValuate works" },
        React.createElement("div", { className: "story-grid" }),
        React.createElement("div", { className: "story-glow story-glow-one" }),
        React.createElement("div", { className: "story-glow story-glow-two" }),
        React.createElement("div", { className: "story-container" },
            React.createElement("div", { className: "story-header" },
                React.createElement("div", { className: "story-eyebrow" },
                    React.createElement("span", { className: "story-eyebrow-dot" }),
                    "THE ECO VALUATE STORY"),
                React.createElement("h2", null,
                    "Don't let technology",
                    React.createElement("span", null, " become waste.")),
                React.createElement("p", null, "See what happens when an old electronic device gets a second chance."),
                React.createElement("div", { className: "story-scroll-hint" },
                    React.createElement(lucide_react_1.ArrowDown, { size: 15 }),
                    React.createElement("span", null, "Scroll to discover"))),
            React.createElement("div", { className: "story-layout" },
                React.createElement("div", { className: "story-timeline" },
                    React.createElement("div", { className: "story-line" },
                        React.createElement("div", { className: "story-line-progress", style: {
                                height: ((activeStory + 1) / stories.length) * 100 + "%"
                            } })),
                    stories.map(function (story, index) {
                        var Icon = story.icon;
                        return (React.createElement("div", { key: story.id, ref: function (element) {
                                storyRefs.current[index] = element;
                            }, className: "story-step " + (activeStory === index ? "is-active" : "") },
                            React.createElement("div", { className: "story-step-marker" }, activeStory === index ? (React.createElement(Icon, { size: 17, strokeWidth: 2 })) : (React.createElement("span", null, story.id))),
                            React.createElement("div", { className: "story-step-content" },
                                React.createElement("div", { className: "story-step-label" }, story.label),
                                React.createElement("h3", null, story.title),
                                React.createElement("p", null, story.description),
                                index === 0 && (React.createElement("div", { className: "story-mini-tags" },
                                    React.createElement("span", null, "Old Electronics"),
                                    React.createElement("span", null, "Unused Devices"),
                                    React.createElement("span", null, "Hidden Value"))),
                                index === 1 && (React.createElement("div", { className: "story-action-preview" },
                                    React.createElement(lucide_react_1.Upload, { size: 15 }),
                                    React.createElement("span", null, "UPLOAD YOUR DEVICE"),
                                    React.createElement(lucide_react_1.ArrowRight, { size: 15 }))),
                                index === 2 && (React.createElement("div", { className: "story-ai-preview" },
                                    React.createElement("div", { className: "ai-scan-icon" },
                                        React.createElement(lucide_react_1.ScanLine, { size: 18 })),
                                    React.createElement("div", null,
                                        React.createElement("strong", null, "AI ANALYSIS"),
                                        React.createElement("span", null, "Identifying electronic component...")),
                                    React.createElement(lucide_react_1.Sparkles, { size: 17 }))),
                                index === 3 && (React.createElement("div", { className: "story-recycle-preview" },
                                    React.createElement("div", null,
                                        React.createElement(lucide_react_1.CheckCircle2, { size: 17 }),
                                        React.createElement("span", null, "Reuse")),
                                    React.createElement("div", null,
                                        React.createElement(lucide_react_1.CheckCircle2, { size: 17 }),
                                        React.createElement("span", null, "Marketplace")),
                                    React.createElement("div", null,
                                        React.createElement(lucide_react_1.CheckCircle2, { size: 17 }),
                                        React.createElement("span", null, "Recycle")))))));
                    })),
                React.createElement("div", { className: "story-visual-wrap" },
                    React.createElement("div", { className: "story-visual-sticky" },
                        React.createElement("div", { className: "story-status" },
                            React.createElement("span", { className: "status-pulse" }),
                            React.createElement("span", null, "ECOVALUATE SYSTEM"),
                            React.createElement("span", { className: "status-id" },
                                active.id,
                                " / ",
                                String(stories.length).padStart(2, "0"))),
                        React.createElement("div", { className: "story-visual story-visual-" + active.accent },
                            active.visual === "image" ? (React.createElement(image_1["default"], { key: active.src, src: active.src, alt: active.title, fill: true, sizes: "(max-width: 900px) 92vw, 52vw", className: "story-media" })) : (React.createElement("video", { key: active.src, className: "story-media story-video", src: active.src, autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata" })),
                            React.createElement("div", { className: "story-media-overlay" }),
                            activeStory === 2 && (React.createElement("div", { className: "story-scan" },
                                React.createElement("div", { className: "scan-line" }),
                                React.createElement("div", { className: "scan-corner scan-corner-tl" }),
                                React.createElement("div", { className: "scan-corner scan-corner-tr" }),
                                React.createElement("div", { className: "scan-corner scan-corner-bl" }),
                                React.createElement("div", { className: "scan-corner scan-corner-br" }),
                                React.createElement("div", { className: "scan-text" },
                                    React.createElement(lucide_react_1.ScanLine, { size: 14 }),
                                    "SCANNING ELECTRONICS"))),
                            activeStory === 2 && (React.createElement("div", { className: "visual-ai-card" },
                                React.createElement("div", { className: "visual-ai-header" },
                                    React.createElement(lucide_react_1.BrainCircuit, { size: 17 }),
                                    React.createElement("span", null, "AI DETECTION"),
                                    React.createElement("span", { className: "live-dot" }, "LIVE")),
                                React.createElement("div", { className: "visual-ai-device" },
                                    React.createElement("span", null, "DEVICE"),
                                    React.createElement("strong", null, "Electronic Component")),
                                React.createElement("div", { className: "visual-ai-row" },
                                    React.createElement("span", null, "ANALYSIS"),
                                    React.createElement("div", { className: "ai-progress" },
                                        React.createElement("span", null))),
                                React.createElement("div", { className: "visual-ai-footer" },
                                    React.createElement("span", null, "IDENTIFYING..."),
                                    React.createElement(lucide_react_1.Sparkles, { size: 14 })))),
                            activeStory === 1 && (React.createElement("div", { className: "visual-upload-card" },
                                React.createElement("div", { className: "upload-card-icon" },
                                    React.createElement(lucide_react_1.Upload, { size: 19 })),
                                React.createElement("div", null,
                                    React.createElement("strong", null, "UPLOAD DEVICE"),
                                    React.createElement("span", null, "Start with a photo")),
                                React.createElement(lucide_react_1.ArrowRight, { size: 17 }))),
                            activeStory === 3 && (React.createElement("div", { className: "visual-recycle-card" },
                                React.createElement("div", { className: "recycle-icon" },
                                    React.createElement(lucide_react_1.Recycle, { size: 23 })),
                                React.createElement("div", null,
                                    React.createElement("strong", null, "GIVE IT ANOTHER LIFE"),
                                    React.createElement("span", null, "Reuse \u00B7 Recover \u00B7 Recycle")))),
                            activeStory === 0 && (React.createElement("div", { className: "visual-waste-card" },
                                React.createElement("div", { className: "waste-card-icon" },
                                    React.createElement(lucide_react_1.CircleDot, { size: 19 })),
                                React.createElement("div", null,
                                    React.createElement("strong", null, "END OF FIRST LIFE"),
                                    React.createElement("span", null, "But not the end of its value."))))),
                        React.createElement("div", { className: "story-visual-footer" },
                            React.createElement("div", { className: "visual-progress" }, stories.map(function (_, index) { return (React.createElement("button", { key: index, type: "button", "aria-label": "Go to story " + (index + 1), className: activeStory === index ? "active" : "", onClick: function () {
                                    var _a;
                                    (_a = storyRefs.current[index]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center"
                                    });
                                } })); })),
                            React.createElement("span", null, active.label))))),
            React.createElement("div", { className: "story-bottom" },
                React.createElement("div", { className: "story-bottom-icon" },
                    React.createElement(lucide_react_1.Leaf, { size: 21 })),
                React.createElement("div", null,
                    React.createElement("span", null, "THE IDEA BEHIND ECOVALUATE"),
                    React.createElement("strong", null, "Your old electronics deserve a better destination.")),
                React.createElement(lucide_react_1.ArrowRight, { className: "story-bottom-arrow", size: 21 })))));
}
exports["default"] = EWasteStorySection;
