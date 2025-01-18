import type { TooltipProps } from '@/types';
import { cn } from '@/utils';

export const Tooltip = ({ children, className, text, moreSpacing = false }: TooltipProps) => {
  return (
    <div className={cn('relative group', className)}>
      {children}
      <div
        className={cn(
          'pointer-events-none absolute top-8 left-1/2 transform max-w-40 -translate-x-1/2 w-max px-2 py-1 flex items-center justify-center rounded-md border bg-black-secondary border-white/10 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-200',
          moreSpacing && 'top-10'
        )}
      >
        <p className="text-xs leading-relaxed opacity-80">{text}</p>
      </div>
    </div>
  );
};
