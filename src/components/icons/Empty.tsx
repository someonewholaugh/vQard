import type { IconProps } from '@/types';

export const Empty = ({ color = 'white' }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className='size-20' viewBox="0 0 24 24">
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.765 17.757L12 21l-8-4.5v-9l2.236-1.258m2.57-1.445L12 3l8 4.5V16m-5.439-5.441L20 7.5M12 12v9m0-9L4 7.5M3 3l18 18"
      ></path>
    </svg>
  );
};
