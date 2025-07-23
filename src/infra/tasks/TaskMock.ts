import { TaskListResponse, TaskResponse } from "@/core/domain/models/task";
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
}
