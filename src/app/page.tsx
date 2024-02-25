"use client";

import { unstable_noStore as noStore } from "next/cache";

import { Background } from "src/components/ui/background";

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

export default function Home() {
  noStore();

  return (
    <main className="min-h-screen mx-auto">
      <div className="flex justify-center items-center">
        <Background />

      </div>
    </main>
  );
}
