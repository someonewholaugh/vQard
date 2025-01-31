import { useEffect, useState, SyntheticEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { ActionMenu, AlertCard, Button, Modal, Spinner, Tooltip, QrCode } from '@/components/ui';
import {
  Email,
  Facebook,
  Github,
  Instagram,
  LinkedIn,
  Location,
  Phone,
  Website,
  Question,
  X,
  ArrowLeft,
} from '@/components/icons';
import { deleteVCardById, getVCardById } from '@/firebase';
import { addToLS, cn, decryptValue, deleteFromLS, findCardById, isCardIdInLS } from '@/utils';
import type { FormData } from '@/types';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vCard, setVCard] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [hasOwnership, setHasOwnership] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const decryptId = (id: string | undefined) => (id ? decryptValue(id) : null);

  useEffect(() => {
    const fetchVCard = async (decryptedId: string) => {
      try {
        setIsLoading(true);
        setHasOwnership(isCardIdInLS('Personal', decryptedId));
        const localData = findCardById('Personal', decryptedId);
        if (localData?.shortUrl) setShortUrl(localData.shortUrl);

        const data = await getVCardById(decryptedId);
        setVCard(data as FormData);
        setIsFavorite(isCardIdInLS('Favorites', decryptedId));
      } catch (error) {
        console.error(
          'Error fetching vCard:',
          error instanceof Error ? error.message : 'Unknown error'
        );
      } finally {
        setIsLoading(false);
      }
    };

    const decryptedId = decryptId(id);
    if (decryptedId) fetchVCard(decryptedId);
  }, [id]);

  const updateFavorite = (action: 'add' | 'remove') => {
    const decryptedId = decryptId(id);
    if (!decryptedId) return;

    const isAdding = action === 'add';
    isAdding ? addToLS('Favorites', decryptedId) : deleteFromLS('Favorites', decryptedId);
    setIsFavorite(isAdding);
  };

  const handleDelete = async () => {
    const decryptedId = decryptId(id);
    if (!decryptedId) return;

    try {
      deleteFromLS('Personal', decryptedId);
      await deleteVCardById(decryptedId);
      navigate('/collection', { state: { deleted: true } });
    } catch (error) {
      console.error(
        'Error deleting vCard:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const parent = e.currentTarget.parentElement!;
    parent.classList.remove('animate-pulse', 'border', 'border-white/20');
    e.currentTarget.style.opacity = '1';
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  if (isLoading) {
    return (
      <Layout title="Loading..." centerContent withHeader={false}>
        <Spinner />
      </Layout>
    );
  }

  if (!vCard) {
    return (
      <Layout title="vCard Not Found!" centerContent withHeader={false}>
        <AlertCard
          icon={<Question />}
          title="Oops! This vCard is Missing"
          message="We couldn't locate this vCard. It may have been deleted or never existed."
          buttonText="Return to Collection"
          link="/collection"
        />
      </Layout>
    );
  }

  const renderLink = (tooltip: string, url: string, Icon: React.ElementType) => (
    <Tooltip
      text={tooltip}
      className="p-2 transition-colors duration-300 rounded-full hover:bg-white/20 bg-white/10"
      moreSpacing
    >
      <Link to={url} target="_blank" rel="noopener noreferrer">
        <Icon />
      </Link>
    </Tooltip>
  );

  const {
    avatarUrl,
    firstName,
    lastName,
    email,
    phone,
    address,
    about,
    university,
    major,
    company,
    jobTitle,
    workEmail,
    workPhone,
    companyAddress,
    website,
    github,
    linkedin,
    facebook,
    instagram,
    x,
  } = vCard;

  const PLACEHOLDER_IMAGE = `https://api.dicebear.com/9.x/thumbs/svg?seed=${firstName}+${lastName}`;
  const hasSocialMedia = [website, github, linkedin, facebook, instagram, x].some(Boolean);
  const hasEducation = [university, major].some(Boolean);
  const hasWork = [company, jobTitle, workEmail, workPhone, companyAddress].some(Boolean);

  return (
    <Layout
      title={`vCard - ${firstName} ${lastName}`}
      description={about}
      withHeader={false}
      className="p-6"
    >
      <div className="relative max-w-screen-sm mx-auto">
        <div className="space-y-6">
          <div
            className="relative flex justify-center w-full h-full bg-center bg-cover border max-h-40 rounded-xl border-white/20 animate-pulse"
            style={{ backgroundImage: `url(${avatarUrl || PLACEHOLDER_IMAGE})` }}
            onError={(e) => (e.currentTarget.style.backgroundImage = `url(${PLACEHOLDER_IMAGE})`)}
          >
            <img
              src={avatarUrl || PLACEHOLDER_IMAGE}
              alt={`${firstName} ${lastName}`}
              draggable="false"
              loading="eager"
              decoding="async"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className="z-10 object-cover transition-opacity duration-300 opacity-0 size-32 md:size-40"
            />
            <div className="absolute inset-0 h-full rounded-xl backdrop-blur-lg bg-black/20"></div>
          </div>
          <div className="p-6 border bg-black-secondary/20 backdrop-blur-md border-white/20 rounded-xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h1 className="w-3/5 text-xl md:text-2xl line-clamp-2">
                  {firstName} {lastName}
                </h1>
                <div className="flex items-center space-x-2">
                  {address &&
                    renderLink(
                      'Address',
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        address
                      )}`,
                      Location
                    )}
                  {renderLink('Email', `mailto:${email}`, Email)}
                  {renderLink('Phone', `tel:${phone}`, Phone)}
                </div>
              </div>
              <p className="text-xs leading-relaxed text-justify md:text-sm text-stone-400">
                {about}
              </p>

              {hasEducation && (
                <>
                  <hr className="border-white/20" />
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {university && (
                      <div className="space-y-1.5">
                        <h1 className="text-xs uppercase tracking-[0.3em] text-stone-500">
                          University
                        </h1>
                        <p className="text-sm text-white">{university}</p>
                      </div>
                    )}
                    {major && (
                      <div className="space-y-1.5">
                        <h1 className="text-xs uppercase tracking-[0.3em] text-stone-500">Major</h1>
                        <p className="text-sm text-white">{major}</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {hasWork && (
                <>
                  <hr className="border-white/20" />
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {company && (
                      <div className="space-y-1.5">
                        <h1 className="text-xs uppercase tracking-[0.3em] text-stone-500">
                          Company
                        </h1>
                        <p className="text-sm text-white">{company}</p>
                      </div>
                    )}
                    {jobTitle && (
                      <div className="space-y-1.5">
                        <h1 className="text-xs uppercase tracking-[0.3em] text-stone-500">
                          Job Title
                        </h1>
                        <p className="text-sm text-white">{jobTitle}</p>
                      </div>
                    )}
                    {workEmail && (
                      <div className="space-y-1.5">
                        <h1 className="text-xs uppercase tracking-[0.3em] text-stone-500">
                          Work Email
                        </h1>
                        <Link
                          to={`mailto:${workEmail}`}
                          className="text-sm text-white transition-opacity duration-300 hover:opacity-70"
                        >
                          {workEmail}
                        </Link>
                      </div>
                    )}
                    {workPhone && (
                      <div className="space-y-1.5">
                        <h1 className="text-xs uppercase tracking-[0.3em] text-stone-500">
                          Work Phone
                        </h1>
                        <Link
                          to={`tel:${workPhone}`}
                          className="text-sm text-white transition-opacity duration-300 hover:opacity-70"
                        >
                          {workPhone}
                        </Link>
                      </div>
                    )}
                    {companyAddress && (
                      <div className="space-y-1.5">
                        <h1 className="text-xs uppercase tracking-[0.3em] text-stone-500">
                          Company Address
                        </h1>
                        <p className="text-sm text-white">{companyAddress}</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {hasSocialMedia && (
                <>
                  <hr className="border-white/20" />
                  <div className="flex items-center justify-center space-x-2">
                    {website && renderLink('Personal Website', website, Website)}
                    {github && renderLink('GitHub', github, Github)}
                    {linkedin && renderLink('LinkedIn', linkedin, LinkedIn)}
                    {facebook && renderLink('Facebook', facebook, Facebook)}
                    {instagram && renderLink('Instagram', instagram, Instagram)}
                    {x && renderLink('X', x, X)}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2.5">
            <Button
              className="flex-none border border-white/20 bg-white/10 backdrop-blur-lg hover:bg-white/20"
              icon={<ArrowLeft />}
              onClick={() => navigate(-1)}
            />
            {hasOwnership ? (
              <>
                <Button className="grow" onClick={() => setIsModalOpen(true)}>
                  Share vCard
                </Button>
                <ActionMenu
                  onClick={() => navigate(`/c/${encodeURIComponent(id ?? '')}/edit`)}
                  onDelete={handleDelete}
                />
              </>
            ) : (
              <Button
                className={cn(
                  'w-full',
                  isFavorite &&
                    'text-red-500 border border-red-500 hover:bg-white/10 bg-white/5 backdrop-blur-lg'
                )}
                onClick={() => updateFavorite(isFavorite ? 'remove' : 'add')}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <QrCode title={`${firstName} ${lastName}`} value={shortUrl || ''} />
      </Modal>
    </Layout>
  );
};

export default Detail;
