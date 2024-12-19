import type { ButtonProps } from '@/types';
import { Button as Btn } from '@headlessui/react';

export const Button = ({ children, className, icon, onClick }: ButtonProps) => {
  const classes = `bg-white rounded-md px-4 py-2 text-black ${className} ${
    icon ? 'flex items-center justify-center gap-2' : ''
  }`;

  return (
    <Btn onClick={onClick} className={classes}>
      {icon}
      {children}
    </Btn>
  );
};
