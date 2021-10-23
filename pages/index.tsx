import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Head, Image, PostList } from '../components';
import { getFrontMatterOfPosts } from '../helpers/getFrontMatterOfPosts';
import {
  TwitterColorIcon,
  LinkedInColorIcon,
  GitHubIcon,
  InstagramColorIcon,
  ArrowLeftIcon,
} from '../icons';
import { PostFrontMatter } from '../types';

// Build time Node.js code
export const getStaticProps: GetStaticProps = async () => {
  // Create list with all blog post
  const allPosts = await getFrontMatterOfPosts();

  // Create list of 3 latest posts in last 6 months
  const minDate = new Date(Date.now() - 15778800000)
    .toISOString()
    .split('T')[0];
  const latestPosts = allPosts
    .filter(({ publishedAt }) => publishedAt >= minDate)
    .slice(0, 3);

  // Create list of 3 most viewed posts
  const popularPosts = allPosts
    .sort((a, b) => (a.views < b.views ? 1 : -1))
    .slice(0, 3);

  // Return page props
  return { props: { latestPosts, popularPosts } };
};

interface PostsPageProps {
  latestPosts: PostFrontMatter[];
  popularPosts: PostFrontMatter[];
}

// Client side React.js code
const HomePage: NextPage<PostsPageProps> = ({ latestPosts, popularPosts }) => (
  <>
    <Head
      title="Blog of Andreas Klinger"
      description="I am a product/eng-guy good in two things: Making people believe I am good in anything at all and making stuff worth a tweet. On this website I share notes & thoughts."
    />

    <h1>Blog of Andreas Klinger</h1>

    <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6 mt-12 md:mt-16 lg:mt-20">
      <Image
        className="prevent-default w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 rounded-full"
        src="/images/andreas-klinger.jpg"
        alt="Andreas Klinger"
        sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
      />
      <h2>About me</h2>
    </div>

    {/* TODO: Replace lorem ipsum text */}
    <p className="mt-6 md:mt-8 lg:mt-10">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus.
    </p>
    <p>
      Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
      consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
      vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis
      vitae, justo. Nullam dictum felis eu pede mollis pretium.
    </p>
    <p>
      Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
      vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat
      vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
      feugiat a, tellus.
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
        {
          Icon: InstagramColorIcon,
          href: 'https://www.instagram.com/andreasklinger',
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

    {latestPosts.length > 0 && (
      <>
        <h2 className="mt-12 md:mt-16 lg:mt-20">
          Latest post{latestPosts.length > 1 ? 's' : ''}
        </h2>
        <PostList className="mt-8 md:mt-10 lg:mt-12" posts={latestPosts} />
      </>
    )}

    <h2 className="mt-12 md:mt-16 lg:mt-20">Popular posts</h2>
    <PostList className="mt-8 md:mt-10 lg:mt-12" posts={popularPosts} />

    <div className="mt-8 md:mt-10 lg:mt-12">
      <Link href="/posts">
        <a className="prevent-default group p-3 -m-3 inline-flex items-center space-x-3">
          <span className="text-base lg:text-lg text-sky-600 dark:text-sky-400 font-bold whitespace-nowrap">
            All posts
          </span>
          <ArrowLeftIcon className="h-3 text-coolGray-300 group-hover:text-coolGray-400 dark:text-coolGray-700 dark:group-hover:text-coolGray-600 group-hover:translate-x-2 transition-all" />
        </a>
      </Link>
    </div>
  </>
);

export default HomePage;
