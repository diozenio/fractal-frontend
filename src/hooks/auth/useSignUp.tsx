import { useRouter } from "next/navigation";

import { signupAction } from "@/app/(public)/auth/signup/actions";
import { AuthPayload } from "@/core/domain/models/auth";

import { useFormState } from "@/hooks/useFormState";

export function useSignUp() {
  const router = useRouter();

  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState<AuthPayload>(signupAction, () => {
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
