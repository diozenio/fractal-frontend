"use client";

import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";

import { Task } from "@/core/domain/models/task";
import { useTasksList } from "@/hooks/tasks/useTasksList";
import * as Kanban from "@/ui/primitives/kanban";
import { Skeleton } from "@/ui/primitives/skeleton";

import { TaskStatus } from "./task";
import TasksColumn from "./tasks-column";
import { StatusIcons } from "./status-icons";

const COLUMN_TITLES: Record<TaskStatus, string> = {
  PLANNED: "Planejado",
  TO_DO: "A Fazer",
  IN_PROGRESS: "Em Progresso",
  DONE: "Feito",
};

export default function TasksBoard() {
  const { tasks, isLoading } = useTasksList();
  const [columns, setColumns] = useState<Record<TaskStatus, Task[]>>({
    PLANNED: [],
    TO_DO: [],
    IN_PROGRESS: [],
    DONE: [],
  });

  useEffect(() => {
    if (!isLoading) {
      const newColumns: Record<TaskStatus, Task[]> = {
        PLANNED: [],
        TO_DO: [],
        IN_PROGRESS: [],
        DONE: [],
      };

      tasks.forEach((task) => {
        if (task.status && task.status in newColumns) {
          newColumns[task.status].push(task);
        }
      });
      setColumns(newColumns);
    }
  }, [tasks, isLoading]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  if (isLoading) {
    return (
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="w-full grid grid-flow-col auto-cols-[minmax(300px,_1fr)] h-full p-4 gap-4">
          {Object.keys(columns).map((key) => (
            <div key={key} className="space-y-3">
              <Skeleton className="h-5 w-2/5" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-x-auto pb-4">
      <Kanban.Root
        value={columns}
        onValueChange={setColumns}
        getItemValue={(item) => item.id}
        sensors={sensors}
      >
        <Kanban.Board className="w-full grid grid-flow-col auto-cols-[minmax(300px,_1fr)] h-full p-4 gap-4">
          {Object.entries(columns).map(([columnValue, tasksInColumn]) => (
            <TasksColumn
              key={columnValue}
              title={COLUMN_TITLES[columnValue as TaskStatus]}
              value={columnValue}
              tasks={tasksInColumn}
              count={tasksInColumn.length}
              icon={StatusIcons[columnValue as TaskStatus]}
            />
          ))}
        </Kanban.Board>
      </Kanban.Root>
    </div>
  );
}
