"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { clearCookiesAction } from "@/app/(private)/actions";
import { User } from "@/core/domain/models/auth";
import { useLogout } from "@/hooks/auth/useLogout";
import { useUserSession } from "@/hooks/auth/useUserSession";
import { useAppLoadingStore } from "@/store/appLoading";
import { REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE } from "@/constants/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user: User | null;
  logout: () => void;
  // Add any other authentication-related methods or properties here
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const { user, fetchUserSession, isLoading, error } = useUserSession();
  const { logout } = useLogout();
  const { setLoadingState } = useAppLoadingStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchUserSession();
  }, [fetchUserSession]);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  useEffect(() => {
    setLoadingState("auth", isLoading);
  }, [isLoading, setLoadingState]);

  useEffect(() => {
    if (error) {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
      clearCookiesAction().then(() => {
        router.push(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE);
      });
    }
  }, [error, router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthenticating: isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
