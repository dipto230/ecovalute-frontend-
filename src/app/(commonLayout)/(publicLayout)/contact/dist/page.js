"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var contactOptions = [
    {
        icon: lucide_react_1.Mail,
        title: "Email us",
        description: "For general questions and inquiries.",
        value: "support@ecovaluate.com",
        href: "mailto:support@ecovaluate.com",
        color: "bg-emerald-50 text-emerald-700"
    },
    {
        icon: lucide_react_1.MessageCircle,
        title: "Product support",
        description: "Need help with your EcoValuate experience?",
        value: "Tell us what you need",
        href: "#contact-form",
        color: "bg-lime-50 text-lime-700"
    },
    {
        icon: lucide_react_1.Globe2,
        title: "Our platform",
        description: "Explore our sustainable electronics marketplace.",
        value: "Explore marketplace",
        href: "/marketplace",
        color: "bg-teal-50 text-teal-700"
    },
];
var topics = [
    "General inquiry",
    "AI price estimation",
    "Marketplace support",
    "Selling electronic waste",
    "Partnership opportunity",
    "Other",
];
function ContactPage() {
    var _a = react_1.useState({
        name: "",
        email: "",
        topic: "General inquiry",
        subject: "",
        message: ""
    }), form = _a[0], setForm = _a[1];
    var _b = react_1.useState(false), submitted = _b[0], setSubmitted = _b[1];
    var updateField = function (field, value) {
        setForm(function (previous) {
            var _a;
            return (__assign(__assign({}, previous), (_a = {}, _a[field] = value, _a)));
        });
        setSubmitted(false);
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        var subject = encodeURIComponent(form.subject || "EcoValuate inquiry: " + form.topic);
        var body = encodeURIComponent("Name: " + form.name + "\nEmail: " + form.email + "\nTopic: " + form.topic + "\n\nMessage:\n" + form.message);
        setSubmitted(true);
        window.location.href =
            "mailto:support@ecovaluate.com?subject=" + subject + "&body=" + body;
    };
    return (React.createElement("main", { className: "overflow-hidden bg-white text-[#17251f]" },
        React.createElement("section", { className: "relative isolate overflow-hidden bg-white px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-24" },
            React.createElement("div", { className: "pointer-events-none absolute inset-0 -z-10 opacity-70" },
                React.createElement("div", { className: "absolute inset-0", style: {
                        backgroundImage: "linear-gradient(rgba(6,63,66,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(6,63,66,.055) 1px, transparent 1px)",
                        backgroundSize: "56px 56px"
                    } })),
            React.createElement("div", { className: "pointer-events-none absolute -right-32 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-200/40 blur-[120px]" }),
            React.createElement("div", { className: "pointer-events-none absolute -bottom-48 left-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-lime-200/30 blur-[110px]" }),
            React.createElement("div", { className: "mx-auto max-w-7xl" },
                React.createElement("div", { className: "inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800" },
                    React.createElement("span", { className: "h-2 w-2 animate-pulse rounded-full bg-emerald-500" }),
                    "We're here to help"),
                React.createElement("div", { className: "mt-8 grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16" },
                    React.createElement("div", null,
                        React.createElement("h1", { className: "max-w-4xl text-5xl font-black leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-[82px]" },
                            "Let's start a",
                            React.createElement("br", null),
                            React.createElement("span", { className: "text-emerald-600" }, "conversation.")),
                        React.createElement("p", { className: "mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg" }, "Questions about e-waste, AI-powered valuation, or our marketplace? We'd love to hear from you. Let's make your next step a little greener."),
                        React.createElement("a", { href: "#contact-form", className: "group mt-9 inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition duration-300 hover:-translate-y-1 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20" },
                            "Get in touch",
                            React.createElement(lucide_react_1.ArrowRight, { size: 18, className: "transition-transform group-hover:translate-x-1" })),
                        React.createElement("div", { className: "mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500" },
                            React.createElement("span", { className: "flex items-center gap-2" },
                                React.createElement(lucide_react_1.ShieldCheck, { size: 15, className: "text-emerald-600" }),
                                "Privacy conscious"),
                            React.createElement("span", { className: "flex items-center gap-2" },
                                React.createElement(lucide_react_1.Leaf, { size: 15, className: "text-emerald-600" }),
                                "Sustainability first"))),
                    React.createElement("div", { className: "relative lg:justify-self-end" },
                        React.createElement("div", { className: "relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/[0.045] sm:rounded-[32px] sm:p-8 lg:max-w-md" },
                            React.createElement("div", { className: "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-50 blur-2xl" }),
                            React.createElement("div", { className: "relative flex items-center justify-between" },
                                React.createElement("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700" },
                                    React.createElement(lucide_react_1.Sparkles, { size: 24 })),
                                React.createElement("span", { className: "rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500" }, "EcoValuate")),
                            React.createElement("h2", { className: "relative mt-7 text-2xl font-bold leading-snug tracking-tight text-[#17251f] sm:text-3xl" }, "Good things happen when we connect."),
                            React.createElement("p", { className: "relative mt-4 text-sm leading-7 text-slate-600" }, "Whether you're a customer, seller, or future partner, your ideas and questions matter to us."),
                            React.createElement("div", { className: "my-7 h-px bg-slate-100" }),
                            React.createElement("div", { className: "flex items-center gap-3" },
                                React.createElement("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" },
                                    React.createElement(lucide_react_1.Leaf, { size: 19 })),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-sm font-bold text-[#17251f]" }, "A greener future"),
                                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "One conversation at a time."))),
                            React.createElement("div", { className: "pointer-events-none absolute -bottom-20 -right-12 h-48 w-48 rounded-full border border-emerald-100" })))))),
        React.createElement("section", { className: "relative z-10 -mt-8 px-5 sm:px-8 lg:px-12" },
            React.createElement("div", { className: "mx-auto grid max-w-7xl gap-4 md:grid-cols-3" }, contactOptions.map(function (option) {
                var Icon = option.icon;
                return (React.createElement(link_1["default"], { key: option.title, href: option.href, className: "group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/[0.05] sm:p-7" },
                    React.createElement("div", { className: "flex items-start justify-between gap-4" },
                        React.createElement("span", { className: "flex h-12 w-12 items-center justify-center rounded-2xl " + option.color },
                            React.createElement(Icon, { size: 22 })),
                        React.createElement(lucide_react_1.ArrowUpRight, { size: 19, className: "text-slate-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-600" })),
                    React.createElement("h2", { className: "mt-6 text-lg font-bold text-[#17251f]" }, option.title),
                    React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-500" }, option.description),
                    React.createElement("p", { className: "mt-4 break-words text-sm font-bold text-emerald-700" }, option.value)));
            }))),
        React.createElement("section", { id: "contact-form", className: "scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12" },
            React.createElement("div", { className: "mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20" },
                React.createElement("div", { className: "lg:sticky lg:top-10" },
                    React.createElement("p", { className: "text-xs font-bold uppercase tracking-[0.22em] text-emerald-700" }, "Contact our team"),
                    React.createElement("h2", { className: "mt-5 text-4xl font-black leading-tight tracking-[-0.045em] text-[#17251f] sm:text-5xl" },
                        "Tell us what's",
                        React.createElement("span", { className: "text-emerald-600" },
                            " ",
                            "on your mind.")),
                    React.createElement("p", { className: "mt-6 leading-8 text-slate-600" }, "Share your question, feedback, or idea. Give us a little context and we'll help you find the right next step."),
                    React.createElement("div", { className: "mt-9 space-y-5" },
                        React.createElement("div", { className: "flex items-start gap-4" },
                            React.createElement("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700" },
                                React.createElement(lucide_react_1.Mail, { size: 20 })),
                            React.createElement("div", null,
                                React.createElement("h3", { className: "text-sm font-bold text-[#17251f]" }, "Email support"),
                                React.createElement("p", { className: "mt-1 text-sm leading-6 text-slate-600" }, "support@ecovaluate.com"),
                                React.createElement("p", { className: "mt-1 text-xs leading-5 text-slate-400" }, "Replace this placeholder with your actual support email."))),
                        React.createElement("div", { className: "flex items-start gap-4" },
                            React.createElement("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-lime-100 bg-lime-50 text-lime-700" },
                                React.createElement(lucide_react_1.Clock3, { size: 20 })),
                            React.createElement("div", null,
                                React.createElement("h3", { className: "text-sm font-bold text-[#17251f]" }, "Our response"),
                                React.createElement("p", { className: "mt-1 max-w-sm text-sm leading-6 text-slate-500" }, "We'll get back to you as soon as we can. Response times may vary."))),
                        React.createElement("div", { className: "flex items-start gap-4" },
                            React.createElement("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700" },
                                React.createElement(lucide_react_1.ShieldCheck, { size: 20 })),
                            React.createElement("div", null,
                                React.createElement("h3", { className: "text-sm font-bold text-[#17251f]" }, "Your privacy matters"),
                                React.createElement("p", { className: "mt-1 max-w-sm text-sm leading-6 text-slate-500" }, "Please share only the information needed to help us understand your inquiry.")))),
                    React.createElement("div", { className: "mt-9 rounded-2xl border border-emerald-100 bg-[#f7fbf8] p-5" },
                        React.createElement("div", { className: "flex gap-3" },
                            React.createElement(lucide_react_1.Leaf, { size: 20, className: "mt-0.5 shrink-0 text-emerald-600" }),
                            React.createElement("p", { className: "text-sm leading-7 text-slate-600" },
                                "Have an old device? Discover how technology and thoughtful reuse can give it a new opportunity.",
                                React.createElement(link_1["default"], { href: "/price-estimation", className: "ml-1 font-bold text-emerald-700 hover:underline" }, "Try AI valuation."))))),
                React.createElement("div", { className: "rounded-[26px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.035] sm:rounded-[32px] sm:p-9 lg:p-10" }, submitted ? (React.createElement("div", { className: "flex min-h-[400px] flex-col items-center justify-center text-center" },
                    React.createElement("span", { className: "flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600" },
                        React.createElement(lucide_react_1.CheckCircle2, { size: 34 })),
                    React.createElement("h3", { className: "mt-6 text-2xl font-bold text-[#17251f]" }, "Your email app should open."),
                    React.createElement("p", { className: "mt-3 max-w-sm text-sm leading-7 text-slate-500" }, "Review the prefilled email and send it to contact our team. If no email app opened, use the email address shown on this page."),
                    React.createElement("button", { type: "button", onClick: function () { return setSubmitted(false); }, className: "mt-7 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold transition hover:border-emerald-200 hover:bg-emerald-50" }, "Back to contact form"))) : (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "mb-8" },
                        React.createElement("h3", { className: "text-2xl font-black tracking-tight text-[#17251f] sm:text-3xl" }, "Send us a message"),
                        React.createElement("p", { className: "mt-2 text-sm leading-6 text-slate-500" }, "Fill in the details below to prepare your inquiry.")),
                    React.createElement("form", { onSubmit: handleSubmit, className: "space-y-5" },
                        React.createElement("div", { className: "grid gap-5 sm:grid-cols-2" },
                            React.createElement("div", null,
                                React.createElement("label", { htmlFor: "contact-name", className: "mb-2 block text-sm font-semibold text-slate-700" },
                                    "Full name ",
                                    React.createElement("span", { className: "text-emerald-600" }, "*")),
                                React.createElement("input", { id: "contact-name", name: "name", autoComplete: "name", required: true, maxLength: 100, value: form.name, onChange: function (event) {
                                        return updateField("name", event.target.value);
                                    }, placeholder: "Your full name", className: "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-[#17251f] outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" })),
                            React.createElement("div", null,
                                React.createElement("label", { htmlFor: "contact-email", className: "mb-2 block text-sm font-semibold text-slate-700" },
                                    "Email address ",
                                    React.createElement("span", { className: "text-emerald-600" }, "*")),
                                React.createElement("input", { id: "contact-email", name: "email", type: "email", autoComplete: "email", required: true, maxLength: 254, value: form.email, onChange: function (event) {
                                        return updateField("email", event.target.value);
                                    }, placeholder: "you@example.com", className: "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-[#17251f] outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" }))),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "contact-topic", className: "mb-2 block text-sm font-semibold text-slate-700" }, "What can we help with?"),
                            React.createElement("select", { id: "contact-topic", name: "topic", value: form.topic, onChange: function (event) {
                                    return updateField("topic", event.target.value);
                                }, className: "w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-[#17251f] outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" }, topics.map(function (topic) { return (React.createElement("option", { key: topic, value: topic }, topic)); }))),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "contact-subject", className: "mb-2 block text-sm font-semibold text-slate-700" }, "Subject"),
                            React.createElement("input", { id: "contact-subject", name: "subject", maxLength: 150, value: form.subject, onChange: function (event) {
                                    return updateField("subject", event.target.value);
                                }, placeholder: "A short summary of your inquiry", className: "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-[#17251f] outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "contact-message", className: "mb-2 block text-sm font-semibold text-slate-700" },
                                "Your message ",
                                React.createElement("span", { className: "text-emerald-600" }, "*")),
                            React.createElement("textarea", { id: "contact-message", name: "message", required: true, minLength: 10, maxLength: 5000, rows: 5, value: form.message, onChange: function (event) {
                                    return updateField("message", event.target.value);
                                }, placeholder: "Tell us a little more about how we can help...", className: "w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm leading-7 text-[#17251f] outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" }),
                            React.createElement("p", { className: "mt-2 text-right text-xs text-slate-400" },
                                form.message.length,
                                "/5000 characters")),
                        React.createElement("button", { type: "submit", className: "group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20" },
                            "Prepare email",
                            React.createElement(lucide_react_1.Send, { size: 17, className: "transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" })),
                        React.createElement("p", { className: "text-center text-xs leading-5 text-slate-400" }, "This form opens your default email application. It does not submit your message to a server."))))))),
        React.createElement("section", { className: "px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12" },
            React.createElement("div", { className: "mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm sm:rounded-[30px] sm:p-9 md:flex-row md:items-center" },
                React.createElement("div", { className: "flex items-start gap-4" },
                    React.createElement("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700" },
                        React.createElement(lucide_react_1.MapPin, { size: 22 })),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-lg font-bold text-[#17251f]" }, "Explore a more sustainable way forward."),
                        React.createElement("p", { className: "mt-2 max-w-xl text-sm leading-6 text-slate-500" }, "Discover electronic products, connect with vendors, and explore the EcoValuate experience."))),
                React.createElement(link_1["default"], { href: "/marketplace", className: "inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#092f27] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20" },
                    "Visit Marketplace",
                    React.createElement(lucide_react_1.ArrowRight, { size: 17 }))))));
}
exports["default"] = ContactPage;
