import {
  LoginResponse,
  LogoutResponse,
  SignUpResponse,
  User,
} from "@/core/domain/models/auth";
import AuthAdapter from "@/core/interfaces/adapters/AuthAdapter";
import { generateToken } from "@/lib/jwt";

const MOCKED_USER = {
  id: "cmbsdwuji00004ghv1mbx05mk",
  name: "Nome do Usuário",
  email: "usuario@email.com",
  password: "senha123",
};

export default class AuthMock extends AuthAdapter {
  constructor() {
    super();
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    if (!email || !password) {
      return Promise.resolve({
        statusCode: 400,
        message: "Email and password are required",
        success: false,
      });
    }

    if (email !== MOCKED_USER.email || password !== MOCKED_USER.password) {
      return Promise.resolve({
        statusCode: 401,
        message: "Authentication failed. Please verify your credentials.",
        success: false,
      });
    }

    return Promise.resolve({
      statusCode: 200,
      message: "Login successful",
      success: true,
      data: {
        token: generateToken({
          payload: {
            sub: MOCKED_USER.id,
            email: MOCKED_USER.email,
          },
          secret: process.env.JWT_SECRET || "default_secret",
          expiresIn: "30d",
        }),
        user: {
          id: MOCKED_USER.id,
          name: MOCKED_USER.name,
          email: MOCKED_USER.email,
        },
      },
    });
  }

  async signUpWithCredentials(
    email: string,
    password: string,
    name: string
  ): Promise<SignUpResponse> {
    if (email === MOCKED_USER.email) {
      return Promise.resolve({
        statusCode: 400,
        message: "User already exists",
        success: false,
      });
    }

    return Promise.resolve({
      statusCode: 201,
      message: "User created successfully",
      success: true,
      data: {
        token: generateToken({
          payload: {
            sub: MOCKED_USER.id,
            email,
          },
          secret: process.env.JWT_SECRET || "default_secret",
          expiresIn: "30d",
        }),
        user: {
          id: MOCKED_USER.id,
          name,
          email,
        },
      },
    });
  }

  async getUserSession(): Promise<User> {
    return Promise.resolve({
      id: MOCKED_USER.id,
      name: MOCKED_USER.name,
      email: MOCKED_USER.email,
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
