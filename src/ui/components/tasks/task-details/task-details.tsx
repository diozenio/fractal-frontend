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
import { useState } from "react";

interface TaskDetailsProps {
  task: TaskProps | null;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  const [status, setStatus] = useState<TaskProps["status"]>(
    task?.status || "PLANNED"
  );

  return (
    <div className="w-full max-w-xs grid grid-cols-2 gap-4 my-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Info size={16} />
        Status
      </div>
      <Select
        value={status}
        onValueChange={(value) => setStatus(value as TaskProps["status"])}
      >
        <SelectTrigger className="w-fit" showIcon={false}>
          {StatusIcons[status]}
          <SelectValue placeholder="Selecione o status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PLANNED">Planejado</SelectItem>
          <SelectItem value="TODO">A Fazer</SelectItem>
          <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
          <SelectItem value="DONE">Feito</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar size={16} />
        Prazo
      </div>
      <DatePicker defaultDate={task?.dueDate} />
      <div className="flex items-center gap-2 text-muted-foreground">
        <Flag size={16} />
        Prioridade
      </div>
      <Select defaultValue={task?.priority}>
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
