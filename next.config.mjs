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
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst'
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'StaleWhileRevalidate'
    }
  ],
  // Adicione esta configuração para ignorar arquivos problemáticos
  exclude: [
    /_next\/app-build-manifest\.json$/,
    /_next\/middleware-manifest\.json$/,
    /_next\/react-refresh\.js$/
  ]
})(baseConfig);