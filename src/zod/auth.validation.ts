
import { z } from "zod";

// Existing login validation — unchanged
export const loginZodSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export type ILoginPayload = z.infer<typeof loginZodSchema>;

// Common fields for registration
const registerBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  email: z.email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
});

// Customer registration
const registerCustomerSchema = registerBaseSchema.extend({
  role: z.literal("CUSTOMER"),
});

// Vendor registration
const registerVendorSchema = registerBaseSchema.extend({
  role: z.literal("VENDOR"),

  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters"),

  tradeLicenseNumber: z
    .string()
    .trim()
    .min(1, "Trade license number is required"),

  nidNumber: z
    .string()
    .trim()
    .min(1, "NID number is required"),
});

// Customer + Vendor registration validation
export const registerZodSchema = z
  .discriminatedUnion("role", [
    registerCustomerSchema,
    registerVendorSchema,
  ])
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type IRegisterPayload = z.infer<typeof registerZodSchema>;
