"use client";
import { TasksColumn } from "@/ui/components/tasks";
import { Button } from "@/ui/primitives/button";
import {
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  ListFilter,
} from "lucide-react";
import { tasks } from "./tasks";

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
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="w-full grid grid-flow-col auto-cols-[minmax(300px,_1fr)] h-full p-4 gap-4">
          <TasksColumn
            icon={
              <CircleDashed size={16} className="text-muted-foreground/50" />
            }
            title="Planejado"
            count={tasks.planned.length}
            tasks={tasks.planned}
          />

          <TasksColumn
            icon={<Circle size={16} />}
            title="A fazer"
            count={tasks.todo.length}
            tasks={tasks.todo}
          />

          <TasksColumn
            icon={<CircleDot size={16} className="text-green-500" />}
            title="Em Progresso"
            count={tasks.inProgress.length}
            tasks={tasks.inProgress}
          />

          <TasksColumn
            icon={
              <CircleCheck
                size={20}
                className="text-background"
                fill="var(--color-blue-500)"
              />
            }
            title="Feito"
            count={tasks.done.length}
            tasks={tasks.done}
          />
        </div>
      </div>
    </div>
  );
}
