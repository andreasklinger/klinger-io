/* eslint-disable jsx-a11y/alt-text */
import { FC, useMemo } from 'react';
import { responsiveImage } from '../config';

interface PostListProps {
  className?: string;
  src: string;
  sizes: string;
  alt?: string;
}

export const Image: FC<PostListProps> = (props) => {
  const { src } = props;

  // Create src set for responsive images in production mode
  const srcSet = useMemo(() => {
    const { extensionRegex, imageSizes, getFileName } = responsiveImage;
    if (
      process.env.NODE_ENV === 'production' &&
      src.charAt(0) === '/' &&
      extensionRegex.test(src)
    ) {
      const preffix = src.replace(extensionRegex, '');
      const suffix = src.match(extensionRegex)![0];
      return imageSizes
        .map(
          (imageSize) =>
            `${getFileName(preffix, imageSize, suffix)} ${imageSize}w`
        )
        .join(', ');
    }
  }, [src]);

  return <img {...props} srcSet={srcSet} />;
};
