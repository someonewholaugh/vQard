import type { HeaderProps } from '@/types';
import { Link } from 'react-router-dom';
import { Tooltip } from '@/components/ui';
import { Github, Create, Collection, Discover } from '@/components/icons';
import { cn } from '@/utils';

const navItems = [
  {
    icon: <Github />,
    href: 'https://github.com/zangetsuuuu/vQard',
    tooltip: 'View on GitHub',
  },
  {
    icon: <Create />,
    href: '/create',
    tooltip: 'Create a new card',
  },
  {
    icon: <Collection />,
    href: '/collection',
    tooltip: 'View your collection',
  },
  {
    icon: <Discover />,
    href: '/discover',
    tooltip: 'Discover profiles',
  },
];

export const Header = ({ path }: HeaderProps) => {
  const visibleNavItems = navItems.filter(({ href }) => path !== href);

  return (
    <header className="fixed w-[90%] md:w-[95%] lg:w-full md:max-w-screen-lg mx-auto left-0 right-0 top-4 z-50 py-3.5 px-4 md:px-6 bg-black-secondary/80 backdrop-blur-md rounded-lg">
      <nav className="flex items-center justify-between">
        <Link to="/" className="text-xl transition-transform hover:-translate-y-0.5">
          vQard
        </Link>
        {visibleNavItems.length > 0 && (
          <div className={cn('flex items-center', visibleNavItems.length > 1 && 'space-x-4')}>
            {visibleNavItems.map(({ icon, href, tooltip }, index) => (
              <Tooltip key={index} text={tooltip}>
                <Link
                  to={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  {icon}
                </Link>
              </Tooltip>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
