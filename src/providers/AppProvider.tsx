"use client";

import { PropsWithChildren } from "react";

import { QueryProvider } from "./QueryProvider";
import { Toaster } from "@/ui/primitives/sonner";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      {children}
      <Toaster />
    </QueryProvider>
  );
}
