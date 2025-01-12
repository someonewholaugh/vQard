import { FieldConfig } from '@/types';

export const formFields: FieldConfig[] = [
  // Personal Information
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'John',
    isRequired: true,
    category: 'personal',
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Doe',
    category: 'personal',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'john.doe@example.com',
    isRequired: true,
    category: 'personal',
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Phone',
    placeholder: '0812 3456 7899',
    isRequired: true,
    category: 'personal',
  },
  {
    name: 'address',
    type: 'text',
    label: 'Address',
    placeholder: 'Jl. Venus No. 1, Jakarta, Indonesia',
    category: 'personal',
  },

  // Professional Information
  {
    name: 'jobTitle',
    type: 'text',
    label: 'Job Title',
    placeholder: 'Software Engineer',
    category: 'professional',
  },
  {
    name: 'organization',
    type: 'text',
    label: 'Organization',
    placeholder: 'PT. Company',
    category: 'professional',
  },
  {
    name: 'workEmail',
    type: 'email',
    label: 'Work Email',
    placeholder: 'john.doe@company.com',
    category: 'professional',
  },
  {
    name: 'workPhone',
    type: 'tel',
    label: 'Work Phone',
    placeholder: '0898 7654 3210',
    category: 'professional',
  },
  {
    name: 'companyAddress',
    type: 'text',
    label: 'Company Address',
    placeholder: 'Jl. Mars No. 2, Jakarta, Indonesia',
    category: 'professional',
  },

  // Social Media Links
  {
    name: 'website',
    type: 'url',
    label: 'Website',
    placeholder: 'https://www.yourwebsite.com',
    category: 'social',
  },
  {
    name: 'linkedin',
    type: 'url',
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/in/username',
    category: 'social',
  },
  {
    name: 'github',
    type: 'url',
    label: 'GitHub',
    placeholder: 'https://github.com/username',
    category: 'social',
  },
  {
    name: 'facebook',
    type: 'url',
    label: 'Facebook',
    placeholder: 'https://facebook.com/username',
    category: 'social',
  },
  {
    name: 'instagram',
    type: 'url',
    label: 'Instagram',
    placeholder: 'https://instagram.com/username',
    category: 'social',
  },
  {
    name: 'x',
    type: 'url',
    label: 'X / Twitter',
    placeholder: 'https://x.com/username',
    category: 'social',
  },

  // Additional Information
  {
    name: 'note',
    type: 'text',
    label: 'Note',
    placeholder: 'Add your notes here',
    category: 'additional',
  },
];
