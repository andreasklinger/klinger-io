import { FC } from 'react';
import { PostFrontMatter } from '../types';
import { PostPreview } from './PostPreview';
import { PostSeparator } from './PostSeparator';

interface PostListProps {
  className?: string;
  posts: PostFrontMatter[];
}

export const PostList: FC<PostListProps> = ({ className, posts }) => (
  <ul
    className={`prevent-default space-y-10 md:space-y-12 lg:space-y-14 ${className}`}
  >
    {posts.map((post, index) => (
      <li key={post.slug} className="space-y-10 md:space-y-12 lg:space-y-14">
        <PostSeparator
          currentPost={post}
          previousPost={posts[index - 1]}
          posts={posts}
        />
        <PostPreview {...post} />
      </li>
    ))}
  </ul>
);
