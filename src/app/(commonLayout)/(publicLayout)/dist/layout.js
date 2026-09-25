"use strict";
exports.__esModule = true;
var Navbar_1 = require("../../components/layout/Navbar");
function PublicLayout(_a) {
    var children = _a.children;
    return (React.createElement(React.Fragment, null,
        React.createElement(Navbar_1["default"], null),
        React.createElement("main", { className: "pt-24" }, children)));
}
exports["default"] = PublicLayout;
