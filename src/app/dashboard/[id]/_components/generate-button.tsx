'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function GenerateButton({ id }: { id: string }) {
  const router = useRouter();

  function generate() {
    console.log('Generate body');
    router.refresh();
  }

  return (
    <Button className="mt-5" onClick={generate}>
      Generate Body
    </Button>
  );
}
