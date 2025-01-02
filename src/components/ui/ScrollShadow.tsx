import { cn } from '@/utils';
import type { ScrollShadowProps } from '@/types';

export const ScrollShadow = ({ children, className }: ScrollShadowProps) => {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-x-0 top-0 h-8 rounded-t-lg pointer-events-none z-[5] bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-8 rounded-b-lg pointer-events-none z-[5] bg-gradient-to-t from-black to-transparent"></div>
      {children}
    </div>
  );
};
