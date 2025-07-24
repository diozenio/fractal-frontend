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
import { StatusIcons } from "./status-icons";
import { useTaskStore } from "@/store/task-store";
import { TaskDTO, TaskPriority, TaskStatus } from "@/core/domain/models/task";

interface AddTaskDialogProps {
  children: React.ReactNode;
  defaultStatus?: TaskStatus;
  defaultPriority?: TaskPriority;
  parentId?: string;
}

export function AddTaskDialog({
  children,
  defaultStatus = "PLANNED",
  defaultPriority = "MEDIUM",
  parentId,
}: AddTaskDialogProps) {
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);
  const { createTask, isLoading } = useTaskStore();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  function handleSubmit() {
    const formData = new FormData(formRef.current!);

    const title = formData.get("title") as string;

    if (!title.trim()) {
      formRef.current?.reportValidity();
      return;
    }

    const description = formData.get("description") as string;
    const status = formData.get("status") as TaskStatus;
    const priority = formData.get("priority") as TaskPriority;
    const dueDate = formData.get("dueDate") as string;

    const newTask: TaskDTO = {
      title,
      description: description.trim() || null,
      status,
      priority,
      dueDate,
      subtasks: [],
      parentId: parentId || null,
    };

    createTask(newTask);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-screen my-4 overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Criar Nova Tarefa</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para criar uma nova tarefa.
          </DialogDescription>
        </DialogHeader>
        <form
          ref={formRef}
          className="flex flex-col max-md:gap-2 gap-4 pt-2 pb-8 w-full"
        >
          <input
            id="title"
            name="title"
            placeholder="Título da tarefa..."
            className="max-w-full max-md:!text-base !text-lg font-medium placeholder:text-muted-foreground p-0 !bg-transparent !border-none !focus:ring-none !outline-none !focus:border-none"
            required
          />
          <Textarea
            id="description"
            name="description"
            placeholder="Adicione uma descrição mais detalhada..."
            className="max-w-full min-h-24 !bg-transparent !border-none !focus:ring-none !outline-none !focus:border-none !p-0 focus-visible:ring-0"
          />
          <div className="flex max-md:flex-col items-center gap-4">
            {/* Status Select */}
            <Select
              name="status"
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
            <Select name="priority" defaultValue={defaultPriority}>
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
          <Button
            className="min-w-[120px]"
            onClick={handleSubmit}
            loading={isLoading}
          >
            Criar Tarefa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
