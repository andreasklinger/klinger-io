import {readdirSync, readFileSync} from 'fs';
import matter from 'gray-matter';
import {join} from 'path';
import {PostFrontMatter} from '../types';
import {filter, includes} from 'lodash';

export async function getFrontMatterOfPosts(): Promise<PostFrontMatter[]> {
    // Get blog post file names
    let fileNames = readdirSync(join(process.cwd(), 'posts'));
    fileNames = filter(fileNames, (fileName: string) => includes(fileName, '.md'))
    // Create list with front matter of all blog post
    const allPosts: PostFrontMatter[] = await Promise.all(
        fileNames.map(async (fileName) => {
            const filePath = join(process.cwd(), 'posts', fileName);
            console.log('filePath', filePath)
            const fileData = readFileSync(filePath, 'utf8');
            const frontMatter = matter(fileData).data as Pick<
                PostFrontMatter,
                'title' | 'summary' | 'publishedAt'
            >;
            const slug = fileName.replace('.mdx', '');
            return {...frontMatter, slug};
        })
    );

    // Sort posts by publication date
    const sortedPosts = allPosts.sort((a, b) =>
        a.publishedAt < b.publishedAt ? 1 : -1
    );

    // Return sorted posts
    return sortedPosts;
}
