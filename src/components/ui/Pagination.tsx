import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaginationProps } from '@/types';
import { cn } from '@/utils';

export const Pagination = ({ totalItems, itemsPerPage }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [totalPages, currentPage, setSearchParams]);

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setSearchParams({ page: page.toString() }, { replace: true });
    }
  };
  
  const renderPageButtons = () =>
    [...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        type="button"
        className={cn(
          'flex justify-center items-center hover:bg-white/10 border border-white/20 text-white py-2 px-4 text-sm rounded-lg transition duration-300 ease-in-out',
          currentPage === index + 1 && 'bg-white text-black hover:bg-white/80'
        )}
        onClick={() => handlePageChange(index + 1)}
        aria-current={currentPage === index + 1 ? 'page' : undefined}
      >
        {index + 1}
      </button>
    ));

  return (
    <nav
      className="flex items-center space-x-2.5 justify-center text-black"
      aria-label="Pagination"
    >
      <button
        type="button"
        className="inline-flex items-center justify-center px-4 py-2 text-sm text-white transition border rounded-lg border-white/20 hover:bg-white/10 focus:outline-none disabled:opacity-60 disabled:pointer-events-none backdrop-blur-lg"
        aria-label="Previous"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <svg
          className="shrink-0 size-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span>Previous</span>
      </button>

      <div className="flex items-center space-x-2.5">{renderPageButtons()}</div>

      <button
        type="button"
        className="inline-flex items-center justify-center px-4 py-2 text-sm text-white transition border rounded-lg border-white/20 hover:bg-white/10 focus:outline-none disabled:opacity-60 disabled:pointer-events-none backdrop-blur-lg"
        aria-label="Next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span>Next</span>
        <svg
          className="shrink-0 size-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
  );
};
