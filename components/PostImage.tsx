import { FC } from 'react';
import { Image } from './Image';

interface PostImageProps {
  className?: string;
  src?: string;
  alt?: string;
}

export const PostImage: FC<PostImageProps> = ({ className, src, alt }) =>
  src ? (
    <Image
      className={className}
      src={`/images/${src}`}
      sizes="(max-width: 768px) 95vw, 728px"
      loading="lazy"
      alt={alt}
    />
  ) : null;
