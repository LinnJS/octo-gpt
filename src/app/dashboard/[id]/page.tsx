'use server';

import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import { getDraftTaskById } from './action';
import { Button } from '@/components/ui/button';
import GenerateButton from './_components/generate-button';

export default async function Home({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/');
  }

  const draftIssue = await getDraftTaskById(params.id);

  return (
    <main className="mx-auto min-h-screen">
      <h1 className="text-2xl font-semibold">{draftIssue.title}</h1>
      <p className="text-sm text-gray-600">Updated at: {draftIssue.updatedAt}</p>
      <p>{draftIssue.body}</p>
      <GenerateButton id={params.id} />
    </main>
  );
}
