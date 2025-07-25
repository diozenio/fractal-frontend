"use client";

import { useBreadcrumbStore } from "@/store/breadcrumb-store";
import { useTaskStore } from "@/store/task-store";
import {
  TaskTitle,
  TaskDetails,
  TaskDescription,
  TaskSubtasks,
} from "@/ui/components/tasks/task-details";
import { useEffect, use } from "react";

export default function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { currentTask: task, fetchTaskById, isLoading } = useTaskStore();

  useEffect(() => {
    fetchTaskById(id);
  }, [fetchTaskById, id]);

  const setItems = useBreadcrumbStore((s) => s.setItems);

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Tarefas" },
      { label: task?.title || "Tarefa Detalhada" },
    ]);
  }, [setItems, task?.title]);

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col p-4 overflow-y-auto">
      <div className="w-full max-w-2xl mx-auto mt-12">
        <TaskTitle
          isLoading={isLoading}
          initialTitle={task?.title || "Tarefa Detalhada"}
        />
        <TaskDetails isLoading={isLoading} task={task} />
        <TaskDescription
          isLoading={isLoading}
          description={task?.description}
        />
        <TaskSubtasks
          isLoading={isLoading}
          subtasks={task?.subtasks}
          parentId={task?.id}
          title={task?.title}
        />
      </div>
    </div>
  );
}
