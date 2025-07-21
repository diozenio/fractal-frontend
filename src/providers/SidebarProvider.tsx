import { PropsWithChildren } from 'react';

import { PageHeader } from '@/ui/components/page-header';
import { AppSidebar } from '@/ui/components/sidebar/app-sidebar';
import {
  SidebarInset,
  SidebarProvider as SidebarProviderUI,
} from '@/ui/primitives/sidebar';

export function SidebarProvider({ children }: PropsWithChildren) {
  return (
    <SidebarProviderUI>
      <AppSidebar />
      <SidebarInset>
        <PageHeader />
        {children}
      </SidebarInset>
    </SidebarProviderUI>
  );
}
