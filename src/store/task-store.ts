import { create } from "zustand";
import { services } from "@/container";
import { Task, TaskDTO } from "@/core/domain/models/task";

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  fetchTasks: () => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
  createTask: (task: TaskDTO) => Promise<void>;
  updateTask: (id: string, task: Partial<TaskDTO>) => Promise<void>; // Adicionado
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  currentTask: null,
  isLoading: false,
  isError: false,
  error: null,
  fetchTasks: async () => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const response = await services.TaskService.getTasks();
      set({ tasks: response.data || [], isLoading: false });
    } catch (error) {
      set({ isLoading: false, isError: true, error: error as Error });
    }
  },
  fetchTaskById: async (id: string) => {
    set({ isLoading: true, isError: false, error: null, currentTask: null });
    try {
      const response = await services.TaskService.getTaskById(id);
      set({ currentTask: response.data || null, isLoading: false });
    } catch (error) {
      set({ isLoading: false, isError: true, error: error as Error });
    }
  },
  createTask: async (task: TaskDTO) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      await services.TaskService.createTask(task);
      await get().fetchTasks();
      if (task.parentId) {
        await get().fetchTaskById(task.parentId);
      }
    } catch (error) {
      set({ isLoading: false, isError: true, error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },
  updateTask: async (id: string, task: Partial<TaskDTO>) => {
    try {
      const taskToUpdate =
        get().currentTask || get().tasks.find((t) => t.id === id);

      console.log("Updating task:", id, task, taskToUpdate);

      if (taskToUpdate) {
        const updatedTask = { ...taskToUpdate, ...task };
        if (get().currentTask?.id === id) {
          set({ currentTask: updatedTask });
        }

        await services.TaskService.updateTask(id, updatedTask);
        await get().fetchTasks();
      }
    } catch (error) {
      set({ isError: true, error: error as Error });
    }
  },
}));
