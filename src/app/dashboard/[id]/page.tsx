'use server';

import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import { getDraftTaskById } from './action';

export default async function Home({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/');
  }

  const draftIssue = await getDraftTaskById(params.id);
  console.log('draftIssue: ', draftIssue);

  return (
    <main className="mx-auto min-h-screen">
      <h1 className='text-2xl font-semibold'>{draftIssue.title}</h1>
      <p className='text-sm text-gray-600'>Updated at: {draftIssue.updatedAt}</p>
      <p>{draftIssue.body}</p>
    </main>
  );
}
