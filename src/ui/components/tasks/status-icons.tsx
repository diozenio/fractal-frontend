import { Circle, CircleCheck, CircleDashed, CircleDot } from "lucide-react";

export const StatusIcons = {
  PLANNED: <CircleDashed size={16} className="text-muted-foreground/50" />,
  TO_DO: <Circle size={16} />,
  IN_PROGRESS: <CircleDot size={16} className="text-green-500" />,
  DONE: (
    <CircleCheck
      size={20}
      className="text-background"
      fill="var(--color-blue-500)"
    />
  ),
} as const;
