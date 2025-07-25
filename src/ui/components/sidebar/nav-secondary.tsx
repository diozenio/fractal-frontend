'use client';

import { LucideIcon } from 'lucide-react';
import * as React from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from '@/ui/primitives/sidebar';

import { NavItem } from './nav-item';

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <NavItem key={item.title} {...item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
