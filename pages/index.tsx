import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Head, Image, LinkButton, PostList } from '../components';
import { getFrontMatterOfPosts } from '../helpers/getFrontMatterOfPosts';
import { TwitterColorIcon, LinkedInColorIcon, GitHubIcon } from '../icons';
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
      title="Andreas Klinger"
      description="I am a product/eng-guy good in two things: Making people believe I am good in anything at all and making stuff worth a tweet. On this website I share notes &amp; thoughts."
    />

    <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
      <Image
        className="prevent-default w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 rounded-full"
        src="/images/andreas-klinger.jpg"
        alt="Andreas Klinger"
        sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
      />
      <h1>Hey! ✌️</h1>
    </div>

    <p className="mt-6 md:mt-8 lg:mt-10">My name is Andreas Klinger.</p>
    <p>
      I was founding team &amp; CTO of{' '}
      <a href="https://www.producthunt.com" target="_blank" rel="noreferrer">
        Product Hunt
      </a>
      , VPE of{' '}
      <a href="https://www.coinlist.co" target="_blank" rel="noreferrer">
        CoinList
      </a>
      , Head of Remote at{' '}
      <a href="https://www.angellist.com" target="_blank" rel="noreferrer">
        AngelList
      </a>
      , and currently I work as CTO at{' '}
      <a href="https://www.beondeck.com">On Deck</a>.
    </p>
    <p>
      I also angel invest via{' '}
      <a href="https://remotefirstcapital.com" target="_blank" rel="noreferrer">
        Remote First Capital
      </a>
      .
    </p>

    <p>
      I was lucky to learn from{' '}
      <Link href="/posts/🙏">
        <a>a lot of people</a>
      </Link>{' '}
      throughout my career.
      <br />
      On this page I try to{' '}
      <Link href="/posts/">
        <a>summarize some learnings</a>
      </Link>
      .
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
        PS: If you find typos or got ideas how to improve articles, feel free to{' '}
        <a href="https://github.com/andreasklinger/klinger-io">
          send me a pull request
        </a>
      </small>
    </p>

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

    <LinkButton className="mt-8 md:mt-10 lg:mt-12" href="/posts">
      All posts
    </LinkButton>
  </>
);

export default HomePage;
