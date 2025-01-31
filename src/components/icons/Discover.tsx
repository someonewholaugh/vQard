import type { IconProps } from '@/types';
import { cn } from '@/utils';

export const Discover = ({ color = 'white' }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-[1.375rem]', {
        'fill-white': color === 'white',
        'fill-black': color === 'black',
      })}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1.396-11.396l-2.957 5.749l5.75-2.957l2.956-5.749l-5.75 2.957z"
      />
    </svg>
  );
};
