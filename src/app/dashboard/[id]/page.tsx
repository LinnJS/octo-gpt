'use server';

import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import { getDraftTaskById } from './action';

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/');
  }

  const draftIssue = await getDraftTaskById('DI_lAHOAWpDi84AdSIqzgFen6E');
  console.log('draftIssue: ', draftIssue);

  return (
    <main className="mx-auto min-h-screen">
      <h1>hello</h1>
    </main>
  );
}
