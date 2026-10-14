"use strict";
exports.__esModule = true;
exports.registerZodSchema = exports.loginZodSchema = void 0;
var zod_1 = require("zod");
// Existing login validation — unchanged
exports.loginZodSchema = zod_1.z.object({
    email: zod_1.z.email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
});
// Common fields for registration
var registerBaseSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters"),
    email: zod_1.z.email("Please enter a valid email address"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters"),
    confirmPassword: zod_1.z
        .string()
        .min(1, "Please confirm your password")
});
// Customer registration
var registerCustomerSchema = registerBaseSchema.extend({
    role: zod_1.z.literal("CUSTOMER")
});
// Vendor registration
var registerVendorSchema = registerBaseSchema.extend({
    role: zod_1.z.literal("VENDOR"),
    companyName: zod_1.z
        .string()
        .trim()
        .min(2, "Company name must be at least 2 characters"),
    tradeLicenseNumber: zod_1.z
        .string()
        .trim()
        .min(1, "Trade license number is required"),
    nidNumber: zod_1.z
        .string()
        .trim()
        .min(1, "NID number is required")
});
// Customer + Vendor registration validation
exports.registerZodSchema = zod_1.z
    .discriminatedUnion("role", [
    registerCustomerSchema,
    registerVendorSchema,
])
    .refine(function (data) { return data.password === data.confirmPassword; }, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});
