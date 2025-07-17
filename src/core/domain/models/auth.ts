import { ApiResponse } from "@/core/domain/types/ApiResponse";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type AuthPayload = {
  token: string;
  user: User;
};

export type LoginResponse = ApiResponse<AuthPayload>;

export type SignUpResponse = ApiResponse<AuthPayload>;

export type LogoutResponse = ApiResponse;
