import { TaskListResponse, TaskResponse } from "@/core/domain/models/task";
import TaskAdapter from "../adapters/TaskAdapter";

export default abstract class TaskUseCase {
  constructor(protected readonly adapter: TaskAdapter) {}

  abstract getTasks(): Promise<TaskListResponse>;
  abstract getTaskById(id: string): Promise<TaskResponse>;
}
