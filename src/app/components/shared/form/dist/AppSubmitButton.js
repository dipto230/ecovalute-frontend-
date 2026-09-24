"use strict";
exports.__esModule = true;
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var button_1 = require("../../ui/button");
var AppSubmitButton = function (_a) {
    var isPending = _a.isPending, children = _a.children, _b = _a.pendingLabel, pendingLabel = _b === void 0 ? "Submitting..." : _b, className = _a.className, _c = _a.disabled, disabled = _c === void 0 ? false : _c;
    var isDisabled = disabled || isPending;
    return (react_1["default"].createElement(button_1.Button, { type: 'submit', disabled: isDisabled, className: utils_1.cn("w-full", className) }, isPending ? (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(lucide_react_1.Loader2, { className: "animate-spin", "aria-hidden": "true" }),
        pendingLabel ? pendingLabel : children)) : children));
};
exports["default"] = AppSubmitButton;
