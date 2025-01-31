import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { AlertCardProps } from '@/types';

export const AlertCard = ({
  icon,
  title,
  message,
  link,
  children,
  buttonText,
  onClick,
}: AlertCardProps) => {
  const renderActionButton = () => {
    if (onClick) {
      return (
        <Button className="w-full" onClick={onClick}>
          {buttonText}
        </Button>
      );
    }

    return (
      <Link to={link || '/'} className="w-full">
        <Button className="w-full">{buttonText}</Button>
      </Link>
    );
  };

  return (
    <div className="grid max-w-md p-10 space-y-6 border bg-black/60 backdrop-blur-lg rounded-xl h-fit place-items-center border-white/20">
      {icon}
      <div className="space-y-1 text-center">
        <h1 className="text-lg font-medium">{title}</h1>
        <p className="text-xs leading-relaxed text-stone-400 text-pretty">{message}</p>
      </div>
      {children ? children : renderActionButton()}
    </div>
  );
};
