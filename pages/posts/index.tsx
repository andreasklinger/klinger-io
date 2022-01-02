import { GetStaticProps, NextPage } from 'next';
import { useMemo, useState } from 'react';
import { Head, PostList } from '../../components';
import { getFrontMatterOfPosts } from '../../helpers/getFrontMatterOfPosts';
import { PostFrontMatter } from '../../types';

interface PostsPageProps {
  posts: PostFrontMatter[];
}

// Build time Node.js code
export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
  // Create list with all blog post
  const posts = await getFrontMatterOfPosts();

  // Return page props
  return { props: { posts } };
};

// Client side React.js code
const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
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
        title="All blog posts | Andreas Klinger"
        // TODO: Replace lorem ipsum text
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa cum sociis natoque penatibus."
      />

      <h1>All blog posts</h1>
      <p>
        {/* TODO: Replace lorem ipsum text */}
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa cum sociis natoque penatibus.
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

export default PostsPage;
