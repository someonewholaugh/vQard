import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { AlertCardProps } from '@/types';

export const AlertCard = ({ icon, title, message, link, children, buttonText }: AlertCardProps) => (
  <div className="bg-black-secondary/20 backdrop-blur-lg rounded-xl h-fit p-10 space-y-6 grid place-items-center border border-white/20">
    {icon}
    <div className="space-y-1 text-center">
      <h1 className="text-lg font-medium">{title}</h1>
      <p className="text-xs text-stone-400 text-pretty">{message}</p>
    </div>
    {!children ? (
      <Link to={link || '/'} className="w-full">
        <Button className="w-full">{buttonText}</Button>
      </Link>
    ) : (
      children
    )}
  </div>
);
