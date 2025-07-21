import { Bell } from "lucide-react";

import { Button } from "@/ui/primitives/button";

export function NotificationMenu() {
  return (
    <Button variant="ghost" size="icon" className="-mr-1">
      <Bell />
    </Button>
  );
}
