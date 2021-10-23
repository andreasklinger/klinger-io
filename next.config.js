module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack: (config, { dev, isServer }) => {
    // Replace React.js with Preact.js in production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
    return config;
  },
};
