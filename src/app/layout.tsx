'use client';

import { signOut } from 'next-auth/react';

import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';

import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  current: boolean;
}

import { TRPCReactProvider } from '@/trpc/react';
import { Button } from '@/components/ui/button';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
