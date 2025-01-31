import type { IconProps } from '@/types';
import { cn } from '@/utils';

export const Collection = ({ color = 'white' }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={cn('size-6', {
        'fill-white': color === 'white',
        'fill-black': color === 'black',
      })}
    >
      <path
        fill={color}
        d="M7 3a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2zM4 7a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m-2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"
      ></path>
    </svg>
  );
};
