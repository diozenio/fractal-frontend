"use client";

import { useQuery } from "@tanstack/react-query";
import { services } from "@/container";
import { TaskListResponse } from "@/core/domain/models/task";

export function useTasksList() {
  const {
    data: tasksResponse,
    isLoading,
    isError,
    error,
  } = useQuery<TaskListResponse>({
    queryKey: ["tasks"],
    queryFn: () => services.TaskService.getTasks(),
  });

  return {
    tasks: tasksResponse?.data ?? [],
    isLoading,
    isError,
    error,
  };
}
