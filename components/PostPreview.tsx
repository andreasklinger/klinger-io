import Link from 'next/link';
import { FC } from 'react';
import { useViews } from '../hooks';
import { PostFrontMatter } from '../types';

export const PostPreview: FC<PostFrontMatter> = ({
  title,
  summary,
  slug,
  ...post
}) => {
  const views = useViews(slug, post.views);

  return (
    <Link href={`/posts/${slug}`}>
      <a className="prevent-default group block">
        <div className="md:flex md:justify-between space-y-3 md:space-y-0 md:space-x-8 lg:space-x-10">
          <h2 className="text-gray-800 dark:text-gray-200 text-lg md:text-xl lg:text-2xl leading-normal md:leading-normal lg:leading-normal">
            {title}
          </h2>
          {views !== undefined && (
            <div className="text-base lg:text-lg text-gray-500 whitespace-nowrap">
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
