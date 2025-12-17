import { ReactNode } from 'react';
import AppSidebar  from '@/components/layout/AppSidebar';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumb: string[];
}

export function AppLayout({ children, breadcrumb }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="ml-56 min-h-screen flex flex-col">
        <AppHeader breadcrumb={breadcrumb} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
