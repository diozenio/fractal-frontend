import { TaskListResponse, TaskResponse } from "@/core/domain/models/task";

export default abstract class TaskAdapter {
  abstract getTasks(): Promise<TaskListResponse>;
  abstract getTaskById(id: string): Promise<TaskResponse>;
}
