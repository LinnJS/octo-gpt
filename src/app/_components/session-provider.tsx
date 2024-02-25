"use client";

import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

interface UserSession extends Session {
  user: {
    id: string;
    name: string;
    email: string;
  };
  expires: string;
}

type Props = {
  children?: React.ReactNode;
  session: UserSession | null;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
