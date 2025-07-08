import dayjs, { Dayjs } from "dayjs";
import jwt, { SignOptions } from "jsonwebtoken";

export type Payload = {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
};

interface IGenerateTokenOptions {
  payload: Payload;
  secret: string;
  expiresIn?: SignOptions["expiresIn"];
}

export function generateToken({
  payload,
  secret,
  expiresIn = "30d",
}: IGenerateTokenOptions): string {
  if (!secret) {
    throw new Error("JWT secret must be provided to generate token.");
  }
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken<T extends Payload>(
  token: string,
  secret: string
): T {
  if (!secret) {
    throw new Error("JWT secret must be provided to verify token.");
  }
  try {
    return jwt.verify(token, secret) as T;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired.");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token.");
    }
    throw error;
  }
}

export function decodeToken<T extends Payload>(token: string): T | null {
  try {
    return jwt.decode(token) as T;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export function getTokenExpiration(token: string): Dayjs | null {
  const decoded = decodeToken(token);
  if (decoded && typeof decoded.exp === "number") {
    return dayjs.unix(decoded.exp);
  }
  return null;
}

export function isTokenExpired(token: string): boolean {
  const expirationDate = getTokenExpiration(token);

  if (!expirationDate) {
    return true;
  }

  const currentTime = dayjs();

  return (
    expirationDate.isBefore(currentTime) || expirationDate.isSame(currentTime)
  );
}
