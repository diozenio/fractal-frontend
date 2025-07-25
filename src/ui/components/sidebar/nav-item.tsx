import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { SidebarMenuButton, SidebarMenuItem } from '@/ui/primitives/sidebar';

export interface NavItemProps {
  title: string;
  url: string;
  icon?: LucideIcon;
}

export function NavItem({ title, url, icon: Icon }: NavItemProps) {
  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton tooltip={title} asChild>
        <Link href={url}>
          {Icon && <Icon />}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
