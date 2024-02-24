"use client";

import { unstable_noStore as noStore } from "next/cache";

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
    <main>
      <h1>hello</h1>
    </main>
  );
}
