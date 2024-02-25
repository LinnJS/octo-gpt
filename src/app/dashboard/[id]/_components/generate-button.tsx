'use client';

import { Button } from '@/components/ui/button';

export default function GenerateButton({ id }: { id: string }) {
  function generate() {
    console.log('Generate body');
  }

  return (
    <Button className="mt-5" onClick={generate}>
      Generate Body
    </Button>
  );
}
