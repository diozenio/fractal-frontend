import { SidebarTrigger } from "@/ui/primitives/sidebar";

import { NotificationMenu } from "@/ui/components/notification";
import { Separator } from "@/ui/primitives/separator";
import { DynamicBreadcrumb } from "@/ui/components/dynamic-breadcrumb";

export function PageHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-14 shrink-0 items-center gap-4 border-b px-4">
      <SidebarTrigger className="" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <DynamicBreadcrumb />
      <div className="ml-auto flex items-center gap-2">
        <NotificationMenu />
      </div>
    </header>
  );
}
