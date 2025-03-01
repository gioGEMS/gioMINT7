/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
      // This is to fix the fs module not found error
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          zlib: require.resolve('browserify-zlib'),
          path: require.resolve('path-browserify'),
        };
      }
      return config;
    },
  };
  
  module.exports = nextConfig;