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
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
require("./sustainability-newsletter.css");
var API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
function SustainabilityNewsletterSection() {
    var _this = this;
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState("idle"), status = _b[0], setStatus = _b[1];
    var _c = react_1.useState(""), message = _c[0], setMessage = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var handleSubscribe = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var normalizedEmail, response, data, error_1;
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
                    setLoading(true);
                    setStatus("idle");
                    setMessage("");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    if (!API_BASE_URL) {
                        throw new Error("Newsletter service is not configured yet. Please try again later.");
                    }
                    return [4 /*yield*/, fetch(API_BASE_URL + "/api/v1/newsletter/subscribe", {
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
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error((data === null || data === void 0 ? void 0 : data.message) || "Subscription failed. Please try again.");
                    }
                    setStatus("success");
                    setMessage((data === null || data === void 0 ? void 0 : data.message) ||
                        "You're on the list! Look out for sustainability updates in your inbox.");
                    setEmail("");
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    setStatus("error");
                    setMessage(error_1 instanceof Error
                        ? error_1.message
                        : "Something went wrong. Please try again.");
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("section", { className: "sustainability-newsletter" },
        React.createElement("div", { className: "sustainability-newsletter__container" },
            React.createElement("div", { className: "sustainability-newsletter__card" },
                React.createElement("div", { className: "sustainability-newsletter__content" },
                    React.createElement("span", { className: "sustainability-newsletter__eyebrow" },
                        React.createElement(lucide_react_1.Sparkles, { size: 15 }),
                        "THE GREENER INBOX"),
                    React.createElement("h2", null,
                        "Good news for you.",
                        React.createElement("br", null),
                        React.createElement("span", null, "Better news for the planet.")),
                    React.createElement("p", { className: "sustainability-newsletter__description" }, "Get practical e-waste recycling tips, sustainability insights, and responsible electronics updates delivered straight to your inbox."),
                    React.createElement("div", { className: "sustainability-newsletter__benefits" },
                        React.createElement("span", null,
                            React.createElement(lucide_react_1.CheckCircle2, { size: 17 }),
                            "Simple recycling tips"),
                        React.createElement("span", null,
                            React.createElement(lucide_react_1.CheckCircle2, { size: 17 }),
                            "Sustainable tech insights"),
                        React.createElement("span", null,
                            React.createElement(lucide_react_1.CheckCircle2, { size: 17 }),
                            "Useful updates, not inbox clutter")),
                    status === "success" ? (React.createElement("div", { className: "sustainability-newsletter__feedback sustainability-newsletter__feedback--success", role: "status", "aria-live": "polite" },
                        React.createElement(lucide_react_1.CheckCircle2, { size: 20 }),
                        React.createElement("div", null,
                            React.createElement("strong", null, "Thanks for joining us!"),
                            React.createElement("p", null, message)))) : (React.createElement("form", { className: "sustainability-newsletter__form", onSubmit: handleSubscribe },
                        React.createElement("label", { className: "sustainability-newsletter__input-wrap", htmlFor: "sustainability-newsletter-email" },
                            React.createElement(lucide_react_1.Mail, { size: 19 }),
                            React.createElement("input", { id: "sustainability-newsletter-email", type: "email", name: "email", autoComplete: "email", placeholder: "Enter your email address", value: email, onChange: function (event) {
                                    setEmail(event.target.value);
                                    if (status === "error") {
                                        setStatus("idle");
                                        setMessage("");
                                    }
                                }, required: true, maxLength: 254, disabled: loading, "aria-invalid": status === "error", "aria-describedby": status === "error"
                                    ? "sustainability-newsletter-message"
                                    : undefined })),
                        React.createElement("button", { className: "sustainability-newsletter__submit", type: "submit", disabled: loading }, loading ? (React.createElement(React.Fragment, null,
                            React.createElement(lucide_react_1.LoaderCircle, { className: "sustainability-newsletter__spinner", size: 18 }),
                            "Subscribing")) : (React.createElement(React.Fragment, null,
                            "Subscribe",
                            React.createElement(lucide_react_1.ArrowRight, { size: 17 })))),
                        status === "error" && (React.createElement("p", { id: "sustainability-newsletter-message", className: "sustainability-newsletter__error", role: "alert" }, message)))),
                    React.createElement("div", { className: "sustainability-newsletter__privacy" },
                        React.createElement(lucide_react_1.ShieldCheck, { size: 15 }),
                        React.createElement("span", null, "Your email should be used only according to our privacy policy. Unsubscribe options should be included in newsletter emails."))),
                React.createElement("div", { className: "sustainability-newsletter__visual", "aria-hidden": "true" },
                    React.createElement("div", { className: "sustainability-newsletter__visual-orbit sustainability-newsletter__visual-orbit--outer" }),
                    React.createElement("div", { className: "sustainability-newsletter__visual-orbit sustainability-newsletter__visual-orbit--inner" }),
                    React.createElement("div", { className: "sustainability-newsletter__leaf-card" },
                        React.createElement("div", { className: "sustainability-newsletter__leaf-icon" },
                            React.createElement(lucide_react_1.Leaf, { size: 54, strokeWidth: 1.35 })),
                        React.createElement("span", { className: "sustainability-newsletter__leaf-caption" }, "SMALL STEPS"),
                        React.createElement("strong", null, "Greener living, one email at a time.")),
                    React.createElement("div", { className: "sustainability-newsletter__floating sustainability-newsletter__floating--mail" },
                        React.createElement(lucide_react_1.Mail, { size: 22 })),
                    React.createElement("div", { className: "sustainability-newsletter__floating sustainability-newsletter__floating--leaf" },
                        React.createElement(lucide_react_1.Leaf, { size: 22 })),
                    React.createElement("div", { className: "sustainability-newsletter__visual-dot sustainability-newsletter__visual-dot--one" }),
                    React.createElement("div", { className: "sustainability-newsletter__visual-dot sustainability-newsletter__visual-dot--two" }))),
            React.createElement("div", { className: "sustainability-newsletter__bottom" },
                React.createElement("span", null,
                    React.createElement(lucide_react_1.Leaf, { size: 15 }),
                    "A more sustainable future starts with better choices."),
                React.createElement("span", { className: "sustainability-newsletter__brand" }, "EcoValuate")))));
}
exports["default"] = SustainabilityNewsletterSection;
