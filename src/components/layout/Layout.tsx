import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import type { LayoutProps } from '@/types';
import { Header } from '@/components/layout';
import { cn } from '@/utils';

export const Layout = ({
  title = import.meta.env.VITE_APP_TITLE,
  description = import.meta.env.VITE_APP_DESCRIPTION,
  centerContent = false,
  withHeader = true,
  className,
  ogImage,
  children,
}: LayoutProps) => {
  const { pathname } = useLocation();
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const url = `${baseUrl}${pathname}`;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title} - vQard</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="preconnect" href="https://firestore.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://api.dicebear.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.dicebear.com" />
      </Helmet>
      {withHeader && <Header path={pathname} />}
      <main
        className={cn(
          'container max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto px-6',
          centerContent && 'flex items-center justify-center h-screen',
          className
        )}
      >
        {children}
      </main>
    </HelmetProvider>
  );
};
