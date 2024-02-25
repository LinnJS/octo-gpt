'use server';

import { Background } from 'src/components/ui/background';

import { getDraftTasks, getIssueTasks } from '@/app/dashboard/actions';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/');
  }

  const draftItems = await getDraftTasks();
  const issueItems = await getIssueTasks();

  return (
    <main className="mx-auto min-h-screen">
      <div className="flex h-40 items-center justify-center">
        <Background />
      </div>

      <section className="space-y-8 py-8">
        <div className="space-y-4">
          <h2 className="text-lg font-bold">All Drafts</h2>
          {draftItems?.map((item) => {
            return (
              <Card key={item.id}>
                <CardHeader>{item.title}</CardHeader>
                <CardContent>{item.body}</CardContent>
                <CardFooter></CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">All Issues</h2>
          {issueItems?.map((item) => {
            return (
              <Card key={item.id}>
                <CardHeader>{item.title}</CardHeader>
                <CardContent>{item.body}</CardContent>
                <CardFooter></CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
