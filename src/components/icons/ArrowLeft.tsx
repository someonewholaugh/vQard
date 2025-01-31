import type { IconProps } from '@/types';
import { cn } from '@/utils';

export const ArrowLeft = ({ color = 'white' }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn('size-5', {
        'fill-white': color === 'white',
        'fill-black': color === 'black',
      })}
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 12H4m0 0l6-6m-6 6l6 6"
      ></path>
    </svg>
  );
};
