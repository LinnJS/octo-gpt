"use server";

import { unstable_noStore as noStore } from "next/cache";

import { Background } from "src/components/ui/background";

import { useSession } from "next-auth/react";
import { api } from "@/trpc/server";
import { getDraftProjectItems } from "./actions";
import { getServerAuthSession } from "@/server/auth";

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  current: boolean;
}

interface Team {
  id: number;
  name: string;
  href: string;
  initial: string;
  current: boolean;
}

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();
  const userAuth = await api.user.getUserByEmail.query({
    email: session?.user.email ?? "",
  });

  const draftItems = await getDraftProjectItems(
    userAuth.accounts?.[0]?.access_token ?? "",
  );

  console.log("draftItems: ", draftItems);

  return (
    <main className="mx-auto min-h-screen">
      <div className="flex items-center justify-center">
        <Background />
      </div>
    </main>
  );
}
