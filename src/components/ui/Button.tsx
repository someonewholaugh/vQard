import type { ButtonProps } from '@/types';
import { Button as Btn } from '@headlessui/react';
import { cn } from '@/utils';

export const Button = ({
  children,
  type = 'button',
  className,
  icon,
  hoverAnimation = true,
  isDisabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <Btn
      type={type}
      onClick={onClick}
      className={cn(
        'bg-white rounded-md px-4 py-2 text-black text-sm',
        hoverAnimation && !isDisabled && 'transition-all duration-300 hover:-translate-y-1 ease-out',
        icon && 'flex items-center justify-center gap-2',
        isDisabled ? 'bg-white/80 text-black-secondary/50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      disabled={isDisabled}
    >
      {icon}
      {children}
    </Btn>
  );
};
