"use client";

import { Textarea } from "@/ui/primitives/textarea";
import { useTaskStore } from "@/store/task-store";
import { Text } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/ui/primitives/skeleton";

interface TaskDescriptionProps {
  description?: string | null;
  isLoading?: boolean;
}

export function TaskDescription({
  description,
  isLoading,
}: TaskDescriptionProps) {
  const [currentDescription, setCurrentDescription] = useState(
    description ?? ""
  );
  const { updateTask, currentTask } = useTaskStore();

  useEffect(() => {
    setCurrentDescription(description ?? "");
  }, [description]);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurrentDescription(event.target.value);
  };

  const handleBlur = () => {
    if (currentTask && currentDescription !== description) {
      updateTask(currentTask.id, { description: currentDescription });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 mt-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 mt-6">
        <Text size={16} />
        Descrição
      </div>
      <Textarea
        className="mt-3 h-32"
        placeholder="Adicionar uma descrição para a tarefa.."
        value={currentDescription}
        onChange={handleDescriptionChange}
        onBlur={handleBlur}
      />
    </>
  );
}
