"use strict";
exports.__esModule = true;
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var utils_1 = require("@/lib/utils");
var react_1 = require("react");
var getErrorMessage = function (error) {
    if (typeof error === "string")
        return error;
    if (error && typeof error === "object") {
        if ("message" in error && typeof error.message === "string") {
            return error.message;
        }
    }
    return String(error);
};
var AppField = function (_a) {
    var field = _a.field, label = _a.label, _b = _a.type, type = _b === void 0 ? "text" : _b, placeholder = _a.placeholder, append = _a.append, prepend = _a.prepend, className = _a.className, _c = _a.disabled, disabled = _c === void 0 ? false : _c;
    var firstError = field.state.meta.isTouched && field.state.meta.errors.length > 0 ? getErrorMessage(field.state.meta.errors[0]) : null;
    var hasError = firstError !== null;
    return (react_1["default"].createElement("div", { className: utils_1.cn("space-y-1.5", className) },
        react_1["default"].createElement(label_1.Label, { htmlFor: field.name, className: utils_1.cn(hasError && "text-destructive") }, label),
        react_1["default"].createElement("div", { className: "relative" },
            prepend && (react_1["default"].createElement("div", { className: "absolute inset-y-0 left-0 items-center pl-3 pointer-events-none z-10" }, prepend)),
            react_1["default"].createElement(input_1.Input, { id: field.name, name: field.name, type: type, value: field.state.value, placeholder: placeholder, onBlur: field.handleBlur, onChange: function (e) { return field.handleChange(e.target.value); }, disabled: disabled, "aria-invalid": hasError, "aria-describedby": hasError ? field.name + "-error" : undefined, className: utils_1.cn(prepend && "pl-10", append && "pr-10", hasError && "border-destructive focus-visible:ring-destructive/20") }),
            append && (react_1["default"].createElement("div", { className: "absolute inset-y-0 right-0 items-center pr-3 pointer-events-none z-10" }, append)),
            hasError && (react_1["default"].createElement("p", { id: field.name + "-error", role: "alert", className: "text-sm text-destructive" }, firstError)))));
};
exports["default"] = AppField;
