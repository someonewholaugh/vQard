import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { AlertCard, Button, Pagination, UserCards, Spinner, Tabs, Toast } from '@/components/ui';
import { Empty, Question } from '@/components/icons';
import { getStoredVCards } from '@/firebase';
import { getFromLS } from '@/utils';
import { FormData } from '@/types';

const ITEMS_PER_PAGE = 8;

const Collection = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleted, setDeleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [personalCards, setPersonalCards] = useState<FormData[]>([]);
  const [favoriteCards, setFavoriteCards] = useState<FormData[]>([]);
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (state?.deleted) {
      setDeleted(true);
      navigate(pathname, { replace: true });
    }
  }, [state, navigate]);

  useEffect(() => {
    const fetchFromLS = async (storageKey: string) => {
      const data = getFromLS(storageKey);
      return data?.length ? await getStoredVCards(data) : [];
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [personalResults, favResults] = await Promise.all([
          fetchFromLS('Personal'),
          fetchFromLS('Favorites'),
        ]);
        setPersonalCards(personalResults);
        setFavoriteCards(favResults);
      } catch (error) {
        console.error('Error fetching vCards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Layout
        title="Loading Your Collection..."
        description="Please wait while we fetch your saved vCards"
        centerContent
      >
        <Spinner />
      </Layout>
    );
  }

  if (!personalCards.length && !favoriteCards.length) {
    return (
      <Layout
        title="Your Collection is Empty"
        description="Create your first digital card and start networking effortlessly."
        centerContent
      >
        <AlertCard
          icon={<Empty />}
          title="Nothing Here Yet"
          message="You haven’t created any vCards. Kickstart your collection and make connections with ease!"
        >
          <div className="w-full space-y-4">
            <Button className="w-full" onClick={() => navigate('/create')}>
              Create Your First Card
            </Button>
            <Button
              className="w-full transition border hover:bg-white/20 bg-white/10 border-white/20 text-inherit"
              onClick={() => navigate('/discover')}
            >
              Discover Profiles
            </Button>
          </div>
        </AlertCard>
      </Layout>
    );
  }

  const getPaginatedData = (list: FormData[]) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return list.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const handleOnDelete = (id: string, listType: 'Personal' | 'Favorites') => {
    const setState = listType === 'Personal' ? setPersonalCards : setFavoriteCards;
    setState((prev) => prev.filter((card) => card.id !== id));
  };

  const renderTabContent = (list: FormData[], listType: 'Personal' | 'Favorites') => {
    if (!list.length) {
      return (
        <div className="flex flex-col space-y-6 items-center justify-center col-span-full h-[60vh]">
          <Question />
          <p className="text-sm text-stone-400">No {listType.toLowerCase()} cards found!</p>
        </div>
      );
    }

    const paginatedList = getPaginatedData(list);

    return (
      <div className='space-y-8'>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {paginatedList.map((card) => (
            <UserCards
              key={card.id}
              {...card}
              listType={listType}
              onDelete={(id) => handleOnDelete(id, listType)}
            />
          ))}
        </div>
        <Pagination
          totalItems={list.length}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  };

  const tabData = [
    {
      label: 'Personal',
      content: renderTabContent(personalCards, 'Personal'),
    },
    {
      label: 'Favorites',
      content: renderTabContent(favoriteCards, 'Favorites'),
    },
  ];

  return (
    <Layout title="Collection" className="pt-32 pb-8">
      {deleted && (
        <Toast
          message="Your vCard has been successfully deleted."
          onClose={() => setDeleted(false)}
        />
      )}
      <Tabs tabs={tabData} />
    </Layout>
  );
};

export default Collection;
