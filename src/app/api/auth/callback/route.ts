import { services } from "@/container";
import { sessionCookieStore } from "@/lib/cookies/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code missing" },
      { status: 400 }
    );
  }

  const response = await services.AuthService.loginWithGoogle(code);

  if (!response.success) {
    return NextResponse.json(
      { error: response.message || "Google login failed" },
      { status: 401 }
    );
  }

  const data = response.data;
  const token = data?.token;

  if (!token) {
    return NextResponse.json(
      { error: "Token not found in response" },
      { status: 500 }
    );
  }

  await sessionCookieStore.set(token);

  return NextResponse.redirect(new URL("/", request.url));
}
