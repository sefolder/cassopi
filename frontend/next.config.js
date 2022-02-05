/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack5: true, //caver-js 오류 해결
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
    };

    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
