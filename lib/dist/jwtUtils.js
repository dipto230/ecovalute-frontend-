"use strict";
exports.__esModule = true;
exports.jwtUtils = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var jsonwebtoken_1 = require("jsonwebtoken");
var verifyToken = function (token, secret) {
    try {
        var decoded = jsonwebtoken_1["default"].verify(token, secret);
        return {
            success: true,
            data: decoded
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
            error: error
        };
    }
};
var decodedToken = function (token) {
    var decoded = jsonwebtoken_1["default"].decode(token);
    return decoded;
};
exports.jwtUtils = {
    verifyToken: verifyToken,
    decodedToken: decodedToken
};
