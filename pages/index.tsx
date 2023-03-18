import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Head, Image, PostList } from '../components';
import { generateRssFeed } from '../helpers/generateRssFeed';
import { getFrontMatterOfPosts } from '../helpers/getFrontMatterOfPosts';
import { TwitterColorIcon, LinkedInColorIcon, GitHubIcon } from '../icons';
import { PostFrontMatter } from '../types';

interface HomePageProps {
  posts: PostFrontMatter[];
}

// Build time Node.js code
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Create list with all blog post
  const posts = await getFrontMatterOfPosts();

  // Genearte RSS feed and add it to public directory
  generateRssFeed(
    {
      title: 'Blog posts of Lukas Bernert',
      description:
        'Learn more about startups, remote work, funding, software and useful tools I use. In the blog posts I share my experience from the past 10+ years.',
    },
    posts
  );

  // Return page props
  return { props: { posts } };
};

// Client side React.js code
const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  // Create search state
  const [search, setSearch] = useState('');

  // Create filtered posts list
  const filteredPosts = useMemo(
    () =>
      posts.filter(({ title }) =>
        title.toLowerCase().includes(search.toLowerCase())
      ),
    [posts, search]
  );

  return (
    <>
      <Head
        title="Lukas Bernert"
        description="blub"
      />

      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
        <Image
          className="prevent-default w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 rounded-full"
          src="/images/"
          alt="Lukas Bernert"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
        />
        <h1>Hey! ✌️</h1>
      </div>

      <p className="mt-6 md:mt-8 lg:mt-10">My name is Lukas Bernert.</p>
      <p>
        This is my site.
      </p>

      <ul className="prevent-default flex space-x-8 md:space-x-9 lg:space-x-10 mt-6 md:mt-8 lg:mt-10">
        {[
          {
            Icon: TwitterColorIcon,
            href: 'https://twitter.com/andreasklinger',
          },
          {
            Icon: LinkedInColorIcon,
            href: 'https://www.linkedin.com/in/andreasklinger',
          },
          {
            Icon: GitHubIcon,
            href: 'https://github.com/andreasklinger',
          },
        ].map(({ href, Icon }) => (
          <li key={href}>
            <a
              className="prevent-default h-8 lg:h-9 block text-black dark:text-white"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
      <p>
        <small>
          PS: If you find typos or got ideas how to improve articles, feel free
          to{' '}
          <a href="https://github.com/andreasklinger/klinger-io">
            send me a pull request
          </a>
        </small>
      </p>

      <input
        className="w-full sticky z-30 top-16 md:top-20 lg:top-24 xl:top-1.5 border-2 bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-60 backdrop-blur border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 focus:border-sky-400 dark:focus:border-sky-600 outline-none rounded-2xl py-3 lg:py-4 px-4 md:px-5 lg:px-6 mt-12 md:mt-16 lg:mt-20 placeholder-gray-500 text-base lg:text-lg text-gray-700 dark:text-gray-300 transition-colors"
        type="text"
        placeholder="Search blog posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredPosts.length ? (
        <PostList className="mt-12 md:mt-16 lg:mt-20" posts={filteredPosts} />
      ) : (
        <p className="mt-12 md:mt-16 lg:mt-20">
          The post you are looking for does not exist yet. 😬
        </p>
      )}
    </>
  );
};

export default HomePage;
