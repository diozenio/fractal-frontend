"use client";

import { useSignUp } from "@/hooks/auth/useSignUp";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/ui/primitives/alert";
import { Button } from "@/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/primitives/card";
import { Label } from "@/ui/primitives/label";
import { CircleX } from "lucide-react";
import { FormInput } from "../form/FormInput";
import { authenticateWithGoogle } from "@/app/(public)/auth/actions";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { handleSubmit, isPending, errors, message, success } = useSignUp();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {!success && message && (
        <Alert variant="destructive">
          <CircleX />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para se cadastrar na plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <FormInput
                  id="name"
                  name="name"
                  placeholder="Seu nome"
                  required
                  errors={errors?.name}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">E-mail</Label>
                <FormInput
                  id="email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  required
                  name="email"
                  errors={errors?.email}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Senha</Label>
                <FormInput
                  id="password"
                  type="password"
                  required
                  name="password"
                  errors={errors?.password}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirm-password">Confirme a senha</Label>
                <FormInput
                  id="confirm-password"
                  type="password"
                  required
                  name="confirm-password"
                  errors={errors?.["confirm-password"]}
                />
              </div>
              <Button type="submit" className="w-full" loading={isPending}>
                Criar conta
              </Button>
            </div>
          </form>
          <form action={authenticateWithGoogle}>
            <Button
              disabled={isPending}
              variant="outline"
              type="submit"
              className="w-full mt-3"
            >
              Entrar com Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <a href="/auth/login" className="underline underline-offset-4">
              Fazer login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
