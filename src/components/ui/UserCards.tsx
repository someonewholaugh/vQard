import { useEffect, useState, useMemo, SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ActionMenu, Button } from '@/components/ui';
import { Favorite, FavoriteOutline } from '@/components/icons';
import { deleteVCardById } from '@/firebase';
import { addToLS, deleteFromLS, encryptValue, formatDate, isCardIdInLS } from '@/utils';
import { UserCardsProps } from '@/types';

export const UserCards = ({
  id,
  avatarUrl,
  firstName,
  lastName,
  about,
  createdAt,
  listType,
  isDiscover = false,
  onDelete,
}: UserCardsProps) => {
  if (!id) return null;

  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [hasOwnership, setHasOwnership] = useState<boolean>(false);
  const PLACEHOLDER_IMAGE = `https://api.dicebear.com/9.x/thumbs/svg?seed=${firstName}+${lastName}`;

  useEffect(() => {
    setHasOwnership(isCardIdInLS('Personal', id));
    setIsFavorite(isCardIdInLS('Favorites', id));
  }, [id]);

  const { cardUrl, edit } = useMemo(() => {
    const encodedId = encodeURIComponent(encryptValue(id));
    return {
      cardUrl: `/c/${encodedId}`,
      edit: `/c/${encodedId}/edit`,
    };
  }, [id]);

  const updateFavorite = (action: 'add' | 'remove') => {
    const isAdding = action === 'add';
    isAdding ? addToLS('Favorites', id) : deleteFromLS('Favorites', id);
    setIsFavorite(isAdding);
  };

  const handleDelete = async () => {
    try {
      deleteFromLS('Personal', id);
      await deleteVCardById(id);
      onDelete?.(id);
      navigate('/collection', { state: { deleted: true } });
    } catch (error) {
      console.error(
        'Error deleting vCard:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.parentElement?.classList.remove('animate-pulse');
    e.currentTarget.style.opacity = '1';
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  return (
    <div className="relative overflow-hidden border rounded-lg border-white/20 h-64 md:h-72 max-h-64 md:max-h-72 animate-pulse group bg-white/10 backdrop-blur-lg">
      <img
        src={avatarUrl || PLACEHOLDER_IMAGE}
        alt={`${firstName} ${lastName}`}
        draggable="false"
        loading="eager"
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className="object-cover object-center w-full h-full"
      />

      <div className="absolute inset-0 p-3 md:p-4 transition-opacity duration-300 opacity-0 bg-black/60 backdrop-blur-lg group-hover:opacity-100">
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-1.5 md:space-y-2.5">
            <div className="flex items-center justify-between">
              <h1 className="w-full md:w-3/5 text-sm md:text-base truncate">{`${firstName} ${lastName}`}</h1>
              {createdAt && (
                <time className="text-xs hidden md:inline-flex text-stone-400">
                  {formatDate(createdAt.toDate())}
                </time>
              )}
            </div>
            <p className="text-[0.625rem] md:text-xs leading-relaxed line-clamp-3 md:line-clamp-5 text-stone-400">
              {about || 'No additional details provided.'}
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <Link to={cardUrl} className="w-full">
              <Button className="w-full">
                View <span className="hidden md:inline-flex">Card</span>
              </Button>
            </Link>
            {(isDiscover && !hasOwnership) || listType === 'Favorites' ? (
              <button
                type="button"
                className="px-4 py-2 transition-colors duration-300 border rounded-md border-white/20 bg-white/10 backdrop-blur-lg hover:bg-white/20 focus:outline-none"
                onClick={() => updateFavorite(isFavorite ? 'remove' : 'add')}
              >
                {isFavorite ? <Favorite color="red" /> : <FavoriteOutline color="red" />}
              </button>
            ) : null}
            {!isDiscover && hasOwnership && (
              <ActionMenu onClick={() => navigate(edit)} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
