const { readdirSync } = require('fs');
const { join } = require('path');
const sharp = require('sharp');
const { responsiveImage } = require('../config');

(async () => {
  // Destructure responsive image object
  const { extensionRegex, imageSizes, getFileName } = responsiveImage;

  // Create images directory path
  const imagesDirectoryPath = join(process.cwd(), 'out/images');

  // Get all file names of images directory
  const fileNames = readdirSync(imagesDirectoryPath).filter((fileName) =>
    extensionRegex.test(fileName)
  );

  await Promise.all(
    fileNames.map(async (fileName) => {
      // Create original file path
      const originalFilePath = join(imagesDirectoryPath, fileName);

      // Create preffix and suffix
      const preffix = fileName.replace(extensionRegex, '');
      const suffix = fileName.match(extensionRegex)[0];

      await Promise.all(
        imageSizes.map(async (imageSize) => {
          // Create resized file path
          const resizedFilePath = join(
            imagesDirectoryPath,
            getFileName(preffix, imageSize, suffix)
          );

          // Resize original file via sharp
          await sharp(originalFilePath)
            .resize({
              width: imageSize,
              withoutEnlargement: true,
              fit: 'inside',
            })
            .toFile(resizedFilePath);
        })
      );
    })
  );

  // Log info to console
  console.info(`Rezised ${fileNames.length} images for production`);
})();
