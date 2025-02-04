import { useState, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { useForm, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fieldset } from '@headlessui/react';
import { Layout } from '@/components/layout';
import { AvatarField, FormDivider, FormLegend, FormField } from '@/components/forms';
import { Button, ScrollShadow, Spinner, Modal, AlertCard } from '@/components/ui';
import { Question } from '@/components/icons';
import { formFields } from '@/data';
import { type FormData, FormSchema } from '@/types';
import { addVCard } from '@/firebase';
import { useImgBB } from '@/hooks';
import { saveToDB, encryptValue, shortenUrl, generateRandomString } from '@/utils';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetAvatar, setResetAvatar] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [vCard, setVCard] = useState<(FormData & { id: string }) | null>(null);
  const randomString = generateRandomString(6);
  const PLACEHOLDER_IMAGE = `https://api.dicebear.com/9.x/thumbs/svg?seed=${randomString}`;

  const resetAvatarField = () => {
    setResetAvatar(true);
    setTimeout(() => setResetAvatar(false), 0);
  };

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setIsModalOpen(true);

    try {
      const uploadedAvatarUrl = formData.avatar
        ? await uploadImage(formData.avatar)
        : PLACEHOLDER_IMAGE;
      const vCardId = await addVCard({ ...formData, avatarUrl: uploadedAvatarUrl ?? '' });
      const encodedId = encodeURIComponent(encryptValue(vCardId));
      const shortedUrl = await shortenUrl(`${import.meta.env.VITE_APP_BASE_URL}/c/${encodedId}`);

      saveToDB('Personal', { id: vCardId, shortUrl: shortedUrl });
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

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const parent = e.currentTarget.parentElement!;
    parent.classList.remove('animate-pulse');
    e.currentTarget.style.opacity = '1';
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
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
        error={errors[name] as FieldError}
        isRequired={isRequired}
        isTextArea={name === 'about' && category === 'personal'}
      />
    ));

  const renderModalContent = () => {
    if (isLoading && !error) {
      return (
        <div className="flex flex-col items-center space-y-4">
          <Spinner />
          <h2 className="text-base">Creating your vCard...</h2>
        </div>
      );
    }

    if (error) {
      return (
        <AlertCard
          icon={<Question />}
          title="Something Went Wrong"
          message="An error occurred while processing your request. Please try again later."
          buttonText="Close"
          onClick={() => setIsModalOpen(false)}
        />
      );
    }

    return (
      <div className="flex flex-col items-center space-y-8">
        <div className="relative overflow-hidden aspect-square rounded-xl size-52">
          <div
            className="absolute inset-0 flex items-center justify-center border bg-white/10 animate-pulse border-white/20 "
            aria-hidden="true"
            data-placeholder
          ></div>
          <img
            src={vCard?.avatarUrl || PLACEHOLDER_IMAGE}
            alt={`${vCard?.firstName} ${vCard?.lastName}`}
            draggable="false"
            loading="eager"
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 opacity-0"
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
            <Button className="w-full">View Card</Button>
          </Link>
          <Button
            className="w-full text-white transition duration-300 bg-transparent border hover:bg-black-secondary/20"
            onClick={() => setIsModalOpen(false)}
          >
            Create Another
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
              error={errors.avatar as FieldError}
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
        {renderModalContent()}
      </Modal>
    </Layout>
  );
};

export default Create;
