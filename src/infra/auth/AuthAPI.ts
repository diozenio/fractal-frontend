import { LogoutResponse, User } from "@/core/domain/models/auth";
import AuthAdapter from "@/core/interfaces/adapters/AuthAdapter";
import { client } from "@/lib/api/client";

export default class AuthAPI extends AuthAdapter {
  constructor() {
    super();
  }

  async login(email: string, password: string) {
    const { data } = await client.post("/auth/login", {
      email,
      password,
    });

    return data;
  }

  async signUpWithCredentials(email: string, password: string, name: string) {
    const { data } = await client.post("/auth/signup", {
      email,
      password,
      name,
    });

    return data;
  }

  async getUserSession(): Promise<User> {
    const { data } = await client.get("/auth/me");

    return data;
  }

  async logout(): Promise<LogoutResponse> {
    const { status } = await client.post("/auth/logout");

    if (status === 204) {
      return {
        success: true,
        statusCode: 204,
        message: "Usuário desconectado com sucesso",
      };
    }

    return {
      success: false,
      statusCode: status,
      message: "Erro ao desconectar usuário",
    };
  }
}
