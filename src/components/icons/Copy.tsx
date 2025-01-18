import type { IconProps } from '@/types';

export const Copy = ({ color = 'white' }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className='size-4' viewBox="0 0 24 24">
      <path
        fill={color}
        d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2"
      ></path>
      <path
        fill={color}
        d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"
      ></path>
    </svg>
  );
};
