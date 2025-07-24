import {
  TaskDTO,
  TaskListResponse,
  TaskResponse,
} from "@/core/domain/models/task";

export default abstract class TaskAdapter {
  abstract getTasks(): Promise<TaskListResponse>;
  abstract getTaskById(id: string): Promise<TaskResponse>;
  abstract createTask(task: TaskDTO): Promise<TaskResponse>;
  abstract updateTask(id: string, task: TaskDTO): Promise<TaskResponse>;
  abstract deleteTask(id: string): Promise<TaskResponse>;
}
