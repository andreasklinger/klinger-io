module.exports = {
  analyticsTrackingId: 'UA-4425769-6',
  firebaseDatabaseUrl: 'https://klinger-io-default-rtdb.firebaseio.com',
  responsiveImage: {
    extensionRegex: /\.(jpe?g|png|webp)$/i,
    imageSizes: [32, 64, 128, 256, 512, 768, 1024, 1536, 2048],
    getFileName: (preffix, imageSize, suffix) =>
      `${preffix}-${imageSize}w${suffix}`,
  },
};
