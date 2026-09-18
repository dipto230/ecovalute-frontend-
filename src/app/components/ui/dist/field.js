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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.FieldTitle = exports.FieldContent = exports.FieldSet = exports.FieldSeparator = exports.FieldLegend = exports.FieldGroup = exports.FieldError = exports.FieldDescription = exports.FieldLabel = exports.Field = void 0;
var react_1 = require("react");
var class_variance_authority_1 = require("class-variance-authority");
var cn_1 = require("cn");
var label_1 = require("@/src/app/components/ui/label");
var separator_1 = require("@/src/app/components/ui/separator");
function FieldSet(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("fieldset", __assign({ "data-slot": "field-set", className: cn_1.cn("flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3", className) }, props)));
}
exports.FieldSet = FieldSet;
function FieldLegend(_a) {
    var className = _a.className, _b = _a.variant, variant = _b === void 0 ? "legend" : _b, props = __rest(_a, ["className", "variant"]);
    return (React.createElement("legend", __assign({ "data-slot": "field-legend", "data-variant": variant, className: cn_1.cn("mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base", className) }, props)));
}
exports.FieldLegend = FieldLegend;
function FieldGroup(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "field-group", className: cn_1.cn("group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4", className) }, props)));
}
exports.FieldGroup = FieldGroup;
var fieldVariants = class_variance_authority_1.cva("group/field flex w-full gap-3 data-[invalid=true]:text-destructive", {
    variants: {
        orientation: {
            vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
            horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
            responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        }
    },
    defaultVariants: {
        orientation: "vertical"
    }
});
function Field(_a) {
    var className = _a.className, _b = _a.orientation, orientation = _b === void 0 ? "vertical" : _b, props = __rest(_a, ["className", "orientation"]);
    return (React.createElement("div", __assign({ role: "group", "data-slot": "field", "data-orientation": orientation, className: cn_1.cn(fieldVariants({ orientation: orientation }), className) }, props)));
}
exports.Field = Field;
function FieldContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "field-content", className: cn_1.cn("group/field-content flex flex-1 flex-col gap-1 leading-snug", className) }, props)));
}
exports.FieldContent = FieldContent;
function FieldLabel(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement(label_1.Label, __assign({ "data-slot": "field-label", className: cn_1.cn("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50 has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-3 has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50 *:data-[slot=field]:p-3 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col", className) }, props)));
}
exports.FieldLabel = FieldLabel;
function FieldTitle(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("div", __assign({ "data-slot": "field-label", className: cn_1.cn("flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50", className) }, props)));
}
exports.FieldTitle = FieldTitle;
function FieldDescription(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (React.createElement("p", __assign({ "data-slot": "field-description", className: cn_1.cn("text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5", "last:mt-0 nth-last-2:-mt-1", "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", className) }, props)));
}
exports.FieldDescription = FieldDescription;
function FieldSeparator(_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (React.createElement("div", __assign({ "data-slot": "field-separator", "data-content": !!children, className: cn_1.cn("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2", className) }, props),
        React.createElement(separator_1.Separator, { className: "absolute inset-0 top-1/2" }),
        children && (React.createElement("span", { className: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground", "data-slot": "field-separator-content" }, children))));
}
exports.FieldSeparator = FieldSeparator;
function FieldError(_a) {
    var className = _a.className, children = _a.children, errors = _a.errors, props = __rest(_a, ["className", "children", "errors"]);
    var content = react_1.useMemo(function () {
        var _a;
        if (children) {
            return children;
        }
        if (!(errors === null || errors === void 0 ? void 0 : errors.length)) {
            return null;
        }
        var uniqueErrors = __spreadArrays(new Map(errors.map(function (error) { return [error === null || error === void 0 ? void 0 : error.message, error]; })).values());
        if ((uniqueErrors === null || uniqueErrors === void 0 ? void 0 : uniqueErrors.length) == 1) {
            return (_a = uniqueErrors[0]) === null || _a === void 0 ? void 0 : _a.message;
        }
        return (React.createElement("ul", { className: "ml-4 flex list-disc flex-col gap-1" }, uniqueErrors.map(function (error, index) {
            return (error === null || error === void 0 ? void 0 : error.message) && React.createElement("li", { key: index }, error.message);
        })));
    }, [children, errors]);
    if (!content) {
        return null;
    }
    return (React.createElement("div", __assign({ role: "alert", "data-slot": "field-error", className: cn_1.cn("text-sm font-normal text-destructive", className) }, props), content));
}
exports.FieldError = FieldError;
