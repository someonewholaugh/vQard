import { Link } from 'react-router-dom';
import { Tooltip } from '@/components/ui';
import { Github, Create } from '@/components/icons';

const navItems = [
  { icon: <Github />, href: 'https://github.com/zangetsuuuu/vQard', tooltip: 'View on GitHub' },
  { icon: <Create />, href: '/create', tooltip: 'Create a new card' },
];

export const Header = () => {
  return (
    <header className="absolute w-[90%] lg:w-full md:max-w-screen-lg mx-auto left-0 right-0 top-4 z-50 py-3.5 px-4 md:px-6 bg-black-secondary/80 backdrop-blur-lg rounded-lg">
      <nav className="flex items-center justify-between">
        <Link to="/" className="text-xl transition-transform hover:-translate-y-0.5">
          vQard
        </Link>
        <div className="flex items-center space-x-4">
          {navItems.map(({ icon, href, tooltip }, index) => (
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
      </nav>
    </header>
  );
};
