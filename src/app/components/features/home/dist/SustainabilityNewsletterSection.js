"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var image_1 = require("next/image");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
require("./sustainability-newsletter.css");
var API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
function SustainabilityNewsletterSection() {
    var _this = this;
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState("idle"), status = _b[0], setStatus = _b[1];
    var _c = react_1.useState(""), message = _c[0], setMessage = _c[1];
    var _d = react_1.useState(false), isSubmitting = _d[0], setIsSubmitting = _d[1];
    var handleSubscribe = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var normalizedEmail, response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    normalizedEmail = email.trim().toLowerCase();
                    if (!normalizedEmail) {
                        setStatus("error");
                        setMessage("Please enter your email address.");
                        return [2 /*return*/];
                    }
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
                        setStatus("error");
                        setMessage("Please enter a valid email address.");
                        return [2 /*return*/];
                    }
                    if (!API_BASE_URL) {
                        setStatus("error");
                        setMessage("Newsletter service is not configured yet. Please try again later.");
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    setStatus("idle");
                    setMessage("");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch(API_BASE_URL.replace(/\/$/, "") + "/api/v1/newsletter/subscribe", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ email: normalizedEmail })
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()["catch"](function () { return null; })];
                case 3:
                    result = _a.sent();
                    if (!response.ok) {
                        throw new Error((result === null || result === void 0 ? void 0 : result.message) || (result === null || result === void 0 ? void 0 : result.error) ||
                            "Unable to subscribe right now. Please try again.");
                    }
                    setStatus("success");
                    setMessage((result === null || result === void 0 ? void 0 : result.message) ||
                        "Thanks for subscribing! Stay tuned for a greener future.");
                    setEmail("");
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    setStatus("error");
                    setMessage(error_1 instanceof Error
                        ? error_1.message
                        : "Something went wrong. Please try again later.");
                    return [3 /*break*/, 6];
                case 5:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("section", { className: "sustainability-newsletter", "aria-labelledby": "sustainability-newsletter-title" },
        React.createElement("div", { className: "sustainability-newsletter__container" },
            React.createElement("div", { className: "sustainability-newsletter__content" },
                React.createElement("div", { className: "sustainability-newsletter__eyebrow" },
                    React.createElement("span", { className: "sustainability-newsletter__eyebrow-icon" },
                        React.createElement(lucide_react_1.Leaf, { size: 15, "aria-hidden": "true" })),
                    React.createElement("span", null, "THE GREEN CIRCLE")),
                React.createElement("h2", { id: "sustainability-newsletter-title", className: "sustainability-newsletter__title" },
                    "Small Updates.",
                    React.createElement("br", null),
                    React.createElement("span", null, "Big Impact.")),
                React.createElement("p", { className: "sustainability-newsletter__description" }, "Join our sustainability community and discover smarter ways to recycle electronics, reduce e-waste, and build a greener future."),
                React.createElement("form", { className: "sustainability-newsletter__form", onSubmit: handleSubscribe, noValidate: true },
                    React.createElement("label", { className: "sustainability-newsletter__input-wrapper", htmlFor: "sustainability-newsletter-email" },
                        React.createElement(lucide_react_1.Mail, { className: "sustainability-newsletter__input-icon", size: 19, "aria-hidden": "true" }),
                        React.createElement("input", { id: "sustainability-newsletter-email", className: "sustainability-newsletter__input", type: "email", name: "email", placeholder: "Enter your email address", autoComplete: "email", value: email, onChange: function (event) {
                                setEmail(event.target.value);
                                if (status !== "idle") {
                                    setStatus("idle");
                                    setMessage("");
                                }
                            }, disabled: isSubmitting, "aria-invalid": status === "error", "aria-describedby": message ? "sustainability-newsletter-message" : undefined })),
                    React.createElement("button", { className: "sustainability-newsletter__button", type: "submit", disabled: isSubmitting }, isSubmitting ? (React.createElement(React.Fragment, null,
                        React.createElement(lucide_react_1.LoaderCircle, { size: 18, className: "sustainability-newsletter__spinner", "aria-hidden": "true" }),
                        React.createElement("span", null, "Subscribing..."))) : (React.createElement(React.Fragment, null,
                        React.createElement("span", null, "Subscribe"),
                        React.createElement(lucide_react_1.ArrowRight, { size: 18, "aria-hidden": "true" }))))),
                message && (React.createElement("p", { id: "sustainability-newsletter-message", className: "sustainability-newsletter__message sustainability-newsletter__message--" + status, role: status === "error" ? "alert" : "status" },
                    status === "success" ? (React.createElement(lucide_react_1.CheckCircle2, { size: 17, "aria-hidden": "true" })) : status === "error" ? (React.createElement(lucide_react_1.ShieldCheck, { size: 17, "aria-hidden": "true" })) : null,
                    React.createElement("span", null, message))),
                React.createElement("div", { className: "sustainability-newsletter__trust" },
                    React.createElement("span", { className: "sustainability-newsletter__trust-icon" },
                        React.createElement(lucide_react_1.ShieldCheck, { size: 16, "aria-hidden": "true" })),
                    React.createElement("span", null, "No spam, ever. Just meaningful steps toward sustainability.")),
                React.createElement("div", { className: "sustainability-newsletter__highlights" },
                    React.createElement("div", { className: "sustainability-newsletter__highlight" },
                        React.createElement("span", { className: "sustainability-newsletter__highlight-icon" },
                            React.createElement(lucide_react_1.Leaf, { size: 17, "aria-hidden": "true" })),
                        React.createElement("span", null, "Eco-friendly tips")),
                    React.createElement("div", { className: "sustainability-newsletter__highlight" },
                        React.createElement("span", { className: "sustainability-newsletter__highlight-icon" },
                            React.createElement(lucide_react_1.Sparkles, { size: 17, "aria-hidden": "true" })),
                        React.createElement("span", null, "Green innovations")))),
            React.createElement("div", { className: "sustainability-newsletter__visual" },
                React.createElement("div", { className: "sustainability-newsletter__image-frame" },
                    React.createElement(image_1["default"], { src: "/NEWS_LETTER_SECTION.png", alt: "EcoValuate sustainability newsletter illustration about responsible electronic waste recycling", width: 600, height: 600, className: "sustainability-newsletter__image", sizes: "(max-width: 760px) 100vw, 45vw" })),
                React.createElement("div", { className: "sustainability-newsletter__image-caption" },
                    React.createElement("span", { className: "sustainability-newsletter__caption-icon" },
                        React.createElement(lucide_react_1.Leaf, { size: 18, "aria-hidden": "true" })),
                    React.createElement("div", null,
                        React.createElement("p", { className: "sustainability-newsletter__caption-title" }, "A greener tomorrow"),
                        React.createElement("p", { className: "sustainability-newsletter__caption-description" }, "One mindful choice at a time.")))))));
}
exports["default"] = SustainabilityNewsletterSection;
