"use server";

import { redirect } from "next/navigation";

export async function authenticateWithGoogle() {
  const googleAuthURL = new URL(
    "o/oauth2/v2/auth",
    "https://accounts.google.com"
  );

  googleAuthURL.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
  googleAuthURL.searchParams.set(
    "redirect_uri",
    process.env.GOOGLE_CLIENT_REDIRECT_URI!
  );
  googleAuthURL.searchParams.set("response_type", "code");
  googleAuthURL.searchParams.set("scope", "email profile");
  googleAuthURL.searchParams.set("access_type", "offline");

  redirect(googleAuthURL.toString());
}
