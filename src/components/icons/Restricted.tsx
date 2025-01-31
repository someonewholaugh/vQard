import type { IconProps } from '@/types';

export const Restricted = ({ color = 'white' }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="size-20" viewBox="0 0 24 24">
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.636 5.636a9 9 0 1 0 12.728 12.728M5.636 5.636a9 9 0 1 1 12.728 12.728M5.636 5.636L12 12l6.364 6.364"
      ></path>
    </svg>
  );
};
