import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import type { LayoutProps } from '@/types';
import { Header } from '@/components/layout';
import { cn } from '@/utils';

export const Layout = ({
  title = import.meta.env.VITE_APP_TITLE,
  description = import.meta.env.VITE_APP_DESCRIPTION,
  centerContent = false,
  children,
}: LayoutProps) => {
  const { pathname } = useLocation();
  const url = `${import.meta.env.VITE_APP_BASE_URL}${pathname}`;

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
      </Helmet>
      <Header />
      <main
        className={cn(
          'container max-w-screen-lg mx-auto px-6',
          centerContent && 'flex items-center justify-center min-h-screen'
        )}
      >
        {children}
      </main>
    </HelmetProvider>
  );
};
