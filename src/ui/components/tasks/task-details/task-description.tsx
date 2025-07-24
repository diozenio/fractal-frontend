"use client";

import { Textarea } from "@/ui/primitives/textarea";
import { Text } from "lucide-react";

interface TaskDescriptionProps {
  description?: string | null;
}

export function TaskDescription({ description }: TaskDescriptionProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Text size={16} />
        Descrição
      </div>
      <Textarea
        className="mt-3 h-32"
        placeholder="Adicionar uma descrição para a tarefa.."
        defaultValue={description ?? ""}
      />
    </>
  );
}
