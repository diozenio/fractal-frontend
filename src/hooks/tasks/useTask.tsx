import { tasks } from "@/ui/components/tasks/tasks";
import { TaskProps } from "@/ui/components/tasks";
import { useState } from "react";

function searchById(tasks: TaskProps[], id: string): TaskProps | null {
  for (const task of tasks) {
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

export function useTask(id: string) {
  const [task, setTask] = useState<TaskProps | null>(searchById(tasks, id));

  if (!task) {
    tasks.forEach((t) => {
      if (t.id === id) {
        setTask(t);
      } else if (t.subtasks) {
        t.subtasks.forEach((subtask) => {
          if (subtask.id === id) {
            setTask(subtask);
          }
        });
      }
    });
  }

  return {
    task,
    setTask,
  };
}
