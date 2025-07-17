import {
  LoginResponse,
  LogoutResponse,
  SignUpResponse,
  User,
} from "@/core/domain/models/auth";
import AuthAdapter from "@/core/interfaces/adapters/AuthAdapter";
import { client } from "@/lib/api/client";

export default class AuthMock extends AuthAdapter {
  constructor() {
    super();
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    // return Promise.resolve({
    //   statusCode: 401,
    //   message: "Login failed",
    //   success: false,
    // });

    return Promise.resolve({
      statusCode: 200,
      message: "Login successful",
      success: true,
      data: {
        token: "mocked_token",
        user: {
          id: "cmbsdwuji00004ghv1mbx05mk",
          name: "Nome do Usuário",
          email,
        },
      },
    });
  }

  async signUpWithCredentials(
    email: string,
    password: string,
    name: string
  ): Promise<SignUpResponse> {
    // return Promise.resolve({
    //   statusCode: 400,
    //   message: "User already exists",
    //   success: false,
    // });

    return Promise.resolve({
      statusCode: 201,
      message: "User created successfully",
      success: true,
      data: {
        token: "mocked_token",
        user: {
          id: "cmbsdwuji00004ghv1mbx05mk",
          name,
          email,
        },
      },
    });
  }

  async getUserSession(): Promise<User> {
    return Promise.resolve({
      id: "cmbsdwuji00004ghv1mbx05mk",
      name: "Nome do Usuário",
      email: "usuario@email.com",
    });
  }

  async logout(): Promise<LogoutResponse> {
    return Promise.resolve({
      statusCode: 200,
      message: "Logged out successfully",
      success: true,
    });
  }
}
