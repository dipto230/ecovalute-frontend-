"use strict";
exports.__esModule = true;
exports.getIconComponent = void 0;
var Icons = require("lucide-react");
exports.getIconComponent = function (iconName) {
    var IconComponent = Icons[iconName];
    if (!IconComponent) {
        return Icons.HelpCircle;
    }
    return IconComponent;
};
