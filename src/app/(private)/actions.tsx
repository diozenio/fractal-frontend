"use server";

import { sessionCookieStore } from "@/lib/cookies/session";

export async function clearCookiesAction() {
  try {
    await sessionCookieStore.clear();

    return {
      success: true,
      message: "Cookies limpos com sucesso.",
      errors: null,
    };
  } catch (error) {
    console.error("Erro ao limpar os cookies:", error);

    return {
      success: false,
      message: "Ocorreu um erro inesperado.",
      errors: null,
    };
  }
}
