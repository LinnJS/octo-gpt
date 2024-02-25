'use client';

import { cn } from '@/lib/utils';
import Spline from '@splinetool/react-spline';

export function Background({ className }: { className?: string }) {
  return (
    <div className={cn('h-44', className)}>
      <Spline className="spline" scene="https://prod.spline.design/2OJLJwr1DEbd6Bb4/scene.splinecode" />
    </div>
  );
}
