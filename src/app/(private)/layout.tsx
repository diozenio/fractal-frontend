import { PropsWithChildren } from "react";

import { AppLoadingProvider, AuthProvider, SidebarProvider } from "@/providers";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <AppLoadingProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </AppLoadingProvider>
    </AuthProvider>
  );
}
