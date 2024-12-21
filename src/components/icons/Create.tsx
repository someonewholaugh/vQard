import type { IconProps } from '@/types';
import { cn } from '@/utils';

export const Create = ({ color = 'white' }: IconProps) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-5', {
        'fill-white': color === 'white',
        'fill-black': color === 'black',
      })}
    >
      <path d="M20,22H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2h8a1,1,0,0,1,0,2H4V20H20V12a1,1,0,0,1,2,0v8A2,2,0,0,1,20,22Z"></path>
      <path d="M22,1.94a1,1,0,0,0-.87-.9,9.45,9.45,0,0,0-2.83.17,1,1,0,0,0-.76.72l-.18.72-.83-.33a1,1,0,0,0-1,.13,4.87,4.87,0,0,0-.7.67C13,5.15,13,8.36,13,9.58l-1.72,1.71a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L14.42,11h.36a7.2,7.2,0,0,0,5.41-2.12h0C22.37,6.39,22,2.12,22,1.94Z"></path>
    </svg>
  );
};
