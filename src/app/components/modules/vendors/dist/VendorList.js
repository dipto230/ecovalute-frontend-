"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_query_1 = require("@tanstack/react-query");
var _action_1 = require("@/src/app/(commonLayout)/(publicLayout)/marketplace/vendors/_action");
var card_1 = require("@/src/app/components/ui/card");
var avatar_1 = require("@/src/app/components/ui/avatar");
var badge_1 = require("@/src/app/components/ui/badge");
var button_1 = require("@/src/app/components/ui/button");
var VendorList = function () {
    var _a, _b;
    var _c = react_query_1.useQuery({
        queryKey: ["vendors"],
        queryFn: _action_1.getVendors
    }), data = _c.data, isLoading = _c.isLoading, isError = _c.isError;
    if (isLoading) {
        return React.createElement("div", { className: "p-6" }, "Loading vendors...");
    }
    if (isError) {
        return React.createElement("div", { className: "p-6" }, "Failed to load vendors.");
    }
    var vendors = (_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : [];
    return (React.createElement("div", { className: "p-6" },
        React.createElement("div", { className: "mb-8" },
            React.createElement("h1", { className: "text-3xl font-bold tracking-tight" }, "Vendors"),
            React.createElement("p", { className: "mt-1 text-sm text-muted-foreground" }, "Explore our marketplace vendors and their businesses.")),
        React.createElement("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" }, vendors.map(function (vendor) {
            var _a;
            return (React.createElement(card_1.Card, { key: vendor.id, className: "overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg" },
                React.createElement(card_1.CardHeader, null,
                    React.createElement("div", { className: "flex items-center gap-4" },
                        React.createElement(avatar_1.Avatar, { className: "h-14 w-14" },
                            React.createElement(avatar_1.AvatarImage, { src: vendor.profilePhoto, alt: vendor.name }),
                            React.createElement(avatar_1.AvatarFallback, { className: "text-lg font-semibold" }, (_a = vendor.name) === null || _a === void 0 ? void 0 : _a.split(" ").map(function (name) { return name[0]; }).join("").slice(0, 2).toUpperCase())),
                        React.createElement("div", { className: "min-w-0 flex-1" },
                            React.createElement("h2", { className: "truncate text-lg font-semibold" }, vendor.name),
                            React.createElement("p", { className: "truncate text-sm text-muted-foreground" }, vendor.companyName)))),
                React.createElement(card_1.CardContent, { className: "space-y-3" },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("span", { className: "text-sm text-muted-foreground" }, "Business Type"),
                        React.createElement("span", { className: "text-sm font-medium" }, vendor.businessType)),
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("span", { className: "text-sm text-muted-foreground" }, "Location"),
                        React.createElement("span", { className: "text-sm font-medium" },
                            vendor.city,
                            ", ",
                            vendor.country)),
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("span", { className: "text-sm text-muted-foreground" }, "Status"),
                        React.createElement(badge_1.Badge, { variant: vendor.status === "ACTIVE"
                                ? "default"
                                : "secondary" }, vendor.status))),
                React.createElement(card_1.CardFooter, null,
                    React.createElement(link_1["default"], { href: "/marketplace/vendors/" + vendor.id, className: button_1.buttonVariants({
                            className: "w-full"
                        }) }, "View Details"))));
        }))));
};
exports["default"] = VendorList;
