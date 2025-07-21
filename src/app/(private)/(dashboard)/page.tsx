"use client";
import { useAuth } from "@/providers";
import { Button } from "@/ui/primitives/button";

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <div className="flex h-full flex-col gap-4 items-center justify-center">
      Olá, {user?.name || "Visitante"}!
      <Button onClick={logout}>Desconectar</Button>
    </div>
  );
}
