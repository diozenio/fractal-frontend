"use client";

import { useLogin } from "@/hooks/auth/useLogin";
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { handleSubmit, isPending, errors, message, success } = useLogin();

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
          <CardTitle>Entrar na sua conta</CardTitle>
          <CardDescription>
            Insira seu e-mail abaixo para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <FormInput
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  required
                  errors={errors?.email}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <FormInput
                  id="password"
                  name="password"
                  type="password"
                  required
                  errors={errors?.password}
                />
              </div>
              <Button type="submit" className="w-full" loading={isPending}>
                Entrar
              </Button>
            </div>
          </form>
          <form action={authenticateWithGoogle}>
            <Button
              variant="outline"
              className="w-full mt-3"
              type="submit"
              disabled={isPending}
            >
              Entrar com o Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Ainda não tem uma conta?{" "}
            <a href="/auth/signup" className="underline underline-offset-4">
              Cadastre-se
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
