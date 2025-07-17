import { type FormEvent, useState, useTransition } from "react";

export interface FormState<T> {
  success: boolean;
  message: string | null;
  errors: Record<string, string[] | undefined> | null;
  data?: T;
}

export function useFormState<T = unknown>(
  action: (data: FormData) => Promise<FormState<T>>,
  onSuccess?: (data: FormState<T>) => void,
  initialState?: FormState<T>
) {
  const [isPending, startTransition] = useTransition();

  const [formState, setFormState] = useState<FormState<T>>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    }
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const state = await action(data);
      setFormState(state);

      if (state.success && onSuccess) {
        onSuccess(state);
      }
    });
  }

  return [formState, handleSubmit, isPending] as const;
}
