import { SidebarTrigger } from "@/ui/primitives/sidebar";

import { NotificationMenu } from "../notification";

export function PageHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-14 shrink-0 items-center gap-4 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="ml-auto flex items-center gap-2">
        <NotificationMenu />
      </div>
    </header>
  );
}
