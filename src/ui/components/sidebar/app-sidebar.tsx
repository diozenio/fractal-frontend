"use client";

import { ListTodo, Settings } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/ui/components/sidebar/nav-main";
import { NavSecondary } from "@/ui/components/sidebar/nav-secondary";
import { NavUser } from "@/ui/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/ui/primitives/sidebar";

import { HeaderLogo } from "./header-logo";

const data = {
  navMain: [
    {
      title: "Tarefas",
      url: "/",
      icon: ListTodo,
    },
  ],
  navSecondary: [
    {
      title: "Preferências",
      url: "#",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <HeaderLogo />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
