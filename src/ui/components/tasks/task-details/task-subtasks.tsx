"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/ui/primitives/tooltip";
import { Button } from "@/ui/primitives/button";
import { StatusIcons, TaskProps } from "@/ui/components/tasks";
import { ListTodo, Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface TaskSubtasksProps {
  subtasks: TaskProps["subtasks"];
}

export function TaskSubtasks({ subtasks }: TaskSubtasksProps) {
  const router = useRouter();

  return (
    <div className="mt-6 group/subtasks space-y-6">
      <div className="flex items-center gap-2 ">
        <ListTodo size={16} />
        Subtarefas
        <Button
          variant="ghost"
          size={"icon"}
          className="size-6 group-hover/subtasks:flex group-hover/subtasks:opacity-100 transition-opacity duration-300 ease-in-out opacity-0"
        >
          <Plus size={16} />
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="icon" className="ml-auto">
              <Sparkles />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Gerar subtarefas automaticamente</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div>
        {subtasks?.map((subtask) => (
          <div
            key={subtask.id}
            onClick={() => {
              router.push(`/tasks/${subtask.id}`);
            }}
            className="flex items-center gap-2 flex-row bg-muted/15 p-3 mb-2  border border-card-foreground/5 rounded-lg hover:bg-muted/50 transition-colors duration-300 hover:cursor-pointer select-none"
          >
            {StatusIcons[subtask.status]}
            <span className="text-sm font-medium">{subtask.title}</span>
          </div>
        ))}
        {!subtasks?.length && (
          <div className="text-muted-foreground text-center">
            Nenhuma subtask encontrada.
          </div>
        )}
      </div>
    </div>
  );
}
