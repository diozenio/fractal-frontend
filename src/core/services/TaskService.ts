import { TaskListResponse, TaskResponse } from "@/core/domain/models/task";
import TaskUseCase from "@/core/interfaces/usecases/TaskUseCase";

export default class TaskService extends TaskUseCase {
  async getTasks(): Promise<TaskListResponse> {
    return this.adapter.getTasks();
  }

  async getTaskById(id: string): Promise<TaskResponse> {
    return this.adapter.getTaskById(id);
  }
}
