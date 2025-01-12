import { useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { ImgBBHooks } from '@/types';
import { createUniqueNumber } from '@/utils';

export const useImgBB = (): ImgBBHooks => {
  const [error, setError] = useState<string | null>(null);
  const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

  const uploadImage = async (img: File): Promise<void> => {
    setError(null);

    const form = new FormData();
    form.append('image', img);
    form.append('name', createUniqueNumber(12));

    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, form);
      const { data } = response;
      return data.data.url;
    } catch (e) {
      if (isAxiosError(e)) {
        setError(e.response?.data?.error?.message || 'Failed to upload image.');
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return { error, uploadImage };
};
