import type { ButtonProps } from '@/types';
import { Button as Btn } from '@headlessui/react';
import { cn } from '@/utils';

export const Button = ({
  children,
  type = 'button',
  className,
  icon,
  hoverAnimation = true,
  onClick,
}: ButtonProps) => {
  return (
    <Btn
      type={type}
      onClick={onClick}
      className={cn(
        'bg-white rounded-md px-4 py-2 text-black text-sm',
        hoverAnimation && 'transition-transform duration-200 hover:-translate-y-1',
        icon && 'flex items-center justify-center gap-2',
        className
      )}
    >
      {icon}
      {children}
    </Btn>
  );
};
