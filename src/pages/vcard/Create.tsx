import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Layout } from '@/components/layout';
import { AvatarField, FormDivider, FormLegend, FormField } from '@/components/forms';
import { Button, ScrollShadow, Spinner, Modal } from '@/components/ui';
import { Fieldset } from '@headlessui/react';
import { formFields } from '@/data';
import { type FormData, FormSchema } from '@/types';
import { addVCard } from '@/firebase';
import { useImgBB } from '@/hooks';
import { addToLS, encryptValue, shortenUrl } from '@/utils';

const Create = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const { error, uploadImage } = useImgBB();
  const [isLoading, setIsLoading] = useState(false);
  const [resetAvatar, setResetAvatar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vCard, setVCard] = useState<(FormData & { id: string }) | null>(null);

  const resetAvatarField = () => {
    setResetAvatar(true);
    setTimeout(() => setResetAvatar(false), 0);
  };

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setIsModalOpen(true);
    try {
      const uploadedAvatarUrl = await uploadImage(formData.avatar);
      const vCardId = await addVCard({ ...formData, avatarUrl: uploadedAvatarUrl ?? '' });
      const encodedId = encodeURIComponent(encryptValue(vCardId));
      const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}/c/${encodedId}`;
      const shortedUrl = await shortenUrl(baseUrl);

      addToLS('UserCards', { id: vCardId, shortUrl: shortedUrl });
      setVCard({ ...formData, avatarUrl: uploadedAvatarUrl ?? '', id: encodedId });

      reset();
      resetAvatarField();
    } catch (error) {
      console.error(
        'Error while submitting the form:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderFields = (fields: typeof formFields) =>
    fields.map(({ name, type, label, placeholder, isRequired, category }) => (
      <FormField
        key={name}
        id={name}
        type={type}
        name={name}
        label={label}
        placeholder={placeholder}
        register={register}
        error={errors[name]}
        isRequired={isRequired}
        isTextArea={name === 'about' && category === 'personal'}
      />
    ));

  const renderModalContent = () => {
    if (isLoading && !error) {
      return (
        <div className="flex flex-col items-center space-y-4">
          <Spinner />
          <h2 className="text-base">Hold tight! We're creating your vCard...</h2>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-red-500">Oops! Something went wrong. Please try again.</p>
          <Button onClick={() => setIsModalOpen(false)}>Try Again</Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center space-y-8">
        <div className="aspect-square rounded-xl size-52 overflow-hidden relative">
          <div
            className="absolute inset-0 flex items-center justify-center bg-white/10 animate-pulse border border-white/20 "
            aria-hidden="true"
            data-placeholder
          ></div>
          <img
            src={
              vCard?.avatarUrl ||
              `https://avatar.iran.liara.run/username?username=${vCard?.firstName}+${vCard?.lastName}`
            }
            alt={`${vCard?.firstName} ${vCard?.lastName}`}
            draggable="false"
            loading="eager"
            decoding="async"
            onLoad={(e) => {
              const parent = e.currentTarget.parentElement!;
              parent.classList.remove('animate-pulse', 'border', 'border-white/20');
              e.currentTarget.style.opacity = '1';
            }}
            onError={(e) => {
              e.currentTarget.src = `https://avatar.iran.liara.run/username?username=${vCard?.firstName}+${vCard?.lastName}`;
            }}
            className="object-cover w-full h-full opacity-0 transition-opacity duration-300 absolute inset-0"
          />
        </div>
        <div className="space-y-0.5 text-center">
          <h2 className="text-lg font-medium">
            Great Work, {vCard?.firstName} {vCard?.lastName}!
          </h2>
          <p className="text-xs text-stone-400">Your vCard is ready and safely saved.</p>
        </div>
        <div className="w-full space-y-3 md:space-y-4">
          <Link to={`/c/${vCard?.id}`}>
            <Button className="w-full">View the card</Button>
          </Link>
          <Button
            className="w-full text-white transition duration-300 bg-transparent border hover:bg-black-secondary/20"
            onClick={() => setIsModalOpen(false)}
          >
            Create another
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Create your vCard" description="Create your vCard with ease!" centerContent>
      <form className="w-full max-w-screen-md" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="space-y-6">
          <div className="flex justify-between w-full">
            <FormLegend
              title="Complete Your vCard Details"
              description="Fields marked with * are required."
            />
            <AvatarField
              id="avatar"
              name="avatar"
              register={register}
              error={errors.avatar}
              resetAvatar={resetAvatar}
            />
          </div>
          <ScrollShadow className="max-h-[50vh] h-[50vh] rounded-lg border border-white/20 backdrop-blur shadow-inner shadow-stone-500/20">
            <div className="absolute inset-0 px-4 pt-4 pb-6 space-y-4 overflow-y-auto md:px-6">
              <FormDivider text="Personal Information" />
              <div className="flex space-x-4">{renderFields(formFields.slice(0, 2))}</div>
              {renderFields(formFields.slice(2, 6))}

              <FormDivider text="Student Information" />
              {renderFields(formFields.filter((field) => field.category === 'student'))}

              <FormDivider text="Professional Information" />
              {renderFields(formFields.filter((field) => field.category === 'professional'))}

              <FormDivider text="Social Media & Links" />
              {renderFields(formFields.filter((field) => field.category === 'social'))}
            </div>
          </ScrollShadow>
          <Button type="submit" className="w-full">
            Create my vCard
          </Button>
        </Fieldset>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} hideCloseButton>
        <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-8">
          {renderModalContent()}
        </div>
      </Modal>
    </Layout>
  );
};

export default Create;
