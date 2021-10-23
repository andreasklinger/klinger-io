import { FC } from 'react';
import { Image } from './Image';

interface PostListProps {
  src?: string;
  alt?: string;
}

export const PostImage: FC<PostListProps> = ({ src, alt }) =>
  src ? (
    <Image
      src={`/images/${src}`}
      sizes="(max-width: 768px) 95vw, 728px"
      alt={alt}
    />
  ) : null;
