import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "session_token";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: "/",
};

export const sessionCookieStore = {
  /**
   * Sets the session cookie.
   * @param token The JWT token to be stored.
   */
  async set(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);
  },

  /**
   * Retrieves the session cookie value.
   * @returns The token, or `null` if the cookie does not exist.
   */
  async get() {
    const cookieStore = await cookies();
    return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  },

  /**
   * Deletes the session cookie to perform logout.
   */
  async clear() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
  },
};
