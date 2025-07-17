import { useRouter } from "next/navigation";

import { loginAction } from "@/app/(public)/auth/login/actions";
import { AuthPayload } from "@/core/domain/models/auth";

import { useFormState } from "@/hooks/useFormState";

export function useLogin() {
  const router = useRouter();

  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState<AuthPayload>(loginAction, () => {
      router.push("/");
    });

  return {
    success,
    message,
    errors,
    handleSubmit,
    isPending,
  };
}
