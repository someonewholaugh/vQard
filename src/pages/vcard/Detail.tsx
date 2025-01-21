import { useEffect, useState } from 'react';
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
} from '@/components/icons';
import { deleteVCardById, getVCardById } from '@/firebase';
import { addToLS, decryptValue, deleteFromLS, findCardById, isCardIdInLS } from '@/utils';
import type { NoAvatarForm } from '@/types';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vCard, setVCard] = useState<NoAvatarForm | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [hasOwnership, setHasOwnership] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchVCard = async (id: string) => {
      try {
        setIsLoading(true);
        const decryptedId = decryptValue(id);
        if (!decryptedId) throw new Error('Invalid or missing ID');

        setHasOwnership(isCardIdInLS('UserCards', decryptedId));
        const localData = findCardById('UserCards', decryptedId);
        if (localData?.shortUrl) setShortUrl(localData.shortUrl);

        const data = await getVCardById(decryptedId);
        setVCard(data as NoAvatarForm);
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

    if (id) fetchVCard(id);
  }, [id]);

  const updateFavorite = (action: 'add' | 'remove') => {
    if (id) {
      const decryptedId = decryptValue(id);
      if (decryptedId) {
        if (action === 'add') {
          addToLS('Favorites', decryptedId);
          setIsFavorite(true);
        } else {
          deleteFromLS('Favorites', decryptedId);
          setIsFavorite(false);
        }
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (!id) return;
      const decryptedId = decryptValue(id);
      if (!decryptedId) throw new Error('Invalid or missing ID');

      deleteFromLS('UserCards', decryptedId);
      await deleteVCardById(decryptedId);
      navigate('/collection', { state: { deleted: true } });
    } catch (error) {
      console.error(
        'Error deleting vCard:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
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
      className="hover:bg-white/20 transition-colors duration-300 p-2 bg-white/10 rounded-full"
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

  const PLACEHOLDER_IMAGE = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
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
      <div className="max-w-screen-sm mx-auto">
        <div className="space-y-6">
          <div
            className="relative flex justify-center w-full h-full max-h-40 bg-cover bg-center rounded-xl border border-white/20 animate-pulse"
            style={{ backgroundImage: `url(${avatarUrl || PLACEHOLDER_IMAGE})` }}
            onError={(e) => (e.currentTarget.style.backgroundImage = `url(${PLACEHOLDER_IMAGE})`)}
          >
            <img
              src={avatarUrl || PLACEHOLDER_IMAGE}
              alt={`${firstName} ${lastName}`}
              draggable="false"
              loading="eager"
              onLoad={(e) => {
                const parent = e.currentTarget.parentElement!;
                parent.classList.remove('animate-pulse', 'border', 'border-white/20');
                e.currentTarget.style.opacity = '1';
              }}
              onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE)}
              className="object-cover size-32 md:size-40 z-10 opacity-0 transition-opacity duration-300"
            />
            <div className="absolute inset-0 h-full rounded-xl backdrop-blur-lg bg-black/20"></div>
          </div>
          <div className="p-6 bg-black-secondary/20 backdrop-blur-md border border-white/20 rounded-xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h1 className="text-xl md:text-2xl line-clamp-2 w-3/5">
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
              <p className="text-xs md:text-sm text-stone-400 leading-relaxed text-justify">
                {about}
              </p>

              {hasEducation && (
                <>
                  <hr className="border-white/20" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                          className="text-sm text-white hover:opacity-70 transition-opacity duration-300"
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
                          className="text-sm text-white hover:opacity-70 transition-opacity duration-300"
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
                  <div className="flex justify-center items-center space-x-2">
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
          {hasOwnership ? (
            <div className="flex items-center space-x-2.5">
              <Button className="w-full" onClick={() => setIsModalOpen(true)}>
                Share vCard
              </Button>
              <ActionMenu onDelete={handleDelete} />
            </div>
          ) : isFavorite ? (
            <Button
              className="w-full bg-transparent border border-red-500 text-red-500 hover:bg-white/5"
              onClick={() => updateFavorite('remove')}
            >
              Remove from Favorites
            </Button>
          ) : (
            <Button className="w-full" onClick={() => updateFavorite('add')}>
              Add to Favorites
            </Button>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <QrCode title={`${firstName} ${lastName}`} value={shortUrl || ''} />
      </Modal>
    </Layout>
  );
};

export default Detail;
