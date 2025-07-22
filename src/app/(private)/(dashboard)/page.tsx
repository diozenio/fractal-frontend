"use client";

import { TasksBoard } from "@/ui/components/tasks";
import { Button } from "@/ui/primitives/button";
import { ListFilter } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-56px)] flex-col">
      <header className="bg-background flex h-12 items-center justify-between gap-4 border-b px-4">
        <h3 className="text-sm">Minhas tarefas</h3>
        <Button
          size="sm"
          variant="outline"
          className="text-xs px-2 py-1.5 h-fit"
        >
          <ListFilter />
          Filtrar
        </Button>
      </header>
      <TasksBoard />
    </div>
  );
}
