import type { IconProps } from '@/types';

export const Menu = ({ color = 'white' }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
      <path
        fill={color}
        d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
      ></path>
    </svg>
  );
};
