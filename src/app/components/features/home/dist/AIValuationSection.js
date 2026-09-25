"use client";
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
require("./ai-valuation.css");
function AIValuationSection() {
    var sectionRef = react_1.useRef(null);
    var uploadTimerRef = react_1.useRef(null);
    var analysisTimerRef = react_1.useRef(null);
    var _a = react_1.useState("idle"), stage = _a[0], setStage = _a[1];
    var _b = react_1.useState(null), preview = _b[0], setPreview = _b[1];
    var _c = react_1.useState({
        x: 0,
        y: 0
    }), mouse = _c[0], setMouse = _c[1];
    /* -------------------------------------------------------
       Mouse parallax
    ------------------------------------------------------- */
    react_1.useEffect(function () {
        var section = sectionRef.current;
        if (!section)
            return;
        var handleMouseMove = function (event) {
            var rect = section.getBoundingClientRect();
            var x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
            var y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
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
        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseleave", handleMouseLeave);
        return function () {
            section.removeEventListener("mousemove", handleMouseMove);
            section.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);
    /* -------------------------------------------------------
       Cleanup
    ------------------------------------------------------- */
    react_1.useEffect(function () {
        return function () {
            if (uploadTimerRef.current) {
                clearTimeout(uploadTimerRef.current);
            }
            if (analysisTimerRef.current) {
                clearTimeout(analysisTimerRef.current);
            }
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);
    /* -------------------------------------------------------
       Upload
    ------------------------------------------------------- */
    var handleUpload = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        if (!file.type.startsWith("image/")) {
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("Please upload an image smaller than 10MB.");
            return;
        }
        if (uploadTimerRef.current) {
            clearTimeout(uploadTimerRef.current);
        }
        if (analysisTimerRef.current) {
            clearTimeout(analysisTimerRef.current);
        }
        var objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setStage("uploading");
        uploadTimerRef.current = setTimeout(function () {
            setStage("scanning");
        }, 850);
        analysisTimerRef.current = setTimeout(function () {
            setStage("analyzed");
        }, 3000);
        event.target.value = "";
    };
    /* -------------------------------------------------------
       Reset
    ------------------------------------------------------- */
    var resetScanner = function () {
        if (uploadTimerRef.current) {
            clearTimeout(uploadTimerRef.current);
        }
        if (analysisTimerRef.current) {
            clearTimeout(analysisTimerRef.current);
        }
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        setStage("idle");
    };
    var isScanning = stage === "uploading" || stage === "scanning";
    var isAnalyzed = stage === "analyzed";
    var sceneStyle = {
        "--mouse-x": mouse.x + "px",
        "--mouse-y": mouse.y + "px"
    };
    return (React.createElement("section", { ref: sectionRef, id: "ai-valuation", className: "ai-valuation-section" },
        React.createElement("div", { className: "ai-background-grid" }),
        React.createElement("div", { className: "ai-background-glow ai-glow-one" }),
        React.createElement("div", { className: "ai-background-glow ai-glow-two" }),
        React.createElement("div", { className: "ai-valuation-container" },
            React.createElement("div", { className: "ai-valuation-header" },
                React.createElement("div", { className: "ai-section-eyebrow" },
                    React.createElement("span", { className: "ai-eyebrow-icon" },
                        React.createElement(lucide_react_1.Sparkles, { size: 13 })),
                    React.createElement("span", null, "AI POWERED VALUATION"),
                    React.createElement("span", { className: "ai-eyebrow-line" })),
                React.createElement("h2", null,
                    "Give your old device",
                    React.createElement("span", null, " a second value.")),
                React.createElement("p", null, "Upload a photo of your electronic device and let EcoValuate intelligently identify it, understand its condition and estimate its potential value.")),
            React.createElement("div", { className: "ai-valuation-layout" },
                React.createElement("div", { className: "ai-valuation-copy" },
                    React.createElement("div", { className: "ai-copy-intro" },
                        React.createElement("span", null, "HOW IT WORKS"),
                        React.createElement("h3", null,
                            "Turn e-waste into",
                            React.createElement("br", null),
                            React.createElement("strong", null, "useful value."))),
                    React.createElement("div", { className: "ai-copy-line" },
                        React.createElement("div", { className: "ai-copy-number" },
                            React.createElement("span", null, "01")),
                        React.createElement("div", { className: "ai-copy-content" },
                            React.createElement("div", { className: "ai-step-icon" },
                                React.createElement(lucide_react_1.Upload, { size: 16 })),
                            React.createElement("div", null,
                                React.createElement("h4", null, "Upload your device"),
                                React.createElement("p", null, "Take a clear photo of your smartphone, laptop, monitor or other electronic device.")))),
                    React.createElement("div", { className: "ai-copy-line" },
                        React.createElement("div", { className: "ai-copy-number" },
                            React.createElement("span", null, "02")),
                        React.createElement("div", { className: "ai-copy-content" },
                            React.createElement("div", { className: "ai-step-icon" },
                                React.createElement(lucide_react_1.BrainCircuit, { size: 16 })),
                            React.createElement("div", null,
                                React.createElement("h4", null, "AI detects the device"),
                                React.createElement("p", null, "Our vision system analyzes the image and extracts useful device information.")))),
                    React.createElement("div", { className: "ai-copy-line" },
                        React.createElement("div", { className: "ai-copy-number" },
                            React.createElement("span", null, "03")),
                        React.createElement("div", { className: "ai-copy-content" },
                            React.createElement("div", { className: "ai-step-icon" },
                                React.createElement(lucide_react_1.Zap, { size: 16 })),
                            React.createElement("div", null,
                                React.createElement("h4", null, "Get an estimated value"),
                                React.createElement("p", null, "Understand the possible resale or recovery value of your electronic device.")))),
                    React.createElement("label", { className: "ai-upload-button " + (isScanning ? "is-disabled" : "") },
                        React.createElement("span", { className: "ai-upload-icon" },
                            React.createElement(lucide_react_1.Upload, { size: 17 })),
                        React.createElement("span", { className: "ai-upload-text" }, stage === "idle"
                            ? "Upload Device Image"
                            : stage === "analyzed"
                                ? "Analyze Another Device"
                                : "Analyzing Device..."),
                        React.createElement("input", { type: "file", accept: "image/*", onChange: handleUpload, disabled: isScanning }),
                        React.createElement("span", { className: "ai-upload-arrow" },
                            React.createElement(lucide_react_1.ArrowRight, { size: 17 }))),
                    React.createElement("div", { className: "ai-trust-row" },
                        React.createElement("div", null,
                            React.createElement(lucide_react_1.ShieldCheck, { size: 15 }),
                            React.createElement("span", null, "Secure analysis")),
                        React.createElement("div", null,
                            React.createElement(lucide_react_1.CheckCircle2, { size: 15 }),
                            React.createElement("span", null, "AI assisted")),
                        React.createElement("div", null,
                            React.createElement(lucide_react_1.Activity, { size: 15 }),
                            React.createElement("span", null, "Smart valuation")))),
                React.createElement("div", { className: "ai-scanner-scene", style: sceneStyle },
                    React.createElement("div", { className: "ai-scene-glow" }),
                    React.createElement("div", { className: "ai-scene-grid" }),
                    React.createElement("div", { className: "ai-orbit ai-orbit-one" }),
                    React.createElement("div", { className: "ai-orbit ai-orbit-two" }),
                    React.createElement("div", { className: "ai-orbit ai-orbit-three" }),
                    React.createElement("div", { className: "ai-floating-label ai-label-top" },
                        React.createElement("span", { className: "ai-label-icon" },
                            React.createElement(lucide_react_1.Sparkles, { size: 13 })),
                        React.createElement("div", null,
                            React.createElement("small", null, "AI SYSTEM"),
                            React.createElement("strong", null, "VISION ENGINE"))),
                    !preview && (React.createElement("div", { className: "ai-floating-label ai-label-right" },
                        React.createElement("div", { className: "ai-accuracy-icon" },
                            React.createElement("span", null),
                            React.createElement("span", null),
                            React.createElement("span", null),
                            React.createElement("span", null)),
                        React.createElement("div", null,
                            React.createElement("small", null, "CONFIDENCE"),
                            React.createElement("strong", null, "98.2%")))),
                    React.createElement("div", { className: "ai-device-console " + (isScanning ? "is-scanning" : "") + " " + (isAnalyzed ? "is-analyzed" : "") },
                        React.createElement("div", { className: "ai-console-top" },
                            React.createElement("div", { className: "ai-console-brand" },
                                React.createElement("span", { className: "ai-live-dot" }),
                                React.createElement("span", null, "ECOVALUATE"),
                                React.createElement("small", null, "AI")),
                            React.createElement("div", { className: "ai-console-status" },
                                React.createElement("span", null),
                                stage === "idle"
                                    ? "READY"
                                    : stage === "uploading"
                                        ? "UPLOADING"
                                        : stage === "scanning"
                                            ? "ANALYZING"
                                            : "COMPLETE")),
                        React.createElement("div", { className: "ai-device-screen" },
                            !preview ? (React.createElement("div", { className: "ai-default-device" },
                                React.createElement("div", { className: "ai-device-shadow" }),
                                React.createElement("div", { className: "ai-phone" },
                                    React.createElement("div", { className: "ai-phone-camera" },
                                        React.createElement("span", null),
                                        React.createElement("span", null),
                                        React.createElement("span", null)),
                                    React.createElement("div", { className: "ai-phone-screen" },
                                        React.createElement("div", { className: "ai-phone-logo" },
                                            React.createElement(lucide_react_1.Sparkles, { size: 28 })),
                                        React.createElement("strong", null, "AI VISION"),
                                        React.createElement("span", null, "PLACE DEVICE"),
                                        React.createElement("div", { className: "ai-phone-scan-line" }))))) : (React.createElement("div", { className: "ai-uploaded-device" },
                                React.createElement(image_1["default"], { src: preview, alt: "Uploaded electronic device", fill: true, sizes: "(max-width: 768px) 90vw, 540px", className: "ai-uploaded-image", unoptimized: true }),
                                React.createElement("div", { className: "ai-image-overlay" }))),
                            React.createElement("div", { className: "ai-scanner-frame" },
                                React.createElement("span", { className: "frame-tl" }),
                                React.createElement("span", { className: "frame-tr" }),
                                React.createElement("span", { className: "frame-bl" }),
                                React.createElement("span", { className: "frame-br" })),
                            isScanning && (React.createElement(React.Fragment, null,
                                React.createElement("div", { className: "ai-scan-beam" }),
                                React.createElement("div", { className: "ai-scanning-pill" },
                                    React.createElement(lucide_react_1.ScanLine, { size: 15 }),
                                    React.createElement("span", null, stage === "uploading"
                                        ? "UPLOADING IMAGE"
                                        : "AI ANALYZING DEVICE"),
                                    React.createElement("i", null)))),
                            isAnalyzed && (React.createElement("div", { className: "ai-complete-pill" },
                                React.createElement(lucide_react_1.CheckCircle2, { size: 16 }),
                                React.createElement("span", null, "ANALYSIS COMPLETE"))),
                            React.createElement("div", { className: "ai-coordinate ai-coordinate-tl" }, "X: 024"),
                            React.createElement("div", { className: "ai-coordinate ai-coordinate-br" }, "Y: 098")),
                        React.createElement("div", { className: "ai-console-bottom" },
                            React.createElement("div", null,
                                React.createElement("small", null, "ANALYSIS STATUS"),
                                React.createElement("strong", null, stage === "idle"
                                    ? "System ready"
                                    : stage === "uploading"
                                        ? "Uploading image..."
                                        : stage === "scanning"
                                            ? "Processing device..."
                                            : "Device successfully analyzed")),
                            React.createElement("div", { className: "ai-console-chip" },
                                React.createElement(lucide_react_1.BrainCircuit, { size: 16 }),
                                React.createElement("span", null, "AI")))),
                    !preview && (React.createElement("div", { className: "ai-data-card ai-data-card-left" },
                        React.createElement("div", { className: "ai-data-icon" },
                            React.createElement(lucide_react_1.Cpu, { size: 17 })),
                        React.createElement("div", null,
                            React.createElement("small", null, "DETECTION MODEL"),
                            React.createElement("strong", null, "VISION ANALYSIS")))),
                    !preview && (React.createElement("div", { className: "ai-data-card ai-data-card-bottom" },
                        React.createElement("div", { className: "ai-mini-progress" },
                            React.createElement("span", null),
                            React.createElement("span", null),
                            React.createElement("span", null),
                            React.createElement("span", null),
                            React.createElement("span", null)),
                        React.createElement("div", null,
                            React.createElement("small", null, "PROCESSING"),
                            React.createElement("strong", null, "REAL-TIME")))),
                    isAnalyzed && (React.createElement("div", { className: "ai-result-card" },
                        React.createElement("div", { className: "ai-result-top" },
                            React.createElement("div", null,
                                React.createElement("span", null, "DEVICE DETECTED"),
                                React.createElement("strong", null, "Smartphone")),
                            React.createElement("div", { className: "ai-result-success" },
                                React.createElement(lucide_react_1.CheckCircle2, { size: 18 }))),
                        React.createElement("div", { className: "ai-result-line" }),
                        React.createElement("div", { className: "ai-result-stats" },
                            React.createElement("div", null,
                                React.createElement("small", null, "CONDITION"),
                                React.createElement("strong", null, "Excellent")),
                            React.createElement("div", null,
                                React.createElement("small", null, "CONFIDENCE"),
                                React.createElement("strong", null, "98%"))),
                        React.createElement("div", { className: "ai-result-price" },
                            React.createElement("div", null,
                                React.createElement("small", null, "ESTIMATED VALUE"),
                                React.createElement("strong", null, "\u20B942,500")),
                            React.createElement("div", { className: "ai-price-icon" },
                                React.createElement(lucide_react_1.Zap, { size: 18 }))),
                        React.createElement(link_1["default"], { href: "/marketplace", className: "ai-result-button" },
                            "Explore Marketplace",
                            React.createElement(lucide_react_1.ArrowRight, { size: 15 })),
                        React.createElement("button", { type: "button", onClick: resetScanner, className: "ai-reset-button" }, "Scan another device"))))),
            React.createElement("div", { className: "ai-bottom-strip" },
                React.createElement("div", { className: "ai-bottom-item" },
                    React.createElement("span", null, "01"),
                    React.createElement("div", null,
                        React.createElement("strong", null, "UPLOAD"),
                        React.createElement("small", null, "Device image"))),
                React.createElement("div", { className: "ai-bottom-line" }),
                React.createElement("div", { className: "ai-bottom-item" },
                    React.createElement("span", null, "02"),
                    React.createElement("div", null,
                        React.createElement("strong", null, "DETECT"),
                        React.createElement("small", null, "AI identification"))),
                React.createElement("div", { className: "ai-bottom-line" }),
                React.createElement("div", { className: "ai-bottom-item" },
                    React.createElement("span", null, "03"),
                    React.createElement("div", null,
                        React.createElement("strong", null, "ANALYZE"),
                        React.createElement("small", null, "Condition check"))),
                React.createElement("div", { className: "ai-bottom-line" }),
                React.createElement("div", { className: "ai-bottom-item" },
                    React.createElement("span", null, "04"),
                    React.createElement("div", null,
                        React.createElement("strong", null, "VALUE"),
                        React.createElement("small", null, "Estimated worth")))))));
}
exports["default"] = AIValuationSection;
