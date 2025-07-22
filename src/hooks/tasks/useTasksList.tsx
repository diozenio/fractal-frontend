import { tasks, TaskStatus } from "@/ui/components/tasks";
import { TaskProps } from "@/ui/components/tasks";
import { useEffect, useState } from "react";

export function useTasksList() {
  const [columns, setColumns] = useState<Record<TaskStatus, TaskProps[]>>({
    PLANNED: [],
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  });

  useEffect(() => {
    // Initialize columns with tasks data
    const initialColumns: Record<TaskStatus, TaskProps[]> = {
      PLANNED: [],
      TODO: [],
      IN_PROGRESS: [],
      DONE: [],
    };

    tasks.map((task) => {
      if (task.status && task.status in initialColumns) {
        initialColumns[task.status].push(task);
      } else {
        console.warn(
          `Task with id ${task.id} has an invalid status: ${task.status}`
        );
      }
    });

    setColumns(initialColumns);
  }, []);

  return {
    columns,
    setColumns,
  };
}
