// next.config.mjs
import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [],
  },
};

export default nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  swSrc: 'worker/index.js',
})(baseConfig);