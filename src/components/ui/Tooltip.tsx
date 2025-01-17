import type { TooltipProps } from '@/types';
import { cn } from '@/utils';

export const Tooltip = ({ children, className, text, moreSpacing = false }: TooltipProps) => {
  return (
    <div className={cn('relative group', className)}>
      {children}
      <div
        className={cn(
          'pointer-events-none absolute top-8 left-1/2 transform max-w-40 -translate-x-1/2 w-max bg-black-secondary/20 backdrop-blur-xl px-3 py-1.5 rounded-md border border-white/10 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-200',
          moreSpacing && 'top-10'
        )}
      >
        <p className="text-sm leading-relaxed opacity-80">{text}</p>
      </div>
    </div>
  );
};
