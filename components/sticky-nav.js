import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useRouter } from 'next/router';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const [onTop, setOnTop] = useState(true);
  // sets class dark to html
  const { theme, setTheme } = useTheme();
  const { route } = useRouter();

  const handleScroll = () => {
    if (onTop !== (window.pageYOffset === 0)) {
      setOnTop(window.pageYOffset === 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <header
      className={`${
        onTop ? '' : 'shadow-sm'
      } sticky top-0 z-10 transition-shadow`}
    >
      <div className='from-accent-100 to-accent-300 via-accent-200 h-2 bg-gradient-to-tr'></div>
      <nav className='bg-white transition-colors dark:bg-dark'>
        <ul className='mx-auto flex max-w-4xl items-center justify-between p-4 px-4'>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link href={href}>
                  <a
                    className={`${
                      route === href || route === href + '/[slug]'
                        ? 'text-transparent'
                        : 'text-black dark:text-white'
                    } hover:text-accent-200  dark:hover:text-accent-200 font-medium`}
                  >
                    <span
                      className={`${
                        (route === href || route === href + '/[slug]') &&
                        'accent'
                      }`}
                    >
                      {label}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <button
            className='border-thin dark:hover:border-accent-200 dark:hover:text-accent-200 hover:border-accent-200 hover:text-accent-200 rounded-md p-2.5 focus:outline-none'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
        </ul>
      </nav>
    </header>
  );
}