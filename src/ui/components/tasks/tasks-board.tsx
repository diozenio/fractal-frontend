import { TaskStatus } from "./task";
import * as Kanban from "@/ui/primitives/kanban";
import TasksColumn from "./tasks-column";
import { Circle, CircleCheck, CircleDashed, CircleDot } from "lucide-react";
import {
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { useTasksList } from "@/hooks/tasks/useTasksList";

const COLUMN_TITLES: Record<TaskStatus, string> = {
  PLANNED: "Planejado",
  TODO: "A Fazer",
  IN_PROGRESS: "Em Progresso",
  DONE: "Feito",
};

const COLUMN_ICONS: Record<TaskStatus, React.ReactNode> = {
  PLANNED: <CircleDashed size={16} className="text-muted-foreground/50" />,
  TODO: <Circle size={16} />,
  IN_PROGRESS: <CircleDot size={16} className="text-green-500" />,
  DONE: (
    <CircleCheck
      size={20}
      className="text-background"
      fill="var(--color-blue-500)"
    />
  ),
};

export default function TasksBoard() {
  const { columns, setColumns } = useTasksList();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  return (
    <div className="flex-1 overflow-x-auto pb-4">
      <Kanban.Root
        value={columns}
        onValueChange={setColumns}
        getItemValue={(item) => item.id}
        sensors={sensors}
      >
        <Kanban.Board className="w-full grid grid-flow-col auto-cols-[minmax(300px,_1fr)] h-full p-4 gap-4">
          {Object.entries(columns).map(([columnValue, tasks]) => (
            <TasksColumn
              key={columnValue}
              title={COLUMN_TITLES[columnValue as TaskStatus]}
              value={columnValue}
              tasks={tasks}
              count={tasks.length}
              icon={COLUMN_ICONS[columnValue as TaskStatus]}
            />
          ))}
        </Kanban.Board>
      </Kanban.Root>
    </div>
  );
}
