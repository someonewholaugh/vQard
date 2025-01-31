import type { FormLegendProps } from '@/types';
import { Legend } from '@headlessui/react';

export const FormLegend = ({ title, description }: FormLegendProps) => {
  return (
    <Legend className="w-5/6 md:w-4/6 space-y-1 text-left">
      <h1 className="text-lg tracking-wide md:text-xl">{title}</h1>
      <p className="text-[0.7rem] md:text-xs tracking-wide text-stone-400">{description}</p>
    </Legend>
  );
};
