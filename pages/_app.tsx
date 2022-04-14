import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useEffect, useMemo, useState } from 'react';
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
  const [background, setBackground] = useState<string>();
  const animationFrameRequest = useRef<any>();

  // Track Google Analytics pageviews when route changes
  useEffect(() => {
    router.events.on('routeChangeComplete', trackAnalyticsPageview);
    return () => {
      router.events.off('routeChangeComplete', trackAnalyticsPageview);
    };
  }, [router.events]);

  // Set initial theme based on user's prefers color scheme
  useEffect(() => {
    setTheme(
      window?.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );
  }, []);

  // Add or remove dark class when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  /**
   * It randomly updates the page background.
   */

  const backgroundRenderingSettings = {
    colors: ['#00A5FF', '#00FFC4', '#4500FF'],
    opacityRange: {min: 30, max: 60},
    opacityIncrement: 0.6,
    fps: 30,
    sectionHeight: 700,
    sideOffset: 15,
    startSide: Math.round(Math.random()),
    positionEntropy: Math.floor(Math.random() * 12 - 6)
  }

  const updateBackground = (opacity: number) => {
    const { scrollHeight } = document.documentElement;
    const sectionHeight = backgroundRenderingSettings.sectionHeight;
    const colors = backgroundRenderingSettings.colors;
    const sections = Math.floor(scrollHeight / sectionHeight);
    const nextBackground = [];
    for (let i = 0; i < sections; i++) {
      const left =
        ((i + backgroundRenderingSettings.startSide) % 2 ?
          backgroundRenderingSettings.sideOffset : 100-backgroundRenderingSettings.sideOffset) + backgroundRenderingSettings.positionEntropy;
      const top = i * sectionHeight + sectionHeight / 2;
      const hexOpacity = Math.round(opacity/100*255).toString(16);
      const color = colors[i % colors.length];
      nextBackground.push(
        `radial-gradient(circle at ${left}% ${top}px, ${color}${hexOpacity}, ${color}00 500px)`
      );
    }
    setBackground(nextBackground.join(', '));  
  };

  const renderBackground = (opacity: number, animationDirection: number, tick: number) => {
    if (tick % ~~(1000/backgroundRenderingSettings.fps) == 0) {
      if (~~opacity == backgroundRenderingSettings.opacityRange.min || ~~opacity == backgroundRenderingSettings.opacityRange.max) {
        animationDirection *= -1
      }

      opacity += animationDirection * backgroundRenderingSettings.opacityIncrement
      updateBackground(opacity) 
    }
    
    animationFrameRequest.current = requestAnimationFrame(() => renderBackground(opacity, animationDirection, ++tick))
  }

  useEffect(() => {
    animationFrameRequest.current = requestAnimationFrame(() => renderBackground(backgroundRenderingSettings.opacityRange.max, 1, 0));
    return () => cancelAnimationFrame(animationFrameRequest.current) 
  }, []); 

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
        <div className="w-full h-full absolute z-[-1] top-0 left-0">
          <div
            className="w-full h-full opacity-30 dark:opacity-[.35]"
            style={{ background }}
          />
        </div>

        <header className="w-full fixed z-20 top-0 left-0 bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-60 backdrop-blur p-4 md:p-5 lg:py-6 lg:px-10">
          <nav className="flex justify-between">
            <Link href="/">
              <a className="prevent-default max-w-[45%] p-3 -m-3 text-base sm:text-lg lg:text-xl text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100 font-semibold transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                Andreas Klinger
              </a>
            </Link>

            <div className="flex items-center space-x-3 sm:space-x-6 md:space-x-8 lg:space-x-10 text-gray-600 dark:text-gray-400 transition-colors">
              <Link href="/posts">
                <a className="prevent-default p-3 -m-3 text-base lg:text-lg hover:text-gray-800 dark:hover:text-gray-200">
                  Posts
                </a>
              </Link>

              <a
                className="prevent-default p-3 -m-3 text-base lg:text-lg hover:text-gray-800 dark:hover:text-gray-200"
                href="/rss.xml"
                target="_blank"
                rel="noreferrer"
              >
                RSS
              </a>

              <button
                className="w-4 lg:w-5 h-4 lg:h-5 box-content p-3 -m-3 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                type="button"
              >
                <ThemeIcon />
              </button>
            </div>
          </nav>
        </header>

        <main className="min-h-screen container pt-28 md:pt-36 lg:pt-44 pb-16 md:pb-24 lg:pb-32">
          <Component {...pageProps} />
        </main>

        <footer className="md:flex md:justify-between text-gray-500 space-y-2 md:space-y-0 px-4 pb-6 md:px-5 md:pb-4 lg:px-10 lg:pb-5">
          <div>&copy; Copyright {new Date().getFullYear()} Andreas Klinger</div>
          <div className="text-sm md:text-base leading-loose">
            <a
              className="prevent-default space-x-1"
              href="https://github.com/andreasklinger/klinger-io"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon className="h-5 md:h-6 inline" />{' '}
              <span className="underline">Source Code</span>
            </a>
            <span> | Developed by </span>
            <a
              className="prevent-default underline"
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
