import { ApiResponse } from "@/core/domain/types/ApiResponse";

export type TaskStatus = "PLANNED" | "TO_DO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  dueDate?: string | null;
  priority?: TaskPriority;
  status: TaskStatus;
  parentId?: string | null;
  subtasks?: Task[] | null;
  createdAt?: string;
  updatedAt?: string;
};

export type TaskListResponse = ApiResponse<Task[]>;

export type TaskResponse = ApiResponse<Task>;

export type TaskDTO = Omit<Task, "id" | "createdAt" | "updatedAt">;
