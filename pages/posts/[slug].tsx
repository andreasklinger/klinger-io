import { readFileSync, readdirSync } from 'fs';
import { GetStaticProps, NextPage } from 'next';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { join } from 'path';
import { useEffect, useMemo } from 'react';
import getReadingTime from 'reading-time';
import { Head, PostImage } from '../../components';
import { fetchDatabase } from '../../helpers/fetchDatabase';
import { useViews } from '../../hooks';
import { PostFrontMatter, Post } from '../../types';

// Build time Node.js code
export async function getStaticPaths() {
  // Get blog post file names
  const fileNames = readdirSync(join(process.cwd(), 'posts'));

  // Retun path of every blog post
  return {
    paths: fileNames.map((fileName) => ({
      params: {
        slug: fileName.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
}

interface PostPageProps {
  post: Post;
}

// Build time Node.js code
export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  // Get slug of post from params
  const slug = params!.slug as string;

  // Read and bundle MDX source code
  const filePath = join(process.cwd(), 'posts', `${slug}.mdx`);
  const mdxSource = readFileSync(filePath, 'utf8');
  const bundleResult = await bundleMDX({ source: mdxSource });

  // Create necessary post data for client
  const sourceCode = bundleResult.code;
  const frontMatter = bundleResult.frontmatter as Pick<
    PostFrontMatter,
    'title' | 'summary' | 'publishedAt'
  >;
  const views = (await fetchDatabase<number>(`/views/${slug}`)) || 0;
  const readingTimeResult = getReadingTime(mdxSource);
  const wordCount = readingTimeResult.words;
  const readingTime = readingTimeResult.text;

  // Return page props
  return {
    props: {
      post: {
        ...frontMatter,
        slug,
        views,
        wordCount,
        readingTime,
        sourceCode,
      },
    },
  };
};

// Client side React.js code
const PostPage: NextPage<PostPageProps> = ({ post }) => {
  // Destructure post object
  const { title, summary, slug, readingTime, sourceCode } = post;

  // Increase views of post by 1
  useEffect(() => {
    fetchDatabase(`/views/${slug}`, {
      method: 'PUT',
      body: JSON.stringify({ '.sv': { increment: 1 } }),
    });
  }, [slug]);

  // Create string for publication date
  const publishedAt = useMemo(
    () =>
      new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    [post.publishedAt]
  );

  // Get current views of post
  const views = useViews(slug, post.views);

  // Convert source code to component
  const BlogPost = useMemo(() => getMDXComponent(sourceCode), [sourceCode]);

  return (
    <>
      <Head title={`${title} | Andreas Klinger`} description={summary} />

      <article>
        <h1>{title}</h1>
        <p className="text-base lg:text-lg mt-4 md:mt-6 lg:mt-8 mb-12 md:mb-20 lg:mb-24">
          {publishedAt} · {readingTime} · {views} views
        </p>

        {/*
        Since the return type "null" was not added to the component types of
        "mdx-bundler", but it is included by default in the "FC" type of React,
        I cast PostImage to "any". In the future, this may be removed again.
        */}
        <BlogPost components={{ Image: PostImage as any }} />
      </article>
    </>
  );
};

export default PostPage;
