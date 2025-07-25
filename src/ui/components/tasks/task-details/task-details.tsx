"use client";

import { DatePicker } from "@/ui/components/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/primitives/select";
import { Calendar, Flag, Info } from "lucide-react";
import { StatusIcons, TaskProps } from "@/ui/components/tasks";
import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/task-store";
import { TaskPriority, TaskStatus } from "@/core/domain/models/task";
import { Skeleton } from "@/ui/primitives/skeleton";

interface TaskDetailsProps {
  task: TaskProps | null;
  isLoading?: boolean;
}

export function TaskDetails({ task, isLoading }: TaskDetailsProps) {
  const [status, setStatus] = useState<TaskProps["status"]>(
    task?.status || "PLANNED"
  );
  const { updateTask } = useTaskStore();

  useEffect(() => {
    setStatus(task?.status || "PLANNED");
  }, [task?.status]);

  const handleStatusChange = (newStatus: TaskStatus) => {
    setStatus(newStatus);
    if (task) {
      updateTask(task.id, { status: newStatus });
    }
  };

  const handlePriorityChange = (newPriority: TaskPriority) => {
    if (task) {
      updateTask(task.id, { priority: newPriority });
    }
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (task && newDate) {
      updateTask(task.id, { dueDate: newDate.toISOString() });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-xs grid grid-cols-2 gap-4 my-8">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs grid grid-cols-2 gap-4 my-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Info size={16} />
        Status
      </div>
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-fit" showIcon={false}>
          {StatusIcons[status]}
          <SelectValue placeholder="Selecione o status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PLANNED">Planejado</SelectItem>
          <SelectItem value="TO_DO">A Fazer</SelectItem>
          <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
          <SelectItem value="DONE">Feito</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar size={16} />
        Prazo
      </div>
      <DatePicker defaultDate={task?.dueDate} onDateChange={handleDateChange} />
      <div className="flex items-center gap-2 text-muted-foreground">
        <Flag size={16} />
        Prioridade
      </div>
      <Select
        defaultValue={task?.priority}
        onValueChange={handlePriorityChange}
      >
        <SelectTrigger className="w-fit" showIcon={false}>
          <SelectValue placeholder="Selecione a prioridade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="LOW">Baixa</SelectItem>
          <SelectItem value="MEDIUM">Média</SelectItem>
          <SelectItem value="HIGH">Alta</SelectItem>
          <SelectItem value="URGENT">Urgente</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
