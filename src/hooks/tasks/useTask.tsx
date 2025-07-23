"use client";

import { useQuery } from "@tanstack/react-query";
import { services } from "@/container";
import { TaskResponse } from "@/core/domain/models/task";

export function useTask(id: string) {
  const {
    data: taskResponse,
    isLoading,
    isError,
    error,
  } = useQuery<TaskResponse>({
    queryKey: ["task", id],
    queryFn: () => services.TaskService.getTaskById(id),
    enabled: !!id,
  });

  return {
    task: taskResponse?.data ?? null,
    isLoading,
    isError,
    error,
  };
}
