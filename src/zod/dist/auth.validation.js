"use strict";
exports.__esModule = true;
exports.loginZodSchema = void 0;
var zod_1 = require("zod");
exports.loginZodSchema = zod_1.z.object({
    email: zod_1.z.email("Invalid email address"),
    password: zod_1.z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number")
    // .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
});
