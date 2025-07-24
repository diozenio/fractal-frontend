import {
  TaskDTO,
  TaskListResponse,
  TaskResponse,
} from "@/core/domain/models/task";
import TaskUseCase from "@/core/interfaces/usecases/TaskUseCase";

export default class TaskService extends TaskUseCase {
  async getTasks(): Promise<TaskListResponse> {
    return this.adapter.getTasks();
  }

  async getTaskById(id: string): Promise<TaskResponse> {
    return this.adapter.getTaskById(id);
  }

  async createTask(task: TaskDTO): Promise<TaskResponse> {
    return this.adapter.createTask(task);
  }

  async updateTask(id: string, task: TaskDTO): Promise<TaskResponse> {
    return this.adapter.updateTask(id, task);
  }

  async deleteTask(id: string): Promise<TaskResponse> {
    return this.adapter.deleteTask(id);
  }
}
