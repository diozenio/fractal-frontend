"use client";

import { useTask } from "@/hooks/tasks/useTask";
import { useBreadcrumbStore } from "@/store/breadcrumb-store";
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
  const { task } = useTask(id);

  const setItems = useBreadcrumbStore((s) => s.setItems);

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Tarefas" },
      { label: task?.title || "Tarefa Detalhada" },
    ]);
  }, [setItems, task?.title]);

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col p-4">
      <div className="w-full max-w-2xl mx-auto mt-12">
        <TaskTitle initialTitle={task?.title || "Tarefa Detalhada"} />
        <TaskDetails task={task} />
        <TaskDescription description={task?.description} />
        <TaskSubtasks subtasks={task?.subtasks} />
      </div>
    </div>
  );
}
