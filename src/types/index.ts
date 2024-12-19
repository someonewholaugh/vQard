import { ReactNode } from 'react';

export type LayoutProps = {
  title: string;
  description?: string;
  centerContent?: boolean;
  children: ReactNode;
};

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

export type IconProps = {
  color?: 'white' | 'black';
};

export type TooltipProps = {
  children: ReactNode;
  text: string;
};
