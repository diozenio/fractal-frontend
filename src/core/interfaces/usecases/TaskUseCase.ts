import {
  TaskDTO,
  TaskListResponse,
  TaskResponse,
} from "@/core/domain/models/task";
import TaskAdapter from "../adapters/TaskAdapter";

export default abstract class TaskUseCase {
  constructor(protected readonly adapter: TaskAdapter) {}

  abstract getTasks(): Promise<TaskListResponse>;
  abstract getTaskById(id: string): Promise<TaskResponse>;
  abstract createTask(task: TaskDTO): Promise<TaskResponse>;
  abstract updateTask(
    id: string,
    task: Partial<TaskDTO>
  ): Promise<TaskResponse>;
  abstract deleteTask(id: string): Promise<TaskResponse>;
}
