"use client";

import {
  Calendar,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  Flag,
  LoaderCircle,
} from "lucide-react";

import { useRouter } from "next/navigation";

import * as Kanban from "@/ui/primitives/kanban";

enum PriorityLabels {
  "LOW" = "Baixa",
  "MEDIUM" = "Média",
  "HIGH" = "Alta",
  "URGENT" = "Urgente",
}

export const StatusIcons = {
  PLANNED: <CircleDashed size={16} className="text-muted-foreground/50" />,
  TODO: <Circle size={16} />,
  IN_PROGRESS: <CircleDot size={16} className="text-green-500" />,
  DONE: (
    <CircleCheck
      size={20}
      className="text-background"
      fill="var(--color-blue-500)"
    />
  ),
} as const;

export type TaskStatus = "PLANNED" | "TODO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface TaskProps
  extends Omit<React.ComponentProps<typeof Kanban.Item>, "value"> {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: TaskPriority;
  status: TaskStatus;
  subtasks?: TaskProps[];
}

export default function Task({
  id,
  title,
  description,
  dueDate,
  priority,
  status = "PLANNED",
  subtasks,
  ...props
}: TaskProps) {
  const router = useRouter();
  return (
    <Kanban.Item key={id} value={id} asChild {...props}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/tasks/${id}`);
        }}
        className="w-full px-3 py-4 bg-muted/25 border border-card-foreground/5 rounded-lg flex flex-col gap-2.5 hover:bg-muted/50 transition-colors duration-300 hover:cursor-pointer select-none min-h-16 justify-center"
      >
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
            {subtasks && (
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
      </div>
    </Kanban.Item>
  );
}
