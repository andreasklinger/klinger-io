import { FC } from 'react';
import { Image } from './Image';

interface PostImageProps {
  src?: string;
  alt?: string;
}

export const PostImage: FC<PostImageProps> = ({ src, alt }) =>
  src ? (
    <Image
      src={`/images/${src}`}
      sizes="(max-width: 768px) 95vw, 728px"
      loading="lazy"
      alt={alt}
    />
  ) : null;
