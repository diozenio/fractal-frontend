"use client";

import { useTask } from "@/hooks/tasks/useTask";
import { useBreadcrumbStore } from "@/store/breadcrumb-store";
import { DatePicker } from "@/ui/components/date-picker";
import { StatusIcons } from "@/ui/components/tasks";
import { Button } from "@/ui/primitives/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/primitives/select";
import { Textarea } from "@/ui/primitives/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/ui/primitives/tooltip";
import {
  Calendar,
  Flag,
  Info,
  ListTodo,
  Plus,
  Sparkles,
  Text,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, use } from "react";

export default function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { task } = useTask(id);
  const router = useRouter();

  const setItems = useBreadcrumbStore((s) => s.setItems);

  useEffect(() => {
    setItems([
      { label: "Dashboard", href: "/" },
      { label: "Tarefas" },
      { label: task?.title || "Tarefa Detalhada" },
    ]);
  }, [setItems]);

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col p-4">
      <div className="w-full max-w-2xl mx-auto mt-12">
        <h1 className="text-2xl font-bold">
          {task?.title || "Tarefa Detalhada"}
        </h1>
        <div className="w-full max-w-xs grid grid-cols-2 gap-4 my-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Info size={16} />
            Status
          </div>
          <Select defaultValue={task?.status || "PLANNED"}>
            <SelectTrigger className="w-fit" showIcon={false}>
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
        <div className="flex items-center gap-2">
          <Text size={16} />
          Descrição
        </div>
        <Textarea
          className="mt-3 h-32"
          placeholder="Adicionar uma descrição para a tarefa.."
          defaultValue={task?.description}
        />
        <div className="mt-6 group/subtasks space-y-6">
          <div className="flex items-center gap-2 ">
            <ListTodo size={16} />
            Subtarefas
            <Button
              variant="ghost"
              size={"icon"}
              className="size-6 group-hover/subtasks:flex group-hover/subtasks:opacity-100 transition-opacity duration-300 ease-in-out opacity-0"
            >
              <Plus size={16} />
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon" className="ml-auto">
                  <Sparkles />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Gerar subtarefas automaticamente</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div>
            {task?.subtasks?.map((subtask) => (
              <div
                key={subtask.id}
                onClick={() => {
                  router.push(`/tasks/${subtask.id}`);
                }}
                className="flex items-center gap-2 flex-row bg-muted/15 p-3 mb-2  border border-card-foreground/5 rounded-lg hover:bg-muted/50 transition-colors duration-300 hover:cursor-pointer select-none"
              >
                {StatusIcons[subtask.status]}
                <span className="text-sm font-medium">{subtask.title}</span>
              </div>
            ))}
            {!task?.subtasks?.length && (
              <div className="text-muted-foreground text-center">
                Nenhuma subtask encontrada.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
