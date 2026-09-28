"use client";
"use strict";
exports.__esModule = true;
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var button_1 = require("../../ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var UserDropdown = function (_a) {
    var userInfo = _a.userInfo;
    return (React.createElement(dropdown_menu_1.DropdownMenu, null,
        React.createElement(dropdown_menu_1.DropdownMenuTrigger, { render: React.createElement(button_1.Button, { variant: "outline", size: "icon", className: "rounded-full" }) },
            React.createElement("span", { className: "text-sm font-semibold" }, userInfo.name.charAt(0).toUpperCase())),
        React.createElement(dropdown_menu_1.DropdownMenuContent, { align: "end", className: "w-56" },
            React.createElement(dropdown_menu_1.DropdownMenuGroup, null,
                React.createElement(dropdown_menu_1.DropdownMenuLabel, null,
                    React.createElement("div", { className: "flex flex-col space-y-1" },
                        React.createElement("p", { className: "text-sm font-medium" }, userInfo.name),
                        React.createElement("p", { className: "text-xs text-muted-foreground" }, userInfo.email),
                        React.createElement("p", { className: "text-xs text-primary capitalize" }, userInfo.role
                            .toLowerCase()
                            .replace("_", " "))))),
            React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
            React.createElement(dropdown_menu_1.DropdownMenuItem, { render: React.createElement(link_1["default"], { href: "/my-profile" },
                    React.createElement(lucide_react_1.User, { className: "mr-2 h-4 w-4" }),
                    React.createElement("span", null, "My Profile")) }),
            React.createElement(dropdown_menu_1.DropdownMenuItem, { render: React.createElement(link_1["default"], { href: "/change-password" },
                    React.createElement(lucide_react_1.Key, { className: "mr-2 h-4 w-4" }),
                    React.createElement("span", null, "Change Password")) }),
            React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
            React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "cursor-pointer text-red-600", onClick: function () {
                    // TODO: Implement logout action
                } },
                React.createElement(lucide_react_1.LogOut, { className: "mr-2 h-4 w-4" }),
                React.createElement("span", null, "Logout")))));
};
exports["default"] = UserDropdown;
