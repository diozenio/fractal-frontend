import {
  TaskDTO,
  TaskListResponse,
  TaskResponse,
} from "@/core/domain/models/task";
import TaskAdapter from "@/core/interfaces/adapters/TaskAdapter";
import { tasks } from "@/ui/components/tasks";
import { delay } from "@/utils/delay";

function searchById(
  tasksToSearch: typeof tasks,
  id: string
): (typeof tasks)[0] | null {
  for (const task of tasksToSearch) {
    if (task.id === id) {
      return task;
    }
    if (task.subtasks && task.subtasks.length > 0) {
      const result = searchById(task.subtasks, id);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

export default class TaskMock extends TaskAdapter {
  async getTasks(): Promise<TaskListResponse> {
    await delay(500);
    return Promise.resolve({
      success: true,
      statusCode: 200,
      message: "Tarefas carregadas com sucesso.",
      data: tasks,
    });
  }

  async getTaskById(id: string): Promise<TaskResponse> {
    await delay(500);
    const task = searchById(tasks, id);

    if (task) {
      return Promise.resolve({
        success: true,
        statusCode: 200,
        message: "Tarefa encontrada com sucesso.",
        data: task,
      });
    }

    return Promise.resolve({
      success: false,
      statusCode: 404,
      message: "Tarefa não encontrada.",
    });
  }

  async createTask(task: TaskDTO): Promise<TaskResponse> {
    await delay(500);

    const newTask = { id: String(tasks.length + 1), ...task };
    tasks.push(newTask);

    return Promise.resolve({
      success: true,
      statusCode: 201,
      message: "Tarefa criada com sucesso.",
      data: newTask,
    });
  }

  async updateTask(id: string, task: Partial<TaskDTO>): Promise<TaskResponse> {
    await delay(500);
    const existingTask = searchById(tasks, id);

    if (existingTask) {
      Object.assign(existingTask, task);
      return Promise.resolve({
        success: true,
        statusCode: 200,
        message: "Tarefa atualizada com sucesso.",
        data: existingTask,
      });
    }

    return Promise.resolve({
      success: false,
      statusCode: 404,
      message: "Tarefa não encontrada.",
    });
  }

  async deleteTask(id: string): Promise<TaskResponse> {
    await delay(500);
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      const [deletedTask] = tasks.splice(taskIndex, 1);
      return Promise.resolve({
        success: true,
        statusCode: 200,
        message: "Tarefa deletada com sucesso.",
        data: deletedTask,
      });
    }

    return Promise.resolve({
      success: false,
      statusCode: 404,
      message: "Tarefa não encontrada.",
    });
  }
}
