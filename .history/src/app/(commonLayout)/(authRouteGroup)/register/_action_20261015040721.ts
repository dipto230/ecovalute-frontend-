
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IRegisterPayload, registerZodSchema } from "@/src/zod/auth.validation";

interface RegisterActionResponse {
  success: boolean;
  message: string;
}

export const registerAction = async (
  payload: IRegisterPayload,
): Promise<RegisterActionResponse> => {
  const parsedPayload = registerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message:
        parsedPayload.error.issues[0]?.message ?? "Invalid registration details.",
    };
  }

  try {
    const response = await httpClient.post<unknown>(
      "/auth/register",
      parsedPayload.data,
    );

    return {
      success: true,
      message:
        response.message ??
        "Registration successful. Please check your email to verify your account.",
    };
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: {
          message?: string;
        };
      };
      message?: string;
    };

    return {
      success: false,
      message:
        err.response?.data?.message ??
        err.message ??
        "Registration failed. Please try again.",
    };
  }
};
