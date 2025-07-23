"use client";

import { useBreadcrumbStore } from "@/store/breadcrumb-store";
import { TasksBoard } from "@/ui/components/tasks";
import { AddTaskDialog } from "@/ui/components/tasks";
import { Button } from "@/ui/primitives/button";
import { ListFilter, Plus } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const setItems = useBreadcrumbStore((s) => s.setItems);

  useEffect(() => {
    setItems([{ label: "Dashboard", href: "/" }, { label: "Visão Geral" }]);
  }, [setItems]);

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col">
      <header className="bg-background flex h-fit items-center justify-between gap-4 px-4 py-4">
        <h3 className="font-semibold text-lg">Minhas tarefas</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <ListFilter />
            Filtrar
          </Button>

          <AddTaskDialog>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Nova Tarefa
            </Button>
          </AddTaskDialog>
        </div>
      </header>
      <TasksBoard />
    </div>
  );
}
