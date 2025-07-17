import AuthService from "@/core/services/AuthService";
import AuthAPI from "@/infra/auth/AuthAPI";
import AuthMock from "@/infra/auth/AuthMock";

const AuthServiceInstance = new AuthService(new AuthMock());

export const services = {
  AuthService: AuthServiceInstance,
};
