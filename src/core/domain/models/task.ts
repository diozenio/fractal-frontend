import { ApiResponse } from "@/core/domain/types/ApiResponse";
import { TaskProps } from "@/ui/components/tasks";

export type Task = TaskProps;

export type TaskListResponse = ApiResponse<Task[]>;

export type TaskResponse = ApiResponse<Task>;
