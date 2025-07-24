import { create } from "zustand";
import { services } from "@/container";
import { Task } from "@/core/domain/models/task";

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  fetchTasks: () => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
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
}));
