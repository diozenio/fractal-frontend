"use client";

import { Button } from "@/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/primitives/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/primitives/select";
import { Textarea } from "@/ui/primitives/textarea";
import { Flag } from "lucide-react";
import React, { useState } from "react";
import { DatePicker } from "@/ui/components/date-picker";
import { TaskPriority, TaskStatus } from "./task";
import { StatusIcons } from "./status-icons";

interface AddTaskDialogProps {
  children: React.ReactNode;
  defaultStatus?: TaskStatus;
  defaultPriority?: TaskPriority;
}

export function AddTaskDialog({
  children,
  defaultStatus = "PLANNED",
  defaultPriority = "MEDIUM",
}: AddTaskDialogProps) {
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-screen my-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Tarefa</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para criar uma nova tarefa.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col max-md:gap-2 gap-4 pt-2 pb-8 w-full">
          <input
            id="title"
            placeholder="Título da tarefa..."
            className="max-w-full max-md:!text-base !text-lg font-medium placeholder:text-muted-foreground p-0 !bg-transparent !border-none !focus:ring-none !outline-none !focus:border-none"
            required
          />
          <Textarea
            id="description"
            placeholder="Adicione uma descrição mais detalhada..."
            className="max-w-full min-h-24 !bg-transparent !border-none !focus:ring-none !outline-none !focus:border-none !p-0 focus-visible:ring-0"
          />
          <div className="flex max-md:flex-col items-center gap-4">
            {/* Status Select */}
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as TaskStatus)}
            >
              <SelectTrigger
                className="w-fit gap-2 max-md:w-full"
                aria-label="Definir status"
              >
                {StatusIcons[status]}
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PLANNED">Planejado</SelectItem>
                <SelectItem value="TO_DO">A Fazer</SelectItem>
                <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
                <SelectItem value="DONE">Feito</SelectItem>
              </SelectContent>
            </Select>

            {/* Priority Select */}
            <Select defaultValue={defaultPriority}>
              <SelectTrigger
                className="w-fit gap-2 max-md:w-full"
                aria-label="Definir prioridade"
              >
                <Flag size={16} />
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Baixa</SelectItem>
                <SelectItem value="MEDIUM">Média</SelectItem>
                <SelectItem value="HIGH">Alta</SelectItem>
                <SelectItem value="URGENT">Urgente</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Picker */}
            <DatePicker />
          </div>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline">
            Salvar Template
          </Button>
          <Button type="submit">Criar Tarefa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
