"use client";

import { Textarea } from "@/ui/primitives/textarea";
import { useTaskStore } from "@/store/task-store";
import { Text } from "lucide-react";
import { useEffect, useState } from "react";

interface TaskDescriptionProps {
  description?: string | null;
}

export function TaskDescription({ description }: TaskDescriptionProps) {
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
