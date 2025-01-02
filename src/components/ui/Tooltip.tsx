import type { TooltipProps } from '@/types';

export const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="relative group">
      {children}
      <div className="pointer-events-none absolute top-8 left-1/2 transform max-w-40 -translate-x-1/2 w-max bg-black-secondary/40 backdrop-blur-xl p-1.5 rounded opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-200">
        <p className="text-sm leading-relaxed opacity-80">{text}</p>
      </div>
    </div>
  );
};
