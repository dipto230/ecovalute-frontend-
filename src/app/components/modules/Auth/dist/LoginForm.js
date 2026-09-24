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
/* eslint-disable @typescript-eslint/no-explicit-any */
var react_form_1 = require("@tanstack/react-form");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var react_1 = require("react");
var card_1 = require("../../ui/card");
var AppField_1 = require("../../shared/form/AppField");
var button_1 = require("../../ui/button");
var alert_1 = require("../../ui/alert");
var AppSubmitButton_1 = require("../../shared/form/AppSubmitButton");
var LoginForm = function (_a) {
    // const queryClient = useQueryClient();
    var redirectPath = _a.redirectPath;
    var _b = react_1.useState(null), serverError = _b[0], setServerError = _b[1];
    var _c = react_1.useState(false), showPassword = _c[0], setShowPassword = _c[1];
    var _d = react_query_1.useMutation({
        mutationFn: function (payload) { return _action_1.loginAction(payload, redirectPath); }
    }), mutateAsync = _d.mutateAsync, isPending = _d.isPending;
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
                            result = _b.sent();
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
    return (React.createElement(card_1.Card, { className: "w-full max-w-md mx-auto shadow-md" },
        React.createElement(card_1.CardHeader, { className: "text-center" },
            React.createElement(card_1.CardTitle, { className: "text-2xl font-bold" }, "Welcome Back!"),
            React.createElement(card_1.CardDescription, null, "Please enter your credentials to log in.")),
        React.createElement(card_1.CardContent, null,
            React.createElement("form", { method: "POST", action: "#", noValidate: true, onSubmit: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }, className: "space-y-4" },
                React.createElement(form.Field, { name: "email", validators: { onChange: auth_validation_1.loginZodSchema.shape.email } }, function (field) { return (React.createElement(AppField_1["default"], { field: field, label: "Email", type: "email", placeholder: "Enter your email" })); }),
                React.createElement(form.Field, { name: "password", validators: { onChange: auth_validation_1.loginZodSchema.shape.password } }, function (field) { return (React.createElement(AppField_1["default"], { field: field, label: "Password", type: showPassword ? "text" : "password", 
                    // type="text"
                    placeholder: "Enter your password", "aria-label": showPassword ? "Hide password" : "Show password", className: "cursor-pointer", append: React.createElement(button_1.Button, { type: "button", onClick: function () { return setShowPassword(function (value) { return !value; }); }, variant: "ghost", size: "icon" }, showPassword ? (React.createElement(lucide_react_1.EyeOff, { className: "size-4", "aria-hidden": "true" })) : (React.createElement(lucide_react_1.Eye, { className: "size-4", "aria-hidden": "true" }))) })); }),
                React.createElement("div", { className: "text-right mt-2" },
                    React.createElement(link_1["default"], { href: "/forgot-password", className: "text-sm text-primary hover:underline underline-offset-4" }, "Forgot password?")),
                serverError && (React.createElement(alert_1.Alert, { variant: "destructive" },
                    React.createElement(alert_1.AlertDescription, null, serverError))),
                React.createElement(form.Subscribe, { selector: function (s) { return [s.canSubmit, s.isSubmitting]; } }, function (_a) {
                    var canSubmit = _a[0], isSubmitting = _a[1];
                    return (React.createElement(AppSubmitButton_1["default"], { isPending: isSubmitting || isPending, pendingLabel: "Logging In....", disabled: !canSubmit }, "Log In"));
                })),
            React.createElement("div", { className: "relative my-6" },
                React.createElement("div", { className: "absolute inset-0 flex items-center" },
                    React.createElement("div", { className: "w-full border-t border-gray-300" })),
                React.createElement("div", { className: "relative flex justify-center text-sm" },
                    React.createElement("span", { className: "px-2 bg-white text-gray-500" }, "Or continue with"))),
            React.createElement(button_1.Button, { variant: "outline", className: "w-full", onClick: function () {
                    var baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                    //TODO redirect path after login in frontend
                    window.location.href = baseUrl + "/auth/login/google";
                } },
                React.createElement("svg", { className: "w-5 h-5 mr-2", viewBox: "0 0 24 24" },
                    React.createElement("path", { fill: "currentColor", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
                    React.createElement("path", { fill: "currentColor", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
                    React.createElement("path", { fill: "currentColor", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
                    React.createElement("path", { fill: "currentColor", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })),
                "Sign in with Google")),
        React.createElement(card_1.CardFooter, { className: "justify-center border-t pt-4" },
            React.createElement("p", { className: "text-sm text-muted-foreground" },
                "Don't have an account?",
                " ",
                React.createElement(link_1["default"], { href: "/register", className: "text-primary font-medium hover:underline underline-offset-4" }, "Sign Up for an account")))));
};
exports["default"] = LoginForm;
