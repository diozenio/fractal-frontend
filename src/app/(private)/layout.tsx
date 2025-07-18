import { PropsWithChildren } from "react";

import { AppLoadingProvider, AuthProvider } from "@/providers";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <AppLoadingProvider>{children}</AppLoadingProvider>
    </AuthProvider>
  );
}
