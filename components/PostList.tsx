import { FC } from 'react';
import { PostFrontMatter } from '../types';
import { PostPreview } from './PostPreview';

interface PostListProps {
  className?: string;
  posts: PostFrontMatter[];
}

export const PostList: FC<PostListProps> = ({ className, posts }) => (
  <ul
    className={`prevent-default space-y-10 md:space-y-12 lg:space-y-14 ${className}`}
  >
    {posts.map((post) => (
      <li key={post.slug}>
        <PostPreview headingAs="h2" {...post} />
      </li>
    ))}
  </ul>
);
