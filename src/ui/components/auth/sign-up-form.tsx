"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/primitives/card";
import { Input } from "@/ui/primitives/input";
import { Label } from "@/ui/primitives/label";
import { signIn } from "next-auth/react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleConnectGoogle = async () => {
    await signIn("google", { callbackUrl: "/auth/signup" })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para se cadastrar na plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  required
                  name="name"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  required
                  name="email"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required name="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirme a senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  name="confirmPassword"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Criar conta
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={handleConnectGoogle}
                >
                  Entrar com Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Já tem uma conta?{" "}
              <a href="/auth/login" className="underline underline-offset-4">
                Fazer login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
