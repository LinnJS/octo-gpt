import { Inter } from 'next/font/google';
import { TRPCReactProvider } from '@/trpc/react';

import '@/styles/globals.css';
import { NextAuthProvider } from '@/app/_components/next-auth-provider';
import { getServerAuthSession } from '@/server/auth';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <NextAuthProvider session={session}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
