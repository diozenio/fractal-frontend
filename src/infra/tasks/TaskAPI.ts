import {
  TaskListResponse,
  TaskResponse,
  TaskDTO,
} from "@/core/domain/models/task";
import TaskAdapter from "@/core/interfaces/adapters/TaskAdapter";
import { client } from "@/lib/api/client";

export default class TaskAPI extends TaskAdapter {
  async getTasks(): Promise<TaskListResponse> {
    const { data } = await client.get<TaskListResponse>("/task");

    return data;
  }

  async getTaskById(id: string): Promise<TaskResponse> {
    const { data } = await client.get<TaskResponse>(`/task/${id}`);

    return data;
  }

  async createTask(task: TaskDTO): Promise<TaskResponse> {
    const { data } = await client.post<TaskResponse>("/task", task);

    return data;
  }

  async updateTask(id: string, task: TaskDTO): Promise<TaskResponse> {
    const { data } = await client.put<TaskResponse>(`/task/${id}`, task);

    return data;
  }

  async deleteTask(id: string): Promise<TaskResponse> {
    const { data } = await client.delete<TaskResponse>(`/task/${id}`);

    return data;
  }
}
