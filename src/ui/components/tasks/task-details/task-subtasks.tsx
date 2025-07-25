"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/ui/primitives/tooltip";
import { Button } from "@/ui/primitives/button";
import { TaskProps, StatusIcons, AddTaskDialog } from "@/ui/components/tasks";
import { ListTodo, Plus, Sparkles, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTaskStore } from "@/store/task-store";

interface TaskSubtasksProps {
  parentId?: string;
  subtasks: TaskProps["subtasks"];
  isLoading?: boolean;
}

export function TaskSubtasks({
  subtasks,
  parentId,
  isLoading,
}: TaskSubtasksProps) {
  const router = useRouter();
  const { deleteSubtask } = useTaskStore();

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="mt-6 group/subtasks space-y-6">
      <div className="flex items-center gap-2 ">
        <ListTodo size={16} />
        Subtarefas
        <AddTaskDialog parentId={parentId}>
          <Button
            variant="ghost"
            size={"icon"}
            className="size-6 group-hover/subtasks:flex group-hover/subtasks:opacity-100 transition-opacity duration-300 ease-in-out opacity-0"
          >
            <Plus size={16} />
          </Button>
        </AddTaskDialog>
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
            className="flex group/subtask items-center gap-2 flex-row bg-muted/15 p-3 mb-2  border border-card-foreground/5 rounded-lg hover:bg-muted/50 transition-colors duration-300 hover:cursor-pointer select-none"
          >
            {StatusIcons[subtask.status]}
            <span className="text-sm font-medium truncate">
              {subtask.title}
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                if (subtask.id && parentId) {
                  deleteSubtask(parentId, subtask.id);
                }
              }}
              className="opacity-0 ml-auto group-hover/subtask:opacity-100 transition-opacity duration-300"
            >
              <Trash size={14} />
            </Button>
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
