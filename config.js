module.exports = {
  websiteUrl: 'bernert-io.web.app',
  analyticsTrackingId: '',
  firebaseDatabaseUrl: 'https://bernert-io-default-rtdb.europe-west1.firebasedatabase.app',
  responsiveImage: {
    extensionRegex: /\.(jpe?g|png|webp)$/i,
    imageSizes: [32, 64, 128, 256, 512, 768, 1024, 1536, 2048],
    getFileName: (preffix, imageSize, suffix) =>
      `${preffix}-${imageSize}w${suffix}`,
  },
};
