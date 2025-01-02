import { cn } from '@/utils';

interface FormDividerProps {
  text: string;
  className?: string;
}

export const FormDivider = ({ text, className }: FormDividerProps) => {
  return (
    <div
      className={cn(
        'py-1 flex items-center text-xs text-stone-600 before:flex-1 before:border-t before:border-stone-600 before:me-4 after:flex-1 after:border-t after:border-stone-600 after:ms-4',
        className
      )}
    >
      {text}
    </div>
  );
};
