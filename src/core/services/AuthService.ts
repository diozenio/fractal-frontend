import AuthUseCase from "@/core/interfaces/usecases/AuthUseCase";

export default class AuthService extends AuthUseCase {
  async login(email: string, password: string) {
    return this.adapter.login(email, password);
  }

  async loginWithGoogle(code: string) {
    return this.adapter.loginWithGoogle(code);
  }

  async signUpWithCredentials(email: string, password: string, name: string) {
    return this.adapter.signUpWithCredentials(email, password, name);
  }

  async getUserSession() {
    return this.adapter.getUserSession();
  }

  async logout() {
    return this.adapter.logout();
  }
}
