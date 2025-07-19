import {
  LoginResponse,
  LogoutResponse,
  SignUpResponse,
  User,
} from "@/core/domain/models/auth";
import AuthAdapter from "@/core/interfaces/adapters/AuthAdapter";
import { generateToken } from "@/lib/jwt";
import { delay } from "@/utils/delay";

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
        message: "Email e senha são obrigatórios.",
        success: false,
      });
    }

    if (email !== MOCKED_USER.email || password !== MOCKED_USER.password) {
      return Promise.resolve({
        statusCode: 401,
        message: "Falha na autenticação. Verifique suas credenciais.",
        success: false,
      });
    }

    await delay(1000);

    return Promise.resolve({
      statusCode: 200,
      message: "Login realizado com sucesso.",
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

  async loginWithGoogle(code: string): Promise<LoginResponse> {
    if (!code) {
      return Promise.resolve({
        statusCode: 400,
        message: "Código de autorização do Google é obrigatório.",
        success: false,
      });
    }

    await delay(1000);

    return Promise.resolve({
      statusCode: 200,
      message: "Login com Google realizado com sucesso.",
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
        message: "Usuário já cadastrado.",
        success: false,
      });
    }

    await delay(1000);

    return Promise.resolve({
      statusCode: 201,
      message: "Usuário criado com sucesso.",
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
    await delay(1000);

    return Promise.resolve({
      statusCode: 200,
      message: "Logout realizado com sucesso.",
      success: true,
    });
  }
}
