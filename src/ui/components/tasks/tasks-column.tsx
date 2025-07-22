import { Button } from "@/ui/primitives/button";
import { Plus } from "lucide-react";
import Task, { TaskProps, TaskStatus } from "./task";
import * as Kanban from "@/ui/primitives/kanban";

interface TasksColumnProps
  extends Omit<React.ComponentProps<typeof Kanban.Column>, "children"> {
  icon?: React.ReactNode;
  title: string;
  count: number;
  onAdd?: () => void;
  tasks?: TaskProps[];
}

export default function TasksColumn({
  icon,
  title,
  count,
  onAdd,
  tasks = [],
  value,
  ...props
}: TasksColumnProps) {
  return (
    <Kanban.Column
      value={value}
      {...props}
      className="h-full !bg-transparent rounded-lg p-3 overflow-y-auto scroll-smooth scrollbar-custom "
    >
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="text-sm font-medium">{title}</h4>
          <span className="text-sm text-muted-foreground">{count}</span>
        </div>
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onAdd}>
          <Plus size={14} />
        </Button>
      </header>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <Task key={task.id} {...task} status={value as TaskStatus} asHandle />
        ))}
      </div>
    </Kanban.Column>
  );
}
