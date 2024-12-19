import type { TooltipProps } from '@/types';

export const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute top-8 left-1/2 transform max-w-40 -translate-x-1/2 w-max bg-black-secondary/40 backdrop-blur-xl p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <p className="opacity-80 leading-relaxed text-sm">{text}</p>
      </div>
    </div>
  );
};
