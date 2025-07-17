import {
  LoginResponse,
  LogoutResponse,
  SignUpResponse,
  User,
} from '@/core/domain/models/auth';
import AuthAdapter from '@/core/interfaces/adapters/AuthAdapter';

export default abstract class AuthUseCase {
  constructor(protected readonly adapter: AuthAdapter) {}

  abstract login(email: string, password: string): Promise<LoginResponse>;

  abstract signUpWithCredentials(
    email: string,
    password: string,
    name: string
  ): Promise<SignUpResponse>;

  abstract getUserSession(): Promise<User>;

  abstract logout(): Promise<LogoutResponse>;
}
