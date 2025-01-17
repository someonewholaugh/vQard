import type { ReactNode } from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

/** Shared Props */
export interface LayoutProps {
  title: string;
  description?: string;
  centerContent?: boolean;
  withHeader?: boolean;
  className?: string;
  children: ReactNode;
}

export interface HeaderProps {
  path: string;
}

export interface ButtonProps {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: ReactNode;
  hoverAnimation?: boolean;
  onClick?: () => void;
}

export interface IconProps {
  color?: 'white' | 'black' | 'red';
}

export interface TooltipProps {
  children: ReactNode;
  className?: string;
  text: string;
  moreSpacing?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  hideCloseButton?: boolean;
}

export interface ScrollShadowProps {
  children: ReactNode;
  className?: string;
}

/** Form Schema */
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const createUrlSchema = (domain?: string) =>
  z
    .string()
    .optional()
    .refine((url) => !url || z.string().url().safeParse(url).success, { message: 'Invalid URL' })
    .refine(
      (url) =>
        !url ||
        !domain ||
        url.startsWith(`https://${domain}`) ||
        url.startsWith(`https://www.${domain}`),
      { message: `URL must start with "https://${domain}" or "https://www.${domain}"` }
    );

const avatarSchema = z
  .any()
  .refine((file) => file instanceof File, 'Avatar is required')
  .refine((file) => file && file.size <= MAX_FILE_SIZE, 'File size must be smaller than 2MB')
  .refine((file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: 'Invalid format. Allowed types: JPEG, JPG, PNG, WEBP',
  });

export const FormSchema = z.object({
  // Informasi dasar
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().regex(/^[0-9]{10,}$/, 'Phone number must be at least 10 digits and numeric'),
  address: z.string().optional(),
  about: z
    .string()
    .max(1000, 'About must be less than 1000 characters')
    .min(1, 'About is required'),
  university: z.string().optional(),
  major: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  workEmail: z
    .string()
    .optional()
    .refine((email) => !email || z.string().email().safeParse(email).success, {
      message: 'Invalid work email address',
    }),
  workPhone: z
    .string()
    .optional()
    .refine(
      (phone) => !phone || (/^[0-9]+$/.test(phone) && phone.length >= 10),
      'Work phone number must be at least 10 digits and numeric'
    ),
  companyAddress: z.string().optional(),
  avatar: avatarSchema,
  avatarUrl: z.string().url().optional(),
  website: createUrlSchema(),
  github: createUrlSchema('github.com'),
  linkedin: createUrlSchema('linkedin.com'),
  facebook: createUrlSchema('facebook.com'),
  instagram: createUrlSchema('instagram.com'),
  x: createUrlSchema('x.com'),
});

const NoAvatarForm = FormSchema.omit({ avatar: true });

export type FormData = z.infer<typeof FormSchema>;
export type NoAvatarForm = z.infer<typeof NoAvatarForm>;

export interface FieldConfig {
  name: keyof FormData;
  type: string;
  label: string;
  placeholder: string;
  category: string;
  isRequired?: boolean;
}

export interface FormLegendProps {
  title: string;
  description: string;
}

export interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  name: keyof FormData;
  placeholder: string;
  isRequired?: boolean;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  isTextArea?: boolean;
}

export interface AvatarFieldProps {
  id: string;
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  resetAvatar: boolean;
}

// Hooks
export interface ImgBBHooks {
  error: string | null;
  uploadImage: (img: File) => Promise<void>;
}
