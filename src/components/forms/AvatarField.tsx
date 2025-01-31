import { ChangeEvent, useRef, useState, useEffect, SyntheticEvent } from 'react';
import { Field, Label, Input } from '@headlessui/react';
import { Button, Modal } from '@/components/ui';
import { Avatar, Eye } from '@/components/icons';
import { cn } from '@/utils';
import type { AvatarFieldProps } from '@/types';

export const AvatarField = ({
  id,
  name,
  register,
  error,
  resetAvatar,
  hasUrl,
}: AvatarFieldProps) => {
  const [preview, setPreview] = useState<string | null>(hasUrl || null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const PLACEHOLDER_IMAGE = `https://api.dicebear.com/9.x/thumbs/svg`;

  const previewImage = (file?: File) => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const resetImage = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      previewImage(file);
      register(name).onChange({ target: { name, value: file } });
    }
  };

  useEffect(() => {
    if (resetAvatar) resetImage();
  }, [resetAvatar]);

  useEffect(() => {
    if (hasUrl) {
      setPreview(hasUrl);
    }
  }, [hasUrl]);

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const parent = e.currentTarget.parentElement!;
    parent.classList.remove('animate-pulse', 'border', 'border-white/20');
    e.currentTarget.style.opacity = '1';
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  const renderErrorText = () => {
    return (
      <div className="space-y-0.5 sr-only md:not-sr-only">
        <p className={cn('text-xs text-pretty', error && 'text-red-500')} id={`${id}-error`}>
          {error?.message || 'Upload your Avatar'}
        </p>
        <p className={cn('text-[0.6rem]', error ? 'text-red-500' : 'text-stone-400')}>
          {error ? 'Please try again' : 'JPG, JPEG, PNG, WEBP'}
        </p>
      </div>
    );
  };

  return (
    <>
      <Field>
        <Label
          htmlFor={id}
          onClick={() => (preview && !error ? setIsModalOpen(true) : inputRef.current?.click())}
          className={cn(
            'relative flex items-center justify-center w-full h-12 border border-dashed rounded-lg bg-black-secondary/20 hover:bg-black-secondary/60 backdrop-blur cursor-pointer transition',
            error ? 'border-red-500' : 'border-stone-400',
            preview && !error && 'border-transparent size-12'
          )}
        >
          {preview ? (
            error ? (
              <div className="flex items-center justify-center px-4 py-2 space-x-2.5">
                <Avatar color="red" />
                {renderErrorText()}
              </div>
            ) : (
              <div className="relative w-full h-full overflow-hidden border rounded-lg group bg-white/10 animate-pulse border-white/20">
                <img
                  src={preview || PLACEHOLDER_IMAGE}
                  alt="Avatar preview"
                  className="object-cover w-full h-full transition-opacity duration-300 opacity-0"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                <div className="absolute inset-0 flex items-center justify-center transition duration-200 rounded-lg opacity-0 group-hover:opacity-100 group-hover:bg-black/40 backdrop-blur-sm">
                  <Eye />
                </div>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center px-4 py-2 space-x-2.5">
              <Avatar color={error && 'red'} />
              {renderErrorText()}
            </div>
          )}
        </Label>
        <Input
          id={id}
          type="file"
          className="sr-only"
          accept="image/jpeg,image/png,image/jpg,image/webp"
          onChange={handleFileChange}
          ref={inputRef}
        />
      </Field>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex items-center justify-center">
          {preview && (
            <div className="relative overflow-hidden border rounded-lg aspect-square group size-80 md:size-96 bg-white/10 animate-pulse border-white/20">
              <img
                src={preview}
                alt="Expanded Avatar preview"
                className="object-cover w-full h-full transition-opacity duration-300 opacity-0"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              <Button
                className="absolute inset-x-0 bottom-0 flex justify-center text-white transition duration-300 rounded-none rounded-b-lg opacity-0 group-hover:opacity-100 hover:bg-black/60 backdrop-blur-lg bg-black/40"
                hoverAnimation={false}
                onClick={() => inputRef.current?.click()}
              >
                Change Avatar
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
