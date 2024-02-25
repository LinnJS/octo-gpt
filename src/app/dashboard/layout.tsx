'use server';

import { DashboardLayout } from '@/app/dashboard/_components/dashboard-layout';
import { getDraftTasks } from '@/app/dashboard/actions';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/');
  }

  const draftTasks = await getDraftTasks();

  return (
    <main>
      <DashboardLayout draftTasks={draftTasks}>{children}</DashboardLayout>
    </main>
  );
}
