import { FC } from 'react';
import { PostFrontMatter } from '../types';
import { PostPreview } from './PostPreview';

interface PostListProps {
  className?: string;
  posts: PostFrontMatter[];
}

export const PostList: FC<PostListProps> = ({ className, posts }) => (
  <ul
    className={`prevent-default space-y-8 md:space-y-10 lg:space-y-12 ${className}`}
  >
    {posts.map((post) => (
      <li key={post.slug}>
        <PostPreview headingAs="h2" {...post} />
      </li>
    ))}
  </ul>
);
