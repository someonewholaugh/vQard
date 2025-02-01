import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { AlertCard, Pagination, UserCards, Spinner } from '@/components/ui';
import { Community } from '@/components/icons';
import { getAllVCards } from '@/firebase';
import { FormData } from '@/types';

const ITEMS_PER_PAGE = 8;

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userCards, setUserCards] = useState<FormData[]>([]);
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchAllCards = async () => {
      setIsLoading(true);
      try {
        const cards = await getAllVCards();
        setUserCards(cards);
      } catch (error) {
        console.error('Error fetching vCards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCards();
  }, []);

  if (isLoading) {
    return (
      <Layout title="Loading Profiles..." description="Fetching latest profiles..." centerContent>
        <Spinner />
      </Layout>
    );
  }

  if (!userCards.length) {
    return (
      <Layout
        title="No Profiles Yet"
        description="Be the first to create your digital card!"
        centerContent
      >
        <AlertCard
          icon={<Community />}
          title="Be the Pioneer"
          message="Start something new! Create the first digital card and shape the future of this community."
          buttonText="Create Your Card"
          link="/create"
        />
      </Layout>
    );
  }

  const displayedCards = userCards.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  return (
    <Layout title="Discover Profiles" className="pt-32 pb-8 space-y-8">
      <div className="w-full space-y-1 text-left">
        <h1 className="text-lg tracking-wide md:text-xl">Discover</h1>
        <p className="text-[0.7rem] md:text-xs tracking-wide text-stone-400">
          Explore digital cards, save your favorites, and connect with others.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {displayedCards.map((card) => (
          <UserCards key={card.id} {...card} isDiscover />
        ))}
      </div>
      <Pagination
        totalItems={userCards.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
};

export default Discover;
