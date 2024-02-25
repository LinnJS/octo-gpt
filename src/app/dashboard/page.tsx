'use server';

import { Background } from 'src/components/ui/background';

import { getDraftTasks } from '@/app/dashboard/actions';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerAuthSession();
  console.log('session: ', session);

  if (!session) {
    redirect('/');
  }

  const draftItems = await getDraftTasks();
  console.log('draftItems: ', draftItems);

  return (
    <main className="mx-auto min-h-screen">
      <div className="flex items-center justify-center">
        <Background />
      </div>

      <div className="space-y-4">
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
    </main>
  );
}
