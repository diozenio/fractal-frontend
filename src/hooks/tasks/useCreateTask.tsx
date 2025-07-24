"use client";

import { services } from "@/container";
import { TaskDTO, TaskResponse } from "@/core/domain/models/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTask() {
  const queryClient = useQueryClient();

  const {
    mutate: createTask,
    data: taskResponse,
    isError,
    error,
    isPending,
  } = useMutation<TaskResponse, Error, TaskDTO>({
    mutationKey: ["createTask"],
    mutationFn: (task) => services.TaskService.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    createTask,
    task: taskResponse?.data ?? null,
    isError,
    error,
    isLoading: isPending,
  };
}
