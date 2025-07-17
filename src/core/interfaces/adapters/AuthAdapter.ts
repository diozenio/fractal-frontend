import {
  LoginResponse,
  LogoutResponse,
  SignUpResponse,
  User,
} from '@/core/domain/models/auth';

export default abstract class AuthAdapter {
  abstract login(email: string, password: string): Promise<LoginResponse>;

  abstract signUpWithCredentials(
    email: string,
    password: string,
    name: string
  ): Promise<SignUpResponse>;

  abstract getUserSession(): Promise<User>;

  abstract logout(): Promise<LogoutResponse>;
}
