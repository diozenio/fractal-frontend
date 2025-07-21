import AuthService from "@/core/services/AuthService";
import AuthAPI from "@/infra/auth/AuthAPI";
import AuthMock from "@/infra/auth/AuthMock";

const isProduction = process.env.NODE_ENV === "production";

const AuthServiceInstance = isProduction
  ? new AuthService(new AuthAPI())
  : new AuthService(new AuthMock());

export const services = {
  AuthService: AuthServiceInstance,
};
