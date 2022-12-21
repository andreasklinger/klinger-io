import { writeFileSync } from 'fs';
import { join } from 'path';
import { PostFrontMatter } from '../types';
import { websiteUrl } from '../config';

interface PageMeta {
  title: string;
  description: string;
}

export function generateRssFeed(
  pageMeta: PageMeta,
  posts: PostFrontMatter[]
): void {
  // Create RSS file name
  const rssFileName = 'rss.xml';

  // Create get XML string function
  const getXmlString = (string: string): string => {
    if (!string) {
      return string
    }
    // Replace special characters with their HTML entity
    return string.replace(
        /[\u00A0-\u9999<>&]/g,
        (i: string) => '&#' + i.charCodeAt(0) + ';'
    );
  };

  // Create get date string function
  const getDateString = (date: string) => new Date(date).toUTCString();

  // Create RSS XML code
  const rssXmlCode = `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <link>${websiteUrl}/posts</link>
    <title>${getXmlString(pageMeta.title)}</title>
    <description>${getXmlString(pageMeta.description)}</description>
    <lastBuildDate>${getDateString(posts[0].publishedAt)}</lastBuildDate>
    <language>en</language>
    <atom:link href="${websiteUrl}/${rssFileName}" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <guid>${websiteUrl}/posts/${encodeURIComponent(post.slug)}</guid>
      <link>${websiteUrl}/posts/${encodeURIComponent(post.slug)}</link>
      <title>${getXmlString(post.title)}</title>
      <description>${getXmlString(post.summary)}</description>
      <pubDate>${getDateString(post.publishedAt)}</pubDate>
    </item>`
      )
      .join('')
      .trim()}
  </channel>
</rss>`.trim();

  // Write RSS file to public directory
  writeFileSync(join(process.cwd(), `public/${rssFileName}`), rssXmlCode);
}
