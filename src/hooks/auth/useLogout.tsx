import { useRouter } from "next/navigation";

import { clearCookiesAction } from "@/app/(private)/actions";

import { services } from "@/container";
import { REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE } from "@/constants/auth";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      const { success: logoutSuccess } = await services.AuthService.logout();

      if (logoutSuccess) {
        const { success: clearCookiesSuccess } = await clearCookiesAction();

        if (clearCookiesSuccess) {
          router.push(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE);
        }
      }
    } catch (error) {
      console.error("Ocorreu um erro inesperado durante o logout:", error);
    }
  };

  return { logout };
}
