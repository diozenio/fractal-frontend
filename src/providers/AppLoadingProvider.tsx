"use client";

import { createContext, PropsWithChildren, useContext } from "react";

import { useAppLoadingStore } from "@/store/appLoading";
import { Loader2 } from "lucide-react";

interface AppLoadingContextType {
  isAppLoading: boolean;
}

const AppLoadingContext = createContext<AppLoadingContextType | undefined>(
  undefined
);

export function AppLoadingProvider({ children }: PropsWithChildren) {
  const { isAppLoading } = useAppLoadingStore();

  if (isAppLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AppLoadingContext.Provider value={{ isAppLoading }}>
      {children}
    </AppLoadingContext.Provider>
  );
}

export function useAppLoading() {
  const context = useContext(AppLoadingContext);
  if (!context) {
    throw new Error("useAppLoading must be used within an AppLoadingProvider");
  }
  return context;
}
