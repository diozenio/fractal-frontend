import { create } from "zustand";
import { services } from "@/container";
import { Task, TaskDTO, TaskStatus } from "@/core/domain/models/task";

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  fetchTasks: () => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
  createTask: (task: TaskDTO) => Promise<void>;
  updateTask: (id: string, task: Partial<TaskDTO>) => Promise<void>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  deleteSubtask: (parentId: string, subtaskId: string) => Promise<void>;
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
    try {
      await services.TaskService.createTask(task);

      const response = await services.TaskService.getTasks();

      set({ tasks: response.data || [] });

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
        get().tasks.find((t) => t.id === id) || get().currentTask;

      if (taskToUpdate) {
        const updatedTask = { ...taskToUpdate, ...task };
        if (get().currentTask?.id === id) {
          set({ currentTask: updatedTask });
        }
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
        }));

        await services.TaskService.updateTask(id, updatedTask);
      }
    } catch (error) {
      set({ isError: true, error: error as Error });
    }
  },
  updateTaskStatus: async (id: string, status: TaskStatus) => {
    const originalTasks = get().tasks;
    const updatedTasks = originalTasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    set({ tasks: updatedTasks });

    try {
      await services.TaskService.updateTask(id, { status });
    } catch (error) {
      set({ tasks: originalTasks, isError: true, error: error as Error });
    }
  },
  deleteTask: async (id: string) => {
    try {
      await services.TaskService.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        currentTask: state.currentTask?.id === id ? null : state.currentTask,
      }));
    } catch (error) {
      set({ isError: true, error: error as Error });
    }
  },
  deleteSubtask: async (parentId: string, subtaskId: string) => {
    try {
      await services.TaskService.deleteTask(subtaskId);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== subtaskId),
        currentTask:
          state.currentTask?.id === parentId
            ? {
                ...state.currentTask,
                subtasks:
                  state.currentTask.subtasks?.filter(
                    (subtask) => subtask.id !== subtaskId
                  ) || null,
              }
            : state.currentTask,
      }));
    } catch (error) {
      set({ isError: true, error: error as Error });
    }
  },
}));
