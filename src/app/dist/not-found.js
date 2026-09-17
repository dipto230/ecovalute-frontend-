"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
function NotFound() {
    return (React.createElement("div", null,
        React.createElement("h2", null, "Not Found"),
        React.createElement("p", null, "Could not find requested resource"),
        React.createElement(link_1["default"], { href: "/" }, "Return to Home")));
}
exports["default"] = NotFound;
