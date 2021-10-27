import Link from 'next/link';
import { FC } from 'react';
import { useViews } from '../hooks';
import { PostFrontMatter } from '../types';

interface PostPreviewProps extends PostFrontMatter {
  headingAs: 'h2' | 'h3';
}

export const PostPreview: FC<PostPreviewProps> = ({
  title,
  summary,
  slug,
  headingAs: Heading,
  ...post
}) => {
  const views = useViews(slug, post.views);

  return (
    <Link href={`/posts/${slug}`}>
      <a className="prevent-default group">
        <div className="md:flex md:justify-between space-y-3 md:space-y-0 md:space-x-8 lg:space-x-10">
          <Heading className="text-coolGray-800 dark:text-coolGray-200 text-lg md:text-xl lg:text-2xl leading-normal md:leading-normal lg:leading-normal">
            {title}
          </Heading>
          {views !== undefined && (
            <div className="text-base lg:text-lg text-coolGray-500 whitespace-nowrap">
              {views} views
            </div>
          )}
        </div>
        <p className="mt-2 md:mt-4 lg:mt-6">{summary} </p>
        <div className="text-base lg:text-lg text-sky-600 dark:text-sky-400 opacity-75 group-hover:opacity-100 transition-opacity mt-2 lg:mt-3">
          Read more...
        </div>
      </a>
    </Link>
  );
};
