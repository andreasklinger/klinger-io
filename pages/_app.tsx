import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useEffect, useMemo, useState, useLayoutEffect } from 'react';
import { trackAnalyticsPageview } from '../helpers/trackAnalyticsPageview';
import { ThemeIcon, GitHubIcon } from '../icons';
import 'tailwindcss/tailwind.css';
import '../styles/font.css';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  // Add Next.js router hook
  const router = useRouter();

  // Create theme and background state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const gradientElementRef = useRef<HTMLDivElement>(null);
  const opacityElementRef = useRef<HTMLDivElement>(null);

  // Track Google Analytics pageviews when route changes
  useEffect(() => {
    router.events.on('routeChangeComplete', trackAnalyticsPageview);
    return () => {
      router.events.off('routeChangeComplete', trackAnalyticsPageview);
    };
  }, [router.events]);

  // Set initial theme based on user's prefers color scheme
  useLayoutEffect(() => {
    setTheme(
      window?.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );
  }, []);

  // Add or remove dark class when theme changes
  useLayoutEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  /**
   * It randomly updates the page background.
   */
  const updateBackground = () => {
    const { scrollHeight } = document.documentElement;
    const sectionHeight = 700;
    const colors = ['#00A5FF', '#00FFC4', '#4500FF'];
    const startSide = Math.round(Math.random());
    const nextBackground = [];
    for (let i = 0; i < scrollHeight / sectionHeight; i++) {
      const left =
        (i + startSide) % 2 ? 15 : 85 + Math.floor(Math.random() * 12 - 6);
      const top = i * sectionHeight + sectionHeight / 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      nextBackground.push(
        `radial-gradient(circle at ${left}% ${top}px, ${color}, ${color}00 500px)`
      );
    }
    gradientElementRef.current!.style.background = nextBackground.join(', ');
  };

  // Set initial background and update it when path or window size change
  useEffect(updateBackground, [router.asPath]);
  useEffect(() => window.addEventListener('resize', updateBackground), []);

  // Create background color depending on theme
  const bgColor = useMemo(
    () => (theme === 'light' ? '#ffffff' : '#000000'),
    [theme]
  );

  return (
    <>
      <Head>
        <meta name="theme-color" content={bgColor} />
        <meta name="msapplication-TileColor" content={bgColor} />
      </Head>

      <div className="relative">
        <div
          className="w-full h-full absolute z-[-1] top-0 left-0"
          ref={opacityElementRef}
        >
          <div
            className="w-full h-full opacity-5 dark:opacity-10"
            ref={gradientElementRef}
          />
        </div>

        <header className="fixed top-0 left-0 z-20 w-full p-4 bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-60 backdrop-blur md:p-5 lg:py-6 lg:px-10">
          <nav className="flex justify-between">
            <Link
              href="/"
              className="prevent-default max-w-[45%] p-3 -m-3 text-base sm:text-lg lg:text-xl text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100 font-semibold transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
            >
              Andreas Klinger
            </Link>

            <div className="flex items-center space-x-3 text-gray-600 transition-colors sm:space-x-6 md:space-x-8 lg:space-x-10 dark:text-gray-400">
              <a
                className="p-3 -m-3 text-base prevent-default lg:text-lg hover:text-gray-800 dark:hover:text-gray-200"
                href="/rss.xml"
                target="_blank"
                rel="noreferrer"
              >
                RSS
              </a>

              <button
                className="box-content w-4 h-4 p-3 -m-3 lg:w-5 lg:h-5 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                type="button"
              >
                <ThemeIcon />
              </button>
            </div>
          </nav>
        </header>

        <main className="container min-h-screen pb-16 pt-28 md:pt-36 lg:pt-44 md:pb-24 lg:pb-32">
          <Component {...pageProps} />
        </main>

        <footer className="px-4 pb-6 space-y-2 text-gray-500 md:flex md:justify-between md:space-y-0 md:px-5 md:pb-4 lg:px-10 lg:pb-5">
          <div>&copy; Copyright {new Date().getFullYear()} Andreas Klinger</div>
          <div className="text-sm leading-loose md:text-base">
            <a
              className="space-x-1 prevent-default"
              href="https://github.com/andreasklinger/klinger-io"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon className="inline h-5 md:h-6" />{' '}
              <span className="underline">Source Code</span>
            </a>
            <span> | Developed by </span>
            <a
              className="underline prevent-default"
              href="https://megalink.io/fabian"
              target="_blank"
              rel="noreferrer"
            >
              Fabian Hiller
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
