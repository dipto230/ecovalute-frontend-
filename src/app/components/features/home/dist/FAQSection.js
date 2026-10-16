"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
require("./faq-section.css");
var faqs = [
    {
        category: "Valuation",
        question: "How does EcoValuate estimate the value of my e-waste?",
        answer: "EcoValuate helps you understand the potential value of your electronic devices using available product information, device condition, material recovery estimates, and market references. The final resale or recycling value may vary depending on the device, its components, and current market conditions."
    },
    {
        category: "AI Technology",
        question: "What is AI-powered e-waste detection?",
        answer: "Our AI Detection feature is designed to help identify electronic waste from submitted images or supported inputs. Results depend on image quality and the information available. Always review the detected device details before making a valuation or recycling decision."
    },
    {
        category: "Marketplace",
        question: "Can I sell my old electronics through EcoValuate?",
        answer: "You can explore the EcoValuate marketplace to discover available electronics and participating vendors. Whether a particular device can be listed or sold depends on the platform's supported features, listing requirements, and vendor availability."
    },
    {
        category: "Recycling",
        question: "Which electronic devices can be recycled?",
        answer: "Common e-waste categories include smartphones, laptops, computers, monitors, electronic accessories, and other electrical equipment. Acceptance depends on the category and the recycling partner's capabilities. Check the available categories or contact us if you are unsure about a device."
    },
    {
        category: "Market Prices",
        question: "Are live metal prices the same as my device's resale value?",
        answer: "No. Copper and other commodity prices are market references, not guaranteed resale prices for electronic waste. Actual recovery value depends on material composition, purity, recoverable quantity, processing costs, device condition, and local market demand."
    },
    {
        category: "Payments & Orders",
        question: "How do orders and payments work?",
        answer: "Available order and payment options depend on the listing and the features enabled on EcoValuate. Review the order details and applicable payment instructions before confirming a transaction. Keep your order information for future reference."
    },
    {
        category: "Privacy & Security",
        question: "Is my personal information safe?",
        answer: "EcoValuate provides account and authentication features to help protect access to your account. Use a strong password, never share verification codes, and review the information you submit. Avoid uploading sensitive personal information in device photos."
    },
    {
        category: "Getting Started",
        question: "Do I need an account to use EcoValuate?",
        answer: "You can explore the public pages and available marketplace information without necessarily creating an account. Certain account-specific features or transactions may require registration and login."
    },
];
var categories = [
    "All questions",
    "Valuation",
    "AI Technology",
    "Marketplace",
    "Recycling",
    "Payments & Orders",
    "Privacy & Security",
];
function FAQSection() {
    var _a = react_1.useState("All questions"), activeCategory = _a[0], setActiveCategory = _a[1];
    var _b = react_1.useState(0), openIndex = _b[0], setOpenIndex = _b[1];
    var filteredFaqs = activeCategory === "All questions"
        ? faqs
        : faqs.filter(function (faq) { return faq.category === activeCategory; });
    return (React.createElement("section", { className: "eco-faq", id: "faq" },
        React.createElement("div", { className: "eco-faq__container" },
            React.createElement("div", { className: "eco-faq__intro" },
                React.createElement("div", { className: "eco-faq__eyebrow" },
                    React.createElement("span", { className: "eco-faq__eyebrow-icon" },
                        React.createElement(lucide_react_1.Sparkles, { size: 15 })),
                    "YOUR QUESTIONS, ANSWERED"),
                React.createElement("h2", { className: "eco-faq__heading" },
                    "Everything you need to know about",
                    " ",
                    React.createElement("span", null, "smarter recycling.")),
                React.createElement("p", { className: "eco-faq__description" }, "New to EcoValuate? Find clear answers about electronic waste valuation, AI-powered detection, our marketplace, and responsible recycling."),
                React.createElement("div", { className: "eco-faq__trust-list" },
                    React.createElement("div", { className: "eco-faq__trust-item" },
                        React.createElement("span", { className: "eco-faq__trust-icon" },
                            React.createElement(lucide_react_1.CheckCircle2, { size: 17 })),
                        "Transparent valuation guidance"),
                    React.createElement("div", { className: "eco-faq__trust-item" },
                        React.createElement("span", { className: "eco-faq__trust-icon" },
                            React.createElement(lucide_react_1.ShieldCheck, { size: 17 })),
                        "Account security information"),
                    React.createElement("div", { className: "eco-faq__trust-item" },
                        React.createElement("span", { className: "eco-faq__trust-icon" },
                            React.createElement(lucide_react_1.Leaf, { size: 17 })),
                        "Responsible e-waste management")),
                React.createElement("div", { className: "eco-faq__contact-card" },
                    React.createElement("div", { className: "eco-faq__contact-icon" },
                        React.createElement(lucide_react_1.MessageCircle, { size: 23 })),
                    React.createElement("div", { className: "eco-faq__contact-content" },
                        React.createElement("h3", null, "Still have questions?"),
                        React.createElement("p", null, "We are here to help you find the right answers."),
                        React.createElement(link_1["default"], { href: "/contact", className: "eco-faq__contact-link" },
                            "Contact our team",
                            React.createElement(lucide_react_1.ArrowRight, { size: 16 }))),
                    React.createElement(lucide_react_1.ArrowDownRight, { className: "eco-faq__contact-decoration", size: 32 }))),
            React.createElement("div", { className: "eco-faq__content" },
                React.createElement("div", { className: "eco-faq__topline" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "eco-faq__section-label" },
                            React.createElement(lucide_react_1.CircleHelp, { size: 16 }),
                            "FREQUENTLY ASKED QUESTIONS"),
                        React.createElement("p", { className: "eco-faq__count" }, "Find answers to common questions about our platform.")),
                    React.createElement("span", { className: "eco-faq__count-badge" },
                        faqs.length,
                        " answers")),
                React.createElement("div", { className: "eco-faq__filters", "aria-label": "Filter frequently asked questions" }, categories.map(function (category) { return (React.createElement("button", { key: category, type: "button", className: "eco-faq__filter " + (activeCategory === category
                        ? "eco-faq__filter--active"
                        : ""), onClick: function () {
                        setActiveCategory(category);
                        setOpenIndex(0);
                    }, "aria-pressed": activeCategory === category }, category)); })),
                React.createElement("div", { className: "eco-faq__list" }, filteredFaqs.map(function (faq, index) {
                    var isOpen = openIndex === index;
                    return (React.createElement("article", { key: faq.question, className: "eco-faq__item " + (isOpen ? "eco-faq__item--open" : "") },
                        React.createElement("button", { type: "button", className: "eco-faq__question", id: "eco-faq-question-" + index, "aria-expanded": isOpen, "aria-controls": "eco-faq-answer-" + index, onClick: function () {
                                return setOpenIndex(isOpen ? null : index);
                            } },
                            React.createElement("span", { className: "eco-faq__question-number" }, String(index + 1).padStart(2, "0")),
                            React.createElement("span", { className: "eco-faq__question-text" }, faq.question),
                            React.createElement("span", { className: "eco-faq__chevron" },
                                React.createElement(lucide_react_1.ChevronDown, { size: 19 }))),
                        React.createElement("div", { id: "eco-faq-answer-" + index, className: "eco-faq__answer", role: "region", "aria-labelledby": "eco-faq-question-" + index, hidden: !isOpen },
                            React.createElement("div", { className: "eco-faq__answer-inner" },
                                React.createElement("span", { className: "eco-faq__answer-category" }, faq.category),
                                React.createElement("p", null, faq.answer)))));
                })),
                React.createElement("div", { className: "eco-faq__bottom-note" },
                    React.createElement("span", { className: "eco-faq__bottom-icon" },
                        React.createElement(lucide_react_1.Leaf, { size: 18 })),
                    React.createElement("p", null,
                        React.createElement("strong", null, "Better decisions. Less e-waste."),
                        React.createElement("span", null, "Every informed choice is a step towards a more sustainable future.")),
                    React.createElement(link_1["default"], { href: "/price-estimation", className: "eco-faq__bottom-link" },
                        "Explore valuation",
                        React.createElement(lucide_react_1.ArrowRight, { size: 16 })))))));
}
exports["default"] = FAQSection;
