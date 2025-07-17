import { z } from "zod";

export function validateLoginCredentials(formData: FormData) {
  const loginSchema = z.object({
    email: z.email("Endereço de e-mail inválido."),
    password: z.string().min(1, "O campo de senha é obrigatório."),
  });

  const data = loginSchema.parse(Object.fromEntries(formData));

  return data;
}

export function validateSignUpCredentials(formData: FormData) {
  const MIN_LENGTH = 8;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasNumber = /\d/;
  const hasSpecialChar = /[^\w\s]/;

  const signUpSchema = z
    .object({
      name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
      email: z.email("Endereço de e-mail inválido."),
      password: z
        .string()
        .min(MIN_LENGTH, `A senha deve ter no mínimo ${MIN_LENGTH} caracteres.`)
        .refine((val) => hasUppercase.test(val), {
          message: "A senha deve conter pelo menos uma letra maiúscula.",
        })
        .refine((val) => hasLowercase.test(val), {
          message: "A senha deve conter pelo menos uma letra minúscula.",
        })
        .refine((val) => hasNumber.test(val), {
          message: "A senha deve conter pelo menos um número.",
        })
        .refine((val) => hasSpecialChar.test(val), {
          message:
            "A senha deve conter pelo menos um caractere especial (@$!%*?#&).",
        }),
      "confirm-password": z.string(),
    })
    .refine((data) => data.password === data["confirm-password"], {
      message: "As senhas não coincidem.",
      path: ["confirm-password"],
    });

  return signUpSchema.parse(Object.fromEntries(formData));
}
