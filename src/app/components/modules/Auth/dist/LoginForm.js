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
var _action_1 = require("@/src/app/(commonLayout)/(authRouteGroup)/login/_action");
var auth_validation_1 = require("@/src/zod/auth.validation");
var react_form_1 = require("@tanstack/react-form");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var react_1 = require("react");
var image_1 = require("next/image");
var card_1 = require("../../ui/card");
var AppField_1 = require("../../shared/form/AppField");
var AppSubmitButton_1 = require("../../shared/form/AppSubmitButton");
var button_1 = require("../../ui/button");
var alert_1 = require("../../ui/alert");
var LoginForm = function (_a) {
    var redirectPath = _a.redirectPath;
    var _b = react_1.useState(null), serverError = _b[0], setServerError = _b[1];
    var _c = react_1.useState(false), showPassword = _c[0], setShowPassword = _c[1];
    /* ============================================================= */
    /* CURSOR POSITION */
    /* ============================================================= */
    var _d = react_1.useState({
        x: 0,
        y: 0
    }), mousePosition = _d[0], setMousePosition = _d[1];
    react_1.useEffect(function () {
        var handleMouseMove = function (event) {
            var x = (event.clientX / window.innerWidth - 0.5) * 2;
            var y = (event.clientY / window.innerHeight - 0.5) * 2;
            setMousePosition({ x: x, y: y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return function () {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    /* ============================================================= */
    /* LOGIN MUTATION */
    /* ============================================================= */
    var _e = react_query_1.useMutation({
        mutationFn: function (payload) {
            return _action_1.loginAction(payload, redirectPath);
        }
    }), mutateAsync = _e.mutateAsync, isPending = _e.isPending;
    /* ============================================================= */
    /* FORM */
    /* ============================================================= */
    var form = react_form_1.useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        onSubmit: function (_a) {
            var value = _a.value;
            return __awaiter(void 0, void 0, void 0, function () {
                var result, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            setServerError(null);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, mutateAsync(value)];
                        case 2:
                            result = (_b.sent());
                            if (!result.success) {
                                setServerError(result.message || "Login failed");
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _b.sent();
                            console.log("Login failed: " + error_1.message);
                            setServerError("Login failed: " + error_1.message);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
    });
    return (React.createElement("main", { className: "relative min-h-screen overflow-hidden bg-[#063f42] text-slate-900" },
        React.createElement("div", { className: "\n          pointer-events-none\n          fixed\n          z-[60]\n          hidden\n          size-[280px]\n          -translate-x-1/2\n          -translate-y-1/2\n          rounded-full\n          bg-emerald-300/10\n          blur-[80px]\n          lg:block\n        ", style: {
                left: "calc(50% + " + mousePosition.x * 180 + "px)",
                top: "calc(50% + " + mousePosition.y * 180 + "px)",
                transition: "left 700ms cubic-bezier(0.22, 1, 0.36, 1), top 700ms cubic-bezier(0.22, 1, 0.36, 1)"
            } }),
        React.createElement("div", { className: "pointer-events-none absolute inset-0 overflow-hidden" },
            React.createElement("div", { className: "\n            absolute\n            -left-40\n            -top-40\n            h-[500px]\n            w-[500px]\n            rounded-full\n            bg-emerald-400/10\n            blur-[120px]\n            animate-[blob_10s_ease-in-out_infinite]\n          " }),
            React.createElement("div", { className: "\n            absolute\n            -bottom-40\n            -right-40\n            h-[600px]\n            w-[600px]\n            rounded-full\n            bg-lime-400/10\n            blur-[130px]\n            animate-[blob_12s_ease-in-out_infinite_reverse]\n          " }),
            React.createElement("div", { className: "\n            absolute\n            left-1/2\n            top-1/2\n            h-72\n            w-72\n            -translate-x-1/2\n            -translate-y-1/2\n            rounded-full\n            bg-emerald-300/10\n            blur-[100px]\n            animate-[glowPulse_7s_ease-in-out_infinite]\n          " }),
            React.createElement("div", { className: "\n            absolute\n            left-[8%]\n            top-[20%]\n            h-3\n            w-3\n            rounded-full\n            bg-emerald-300/50\n            animate-[particle_5s_ease-in-out_infinite]\n          " }),
            React.createElement("div", { className: "\n            absolute\n            left-[42%]\n            top-[12%]\n            h-2\n            w-2\n            rounded-full\n            bg-green-300/40\n            animate-[particle_6s_ease-in-out_infinite_1s]\n          " }),
            React.createElement("div", { className: "\n            absolute\n            right-[10%]\n            top-[25%]\n            h-3\n            w-3\n            rounded-full\n            bg-lime-300/50\n            animate-[particle_7s_ease-in-out_infinite_2s]\n          " }),
            React.createElement("div", { className: "\n            absolute\n            bottom-[18%]\n            left-[45%]\n            h-2\n            w-2\n            rounded-full\n            bg-emerald-300/40\n            animate-[particle_5s_ease-in-out_infinite_2s]\n          " })),
        React.createElement("div", { className: "relative z-10 min-h-screen lg:p-5" },
            React.createElement("div", { className: "\n            grid\n            min-h-screen\n            overflow-hidden\n            lg:min-h-[calc(100vh-40px)]\n            lg:grid-cols-[1.05fr_0.95fr]\n            lg:rounded-[28px]\n          " },
                React.createElement("section", { className: "\n              relative\n              order-2\n              min-h-[650px]\n              overflow-hidden\n              lg:order-1\n              lg:min-h-0\n            " },
                    React.createElement(image_1["default"], { src: "/e-waste-login.png", alt: "E-waste recycling and sustainable technology", fill: true, priority: true, sizes: "(max-width: 1024px) 100vw, 55vw", className: "\n                object-cover\n                scale-[1.03]\n                transition-transform\n                duration-1000\n              ", style: {
                            transform: "\n                  scale(1.03)\n                  translate3d(\n                    " + mousePosition.x * -5 + "px,\n                    " + mousePosition.y * -5 + "px,\n                    0\n                  )\n                ",
                            transition: "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)"
                        } }),
                    React.createElement("div", { className: "\n                absolute\n                inset-0\n                bg-gradient-to-br\n                from-[#00383b]/95\n                via-[#064b45]/70\n                to-[#0b5c48]/45\n              " }),
                    React.createElement("div", { className: "\n                absolute\n                inset-x-0\n                bottom-0\n                h-[60%]\n                bg-gradient-to-t\n                from-[#022f32]\n                via-[#033b39]/65\n                to-transparent\n              " }),
                    React.createElement("div", { className: "\n                absolute\n                -left-20\n                bottom-20\n                h-80\n                w-80\n                rounded-full\n                bg-emerald-400/20\n                blur-[100px]\n                animate-[glowPulse_6s_ease-in-out_infinite]\n              " }),
                    React.createElement("div", { className: "\n                relative\n                z-10\n                flex\n                min-h-[650px]\n                flex-col\n                justify-between\n                p-7\n                sm:p-10\n                lg:min-h-full\n                lg:p-12\n                xl:p-14\n              " },
                        React.createElement("div", { className: "animate-[cardEnter_.7s_ease-out]" },
                            React.createElement("div", { className: "flex items-center gap-4" },
                                React.createElement("div", { className: "\n                      relative\n                      flex\n                      size-16\n                      shrink-0\n                      items-center\n                      justify-center\n                    " },
                                    React.createElement("div", { className: "\n                        absolute\n                        inset-0\n                        rounded-full\n                        bg-emerald-400/20\n                        blur-xl\n                        animate-[glowPulse_5s_ease-in-out_infinite]\n                      " }),
                                    React.createElement("div", { className: "\n                        relative\n                        flex\n                        size-14\n                        items-center\n                        justify-center\n                        rounded-[18px]\n                        bg-gradient-to-br\n                        from-lime-300\n                        to-emerald-400\n                        text-[#063f42]\n                        shadow-xl\n                        shadow-emerald-900/30\n                        animate-[leafFloat_5s_ease-in-out_infinite]\n                      " },
                                        React.createElement(lucide_react_1.Leaf, { className: "size-8", strokeWidth: 2.5 }))),
                                React.createElement("div", null,
                                    React.createElement("h2", { className: "text-3xl font-bold tracking-tight text-white sm:text-4xl" },
                                        "Eco",
                                        React.createElement("span", { className: "text-lime-300" }, "Valuate")),
                                    React.createElement("p", { className: "mt-0.5 text-sm font-medium tracking-wide text-white/75" }, "Give E-Waste a Second Life")))),
                        React.createElement("div", { className: "\n                  max-w-[650px]\n                  animate-[heroText_1s_ease-out]\n                " },
                            React.createElement("div", { className: "\n                    mb-5\n                    inline-flex\n                    items-center\n                    gap-2\n                    rounded-full\n                    border\n                    border-emerald-300/20\n                    bg-emerald-950/30\n                    px-4\n                    py-2\n                    text-sm\n                    font-medium\n                    text-emerald-100\n                    backdrop-blur-md\n                    transition-all\n                    duration-500\n                    hover:border-emerald-300/40\n                    hover:bg-emerald-900/40\n                  " },
                                React.createElement(lucide_react_1.Recycle, { className: "size-4 text-lime-300" }),
                                React.createElement("span", null, "Smart E-Waste Marketplace"),
                                React.createElement("span", { className: "\n                      size-1.5\n                      rounded-full\n                      bg-lime-300\n                      animate-pulse\n                    " })),
                            React.createElement("h1", { className: "\n                    text-4xl\n                    font-bold\n                    leading-[1.08]\n                    tracking-tight\n                    text-white\n                    sm:text-5xl\n                    xl:text-6xl\n                  " },
                                "Turn Your Old Devices",
                                React.createElement("br", null),
                                React.createElement("span", { className: "\n                      bg-gradient-to-r\n                      from-lime-300\n                      via-emerald-300\n                      to-green-300\n                      bg-clip-text\n                      text-transparent\n                    " }, "into New Opportunities")),
                            React.createElement("p", { className: "mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg" },
                                "Buy, Sell and Recycle E-Waste with Confidence.",
                                React.createElement("br", null),
                                "A smarter marketplace for a cleaner, greener tomorrow."),
                            React.createElement("div", { className: "\n                    mt-8\n                    flex\n                    flex-wrap\n                    items-center\n                    gap-y-5\n                  " },
                                React.createElement("div", { className: "\n                      group\n                      flex\n                      items-center\n                      gap-3\n                      pr-6\n                      transition-transform\n                      duration-500\n                      hover:-translate-y-1\n                    " },
                                    React.createElement("div", { className: "\n                        flex\n                        size-11\n                        items-center\n                        justify-center\n                        rounded-xl\n                        border\n                        border-lime-300/30\n                        bg-lime-300/10\n                        text-lime-300\n                        transition-all\n                        duration-500\n                        group-hover:scale-110\n                        group-hover:bg-lime-300/20\n                      " },
                                        React.createElement(lucide_react_1.Recycle, { className: "size-6" })),
                                    React.createElement("div", null,
                                        React.createElement("p", { className: "text-sm font-semibold text-white" }, "Sell Your"),
                                        React.createElement("p", { className: "text-sm text-white/70" }, "Old Devices"))),
                                React.createElement("div", { className: "hidden h-10 w-px bg-white/20 sm:block" }),
                                React.createElement("div", { className: "\n                      group\n                      flex\n                      items-center\n                      gap-3\n                      px-6\n                      transition-transform\n                      duration-500\n                      hover:-translate-y-1\n                    " },
                                    React.createElement("div", { className: "\n                        flex\n                        size-11\n                        items-center\n                        justify-center\n                        rounded-xl\n                        border\n                        border-emerald-300/30\n                        bg-emerald-300/10\n                        text-emerald-300\n                        transition-all\n                        duration-500\n                        group-hover:scale-110\n                        group-hover:bg-emerald-300/20\n                      " },
                                        React.createElement(lucide_react_1.ShieldCheck, { className: "size-6" })),
                                    React.createElement("div", null,
                                        React.createElement("p", { className: "text-sm font-semibold text-white" }, "Get Fair"),
                                        React.createElement("p", { className: "text-sm text-white/70" }, "Value"))),
                                React.createElement("div", { className: "hidden h-10 w-px bg-white/20 sm:block" }),
                                React.createElement("div", { className: "\n                      group\n                      flex\n                      items-center\n                      gap-3\n                      pl-6\n                      transition-transform\n                      duration-500\n                      hover:-translate-y-1\n                    " },
                                    React.createElement("div", { className: "\n                        flex\n                        size-11\n                        items-center\n                        justify-center\n                        rounded-xl\n                        border\n                        border-lime-300/30\n                        bg-lime-300/10\n                        text-lime-300\n                        transition-all\n                        duration-500\n                        group-hover:scale-110\n                        group-hover:bg-lime-300/20\n                      " },
                                        React.createElement(lucide_react_1.Leaf, { className: "size-6" })),
                                    React.createElement("div", null,
                                        React.createElement("p", { className: "text-sm font-semibold text-white" }, "Support a"),
                                        React.createElement("p", { className: "text-sm text-white/70" }, "Greener Planet"))))),
                        React.createElement("div", { className: "\n                  flex\n                  items-center\n                  gap-3\n                  animate-[floatCard_6s_ease-in-out_infinite]\n                " },
                            React.createElement("div", { className: "\n                    flex\n                    size-9\n                    items-center\n                    justify-center\n                    rounded-xl\n                    bg-lime-300/15\n                    text-lime-300\n                  " },
                                React.createElement(lucide_react_1.Leaf, { className: "size-5" })),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-sm font-semibold text-white" }, "\u201CReduce E-Waste"),
                                React.createElement("p", { className: "text-sm text-white/80" }, "Build a Sustainable Future\u201D")))),
                    React.createElement("div", { className: "\n                absolute\n                right-8\n                top-24\n                z-20\n                animate-[sparkle_3s_ease-in-out_infinite]\n              ", style: {
                            transform: "\n                  translate3d(\n                    " + mousePosition.x * 10 + "px,\n                    " + mousePosition.y * 10 + "px,\n                    0\n                  )\n                ",
                            transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)"
                        } },
                        React.createElement(lucide_react_1.Sparkles, { className: "size-7 text-lime-300/70" }))),
                React.createElement("section", { className: "\n              order-1\n              flex\n              min-h-screen\n              items-center\n              justify-center\n              bg-[#f7faf8]\n              px-5\n              py-8\n              sm:px-8\n              lg:order-2\n              lg:min-h-0\n              lg:px-12\n              xl:px-16\n            " },
                    React.createElement(card_1.Card, { className: "\n                relative\n                w-full\n                max-w-[650px]\n                overflow-hidden\n                rounded-[24px]\n                border\n                border-slate-200/80\n                bg-white\n                shadow-[0_25px_80px_-25px_rgba(15,23,42,0.18)]\n                transition-shadow\n                duration-500\n                hover:shadow-[0_35px_100px_-25px_rgba(15,23,42,0.22)]\n                animate-[cardEnter_.7s_ease-out]\n              ", style: {
                            transform: "\n                  translate3d(\n                    " + mousePosition.x * 2 + "px,\n                    " + mousePosition.y * 2 + "px,\n                    0\n                  )\n                ",
                            transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)"
                        } },
                        React.createElement("div", { className: "\n                  absolute\n                  left-0\n                  right-0\n                  top-0\n                  h-1\n                  bg-gradient-to-r\n                  from-emerald-500\n                  via-green-500\n                  to-lime-400\n                " }),
                        React.createElement("div", { className: "\n                  pointer-events-none\n                  absolute\n                  -right-5\n                  -top-5\n                  opacity-10\n                  animate-[leafFloat_7s_ease-in-out_infinite]\n                " },
                            React.createElement(lucide_react_1.Leaf, { className: "size-28 rotate-12 text-emerald-500" })),
                        React.createElement(card_1.CardHeader, { className: "px-7 pb-4 pt-9 sm:px-10 sm:pt-11" },
                            React.createElement("div", { className: "\n                    mb-12\n                    flex\n                    items-center\n                    justify-end\n                    gap-2\n                    text-sm\n                  " },
                                React.createElement("span", { className: "text-slate-500" }, "New here?"),
                                React.createElement(link_1["default"], { href: "/register", className: "\n                      group\n                      inline-flex\n                      items-center\n                      gap-1.5\n                      font-semibold\n                      text-emerald-600\n                      transition-colors\n                      hover:text-emerald-700\n                    " },
                                    "Create an account",
                                    React.createElement(lucide_react_1.ArrowRight, { className: "\n                        size-4\n                        transition-transform\n                        duration-300\n                        group-hover:translate-x-1\n                      " }))),
                            React.createElement("div", null,
                                React.createElement(card_1.CardTitle, { className: "\n                      text-3xl\n                      font-bold\n                      tracking-tight\n                      text-[#123442]\n                      sm:text-4xl\n                    " }, "Welcome Back"),
                                React.createElement(card_1.CardDescription, { className: "mt-2 text-base text-slate-500" }, "Login to your EcoValuate account"))),
                        React.createElement(card_1.CardContent, { className: "px-7 pb-8 sm:px-10" },
                            React.createElement("form", { method: "POST", action: "#", noValidate: true, onSubmit: function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    form.handleSubmit();
                                }, className: "space-y-5" },
                                React.createElement(form.Field, { name: "email", validators: {
                                        onChange: auth_validation_1.loginZodSchema.shape.email
                                    } }, function (field) { return (React.createElement(AppField_1["default"], { field: field, label: "Email Address", type: "email", placeholder: "Enter your email" })); }),
                                React.createElement(form.Field, { name: "password", validators: {
                                        onChange: auth_validation_1.loginZodSchema.shape.password
                                    } }, function (field) { return (React.createElement(AppField_1["default"], { field: field, label: "Password", type: showPassword
                                        ? "text"
                                        : "password", placeholder: "Enter your password", "aria-label": showPassword
                                        ? "Hide password"
                                        : "Show password", className: "cursor-pointer", append: React.createElement(button_1.Button, { type: "button", onClick: function () {
                                            return setShowPassword(function (value) { return !value; });
                                        }, variant: "ghost", size: "icon", className: "\n                              mr-1\n                              text-slate-400\n                              transition-all\n                              duration-300\n                              hover:bg-transparent\n                              hover:text-emerald-600\n                              hover:scale-110\n                            " }, showPassword ? (React.createElement(lucide_react_1.EyeOff, { className: "size-4", "aria-hidden": "true" })) : (React.createElement(lucide_react_1.Eye, { className: "size-4", "aria-hidden": "true" }))) })); }),
                                React.createElement("div", { className: "\n                      flex\n                      items-center\n                      justify-between\n                      gap-4\n                    " },
                                    React.createElement("label", { className: "\n                        group\n                        flex\n                        cursor-pointer\n                        items-center\n                        gap-2\n                        text-sm\n                        text-slate-600\n                      " },
                                        React.createElement("input", { type: "checkbox", className: "\n                          size-5\n                          rounded-md\n                          border-slate-300\n                          text-emerald-600\n                          accent-emerald-600\n                          transition-all\n                          duration-200\n                          focus:ring-emerald-500\n                          group-hover:scale-105\n                        " }),
                                        React.createElement("span", null, "Remember me")),
                                    React.createElement(link_1["default"], { href: "/forgot-password", className: "\n                        text-sm\n                        font-medium\n                        text-emerald-600\n                        transition-colors\n                        hover:text-emerald-700\n                        hover:underline\n                        underline-offset-4\n                      " }, "Forgot password?")),
                                serverError && (React.createElement(alert_1.Alert, { variant: "destructive", className: "\n                        border-red-200\n                        bg-red-50\n                        text-red-600\n                        animate-[errorShake_.4s_ease-out]\n                      " },
                                    React.createElement(alert_1.AlertDescription, null, serverError))),
                                React.createElement(form.Subscribe, { selector: function (s) {
                                        return [s.canSubmit, s.isSubmitting];
                                    } }, function (_a) {
                                    var canSubmit = _a[0], isSubmitting = _a[1];
                                    return (React.createElement(AppSubmitButton_1["default"], { isPending: isSubmitting || isPending, pendingLabel: "Logging In...", disabled: !canSubmit, className: "\n                          group\n                          relative\n                          h-12\n                          w-full\n                          overflow-hidden\n                          rounded-xl\n                          border-0\n                          bg-gradient-to-r\n                          from-emerald-600\n                          via-green-600\n                          to-emerald-600\n                          font-semibold\n                          text-white\n                          shadow-lg\n                          shadow-emerald-600/20\n                          transition-all\n                          duration-300\n                          hover:-translate-y-1\n                          hover:scale-[1.01]\n                          hover:shadow-2xl\n                          hover:shadow-emerald-600/30\n                          active:translate-y-0\n                          active:scale-[0.98]\n                        " },
                                        React.createElement("span", { className: "\n                            pointer-events-none\n                            absolute\n                            inset-y-0\n                            left-0\n                            w-1/3\n                            -translate-x-[180%]\n                            skew-x-[-20deg]\n                            bg-gradient-to-r\n                            from-transparent\n                            via-white/25\n                            to-transparent\n                            transition-transform\n                            duration-700\n                            group-hover:translate-x-[450%]\n                          " }),
                                        React.createElement("span", { className: "relative z-10" }, "Login"),
                                        React.createElement(lucide_react_1.ArrowRight, { className: "\n                            relative\n                            z-10\n                            ml-2\n                            size-4\n                            transition-transform\n                            duration-300\n                            group-hover:translate-x-1\n                          " })));
                                })),
                            React.createElement("div", { className: "relative my-7" },
                                React.createElement("div", { className: "absolute inset-0 flex items-center" },
                                    React.createElement("div", { className: "w-full border-t border-slate-200" })),
                                React.createElement("div", { className: "relative flex justify-center text-xs" },
                                    React.createElement("span", { className: "bg-white px-4 text-slate-400" }, "or"))),
                            React.createElement(button_1.Button, { variant: "outline", className: "\n                    group\n                    h-12\n                    w-full\n                    rounded-xl\n                    border-slate-200\n                    bg-white\n                    text-slate-700\n                    shadow-sm\n                    transition-all\n                    duration-300\n                    hover:-translate-y-0.5\n                    hover:border-emerald-200\n                    hover:bg-emerald-50\n                    hover:text-slate-900\n                    hover:shadow-md\n                  ", onClick: function () {
                                    var baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                                    window.location.href = baseUrl + "/auth/login/google";
                                } },
                                React.createElement("svg", { className: "\n                      mr-2\n                      size-5\n                      transition-transform\n                      duration-300\n                      group-hover:scale-110\n                    ", viewBox: "0 0 24 24" },
                                    React.createElement("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
                                    React.createElement("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
                                    React.createElement("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
                                    React.createElement("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })),
                                "Continue with Google")),
                        React.createElement(card_1.CardFooter, { className: "\n                  flex-col\n                  justify-center\n                  gap-3\n                  border-t\n                  border-slate-100\n                  bg-slate-50/70\n                  px-7\n                  py-5\n                " },
                            React.createElement("div", { className: "\n                    flex\n                    items-center\n                    gap-2\n                    text-xs\n                    text-slate-500\n                  " },
                                React.createElement(lucide_react_1.ShieldCheck, { className: "size-4 text-emerald-500" }),
                                React.createElement("span", null, "Your data is safe and protected with us"))))))),
        React.createElement("style", { jsx: true, global: true }, "\n        @keyframes imageFloat {\n          0%,\n          100% {\n            transform: translateY(0px) rotate(0deg);\n          }\n\n          50% {\n            transform: translateY(-8px) rotate(0.3deg);\n          }\n        }\n\n        @keyframes floatCard {\n          0%,\n          100% {\n            transform: translateY(0px);\n          }\n\n          50% {\n            transform: translateY(-8px);\n          }\n        }\n\n        @keyframes cardEnter {\n          from {\n            opacity: 0;\n            transform: translateY(25px) scale(0.97);\n          }\n\n          to {\n            opacity: 1;\n            transform: translateY(0) scale(1);\n          }\n        }\n\n        @keyframes heroText {\n          from {\n            opacity: 0;\n            transform: translateY(30px);\n          }\n\n          to {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n\n        @keyframes blob {\n          0%,\n          100% {\n            transform: translate3d(0, 0, 0) scale(1);\n          }\n\n          25% {\n            transform: translate3d(25px, -18px, 0) scale(1.04);\n          }\n\n          50% {\n            transform: translate3d(-15px, 25px, 0) scale(0.98);\n          }\n\n          75% {\n            transform: translate3d(18px, 10px, 0) scale(1.03);\n          }\n        }\n\n        @keyframes glowPulse {\n          0%,\n          100% {\n            opacity: 0.35;\n            transform: scale(1);\n          }\n\n          50% {\n            opacity: 0.7;\n            transform: scale(1.12);\n          }\n        }\n\n        @keyframes particle {\n          0%,\n          100% {\n            transform: translateY(0px);\n            opacity: 0.3;\n          }\n\n          50% {\n            transform: translateY(-25px);\n            opacity: 0.8;\n          }\n        }\n\n        @keyframes sparkle {\n          0%,\n          100% {\n            transform: scale(1) rotate(0deg);\n            opacity: 0.35;\n          }\n\n          25% {\n            transform: scale(0.85) rotate(-8deg);\n            opacity: 0.55;\n          }\n\n          50% {\n            transform: scale(1.3) rotate(12deg);\n            opacity: 1;\n          }\n\n          75% {\n            transform: scale(0.95) rotate(4deg);\n            opacity: 0.6;\n          }\n        }\n\n        @keyframes leafFloat {\n          0%,\n          100% {\n            transform: translateY(0px) rotate(0deg);\n          }\n\n          50% {\n            transform: translateY(-8px) rotate(4deg);\n          }\n        }\n\n        @keyframes errorShake {\n          0%,\n          100% {\n            transform: translateX(0);\n          }\n\n          25% {\n            transform: translateX(-5px);\n          }\n\n          50% {\n            transform: translateX(5px);\n          }\n\n          75% {\n            transform: translateX(-3px);\n          }\n        }\n\n        @media (prefers-reduced-motion: reduce) {\n          *,\n          *::before,\n          *::after {\n            animation-duration: 0.01ms !important;\n            animation-iteration-count: 1 !important;\n            transition-duration: 0.01ms !important;\n          }\n        }\n      ")));
};
exports["default"] = LoginForm;
