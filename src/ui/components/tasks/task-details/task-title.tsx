"use client";

import {
  Editable,
  EditableArea,
  EditableCancel,
  EditableInput,
  EditablePreview,
  EditableSubmit,
  EditableToolbar,
} from "@/ui/primitives/editable";
import { Button } from "@/ui/primitives/button";
import { useState, useRef, useEffect } from "react";
import { useTaskStore } from "@/store/task-store";
import { Skeleton } from "@/ui/primitives/skeleton";

interface TaskTitleProps {
  initialTitle: string;
  isLoading?: boolean;
}

export function TaskTitle({ initialTitle, isLoading = false }: TaskTitleProps) {
  const [title, setTitle] = useState(initialTitle);
  const previousTitle = useRef(title);
  const { updateTask, currentTask } = useTaskStore();

  useEffect(() => {
    setTitle(initialTitle);
    previousTitle.current = initialTitle;
  }, [initialTitle]);

  if (isLoading) {
    return (
      <div className="h-14">
        <Skeleton className="w-full h-10" />
      </div>
    );
  }

  const handleSubmit = () => {
    if (title.trim() === "") {
      setTitle(previousTitle.current);
      return;
    }

    if (currentTask) {
      updateTask(currentTask.id, { title });
    }

    previousTitle.current = title;
  };

  return (
    <Editable
      className="h-14"
      value={title}
      onValueChange={setTitle}
      onSubmit={handleSubmit}
    >
      <EditableArea>
        <EditablePreview className="!text-2xl font-bold truncate" />
        <EditableInput />
      </EditableArea>

      <EditableToolbar>
        <EditableSubmit asChild>
          <Button size="sm">Salvar</Button>
        </EditableSubmit>

        <EditableCancel asChild>
          <Button variant="outline" size="sm">
            Cancelar
          </Button>
        </EditableCancel>
      </EditableToolbar>
    </Editable>
  );
}
