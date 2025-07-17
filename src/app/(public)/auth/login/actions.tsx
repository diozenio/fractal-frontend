"use server";

import { AxiosError } from "axios";
import { ZodError } from "zod";

import { services } from "@/container";
import { AuthPayload } from "@/core/domain/models/auth";
import { FormState } from "@/hooks/useFormState";
import { sessionCookieStore } from "@/lib/cookies/session";
import { validateLoginCredentials } from "@/utils/auth/validate";

export async function loginAction(
  formData: FormData
): Promise<FormState<AuthPayload>> {
  try {
    const { email, password } = validateLoginCredentials(formData);

    const response = await services.AuthService.login(email, password);
    const data = response.data;
    const token = data?.token;

    if (!response.success) {
      return {
        success: false,
        message: response.message,
        errors: null,
      };
    }

    if (!token) {
      return {
        success: false,
        message: "Falha no login. Token não recebido.",
        errors: null,
      };
    }

    await sessionCookieStore.set(token);

    return {
      success: true,
      message: "Login realizado com sucesso.",
      errors: null,
      data,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: null,
        errors: error.flatten().fieldErrors,
      };
    }

    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message:
          error.response.data.message || "Ocorreu um erro durante o login.",
        errors: null,
      };
    }

    console.error("Erro inesperado durante o login:", error);

    return {
      success: false,
      message: "Ocorreu um erro inesperado.",
      errors: null,
    };
  }
}
