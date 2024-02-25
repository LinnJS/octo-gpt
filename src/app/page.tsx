'use server';

import { redirect } from 'next/navigation';
import { SignInButton } from '@/app/_components/sign-in-button';
import { getServerAuthSession } from '@/server/auth';

export default async function Login() {
  const session = await getServerAuthSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="h-full min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-1  flex-col items-center  justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your Octo GPT account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <div>
              <div className="flex">
                <SignInButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
