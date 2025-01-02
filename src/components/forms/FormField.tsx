import type { FormFieldProps } from '@/types';
import { Field, Label, Input, Textarea } from '@headlessui/react';
import { cn } from '@/utils';

export const FormField = ({
  id,
  label,
  name,
  type = 'text',
  placeholder = '',
  isRequired = false,
  register,
  error,
  valueAsNumber,
  isTextArea,
}: FormFieldProps) => {
  const errorId = error ? `${id}-error` : undefined;
  const labelId = `${id}-label`;

  const commonProps = {
    id,
    placeholder,
    'aria-labelledby': labelId,
    'aria-describedby': errorId,
    'aria-invalid': !!error,
    'aria-errormessage': errorId,
    className: cn(
      'block w-full flex-1 text-sm py-2 px-4 bg-black-secondary/60 backdrop-blur placeholder-stone-400 rounded-md ring-0 transition duration-200 focus:ring-1 focus:outline-none focus:ring-stone-400',
      error && 'ring-red-500 focus:ring-red-500',
      isTextArea && 'resize-none'
    ),
    ...register(name, { valueAsNumber }),
  };

  return (
    <Field className="w-full space-y-2">
      <Label id={labelId} htmlFor={id} className="block text-sm">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      {isTextArea ? (
        <Textarea {...commonProps} rows={3} />
      ) : (
        <Input type={type} autoComplete="off" {...commonProps} />
      )}
      {error && (
        <span id={errorId} role="alert" className="text-xs text-red-500">
          {error.message}
        </span>
      )}
    </Field>
  );
};
