import { useEffect, useState } from 'react';
import { ToastProps } from '@/types';
import { cn } from '@/utils';

export const Toast = ({ message, onClose }: ToastProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(
        'fixed inset-x-0 max-w-[16rem] text-xs px-4 py-2 mx-auto text-center border rounded-md shadow-lg bg-black/60 backdrop-blur-md bottom-5 border-white/20 transition-opacity transform duration-300 ease-in-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      )}
    >
      {message}
    </div>
  );
};
