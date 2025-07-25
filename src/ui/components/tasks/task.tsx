"use client";

import { Calendar, Flag, LoaderCircle, Trash } from "lucide-react";

import { useRouter } from "next/navigation";

import * as Kanban from "@/ui/primitives/kanban";
import { StatusIcons } from "./status-icons";
import { Task as TaskModel } from "@/core/domain/models/task";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/ui/primitives/context-menu";
import { useTaskStore } from "@/store/task-store";

enum PriorityLabels {
  "LOW" = "Baixa",
  "MEDIUM" = "Média",
  "HIGH" = "Alta",
  "URGENT" = "Urgente",
}

export type TaskProps = TaskModel &
  Omit<React.ComponentProps<typeof Kanban.Item>, "value">;

export default function Task({
  id,
  title,
  description,
  dueDate,
  priority,
  status = "PLANNED",
  subtasks,
}: TaskProps) {
  const router = useRouter();

  const { deleteTask } = useTaskStore();

  return (
    <Kanban.Item key={id} value={id} asChild asHandle>
      <div
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/tasks/${id}`);
        }}
        className="w-full bg-muted/25 border border-card-foreground/5 rounded-lg  hover:bg-muted/50 transition-colors duration-300 hover:cursor-pointer select-none min-h-16"
      >
        <ContextMenu>
          <ContextMenuTrigger className="px-3 py-4 flex flex-col gap-2.5 justify-center">
            <div className="flex flex-row items-center gap-2">
              {StatusIcons[status]}
              <span className="text-sm font-medium truncate">{title}</span>
            </div>
            {description && (
              <span className="text-sm text-muted-foreground/80 truncate">
                {description}
              </span>
            )}
            {(dueDate || subtasks || priority) && (
              <div className="flex flex-row items-center gap-2">
                {dueDate && (
                  <div className="h-6 px-1.5 aspect-square flex items-center gap-1.5 bg-muted/25 rounded border border-muted/50 text-muted-foreground">
                    <Calendar size={12} />
                    <span className="text-xs">
                      {new Date(dueDate).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                  </div>
                )}
                {priority && (
                  <div className="h-6 px-1.5 aspect-square flex items-center gap-1 bg-muted/25 rounded border border-muted/50 text-muted-foreground">
                    <Flag size={14} />
                    <span className="text-xs">{PriorityLabels[priority]}</span>
                  </div>
                )}
                {subtasks && subtasks.length > 0 && (
                  <div className="h-6 px-1.5 aspect-square flex items-center gap-1 bg-muted/25 rounded border border-muted/50 text-muted-foreground">
                    <LoaderCircle size={14} />
                    <span className="text-xs">
                      {
                        subtasks.filter((subtask) => subtask.status === "DONE")
                          .length
                      }
                      /{subtasks.length}
                    </span>
                  </div>
                )}
              </div>
            )}
          </ContextMenuTrigger>
          <ContextMenuContent className="w-fit">
            <ContextMenuItem
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(id);
              }}
            >
              <Trash className="ml-auto" />
              Deletar tarefa
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </Kanban.Item>
  );
}
